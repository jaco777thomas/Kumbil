"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: any; // Using any for Prisma return type with includes
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Get price from variants
  const variants = product.variants || [];
  const price = variants.length > 0 ? Math.min(...variants.map((v: any) => v.price)) : 0;
  const comparePrice = variants.length > 0 ? Math.max(...variants.map((v: any) => v.comparePrice || 0)) : 0;

  const discount = comparePrice > price
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstVariant = variants[0];
    if (!firstVariant) return;

    addItem({
      id: `${product.id}-${firstVariant.weight}`,
      productId: product.id,
      name: product.name,
      price: firstVariant.price,
      image: product.image1,
      slug: product.slug,
      variant: firstVariant.weight,
    });
    openCart();
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block product-card-shine"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 hover-lift">
        {/* Image Container */}
        <div className="relative aspect-square bg-slate-50">
          {product.image1 && (
            <Image
              src={product.image1}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-[2]">
            {discount > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold shadow-lg">
                -{discount}%
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 rounded-lg bg-kumbil-accent text-white text-xs font-bold shadow-lg">
                Featured
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 right-3 z-[2] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-xl bg-kumbil-primary text-white flex items-center justify-center shadow-lg shadow-kumbil-primary/30 hover:bg-kumbil-primary-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] font-bold text-kumbil-primary/70 uppercase tracking-widest mb-1 truncate">
            {product.category?.name || "Product"}
          </p>
          <h3 className="text-sm font-bold text-slate-800 group-hover:text-kumbil-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-black text-kumbil-primary">
              {formatPrice(price)}
            </span>
            {comparePrice > price && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
