// lib/queries/getBookings.ts
import { prisma } from "@/lib/prisma";

type GetBookingsOptions = {
  page?: number; // default 1
  limit?: number; // default 10
};

export async function getBookings({ page = 1, limit = 10 }: GetBookingsOptions = {}) {
  try {
    const skip = (page - 1) * limit;

    // Fetch bookings with related user info
    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.booking.count(),
    ]);

    return {
      bookings: bookings,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (err) {
    console.error("❌ Failed to fetch bookings:", err);
    return {
      bookings: [],
      pagination: { total: 0, page: 1, limit, totalPages: 1 },
    };
  }
}
