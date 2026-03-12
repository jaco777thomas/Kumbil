import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FarmerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const farmer = await prisma.farmer.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!farmer) {
    notFound();
  }

  const crops = JSON.parse(farmer.crops || "[]");

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/farmers"
            className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-kumbil-primary hover:border-kumbil-primary/20 transition-all shadow-soft"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{farmer.name}</h1>
            <p className="text-sm font-bold text-kumbil-primary uppercase tracking-widest">{farmer.farmName}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/farmers/new?edit=${farmer.id}`}
            className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 text-sm font-black hover:bg-slate-50 transition-all shadow-soft"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Crops */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
             <div className="aspect-square relative group">
              <img 
                src={farmer.photo || ""} 
                alt={farmer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Serving Since</div>
                <div className="text-2xl font-black text-white">{farmer.since}</div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Location Details</h4>
                <div className="flex items-start gap-3 text-slate-600">
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">{farmer.village}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tight">{farmer.region}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Major Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {crops.map((crop: string) => (
                    <span key={crop} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                      {crop}
                    </span>
                  ))}
                  {crops.length === 0 && <span className="text-xs text-slate-400 italic">No crops listed</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Story & Products */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-10">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Our Journey & Bio</h4>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {farmer.description || "No story shared yet..."}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Linked Products</h4>
              <span className="px-3 py-1 rounded-full bg-slate-50 text-xs font-bold text-slate-500 border border-slate-100">
                {farmer.products.length} Products
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {farmer.products.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/admin/products/new?edit=${product.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-100 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={product.image1 || ""} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900 group-hover:text-kumbil-primary transition-colors">{product.name}</h5>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.category?.name || "Uncategorized"}</div>
                    <div className="text-xs font-black text-kumbil-primary mt-1">₹{product.price}</div>
                  </div>
                </Link>
              ))}
              {farmer.products.length === 0 && (
                <div className="col-span-full py-10 text-center">
                  <p className="text-sm text-slate-400 font-bold italic">No products linked to this farmer yet.</p>
                  <Link href="/admin/products/new" className="text-xs text-kumbil-primary font-black uppercase tracking-widest hover:underline mt-2 inline-block">
                    Add Product
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
