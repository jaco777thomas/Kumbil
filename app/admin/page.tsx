import { prisma } from "@/lib/prisma";
import { formatPrice, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { blogPosts } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  pending: "badge-warning",
  processing: "badge-info",
  shipped: "badge-info",
  delivered: "badge-success",
  cancelled: "badge-danger",
};

export default async function AdminDashboard() {
  const [productsCount, ordersCount, farmersCount, categoriesCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.farmer.count(),
    prisma.category.count(),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentProducts = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  const totalRevenue = (await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: { not: "cancelled" } }
  }))._sum.total || 0;

  const publishedProductsCount = await prisma.product.count({
    where: { status: "published" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time analytics and management
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/new" className="px-4 py-2 bg-kumbil-primary text-white rounded-xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-md">
            + New Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: formatPrice(totalRevenue),
            sub: "Synced with DB",
            icon: "💰",
            color: "from-amber-400 to-amber-600",
          },
          {
            label: "Total Orders",
            value: ordersCount.toString(),
            sub: "Across all customers",
            icon: "📋",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Active Products",
            value: publishedProductsCount.toString(),
            sub: `of ${productsCount} total`,
            icon: "📦",
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Farmer Partners",
            value: farmersCount.toString(),
            sub: `Across ${categoriesCount} categories`,
            icon: "👨‍🌾",
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden p-5 rounded-2xl bg-white shadow-soft transition-all hover:shadow-premium group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
            <div className="text-2xl font-extrabold text-slate-900">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
            <div className={`text-[11px] font-bold mt-0.5 text-slate-400`}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm text-kumbil-primary font-bold hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="font-bold text-slate-900 uppercase">
                        {order.orderNumber}
                      </td>
                      <td>
                        <div className="text-sm font-bold text-slate-800">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.customerEmail}
                        </div>
                      </td>
                      <td className="font-bold text-slate-900 font-mono">
                        {formatPrice(order.total)}
                      </td>
                      <td>
                        <span className={`badge ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="text-sm text-slate-500">
                        {timeAgo(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Products</h2>
              <Link href="/admin/products" className="text-sm text-kumbil-primary font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {recentProducts.map((prod: any, idx: number) => (
                <div key={prod.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img src={prod.image1 || ""} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">{prod.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{prod.category?.name || "Product"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Blog Updates</h2>
              <Link href="/admin/blog" className="text-sm text-kumbil-primary font-bold hover:underline">Manage Blog</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {blogPosts.slice(0, 2).map((post: any) => (
                <div key={post.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-kumbil-primary transition-colors">{post.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-1">{post.publishedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
