import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── POST /api/coupons/validate ────────────────────────────────────────────────
// Body: { code: string, subtotal: number }
// Returns: { valid, discountAmount, discountType, code, message }

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();

    if (!code || typeof subtotal !== "number") {
      return NextResponse.json(
        { valid: false, message: "Invalid request." },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Coupon code not found." });
    }

    if (!coupon.active) {
      return NextResponse.json({ valid: false, message: "This coupon is no longer active." });
    }

    if (coupon.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, message: "This coupon has expired." });
    }

    if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({ valid: false, message: "This coupon has reached its usage limit." });
    }

    if (subtotal < coupon.minOrder) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order of ₹${coupon.minOrder} required for this coupon.`,
      });
    }

    // Calculate discount
    let discountAmount =
      coupon.type === "percentage"
        ? (subtotal * coupon.discount) / 100
        : coupon.discount;

    // Apply maxDiscount cap if set
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountAmount: Math.round(discountAmount * 100) / 100,
      discountType: coupon.type,
      discountPercent: coupon.discount,
      message: `Coupon applied — you save ₹${discountAmount.toFixed(2)}!`,
    });
  } catch (err) {
    console.error("[POST /api/coupons/validate]", err);
    return NextResponse.json(
      { valid: false, message: "Failed to validate coupon." },
      { status: 500 }
    );
  }
}
