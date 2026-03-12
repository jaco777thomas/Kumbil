"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();

  const [address, setAddress] = useState<Address>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Kerala",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<{
    valid: boolean;
    discountAmount?: number;
    message?: string;
    code?: string;
  } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const subtotal = total();
  const shipping = subtotal >= 500 ? 0 : 49;
  const discount = couponResult?.valid ? (couponResult.discountAmount ?? 0) : 0;
  const grandTotal = subtotal + shipping - discount;

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Partial<Record<keyof Address, string>> = {};
    if (!address.name.trim()) errs.name = "Full name is required.";
    if (!address.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email))
      errs.email = "Enter a valid email.";
    if (!address.phone.trim()) errs.phone = "Phone is required.";
    else if (!/^\+?[0-9\s\-]{8,15}$/.test(address.phone))
      errs.phone = "Enter a valid phone number.";
    if (!address.address.trim()) errs.address = "Address is required.";
    if (!address.city.trim()) errs.city = "City is required.";
    if (!address.pincode.trim()) errs.pincode = "Pincode is required.";
    else if (!/^[0-9]{4,10}$/.test(address.pincode))
      errs.pincode = "Enter a valid pincode.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Coupon Apply ──────────────────────────────────────────────────────────

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), subtotal }),
      });
      const data = await res.json();
      setCouponResult(data);
    } catch {
      setCouponResult({ valid: false, message: "Could not validate coupon." });
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponResult(null);
    setCouponCode("");
  };

  // ── Submit Order ──────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        productName: item.name,
        slug: item.slug,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        variantWeight: item.variantWeight ?? null,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...address,
          items: orderItems,
          paymentMethod,
          couponCode: couponResult?.valid ? couponResult.code : null,
          subtotal,
          shipping,
          discount,
          total: grandTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.orderNumber) {
        throw new Error(data.error || "Order failed.");
      }

      clearCart();
      router.push(`/checkout/success/${data.orderNumber}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Field Helper ──────────────────────────────────────────────────────────

  const field = (
    key: keyof Address,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        type={type}
        value={address[key]}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, [key]: e.target.value }))
        }
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
          errors[key]
            ? "border-red-300 focus:ring-red-200 bg-red-50"
            : "border-slate-200 focus:ring-kumbil-primary/20 bg-white"
        }`}
      />
      {errors[key] && (
        <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
      )}
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh]">
        <div className="container-tight px-4">
          <div className="text-5xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Add some products before checking out.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-kumbil-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
            <Link href="/cart" className="hover:text-kumbil-primary transition-colors">Cart</Link>
            <span>›</span>
            <span className="text-slate-700 font-semibold">Checkout</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-10">
            {/* ── Left — Address Form ── */}
            <div className="lg:col-span-3 space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-soft p-8 border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-kumbil-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                  Shipping Address
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  {field("name", "Full Name", "text", "John Smith")}
                  {field("email", "Email Address", "email", "john@example.com")}
                  {field("phone", "Phone Number", "tel", "+91 98765 43210")}
                  <div className="sm:col-span-2">
                    {field("address", "Street Address", "text", "House No, Street, Area")}
                  </div>
                  {field("city", "City", "text", "Kochi")}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      State <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress((p) => ({ ...p, state: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 bg-white"
                    >
                      {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {field("pincode", "Pincode", "text", "682001")}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Country</label>
                    <select
                      value={address.country}
                      onChange={(e) => setAddress((p) => ({ ...p, country: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 bg-white"
                    >
                      <option>India</option>
                      <option>United Arab Emirates</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Australia</option>
                      <option>Canada</option>
                      <option>Singapore</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-soft p-8 border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-kumbil-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      value: "cod",
                      label: "Cash on Delivery",
                      desc: "Pay in cash when your order arrives.",
                      icon: "💵",
                    },
                    {
                      value: "razorpay",
                      label: "Pay Online (Razorpay)",
                      desc: "UPI, Cards, Net Banking, Wallets — secure & instant.",
                      icon: "💳",
                    },
                  ].map((pm) => (
                    <label
                      key={pm.value}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === pm.value
                          ? "border-kumbil-primary bg-kumbil-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.value}
                        checked={paymentMethod === pm.value}
                        onChange={() => setPaymentMethod(pm.value as "cod" | "razorpay")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          paymentMethod === pm.value
                            ? "border-kumbil-primary bg-kumbil-primary"
                            : "border-slate-300"
                        }`}
                      >
                        {paymentMethod === pm.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="text-2xl">{pm.icon}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{pm.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{pm.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === "razorpay" && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-700">
                    🔧 Razorpay integration is being set up. For now your order will be placed and our team will contact you with the payment link.
                  </div>
                )}
              </div>
            </div>

            {/* ── Right — Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-4">
                {/* Items */}
                <div className="bg-white rounded-3xl shadow-soft p-6 border border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 mb-5">
                    Order Summary
                    <span className="text-sm font-normal text-slate-400 ml-2">({items.length} items)</span>
                  </h2>

                  <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">{item.name}</div>
                          {item.variantWeight && (
                            <div className="text-xs text-slate-400">{item.variantWeight}</div>
                          )}
                          <div className="text-xs text-slate-400">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 mt-5 pt-5 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium text-slate-700">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Shipping</span>
                      <span className={`font-medium ${shipping === 0 ? "text-kumbil-primary" : "text-slate-700"}`}>
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600">Coupon Discount</span>
                        <span className="font-bold text-emerald-600">−{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-slate-100">
                      <span className="font-bold text-slate-800">Total</span>
                      <span className="text-xl font-extrabold text-kumbil-primary">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                <div className="bg-white rounded-3xl shadow-soft p-6 border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">🎟️ Apply Coupon</h3>
                  {!couponResult?.valid ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="COUPON CODE"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 uppercase"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-4 py-2.5 rounded-xl bg-kumbil-primary text-white text-sm font-bold hover:bg-kumbil-primary-dark transition-all disabled:opacity-50"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div>
                        <div className="text-xs font-bold text-emerald-700 uppercase">{couponResult.code}</div>
                        <div className="text-sm font-semibold text-emerald-800">{couponResult.message}</div>
                      </div>
                      <button type="button" onClick={removeCoupon} className="text-slate-400 hover:text-red-500 transition-colors text-lg leading-none">×</button>
                    </div>
                  )}
                  {couponResult && !couponResult.valid && (
                    <p className="text-red-500 text-xs mt-2">{couponResult.message}</p>
                  )}
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-bold text-base shadow-xl shadow-kumbil-primary/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    <>
                      🔒 Place Order — {formatPrice(grandTotal)}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  By placing an order you agree to our{" "}
                  <Link href="/about" className="underline hover:text-kumbil-primary">Terms &amp; Privacy</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
