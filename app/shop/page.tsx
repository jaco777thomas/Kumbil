import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ui/ProductCard";
import ShopFilters from "./ShopFilters";

export const dynamic = "force-dynamic";

type SearchParams = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    price?: string;
  }>;
};

async function ShopContent({ searchParams }: SearchParams) {
  const { category, sort, price } = await searchParams;

  // 1. Fetch Categories for the filter bar
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // 2. Build Prisma Query
  const where: any = { status: "published" };

  if (category && category !== "all") {
    // Attempt to match by slug or ID
    where.category = {
      OR: [
        { slug: category },
        { id: category }
      ]
    };
  }

  if (price && price !== "all") {
    const [min, max] = price.split("-").map(Number);
    where.variants = {
      some: {
        price: {
          gte: min,
          ...(max ? { lte: max } : {}),
        },
      },
    };
  }

  let orderBy: any = { featured: "desc" as const };
  if (sort === "price-low") orderBy = { variants: { _count: "asc" } }; // Simplified, real price sort is harder with variants
  if (sort === "price-high") orderBy = { variants: { _count: "desc" } };
  if (sort === "name") orderBy = { name: "asc" as const };

  // 3. Fetch Products
  const products = await prisma.product.findMany({
    where,
    include: {
      variants: true,
      category: true,
    },
    orderBy,
  });

  // Prisma doesn't easily sort by "min price of variants" in a single query without raw SQL or computed fields.
  // We'll do a simple in-memory sort for price if needed, or stick to this for now.
  let displayProducts = [...products];
  if (sort === "price-low") {
    displayProducts.sort((a, b) => {
      const minA = Math.min(...a.variants.map(v => v.price));
      const minB = Math.min(...b.variants.map(v => v.price));
      return minA - minB;
    });
  } else if (sort === "price-high") {
    displayProducts.sort((a, b) => {
      const minA = Math.min(...a.variants.map(v => v.price));
      const minB = Math.min(...b.variants.map(v => v.price));
      return minB - minA;
    });
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-display tracking-tight">
            Our Products
          </h1>
          <p className="text-slate-500 font-medium">
            {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filters Bar (Client Component) */}
        <ShopFilters 
          categories={categories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}
          activeCategory={category ?? "all"}
          activeSort={sort ?? "featured"}
          activePrice={price ?? "all"}
        />

        {/* Product Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any products matching those filters.</p>
          </div>
        ) }
      </div>
    </div>
  );
}

export default function ShopPage(props: SearchParams) {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-bold text-slate-400">Loading our catalog...</div>}>
      <ShopContent {...props} />
    </Suspense>
  );
}
