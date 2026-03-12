"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-tight px-4">
          <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Your cart is empty
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any products yet. Explore our
            collection of premium organic products.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-semibold shadow-lg shadow-kumbil-primary/20 hover:shadow-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 500 ? 0 : 49;
  const grandTotal = subtotal + shipping;

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 p-5 rounded-2xl bg-white shadow-soft hover:shadow-premium transition-all"
              >
                <Link
                  href={`/shop/${item.slug}`}
                  className="w-28 h-28 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-base font-semibold text-slate-800 hover:text-kumbil-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-slate-400 mt-0.5">
                        Unit Price: {formatPrice(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-10 h-9 flex items-center justify-center font-semibold text-sm text-slate-800 border-x border-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-bold text-kumbil-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-slate-400 hover:text-red-500 transition-colors mt-2"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl bg-white shadow-premium border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="font-medium text-slate-700">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-700">
                    {shipping === 0 ? (
                      <span className="text-kumbil-primary">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-kumbil-accent">
                    🎉 Add {formatPrice(500 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-slate-800">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-kumbil-primary">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 rounded-xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-semibold text-center shadow-lg shadow-kumbil-primary/20 hover:shadow-xl hover:shadow-kumbil-primary/30 hover:-translate-y-0.5 transition-all"
              >
                🔒 Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block text-center text-sm text-slate-500 hover:text-kumbil-primary mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
