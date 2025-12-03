import { NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";


export async function GET() {
  try {
    // 1️⃣ Total Users
    const totalUsers = await prisma.user.count();

    // 2️⃣ Total Payments
    const totalPayments = await prisma.payment.count();

    // 3️⃣ Successful Payments
    const successPayments = await prisma.payment.count({
      where: { status: "paid" },
    });

    // 4️⃣ Pending Payments
    const pendingPayments = await prisma.payment.count({
      where: { status: "pending" },
    });

    

    return NextResponse.json({
      totalUsers,
      totalPayments,
      successPayments,
      pendingPayments,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
