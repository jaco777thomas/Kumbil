import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { customerId: session.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
            <p className="text-slate-500 mt-1 font-medium">Review all your past and current orders.</p>
          </div>
          <Link href="/account" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft group hover:border-kumbil-primary/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-kumbil-primary/5 group-hover:text-kumbil-primary transition-all">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-slate-900 tracking-wide uppercase">{order.orderNumber}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.status === "delivered" ? "bg-emerald-50 text-emerald-600" : 
                          order.status === "cancelled" ? "bg-pink-50 text-pink-500" :
                          "bg-amber-50 text-amber-600"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-400 mt-1 flex items-center gap-2">
                        <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span>{order.paymentMethod?.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-10 md:text-right">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</div>
                      <div className="text-xl font-black text-slate-900">{formatPrice(order.total)}</div>
                    </div>
                    <Link 
                      href={`/account/orders/${order.id}`}
                      className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black tracking-widest uppercase hover:bg-kumbil-primary transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-[3rem] border border-dashed border-slate-200 text-center">
              <div className="text-5xl mb-6">🏜️</div>
              <h3 className="text-xl font-bold text-slate-900">No orders found</h3>
              <p className="text-slate-500 mt-2">You haven't placed any orders yet. Explore our shop to find something you love!</p>
              <Link href="/shop" className="mt-8 inline-flex px-8 py-4 bg-kumbil-primary text-white rounded-2xl font-black tracking-widest uppercase shadow-xl shadow-kumbil-primary/20 hover:bg-kumbil-primary-dark transition-all">Start Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
