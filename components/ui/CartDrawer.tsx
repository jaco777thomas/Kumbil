"use client";

import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-kumbil-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-kumbil-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-400 mb-6">
                Discover our premium products
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-xl bg-kumbil-primary text-white text-sm font-medium hover:bg-kumbil-primary-dark transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-50 transition-colors"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-kumbil-primary mt-0.5">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-kumbil-primary hover:text-kumbil-primary transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-slate-700 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-kumbil-primary hover:text-kumbil-primary transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Subtotal</span>
              <span className="text-lg font-bold text-slate-800">
                {formatPrice(total())}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Shipping calculated at checkout
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="px-4 py-3 rounded-xl border border-slate-200 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View Cart
              </Link>
              <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white text-sm font-semibold hover:shadow-lg hover:shadow-kumbil-primary/25 transition-all">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
