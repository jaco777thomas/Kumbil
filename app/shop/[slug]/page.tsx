import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";
import { Suspense } from "react";

type Params = { params: Promise<{ slug: string }> };

async function ProductDetailContent({ params }: Params) {
  const { slug } = await params;

  // 1. Fetch Product with all relations
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      status: "published",
    },
    include: {
      category: true,
      variants: true,
      farmer: true,
    },
  });

  if (!product) notFound();

  // 2. Fetch Related Products (same category)
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: "published",
    },
    take: 4,
    include: {
      variants: true,
      category: true,
    }
  });

  return (
    <ProductDetailsClient 
      product={product as any} 
      relatedProducts={relatedProducts as any} 
    />
  );
}

export default function ProductDetailPage(props: Params) {
  return (
    <Suspense fallback={<div className="pt-40 text-center font-bold text-slate-400">Loading product details...</div>}>
      <ProductDetailContent {...props} />
    </Suspense>
  );
}
