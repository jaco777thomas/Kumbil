import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// ── GET /api/products — List products with filters ──────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (featured === "true") where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

// ── POST /api/products — Admin: Create product ──────────────────────────────

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      slug,
      description,
      longDescription,
      categoryId,
      image1,
      image2,
      image3,
      featured,
      status,
      farmerId,
      variants,
    } = body;

    // Basic validation
    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        { error: "Name, slug, and category are required." },
        { status: 400 }
      );
    }

    // Calculate aggregate fields from variants
    const derivedPrice = variants && variants.length > 0 
      ? Math.min(...variants.map((v: any) => v.price))
      : 0;
      
    const derivedComparePrice = variants && variants.length > 0
      ? Math.max(...variants.map((v: any) => v.comparePrice || 0))
      : 0;

    const totalStock = variants && variants.length > 0
      ? variants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0)
      : 0;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        longDescription,
        categoryId,
        image1,
        image2,
        image3,
        price: derivedPrice,
        comparePrice: derivedComparePrice,
        stock: totalStock,
        featured: !!featured,
        status: status || "draft",
        farmerId: farmerId || null,
        variants: {
          create: variants || [],
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("[POST /api/products]", err);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
