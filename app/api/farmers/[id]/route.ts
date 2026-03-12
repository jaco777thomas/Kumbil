import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await prisma.farmer.findUnique({
      where: { id },
    });

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...farmer,
      crops: farmer.crops ? JSON.parse(farmer.crops) : [],
    });
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
    const { name, farmName, village, region, since, bio, photo, crops } = data;

    const farmer = await prisma.farmer.update({
      where: { id },
      data: {
        name,
        farmName,
        village,
        region,
        since: since ? parseInt(since.toString()) : undefined,
        description: bio,
        photo,
        crops: crops ? JSON.stringify(crops) : undefined,
      },
    });

    return NextResponse.json(farmer);
  } catch (error: any) {
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
    await prisma.farmer.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
