import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// ─── GET /api/orders/[id] — Get single order by id or orderNumber ─────────────

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    // Try by primary id first, then by orderNumber
    const order = await prisma.order.findFirst({
      where: { OR: [{ id }, { orderNumber: id }] },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Parse items JSON for the response
    const parsed = {
      ...order,
      items: JSON.parse(order.items),
    };

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[GET /api/orders/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
  }
}

// ─── PATCH /api/orders/[id] — Admin: update order status ─────────────────────

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { status } = await req.json();

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("[PATCH /api/orders/[id]]", err);
    return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
  }
}
