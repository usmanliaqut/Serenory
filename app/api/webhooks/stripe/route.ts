import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import generateBookingConfirmedEmailHtml from "./bookingConfirmedEmail";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});
const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Ensure correct public domain fallback
const BASE_URL =
  (process.env.NEXT_PUBLIC_URL ?? "https://serenory.app").replace(/\/+$/, "");

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata;

        if (!meta?.email || !meta?.type || !meta?.time) {
          console.error("❌ Missing metadata:", meta);
          break;
        }

        const meetingLink = `${BASE_URL}/meeting/${session.id}`;

        let booking: any = null;

        // Save booking + user + payment
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

          const bookingData:any = {
            type: meta.type,
            mood: meta.mood || null,
            time: new Date(meta.time),
            userId: user.id,
            meetingLink,
            payment: {
              create: {
                amount: session.amount_total ?? 0,
                status: session.payment_status ?? "unknown",
                stripeId: session.id,
              },
            },
          };

          booking = await prisma.booking.create({ data: bookingData });
          console.log("📝 Booking saved →", booking.id);

        } catch (dbErr: any) {
          console.error("❌ Database error:", dbErr);
        }

        // Send Confirmation Email (does NOT block webhook success)
        try {
          const useLink = booking
            ? `${BASE_URL}/meet/${booking.id}`
            : meetingLink;

          const html = generateBookingConfirmedEmailHtml({
            siteName: "Serenory",
            sessionMetadata: meta,
            useLink,
          });

          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: meta.email,
            subject: "Your booking is confirmed ✅",
            html,
          });

          console.log("📩 Email sent →", meta.email);

        } catch (emailErr: any) {
          console.error("📧 Email sending failed:", {
            message: emailErr.message,
            email: meta.email,
          });

         
        }

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("💰 Payment succeeded:", paymentIntent.id);
        break;
      }

      default:
        console.log("⚠️ Ignored Stripe event:", event.type);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err: any) {
    console.error("❌ Webhook signature validation error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
