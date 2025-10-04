import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
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

      console.log("✅ Checkout completed:", session.id);

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

        // 2. Create booking linked to that user
        await prisma.booking.create({
          data: {
            type: meta?.type!,
            mood: meta?.mood!,
            time: new Date(meta?.time!),
            userId: user.id,
            payment: {
              create: {
                amount: session.amount_total ?? 0,
                status: session.payment_status ?? "unknown",
                stripeId: session.id, // add this to schema to avoid duplicates
              },
            },
          },
        });

        console.log("💾 Booking + Payment saved in DB");
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

// ⬅️ THIS IS THE FIX 
export const dynamic = 'force-dynamic';