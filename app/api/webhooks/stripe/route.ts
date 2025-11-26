import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import generateBookingConfirmedEmailHtml from "./bookingConfirmedEmail";

export const runtime = "nodejs"; // Required for raw body
export const dynamic = "force-dynamic"; // Prevent static caching

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});
const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const BASE_URL =
  (process.env.NEXT_PUBLIC_URL ?? "https://serenory.app").replace(/\/+$/, "");

export async function POST(req: NextRequest) {
  const signature = headers().get("stripe-signature");
  const rawBody = await req.text(); 

  if (!signature) {
    console.error("❌ Missing stripe-signature header.");
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.error("❌ Invalid webhook signature:", err.message);
    return new NextResponse(`Webhook signature error: ${err.message}`, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata;

        console.log("🎯 checkout.session.completed received");

        if (!meta?.email || !meta?.type || !meta?.time) {
          console.error("❌ Missing metadata →", meta);
          break;
        }

        let booking: any = null;

        try {
          const user = await prisma.user.upsert({
            where: { email: meta.email },
            update: {},
            create: {
              email: meta.email,
              name: meta.name || null,
              anonymous: meta.anonymous === "true",
            },
          });

          booking = await prisma.booking.create({
            data: {
              type: meta.type,
              mood: meta?.mood ?? null,
              time: new Date(meta.time),
              userId: user.id,
              meetingLink: `${BASE_URL}/meeting/${session.id}`,
              payment: {
                create: {
                  amount: session.amount_total ?? 0,
                  status: session.payment_status ?? "unknown",
                  stripeId: session.id,
                },
              },
            },
          });

          console.log("📝 Booking created:", booking.id);
        } catch (dbErr: any) {
          console.error("❌ Database error while creating booking:", dbErr);
        }

        try {
          const link = booking
            ? `${BASE_URL}/meet/${booking.id}`
            : `${BASE_URL}/meeting/${session.id}`;

          const html = generateBookingConfirmedEmailHtml({
            siteName: "Serenory",
            sessionMetadata: meta,
            useLink: link,
          });

      await resend.emails.send({
  from: "hello@resend.dev", 
  to: "hello@resend.dev",          
  subject: "Your booking is confirmed ✅",
  html,
});


          console.log("📩 Confirmation email sent:", meta.email);
        } catch (emailErr: any) {
          console.error("📧 Email sending failed:", emailErr.message);
        }

        break;
      }

      default:
        console.log("⚠️ Ignored Stripe event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook handler error:", err);
    return new NextResponse("Webhook processing failed", { status: 500 });
  }
}
