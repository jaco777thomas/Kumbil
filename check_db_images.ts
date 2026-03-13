import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  console.log("Categories:");
  categories.forEach(cat => {
    console.log(`- ${cat.name}: ${cat.image}`);
  });
  
  const products = await prisma.product.findMany({
    take: 10,
    select: { name: true, image1: true, featured: true, status: true }
  });
  console.log("\nProducts (subset):");
  products.forEach(p => {
    console.log(`- ${p.name}: [${p.status}] [Featured: ${p.featured}] ${p.image1}`);
  });
  
  await prisma.$disconnect();
}

main();
