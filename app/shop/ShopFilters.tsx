"use client";

import { useRouter } from "next/navigation";

interface ShopFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  activeCategory: string;
  activeSort: string;
  activePrice: string;
}

export default function ShopFilters({ categories, activeCategory, activeSort, activePrice }: ShopFiltersProps) {
  const router = useRouter();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-10 p-5 rounded-3xl bg-white shadow-soft border border-slate-100">
      {/* Category chips */}
      <div className="flex flex-wrap gap-2 flex-1">
        <button
          onClick={() => updateFilters("category", "all")}
          className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeCategory === "all"
              ? "bg-kumbil-primary text-white shadow-lg shadow-kumbil-primary/20 scale-105"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters("category", cat.slug)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
              activeCategory === cat.slug
                ? "bg-kumbil-primary text-white shadow-lg shadow-kumbil-primary/20 scale-105"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sort & Price */}
      <div className="flex gap-3 w-full lg:w-auto">
        <select
          value={activePrice}
          onChange={(e) => updateFilters("price", e.target.value)}
          className="flex-1 lg:w-40 px-4 py-2.5 rounded-2xl bg-slate-50 text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-kumbil-primary/20 cursor-pointer appearance-none"
        >
          <option value="all">All Prices</option>
          <option value="0-300">Under ₹300</option>
          <option value="300-600">₹300 - ₹600</option>
          <option value="600-1000">₹600 - ₹1000</option>
          <option value="1000-99999">Above ₹1000</option>
        </select>
        <select
          value={activeSort}
          onChange={(e) => updateFilters("sort", e.target.value)}
          className="flex-1 lg:w-44 px-4 py-2.5 rounded-2xl bg-slate-50 text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-kumbil-primary/20 cursor-pointer appearance-none"
        >
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
}
