import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Categories</h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize your products into logical groups for better discoverability
          </p>
        </div>
        <Link href="/admin/categories/new" className="px-5 py-2.5 bg-kumbil-primary text-white rounded-2xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-lg shadow-kumbil-primary/20">
          + Add Category
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="group bg-white rounded-[2rem] shadow-soft overflow-hidden border border-slate-100 hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-44 overflow-hidden">
              <img 
                src={cat.image || ""} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                  {cat._count.products} Products
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">
                {cat.description}
              </p>
              
              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <Link href={`/admin/categories/new?edit=${cat.id}`} className="flex-1 py-2 px-4 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors text-center">
                  Edit
                </Link>
                <Link href={`/admin/products?category=${cat.id}`} className="flex-1 py-2 px-4 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors text-center">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-slate-900">No categories found</h3>
          <p className="text-sm text-slate-500 mt-1">Start by adding your first product category</p>
        </div>
      )}
    </div>
  );
}
