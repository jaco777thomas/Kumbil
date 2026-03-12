"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface CouponFormData {
  code: string;
  type: "percentage" | "fixed";
  discount: string;
  minOrder: string;
  maxDiscount: string;
  usageLimit: string;
  expiresAt: string;
  active: boolean;
}

function CouponForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!editId);
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    type: "percentage",
    discount: "",
    minOrder: "0",
    maxDiscount: "",
    usageLimit: "0",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    active: true,
  });

  useEffect(() => {
    if (editId) {
      const fetchCoupon = async () => {
        try {
          const res = await fetch(`/api/coupons/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              code: data.code || "",
              type: data.type || "percentage",
              discount: data.discount?.toString() || "",
              minOrder: data.minOrder?.toString() || "0",
              maxDiscount: data.maxDiscount?.toString() || "",
              usageLimit: data.usageLimit?.toString() || "0",
              expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString().split('T')[0] : "",
              active: data.active !== undefined ? data.active : true,
            });
          }
        } catch (err) {
          console.error("Failed to fetch coupon:", err);
        } finally {
          setFetching(false);
        }
      };
      fetchCoupon();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editId ? `/api/coupons/${editId}` : "/api/coupons";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/coupons");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || `Failed to ${editId ? "update" : "create"} coupon`);
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center font-bold text-slate-400">Loading coupon details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Coupon" : "Create New Coupon"}</h1>
          <p className="text-sm text-slate-500">{editId ? "Update promotional campaign details" : "Add a new discount code for your customers"}</p>
        </div>
        <Link href="/admin/coupons" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-[2.5rem] shadow-soft border border-slate-100 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Coupon Code</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-black tracking-widest uppercase"
                  placeholder="E.G. WELCOME10"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Discount Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["percentage", "fixed"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t as any })}
                      className={`px-4 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                        formData.type === t
                          ? "border-kumbil-primary bg-kumbil-primary/5 text-kumbil-primary"
                          : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {formData.type === "percentage" ? "Discount Percentage (%)" : "Fixed Amount (₹)"}
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold"
                  placeholder={formData.type === "percentage" ? "e.g. 10" : "e.g. 100"}
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Min Order (₹)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold"
                    placeholder="0"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Max Off (₹)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold"
                    placeholder="Unlimited"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Usage Limit</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold"
                  placeholder="0 for unlimited"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Expiry Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, active: !formData.active })}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  formData.active ? "bg-emerald-500" : "bg-slate-200"
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  formData.active ? "left-7" : "left-1"
                }`} />
              </button>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {formData.active ? "Status: Active" : "Status: Disabled"}
              </span>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-kumbil-primary text-white rounded-2xl font-black shadow-xl shadow-kumbil-primary/20 hover:bg-kumbil-primary-dark transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : editId ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CouponPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-slate-400">Loading form...</div>}>
      <CouponForm />
    </Suspense>
  );
}
