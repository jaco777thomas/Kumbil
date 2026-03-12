import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...category,
      subcategories: category.subcategories 
        ? JSON.parse(category.subcategories as string) 
        : [],
    });
  } catch (err) {
    console.error(`[GET /api/categories]`, err);
    return NextResponse.json(
      { error: "Failed to fetch category." },
      { status: 500 }
    );
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
    const { id: categoryId } = await params;
    const body = await req.json();
    const { name, slug, description, image, subcategories } = body;

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        slug,
        description,
        image,
        subcategories: subcategories ? JSON.stringify(subcategories) : null,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.error(`[PATCH /api/categories]`, err);
    return NextResponse.json(
      { error: "Failed to update category." },
      { status: 500 }
    );
  }
}
