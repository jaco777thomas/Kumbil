import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, timeAgo } from "@/lib/utils";
import AdminOrderStatusChanger from "./StatusChanger";

type SearchParams = { searchParams: Promise<{ status?: string; search?: string }> };

export default async function AdminOrdersPage({ searchParams }: SearchParams) {
  const { status: filterStatus, search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (filterStatus && filterStatus !== "all") {
    where.status = filterStatus;
  }
  if (search) {
    where.OR = [
      { customerName: { contains: search } },
      { orderNumber: { contains: search } },
      { customerEmail: { contains: search } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Count totals for tab labels
  const counts = await prisma.order.groupBy({
    by: ["status"],
    _count: { status: true },
  });
  const countMap: Record<string, number> = { all: 0 };
  counts.forEach((c: { status: string; _count: { status: number } }) => {
    countMap[c.status] = c._count.status;
    countMap.all += c._count.status;
  });

  const statusColors: Record<string, string> = {
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
  };

  const statusList = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500 mt-1">Track and manage customer orders (live database)</p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusList.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              (filterStatus ?? "all") === s
                ? "bg-kumbil-primary text-white shadow-md shadow-kumbil-primary/20"
                : "bg-white text-slate-600 hover:bg-slate-50 shadow-soft"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">{countMap[s] ?? 0}</span>
          </Link>
        ))}
      </div>

      {/* Search */}
      <form method="GET" action="/admin/orders" className="relative max-w-md">
        <input type="hidden" name="status" value={filterStatus ?? "all"} />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          name="search"
          type="text"
          defaultValue={search ?? ""}
          placeholder="Search by customer or order number..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all"
        />
      </form>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: { id: string; orderNumber: string; customerName: string; customerEmail: string; total: number; paymentMethod: string | null; status: string; createdAt: Date }) => (
                <tr key={order.id}>
                  <td className="font-mono font-bold text-slate-800 text-xs">
                    {order.orderNumber}
                  </td>
                  <td>
                    <div className="text-sm font-semibold text-slate-800">{order.customerName}</div>
                    <div className="text-xs text-slate-400">{order.customerEmail}</div>
                  </td>
                  <td className="font-bold text-slate-900">{formatPrice(order.total)}</td>
                  <td>
                    <span className="text-xs font-medium text-slate-500 px-2 py-1 bg-slate-50 rounded-lg capitalize">
                      {order.paymentMethod ?? "—"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[order.status] ?? "badge-info"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-sm text-slate-500">{timeAgo(order.createdAt)}</td>
                  <td>
                    <AdminOrderStatusChanger orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
