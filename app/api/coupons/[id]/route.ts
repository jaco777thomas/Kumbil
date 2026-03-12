import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(coupon);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await req.json();
    const { 
      code, 
      type, 
      discount, 
      minOrder, 
      maxDiscount, 
      usageLimit, 
      expiresAt, 
      active 
    } = data;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        code: code ? code.toUpperCase().trim() : undefined,
        type,
        discount: discount !== undefined ? parseFloat(discount) : undefined,
        minOrder: minOrder !== undefined ? parseFloat(minOrder) : undefined,
        maxDiscount: maxDiscount !== undefined ? (maxDiscount ? parseFloat(maxDiscount) : null) : undefined,
        usageLimit: usageLimit !== undefined ? parseInt(usageLimit) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        active: active !== undefined ? active : undefined,
      },
    });

    return NextResponse.json(coupon);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
