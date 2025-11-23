import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");

  if (!room) {
    return NextResponse.json({ ok: false, message: "missing room" }, { status: 400 });
  }

  try {
    // Try to find a booking that matches the room id, meetingLink containing room, or payment.stripeId == room
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
      return NextResponse.json({ ok: false, message: "booking not found" }, { status: 200 });
    }

    // Validate meeting time: allow joining within a window (5 minutes early to 60 minutes after)
    const now = Date.now();
    const meetingTime = booking.time?.getTime ? booking.time.getTime() : new Date(booking.time).getTime();
    const earlyToleranceMs = 5 * 60 * 1000; // 5 minutes early
    const afterWindowMs = 60 * 60 * 1000; // 60 minutes after scheduled time

    if (now < meetingTime - earlyToleranceMs) {
      // Meeting hasn't started yet
      return NextResponse.json({ ok: false, message: "meeting not started yet", meetingTime: booking.time }, { status: 200 });
    }

    if (now > meetingTime + afterWindowMs) {
      // Meeting expired
      return NextResponse.json({ ok: false, message: "meeting expired", meetingTime: booking.time }, { status: 200 });
    }

    // Within allowed window
    return NextResponse.json({ ok: true, booking: { id: booking.id, time: booking.time, meetingLink: booking.meetingLink } }, { status: 200 });
  } catch (err) {
    console.error("/api/token/check error", err);
    return NextResponse.json({ ok: false, message: "internal error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
