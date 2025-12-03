import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Duration mapping in minutes
const durationMap: Record<string, number> = {
  Drift: 15,
  Anchor: 30,
  Haven: 60,
  "Quiet Continuation": 75,
  "Deep Presence": 90,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const startTime = new Date(body.time);
    const duration = durationMap[body.type];

    if (!duration) {
      return NextResponse.json(
        { error: "Invalid session type" },
        { status: 400 }
      );
    }

    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        type: body.type,
        mood: body.mood ?? "",
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        note: body.note ?? "",
        name: body.name ?? "",
        anonymous: body.anonymous ? "true" : "false",
        email: body.email,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
