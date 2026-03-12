"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlist";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { items, clearAll } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-28 pb-20 min-h-[60vh]">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-slate-200 rounded mb-4" />
            <div className="h-4 w-64 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="pt-28 pb-20 min-h-[70vh]">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-500 text-sm font-medium mb-4">
              ❤️ My Favorites
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-slate-500">
              Save the products you love for later
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={clearAll}
              className="px-6 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Clear All Items
            </button>
          )}
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-6">🌿</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Your wishlist is lonely
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              Explore our premium organic collection and save your favorites here.
            </p>
            <Link
              href="/shop"
              className="px-8 py-4 rounded-2xl bg-kumbil-primary text-white font-semibold shadow-xl shadow-kumbil-primary/20 hover:scale-105 transition-all inline-block"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
