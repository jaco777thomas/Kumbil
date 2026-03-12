import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// ── GET /api/products/[id] — Single product ──────────────────────────────────

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        category: true,
        variants: true,
        farmer: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("[GET /api/products/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

// ── PATCH /api/products/[id] — Admin: Update product ─────────────────────────

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { variants, ...data } = body;

    // Update product + sync variants (delete old, create new for simplicity in admin flow)
    const product = await prisma.$transaction(async (tx: any) => {
      if (variants) {
        await tx.productVariant.deleteMany({ where: { productId: id } });
      }

      return tx.product.update({
        where: { id },
        data: {
          ...data,
          farmerId: data.farmerId || null,
          variants: variants ? {
            create: variants,
          } : undefined,
        },
        include: {
          variants: true,
        },
      });
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("[PATCH /api/products/[id]]", err);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

// ── DELETE /api/products/[id] — Admin: Delete product ────────────────────────

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/products/[id]]", err);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
