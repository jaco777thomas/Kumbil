import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

type Params = { params: Promise<{ orderNumber: string }> };

export default async function OrderSuccessPage({ params }: Params) {
  const { orderNumber } = await params;

  const order = await prisma.order.findFirst({
    where: { orderNumber },
  });

  if (!order) {
    notFound();
  }

  let items: {
    productId: string;
    productName: string;
    slug: string;
    image: string;
    price: number;
    quantity: number;
    variantWeight?: string | null;
  }[] = [];

  try {
    items = JSON.parse(order.items);
  } catch {
    items = [];
  }

  const estimatedDate = new Date(order.createdAt);
  estimatedDate.setDate(estimatedDate.getDate() + 7);
  const formattedEstimate = estimatedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
            <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            🎉 Order Placed Successfully!
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Thank you, {order.customerName.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Your order has been received and is being processed. We&apos;ll send a confirmation to{" "}
            <strong className="text-slate-700">{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden mb-6">
          {/* Order Meta */}
          <div className="px-8 py-6 border-b border-slate-100 grid sm:grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Order Number</div>
              <div className="font-mono font-bold text-kumbil-primary text-sm">{order.orderNumber}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Payment</div>
              <div className="font-semibold text-slate-800 text-sm capitalize">
                {order.paymentMethod === "cod" ? "💵 Cash on Delivery" : "💳 Online Payment"}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Status</div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {order.status}
              </span>
            </div>
          </div>

          {/* Items List */}
          <div className="px-8 py-6">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate">
                      {item.productName}
                    </div>
                    {item.variantWeight && (
                      <div className="text-xs text-slate-400">{item.variantWeight}</div>
                    )}
                    <div className="text-xs text-slate-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-slate-100 mt-6 pt-5 flex justify-between items-center">
              <span className="font-bold text-slate-800">Order Total</span>
              <span className="text-xl font-extrabold text-kumbil-primary">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-kumbil-secondary rounded-3xl p-6 border border-kumbil-accent/20 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-3xl">📦</div>
            <div>
              <div className="text-sm font-bold text-slate-800">Estimated Delivery</div>
              <div className="text-kumbil-primary font-extrabold text-lg">{formattedEstimate}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                We&apos;ll send you a tracking notification once your order ships.
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-4 rounded-2xl bg-kumbil-primary text-white font-semibold text-center shadow-lg shadow-kumbil-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/track"
            className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-center hover:border-kumbil-primary hover:text-kumbil-primary transition-all"
          >
            Track Your Batch Origin
          </Link>
        </div>
      </div>
    </div>
  );
}
