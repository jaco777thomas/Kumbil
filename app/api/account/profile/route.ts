import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, phone, location } = body;

    const updatedCustomer = await prisma.customer.update({
      where: { id: session.id },
      data: {
        name,
        phone,
        location,
      },
    });

    return NextResponse.json({ success: true, user: updatedCustomer });
  } catch (error: any) {
    console.error("[ACCOUNT_PROFILE_PATCH]", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
