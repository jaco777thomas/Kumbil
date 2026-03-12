"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlist";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailsClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addItem, openCart } = useCartStore();
  const { hasItem, toggleItem } = useWishlistStore();

  const [activeImage, setActiveImage] = useState(product.image1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || { weight: "N/A", price: 0, stock: 0 });
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(hasItem(product.id));
  }, [product.id, hasItem]);

  const images = [product.image1, product.image2, product.image3].filter(Boolean) as string[];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant.weight}`,
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.image1,
      slug: product.slug,
      variant: selectedVariant.weight,
    }, quantity);
    openCart();
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-kumbil-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-kumbil-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-soft relative">
              <img
                src={activeImage || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  toggleItem(product.id);
                  setIsWishlisted(!isWishlisted);
                }}
                className={`absolute top-6 right-6 p-3 rounded-full transition-all shadow-lg ${
                  isWishlisted
                    ? "bg-pink-500 text-white"
                    : "bg-white/80 backdrop-blur-sm text-slate-400 hover:text-pink-500"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill={isWishlisted ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? "border-kumbil-primary shadow-md" : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-kumbil-primary/10 text-kumbil-primary text-xs font-bold uppercase tracking-wider">
                  Organic
                </span>
                <Link
                  href="/track"
                  className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  🏷️ Traceability Ready
                </Link>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 font-display tracking-tight">
                {product.name}
              </h1>
              <div className="text-sm text-slate-400">
                {product.category?.name}
              </div>
            </div>

            <div className="text-3xl font-extrabold text-kumbil-primary mb-8">
              {formatPrice(selectedVariant.price)}
              {selectedVariant.comparePrice && (
                <span className="text-lg font-medium text-slate-400 line-through ml-3">
                  {formatPrice(selectedVariant.comparePrice)}
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="mb-8">
              <div className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">
                Select Weight:
              </div>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v: any) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                      selectedVariant.weight === v.weight
                        ? "border-kumbil-primary bg-kumbil-primary/5 text-kumbil-primary shadow-sm scale-105"
                        : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap gap-4 mb-10 pt-8 border-t border-slate-50">
              <div className="flex items-center bg-slate-50 rounded-2xl p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors font-bold"
                >
                   −
                </button>
                <div className="w-12 text-center font-black text-slate-800">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 rounded-3xl bg-kumbil-primary text-white font-black uppercase tracking-widest shadow-xl shadow-kumbil-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all min-w-[200px]"
              >
                Add to Cart
              </button>
            </div>

            {/* Farm Highlight */}
            {product.farmer && (
              <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                    <img
                      src={product.farmer.photo || "/farmer-placeholder.jpg"}
                      alt={product.farmer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest">Grown by</div>
                    <div className="text-sm font-bold text-slate-800 leading-none mb-1">{product.farmer.name}</div>
                    <div className="text-xs text-slate-500">{product.farmer.farmName}, {product.farmer.village}</div>
                  </div>
                  <Link
                    href={`/track`}
                    className="ml-auto p-3 rounded-2xl bg-white text-slate-300 hover:text-kumbil-primary shadow-sm hover:shadow-md transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Product Details</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
            <p className="mb-6">{product.longDescription || product.description}</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
               {[
                  { label: "Origin", value: "Kerala, India", icon: "🇮🇳" },
                  { label: "Purity", value: "100% Organic", icon: "🌱" },
                  { label: "Processing", value: "Heritage House Methods", icon: "🏠" },
                  { label: "Certifications", value: "FSSAI Certified", icon: "📜" },
                ].map(info => (
                  <div key={info.label} className="p-6 rounded-3xl bg-white shadow-soft border border-slate-50 text-center">
                    <div className="text-2xl mb-2">{info.icon}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-sm font-bold text-slate-800">{info.value}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-20 border-t border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">You May Also Like</h2>
              <Link href="/shop" className="text-sm font-bold text-kumbil-primary hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
