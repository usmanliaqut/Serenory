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
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;


export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return new NextResponse("No signature found", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    switch (event.type) {
     case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata;
      const meetingLink = `${process.env.NEXT_PUBLIC_URL}/meeting/${session.id}`; 
  

      try {
        const user = await prisma.user.upsert({
          where: { email: meta?.email! },
          update: {},
          create: {
            email: meta?.email!,
            name: meta?.name || null,
            anonymous: meta?.anonymous === "true",
          },
        });

        const bookingData: any = {
          type: meta?.type!,
          mood: meta?.mood!,
          time: new Date(meta?.time!),
          userId: user.id,
          meetingLink: meetingLink,
          payment: {
            create: {
              amount: session.amount_total ?? 0,
              status: session.payment_status ?? "unknown",
              stripeId: session.id,
            },
          },
        };
       

      

        const booking = await prisma.booking.create({ data: bookingData });
        if (session.metadata?.email) {
          // If we updated the meetingLink to booking.id, use that in the email; otherwise fall back to session-based link
          const useLink = (() => {
            try {
              const base = process.env.NEXT_PUBLIC_URL ?? "https://serenory.app";
              return booking ? `${base.replace(/\/+$/, "")}/meet/${booking.id}` : meetingLink;
            } catch {
              return meetingLink;
            }
          })();

          const html = generateBookingConfirmedEmailHtml({
            siteName: "Serenory",
            sessionMetadata: session.metadata as any,
            useLink,
          });

          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: session.metadata.email,
            subject: "Your booking is confirmed ✅",
            html,
          });
        }

      } catch (dbErr) {
        console.error("❌ DB insert error:", dbErr);
      }

      break;
    }


      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("✅ Payment succeeded:", paymentIntent.id);
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err: any) {
    console.error("❌ Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';