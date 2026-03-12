import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AdminProductDeleteBtn from "./ProductDeleteBtn";

type SearchParams = { searchParams: Promise<{ status?: string; search?: string }> };

export default async function AdminProductsPage({ searchParams }: SearchParams) {
  const { status: filterStatus, search } = await (searchParams as any);

  const where: any = {};
  if (filterStatus && filterStatus !== "all") {
    where.status = filterStatus;
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { slug: { contains: search } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statusColors: Record<string, string> = {
    published: "badge-success",
    draft: "badge-default",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your product catalog (live database)</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white text-sm font-semibold shadow-lg shadow-kumbil-primary/20 hover:shadow-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white shadow-soft">
        <form method="GET" action="/admin/products" className="relative flex-1 min-w-[200px]">
          <input type="hidden" name="status" value={filterStatus ?? "all"} />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            name="search"
            type="text"
            placeholder="Search products..."
            defaultValue={search ?? ""}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 focus:border-kumbil-primary/50 transition-all"
          />
        </form>
        <div className="flex gap-2">
          {["all", "published", "draft"].map((s) => (
            <Link
              key={s}
              href={`/admin/products?status=${s}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                (filterStatus ?? "all") === s
                  ? "bg-kumbil-primary text-white shadow-md shadow-kumbil-primary/20"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                        <img
                          src={product.image1}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-slate-600 uppercase font-bold tracking-tight">
                    {product.category?.name ?? product.categoryId}
                  </td>
                  <td>
                    <div className="text-sm font-black text-slate-900">
                      {product.variants.length > 0 ? (
                        product.variants.length === 1 ? (
                          formatPrice(product.variants[0].price)
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Starts from</span>
                            <span>{formatPrice(Math.min(...product.variants.map((v: any) => v.price)))}</span>
                          </div>
                        )
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-black ${
                          product.variants.reduce((sum: number, v: any) => sum + v.stock, 0) > 10
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {product.variants.reduce((sum: number, v: any) => sum + v.stock, 0)}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {product.variants.length} Variants
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${statusColors[product.status]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/products/new?edit=${product.id}`}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-kumbil-primary transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </Link>
                      <AdminProductDeleteBtn id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
