"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/account");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-premium p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-3xl mb-4">
               <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
               </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join Kumbil</h1>
          <p className="text-slate-500 mt-2 font-medium">Create your account to start shopping</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-pink-50 text-pink-500 text-sm font-bold border border-pink-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary outline-none transition-all text-sm font-bold"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-kumbil-primary text-white rounded-[2rem] font-black text-sm tracking-widest uppercase shadow-xl shadow-kumbil-primary/20 hover:bg-kumbil-primary-dark transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : "Create Account"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-kumbil-primary font-black hover:underline cursor-pointer">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
