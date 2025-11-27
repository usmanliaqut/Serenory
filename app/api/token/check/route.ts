import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";      // Required for Prisma
export const dynamic = "force-dynamic"; // Keep only once

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");

  if (!room) {
    return NextResponse.json({ ok: false, message: "missing room" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: room },
          { meetingLink: { contains: room } },
          { payment: { is: { stripeId: room } } },
        ],
      },
    });

    if (!booking) {
      return NextResponse.json({ ok: false, message: "booking not found" });
    }

    const now = Date.now();
    const meetingTime = new Date(booking.time).getTime();
    const earlyToleranceMs = 5 * 60 * 1000;
    const afterWindowMs = 60 * 60 * 1000;

    if (now < meetingTime - earlyToleranceMs) {
      return NextResponse.json({ ok: false, message: "meeting not started yet", meetingTime: booking.time });
    }

    if (now > meetingTime + afterWindowMs) {
      return NextResponse.json({ ok: false, message: "meeting expired", meetingTime: booking.time });
    }

    return NextResponse.json({
      ok: true,
      booking: { id: booking.id, time: booking.time, meetingLink: booking.meetingLink },
    });
  } catch (err) {
    console.error("/api/token/check error", err);
    return NextResponse.json({ ok: false, message: "internal error" }, { status: 500 });
  }
}
