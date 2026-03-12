import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    redirect("/login");
  }

  const [customer, orders, coupons] = await Promise.all([
    prisma.customer.findUnique({
      where: { id: session.id },
    }),
    prisma.order.findMany({
      where: { customerEmail: session.email },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.coupon.findMany({
      where: { active: true, expiresAt: { gt: new Date() } },
      take: 3,
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Account
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Howdy, {customer?.name}!</h1>
            <p className="text-slate-500 mt-2 font-medium">Welcome to your personal Kumbil dashboard.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Spent</div>
              <div className="text-2xl font-black text-slate-900">{formatPrice(customer?.totalSpent || 0)}</div>
            </div>
            <div className="w-px h-10 bg-slate-100 hidden md:block" />
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Orders</div>
              <div className="text-2xl font-black text-slate-900">{customer?.orderCount || 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Orders & History */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm font-bold text-kumbil-primary hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft flex items-center justify-between group hover:border-kumbil-primary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-kumbil-primary/5 group-hover:text-kumbil-primary transition-all">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 uppercase tracking-wider">{order.orderNumber}</div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">{formatPrice(order.total)}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                        order.status === "delivered" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-200 text-center">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-lg font-bold text-slate-900">No orders yet</h3>
                  <p className="text-sm text-slate-500 mt-1">When you shop, your orders will appear here.</p>
                  <Link href="/shop" className="mt-6 inline-flex px-6 py-3 bg-kumbil-primary text-white rounded-2xl font-bold hover:bg-kumbil-primary-dark transition-all">Start Shopping</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Profile & Extras */}
        <div className="space-y-10">
          {/* Active Coupons */}
          <section>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Available Offers</h2>
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="relative overflow-hidden bg-gradient-to-br from-kumbil-primary to-kumbil-primary-dark p-6 rounded-[2.5rem] text-white shadow-xl shadow-kumbil-primary/20">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Special Discount</div>
                    <div className="text-3xl font-black mb-1">
                      {coupon.type === "percentage" ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                    </div>
                    <div className="text-[10px] font-bold opacity-80 uppercase tracking-tight">On orders over {formatPrice(coupon.minOrder)}</div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="px-3 py-1 rounded-lg bg-white/20 text-xs font-black tracking-widest">
                        {coupon.code}
                      </div>
                      <button className="text-[10px] font-black uppercase tracking-widest hover:underline">Copy Code</button>
                    </div>
                  </div>
                  {/* Decorative Circle */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                </div>
              ))}
              
              {coupons.length === 0 && (
                <div className="p-6 rounded-3xl bg-slate-100 text-center text-slate-400 font-bold text-sm">
                  Check back soon for new offers!
                </div>
              )}
            </div>
          </section>

          {/* Account Settings Quick Links */}
          <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft">
            <h3 className="text-lg font-black text-slate-900 mb-6">Account Settings</h3>
            <div className="space-y-2">
              <Link href="/account/profile" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-kumbil-primary font-bold transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Info
              </Link>
              <Link href="/account/addresses" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-kumbil-primary font-bold transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Addresses
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-pink-50 text-slate-600 hover:text-pink-500 font-bold transition-all mt-4 border-t border-slate-50 pt-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
