import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// ─── POST /api/orders — Place a new order ────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      items,
      paymentMethod,
      couponCode,
      subtotal,
      shipping,
      discount,
      total,
    } = body;

    // Basic validation
    if (!customerName || !customerEmail || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Generate unique order number
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `KB-${timestamp}-${random}`;

    // Build shipping address JSON string
    const shippingAddress = JSON.stringify({
      phone,
      address,
      city,
      state,
      pincode,
      country: country || "India",
    });

    // Serialise items as JSON
    const itemsJson = JSON.stringify(items);

    // Link to customer if logged in
    const session = await getSession();
    const customerId = session?.role === "customer" ? session.id : null;

    // Create order and update customer metrics in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerId,
          items: itemsJson,
          total: total ?? subtotal + shipping - (discount ?? 0),
          status: "pending",
          paymentMethod: paymentMethod ?? "cod",
          phone,
          address,
          city,
          state,
          pincode,
          country: country || "India",
        },
      });

      // Update customer stats if applicable
      if (customerId) {
        await tx.customer.update({
          where: { id: customerId },
          data: {
            orderCount: { increment: 1 },
            totalSpent: { increment: newOrder.total },
          },
        });
      }

      return newOrder;
    });

    // If coupon was used, increment usage count
    if (couponCode) {
      await prisma.coupon.updateMany({
        where: { code: couponCode.toUpperCase() },
        data: { usageCount: { increment: 1 } },
      });
    }

    // ─── WhatsApp Notifications ───
    try {
      const { sendWhatsAppNotification, formatOrderConfirmationMessage } = await import("@/lib/notifications");
      const message = formatOrderConfirmationMessage(order.orderNumber, order.customerName);
      await sendWhatsAppNotification(phone, message);
    } catch (notifyErr) {
      console.error("[WHATSAPP_NOTIFY_ERROR]", notifyErr);
      // Non-blocking error: Order is still created even if notification fails
    }

    return NextResponse.json(
      { success: true, orderNumber: order.orderNumber, id: order.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 }
    );
  }
}

// ─── GET /api/orders — Admin: list all orders ────────────────────────────────

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total, page, limit });
  } catch (err) {
    console.error("[GET /api/orders]", err);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}
