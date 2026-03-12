import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FarmerActions from "@/components/admin/FarmerActions";

export default async function FarmersPage() {
  const farmers = await prisma.farmer.findMany({
    orderBy: { since: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Farmer Partners</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your relationships with the backbone of our marketplace
          </p>
        </div>
        <Link href="/admin/farmers/new" className="px-5 py-2.5 bg-kumbil-primary text-white rounded-2xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-lg shadow-kumbil-primary/20">
          + Register Farmer
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {farmers.map((farmer) => {
          const crops = JSON.parse(farmer.crops || "[]");
          return (
            <div key={farmer.id} className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-full sm:w-40 h-40 rounded-[2rem] overflow-hidden flex-shrink-0 border-4 border-slate-50 shadow-inner group-hover:border-kumbil-primary/10 transition-colors">
                <img src={farmer.photo || ""} alt={farmer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-kumbil-primary transition-colors">{farmer.name}</h3>
                    <p className="text-sm font-bold text-kumbil-primary/80 uppercase tracking-widest">{farmer.farmName}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-tighter">
                    SINCE {farmer.since}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 mb-4 text-xs font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {farmer.village}, {farmer.region}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {crops.map((crop: string) => (
                    <span key={crop} className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase border border-emerald-100/50">
                      {crop}
                    </span>
                  ))}
                </div>

                <FarmerActions farmerId={farmer.id} farmerName={farmer.name} />
              </div>
            </div>
          );
        })}
      </div>

      {farmers.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="text-4xl mb-4">🚜</div>
          <h3 className="text-lg font-bold text-slate-900">No farmers found</h3>
          <p className="text-sm text-slate-500 mt-1">Register your first farmer partner</p>
        </div>
      )}
    </div>
  );
}
