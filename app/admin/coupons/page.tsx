import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import CouponActions from "@/components/admin/CouponActions";

export const dynamic = "force-dynamic";

export default async function CouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Promotional Coupons</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage discount codes and promotional campaigns
          </p>
        </div>
        <Link 
          href="/admin/coupons/new"
          className="px-5 py-2.5 bg-kumbil-primary text-white rounded-2xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-lg shadow-kumbil-primary/20"
        >
          + Create Coupon
        </Link>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Coupons</div>
          <div className="text-2xl font-black text-slate-900">{coupons.filter(c => c.active).length}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Usages</div>
          <div className="text-2xl font-black text-slate-900">{coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0)}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Potential</div>
          <div className="text-2xl font-black text-emerald-600">{coupons.length} Types</div>
        </div>
      </div>

      {/* Coupon List */}
      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-premium w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Code</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Discount</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Conditions</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Usage</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Expiry</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-black tracking-widest uppercase">
                      {coupon.code}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-base font-black text-slate-900">
                      {coupon.type === "percentage" ? `${coupon.discount}%` : formatPrice(coupon.discount)}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {coupon.type} Discount
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-700">
                      Min: {formatPrice(coupon.minOrder)}
                    </div>
                    {coupon.maxDiscount && (
                      <div className="text-[10px] text-slate-400 font-medium">
                        Max off: {formatPrice(coupon.maxDiscount)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-kumbil-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${coupon.usageLimit > 0 ? (coupon.usageCount / coupon.usageLimit) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        {coupon.usageCount}{coupon.usageLimit > 0 ? `/${coupon.usageLimit}` : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-600">
                      {new Date(coupon.expiresAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      coupon.active 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-slate-50 text-slate-400 border border-slate-100"
                    }`}>
                      {coupon.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <CouponActions couponId={coupon.id} couponCode={coupon.code} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {coupons.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="text-4xl mb-4">🎟️</div>
          <h3 className="text-lg font-bold text-slate-900">No coupons found</h3>
          <p className="text-sm text-slate-500 mt-1">Create your first promotional code to get started</p>
          <Link 
            href="/admin/coupons/new"
            className="mt-6 inline-flex px-6 py-3 bg-kumbil-primary text-white rounded-2xl font-bold hover:bg-kumbil-primary-dark transition-all"
          >
            Create Coupon
          </Link>
        </div>
      )}
    </div>
  );
}
