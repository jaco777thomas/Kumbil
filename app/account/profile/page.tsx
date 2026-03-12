"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (data.session && data.session.role === "customer") {
          const profileRes = await fetch(`/api/customers/${data.session.id}`);
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            setFormData({
              name: profileData.name || "",
              email: profileData.email || "",
              phone: profileData.phone || "",
              location: profileData.location || "",
            });
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
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
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("Profile updated successfully!");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update profile");
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
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Profile</h1>
            <p className="text-slate-500 mt-1 font-medium">Update your account information and contact details.</p>
          </div>
          <Link href="/account" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-[3rem] shadow-soft border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-pink-50 text-pink-500 text-sm font-bold border border-pink-100 animate-shake">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                {success}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  disabled
                  className="w-full px-5 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed"
                  value={formData.email}
                />
                <p className="text-[10px] text-slate-400 mt-2 ml-1 font-medium italic">Email cannot be changed for security.</p>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
                  placeholder="+91 0000000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Primary Location</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-slate-900/10 hover:bg-kumbil-primary hover:shadow-kumbil-primary/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
