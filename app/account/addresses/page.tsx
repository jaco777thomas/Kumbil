"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddressesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (data.session && data.session.role === "customer") {
          const profileRes = await fetch(`/api/customers/${data.session.id}`);
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setAddress(profileData.location || "");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        setError("Failed to load address data.");
      } finally {
        setFetching(false);
      }
    };

    fetchAddress();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: address }),
      });

      if (res.ok) {
        setSuccess("Primary address updated successfully!");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update address");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-3 border-kumbil-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Delivery Addresses</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage your shipping and billing addresses for faster checkout.</p>
          </div>
          <Link href="/account" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {/* Primary Address Card */}
          <div className="bg-white rounded-[3rem] shadow-soft border border-slate-100 overflow-hidden">
             <div className="p-10">
                <div className="flex items-start justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-kumbil-primary/10 rounded-2xl flex items-center justify-center text-kumbil-primary">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-slate-900">Primary Delivery Address</h3>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">Default</span>
                         </div>
                      </div>
                   </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-2xl bg-pink-50 text-pink-500 text-sm font-bold border border-pink-100">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                      {success}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Address Details</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
                      placeholder="Street name, House/Apartment number, City, State, PIN Code"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-kumbil-primary transition-all active:scale-95 disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Update Address"}
                    </button>
                  </div>
                </form>
             </div>
          </div>

          <div className="bg-slate-100 p-8 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
             <div className="text-2xl mb-2">➕</div>
             <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Adding more addresses coming soon</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
