// /app/api/get-booking-details/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      return NextResponse.json(
        { error: "Payment not completed." },
        { status: 404 }
      );
    }

    const metadata = session.metadata;

    if (!metadata || !metadata.time || !metadata.type) {
      return NextResponse.json(
        { error: "Booking metadata is missing or incomplete." },
        { status: 404 }
      );
    }

    // --- MAPPING YOUR METADATA ---

    // 1. Parse the date and time from the 'time' metadata field
    const bookingDate = new Date(metadata.time); // e.g., "2025-10-26T14:00:00.000Z"

    const formattedDate = bookingDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = bookingDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const bookingDetails = {
      expertName: "Your Listening Professional",
      expertTitle: "Serenory Session",
      duration: metadata.type,
      confirmationId: session.id,
      date: formattedDate,
      time: formattedTime,
    };

    return NextResponse.json(bookingDetails, { status: 200 });

  } catch (error) {
    console.error("Stripe API Error:", error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}