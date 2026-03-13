"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getBatchByNumber, getFarmerById, getProductById } from "@/lib/mock-data";

type TrackingType = "origin" | "status";

function TrackContent() {
  const searchParams = useSearchParams();
  const [trackingType, setTrackingType] = useState<TrackingType>("status");
  const [inputVal, setInputVal] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const orderNum = searchParams.get("order");
    if (orderNum) {
      setTrackingType("status");
      setInputVal(orderNum);
    }
  }, [searchParams]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setLoading(true);
    setError("");
    setResultData(null);

    if (trackingType === "origin") {
      const batch = getBatchByNumber(inputVal.trim());
      if (batch) {
        const product = getProductById(batch.productId);
        const farmer = getFarmerById(batch.farmerId);
        setResultData({ type: "origin", data: { ...batch, product, farmer } });
      } else {
        setError("Batch ID not found. Please check the code on your product packaging.");
      }
      setLoading(false);
    } else {
      if (!email.trim()) {
        setError("Please enter your email address used during purchase.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/track/${inputVal.trim()}?email=${email.trim()}`);
        const data = await res.json();

        if (res.ok) {
          setResultData({ type: "status", data });
        } else {
          setError(data.error || "Order not found or unauthorized access.");
        }
      } catch (err) {
        setError("Failed to fetch order status. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-xs font-black uppercase tracking-widest mb-4">
          🔍 Tracking & Traceability
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
          Follow Your Food's Journey
        </h1>
        <p className="text-slate-500 font-medium">
          Enter your Order Number to see its current status, or your Batch ID to trace it back to the farm.
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="max-w-md mx-auto mb-10 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100 flex gap-1">
        <button
          onClick={() => { setTrackingType("status"); setResultData(null); setError(""); }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            trackingType === "status" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Track Order Status
        </button>
        <button
          onClick={() => { setTrackingType("origin"); setResultData(null); setError(""); }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            trackingType === "origin" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          Trace Food Origin
        </button>
      </div>

      <div className="max-w-xl mx-auto mb-16">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="relative group">
            <input
              type="text"
              placeholder={trackingType === "status" ? "Enter Order Number (e.g., KB-L8...)" : "Enter Batch ID (e.g., KB-WP-101)"}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-6 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary transition-all font-bold text-sm"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-kumbil-primary transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          {trackingType === "status" && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 rounded-3xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-kumbil-primary/10 focus:border-kumbil-primary transition-all font-bold text-sm"
              required={trackingType === "status"}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-3xl bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 hover:bg-kumbil-primary hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Start Tracking"}
          </button>
        </form>
        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-pink-50 text-pink-500 text-sm font-bold border border-pink-100 animate-shake text-center">
            {error}
          </div>
        )}
      </div>

      {/* Results for Order Status */}
      {resultData?.type === "status" && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white rounded-[3rem] p-10 shadow-soft border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                resultData.data.status === "delivered" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {resultData.data.status}
              </span>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Order Status</h3>
              <h4 className="text-3xl font-black text-slate-900 tracking-tight">{resultData.data.orderNumber}</h4>
              <p className="text-slate-500 mt-1 font-medium italic">Placed on {new Date(resultData.data.createdAt).toLocaleDateString()} for {resultData.data.customerName}</p>
            </div>

            <div className="relative pt-8 mt-8 border-t border-slate-50">
              <div className="space-y-10">
                {[
                  { status: "pending", label: "Order Received", sub: "We've received your order", icon: "📝" },
                  { status: "processing", label: "Processing", sub: "Currently being prepared", icon: "🌱" },
                  { status: "shipped", label: "Out for Delivery", sub: "On its way to you", icon: "🚚" },
                  { status: "delivered", label: "Delivered", sub: "Order completed", icon: "✨" },
                ].map((step, i, arr) => {
                  const statusOrder = ["pending", "processing", "shipped", "delivered"];
                  const currentIdx = statusOrder.indexOf(resultData.data.status);
                  const isCompleted = i <= currentIdx;
                  const isCurrent = i === currentIdx;

                  return (
                    <div key={step.status} className="flex gap-6 relative">
                      {i !== arr.length - 1 && (
                        <div className={`absolute left-4 top-10 bottom-[-24px] w-0.5 ${isCompleted && i < currentIdx ? "bg-kumbil-primary" : "bg-slate-100"}`} />
                      )}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm z-10 border-2 transition-all duration-500 shadow-sm ${
                        isCurrent ? "bg-kumbil-primary border-kumbil-primary scale-110" : isCompleted ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-100"
                      }`}>
                        {isCompleted ? "✓" : step.icon}
                      </div>
                      <div className={isCompleted ? "opacity-100" : "opacity-40"}>
                        <h5 className="font-black text-slate-900 leading-none mb-1">{step.label}</h5>
                        <p className="text-xs text-slate-500 font-medium">{step.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
               <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                  <div className="text-2xl font-black text-slate-900">₹{resultData.data.total}</div>
               </div>
               <Link href="/account/orders" className="px-6 py-3 rounded-xl bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  View Order Details
               </Link>
            </div>
          </div>
        </div>
      )}

      {/* Results for Trace Origin */}
      {resultData?.type === "origin" && (
        <div className="max-w-4xl mx-auto animate-fade-in">
           <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft">
                <div className="flex items-center gap-6 mb-8">
                  <img
                    src={resultData.data.product?.image1}
                    alt={resultData.data.product?.name}
                    className="w-24 h-24 rounded-[2rem] object-cover shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {resultData.data.product?.name}
                    </h2>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">
                      Batch No: <span className="text-kumbil-primary">{resultData.data.batchNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Harvest Date</div>
                    <div className="text-slate-900 font-black">{resultData.data.harvestDate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Quality Score</div>
                    <div className="text-kumbil-primary font-black flex items-center gap-2">
                      9.8 / 10
                      <span className="text-[8px] bg-kumbil-primary text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Premium</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 italic text-slate-500 font-medium text-sm leading-relaxed">
                  &quot;{resultData.data.qualityReport}&quot;
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft">
                <h3 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Farm-to-Door Journey</h3>
                <div className="space-y-10 relative">
                  <div className="absolute top-0 bottom-0 left-[17px] w-0.5 bg-slate-50" />
                  {[
                    { status: "Harvested", date: resultData.data.harvestDate, loc: `${resultData.data.farmer?.village}, ${resultData.data.farmer?.region}`, icon: "🌱" },
                    { status: "Quality Checked", date: "2 days after", loc: "Quality Lab, Wayanad", icon: "🔬" },
                    { status: "Eco-Packed", date: "3 days after", loc: "Wayanad Eco-Hub", icon: "📦" },
                    { status: "Global Transit", date: "Ongoing", loc: "Logistics Center", icon: "✈️" },
                  ].map((step) => (
                    <div key={step.status} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-white border-2 border-kumbil-primary flex items-center justify-center text-sm z-10 shadow-sm">
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-black text-slate-900">{step.status}</h4>
                          <span className="text-[10px] font-black text-kumbil-primary uppercase tracking-widest">{step.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{step.loc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft sticky top-32 text-center">
                <img
                  src={resultData.data.farmer?.photo}
                  alt={resultData.data.farmer?.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl"
                />
                <h3 className="text-xl font-black text-slate-900">{resultData.data.farmer?.name}</h3>
                <div className="text-[10px] text-kumbil-primary font-black uppercase tracking-widest mt-1 mb-6">Master Farmer</div>
                
                <div className="text-left space-y-4 py-6 border-y border-slate-50">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Farm Name</div>
                    <div className="text-sm font-black text-slate-800">{resultData.data.farmer?.farmName}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Region</div>
                    <div className="text-sm font-black text-slate-800">{resultData.data.farmer?.village}, {resultData.data.farmer?.region}</div>
                  </div>
                </div>

                <Link
                  href={`/shop?farmer=${resultData.data.farmer?.id}`}
                  className="block w-full py-4 mt-8 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-kumbil-primary transition-all"
                >
                  All farmer Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {!resultData && !error && (
        <div className="max-w-2xl mx-auto rounded-[3rem] bg-white p-12 text-center border border-slate-100 shadow-sm group">
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">🏷️</div>
          <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Ready to Trace Your Order?</h3>
          <p className="text-slate-400 text-sm font-medium">
            Find your unique ID in your confirmation email or on the product packaging.
          </p>
        </div>
      )}
    </>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kumbil-primary"></div>
          </div>
        }>
          <TrackContent />
        </Suspense>
      </div>
    </div>
  );
}
