import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(coupons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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

    if (!code || !type || discount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase().trim(),
        type,
        discount: parseFloat(discount),
        minOrder: parseFloat(minOrder || 0),
        maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
        usageLimit: parseInt(usageLimit || 0),
        usageCount: 0,
        expiresAt: new Date(expiresAt),
        active: active !== undefined ? active : true,
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
