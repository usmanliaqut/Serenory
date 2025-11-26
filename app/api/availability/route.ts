import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Returns booking start times for a given date (ISO strings) and the daily count
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "missing date" }, { status: 400 });
  }

  try {
    const tzOffsetParam = req.nextUrl.searchParams.get("tzOffset");
    const tzOffset = tzOffsetParam ? parseInt(tzOffsetParam, 10) : 0; // minutes (UTC - local)
    console.log(`[AVAIL] /api/availability called date=${date} tzOffset=${tzOffset} from=${req.headers.get("x-forwarded-for") || req.headers.get("host")}`);

    // parse date as YYYY-MM-DD and compute the UTC window corresponding to that local day
    const [y, m, d] = date.split("-").map((s) => parseInt(s, 10));
    // local midnight in UTC ms = Date.UTC(y, m-1, d, 0, 0) - (tzOffset minutes)
    const localMidnightUtcMs = Date.UTC(y, m - 1, d, 0, 0) - tzOffset * 60 * 1000;
    const dayStart = new Date(localMidnightUtcMs);
    const dayEnd = new Date(localMidnightUtcMs + 24 * 60 * 60 * 1000);

    const bookings = await prisma.booking.findMany({
      where: {
        time: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
      select: { id: true, time: true },
    });

    const taken = bookings.map((b) => b.time.toISOString());
    return NextResponse.json({ ok: true, date, tzOffset, taken, count: bookings.length }, { status: 200 });
  } catch (err) {
    console.error("/api/availability error", err);
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
