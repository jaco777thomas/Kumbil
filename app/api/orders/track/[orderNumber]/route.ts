import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required to track order." }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      select: {
        orderNumber: true,
        customerName: true,
        customerEmail: true,
        status: true,
        total: true,
        createdAt: true,
        updatedAt: true,
        items: true,
        paymentMethod: true,
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Security check: Email must match
    if (order.customerEmail.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized access to order details." }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("[ORDER_TRACK_GET]", error);
    return NextResponse.json({ error: "Failed to fetch order tracking info." }, { status: 500 });
  }
}
