import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { joinedAt: "desc" },
    });

    // Generate CSV
    const headers = ["Name", "Email", "Phone", "Location", "Join Date", "Orders", "Total Spent"];
    const rows = customers.map(c => [
      c.name,
      c.email,
      c.phone || "",
      c.location || "",
      new Date(c.joinedAt).toLocaleDateString(),
      c.orderCount,
      c.totalSpent,
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(item => `"${item}"`).join(","))
      .join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="customers-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
