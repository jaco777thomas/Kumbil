import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, farmName, village, region, since, bio, photo, crops } = data;

    if (!name || !farmName) {
      return NextResponse.json({ error: "Name and Farm Name are required" }, { status: 400 });
    }

    const farmer = await prisma.farmer.create({
      data: {
        name,
        farmName,
        village,
        region,
        since: parseInt(since?.toString() || new Date().getFullYear().toString()),
        description: bio || "",
        photo: photo || "",
        crops: crops ? JSON.stringify(crops) : "[]",
      },
    });

    return NextResponse.json(farmer);
  } catch (error: any) {
    console.error("Farmer registration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const farmers = await prisma.farmer.findMany();
    return NextResponse.json(farmers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
