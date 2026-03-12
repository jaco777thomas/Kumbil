"use client";

import { useState } from "react";
import { siteSettings } from "@/lib/mock-data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email Us",
      value: siteSettings.email,
      href: `mailto:${siteSettings.email}`,
    },
    {
      icon: "📞",
      label: "Call Us",
      value: siteSettings.phone,
      href: `tel:${siteSettings.phone}`,
    },
    {
      icon: "📍",
      label: "Our Address",
      value: siteSettings.address,
      href: "#",
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: "Chat with us directly",
      href: siteSettings.socials.whatsapp,
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-sm font-semibold mb-4">
            ✉️ Get in Touch
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Questions about our products, bulk orders, or farming partnerships?
            Our team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Left — Contact Info ── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-kumbil-primary rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-kumbil-accent/20 rounded-full -ml-16 -mb-16 blur-xl" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🌿</div>
                <h2 className="text-xl font-extrabold mb-2">Kumbil Organics</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Connecting Kerala&apos;s organic farmers to health-conscious customers worldwide.
                </p>

                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-white/20 transition-all">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white/50 uppercase tracking-wider">
                          {info.label}
                        </div>
                        <div className="text-sm font-semibold text-white group-hover:text-kumbil-accent transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex gap-3 mt-8 pt-8 border-t border-white/10">
                  {[
                    { icon: "📘", href: siteSettings.socials.facebook },
                    { icon: "📸", href: siteSettings.socials.instagram },
                    { icon: "🐦", href: siteSettings.socials.twitter },
                  ].map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-kumbil-secondary rounded-3xl p-6 border border-kumbil-accent/20">
              <h3 className="font-bold text-slate-800 mb-3">📦 Bulk / Wholesale Orders?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We offer special pricing for restaurants, hotels, and health stores.
                Mention &quot;bulk order&quot; in your message or call us directly.
              </p>
            </div>
          </div>

          {/* ── Right — Contact Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-7">Send a Message</h2>

              {status === "success" ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 rounded-xl bg-kumbil-primary text-white font-semibold hover:bg-kumbil-primary-dark transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rajan Thomas"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option>Product Enquiry</option>
                      <option>Bulk / Wholesale Order</option>
                      <option>Order Status</option>
                      <option>Farming Partnership</option>
                      <option>Return or Refund</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-bold shadow-lg shadow-kumbil-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:transform-none"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
