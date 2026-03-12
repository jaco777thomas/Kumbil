import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";

dotenv.config();

function parseDbUrl(url: string) {
  try {
    const u = new URL(url);
    return { host: u.hostname, port: u.port ? parseInt(u.port) : 3306, user: u.username, password: decodeURIComponent(u.password), database: u.pathname.replace(/^\//, ""), };
  } catch {
    return { host: "localhost", port: 3306, user: "root", password: "Kumbil_DB_Strong2026", database: "kumbil_db", };
  }
}

const dbConfig = parseDbUrl(process.env.DATABASE_URL || "");
const adapter = new PrismaMariaDb(dbConfig);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('🌱 Bulk Migration & Seeding Started...')

  try {
    // 1. Clean data
    console.log('Cleaning data...')
    await prisma.review.deleteMany();
    await prisma.batch.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.farmer.deleteMany();
    await prisma.category.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.coupon.deleteMany();
    await prisma.customer.deleteMany();
    console.log('✅ All existing data cleared.')

    // 2. Admins
    console.log('Seeding Admins...')
    await prisma.admin.createMany({
      data: [
        { id: 'admin-1', name: 'Administrator', email: 'admin@kumbil.in', password: 'admin', role: 'superadmin' },
        { id: 'admin-2', name: 'Jacob Thomas', email: 'jacob@kumbil.in', password: 'password123', role: 'admin' },
      ]
    })

    // 3. Categories
    console.log('Seeding Categories...')
    await prisma.category.createMany({
      data: [
        { id: 'cat-1', name: 'Spices', slug: 'spices', description: "Hand-picked, stone-ground spices from Wayanad's organic farms", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop", subcategories: JSON.stringify(["Pepper", "Turmeric", "Ginger", "Garam Masala"]) },
        { id: 'cat-2', name: 'Coffee', slug: 'coffee', description: "Single-origin Arabica & Robusta from Wayanad hill estates", image: "https://images.unsplash.com/photo-1447933601403-56dc2df4be09?w=600&h=400&fit=crop", subcategories: JSON.stringify(["Bean", "Powder"]) },
        { id: 'cat-3', name: 'Traditional Items', slug: 'traditional-items', description: "Time-honoured Kerala ingredients for authentic cooking", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=400&fit=crop", subcategories: JSON.stringify(["Kudampuli", "Kuttam Puli", "Coconut Oil"]) },
        { id: 'cat-4', name: 'Rice', slug: 'rice', description: "Heritage Kerala rice varieties grown in paddy fields of Palakkad", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop", subcategories: JSON.stringify(["Kuthari", "Pachari", "Puttu Podi"]) },
        { id: 'cat-5', name: 'Snacks', slug: 'snacks', description: "Handmade Kerala snacks crafted with love and tradition", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop", subcategories: JSON.stringify(["Banana Chips", "Sweet Banana Chips", "Jaggery Chips", "Achappam", "Unniyappam"]) },
      ]
    })

    // 4. Farmers
    console.log('Seeding Farmers...')
    await prisma.farmer.createMany({
      data: [
        { id: 'farmer-1', name: 'Rajan Kutty', farmName: "Rajan's Hill Farm", village: 'Meppadi', region: 'Wayanad', since: 1998, crops: JSON.stringify(['Pepper', 'Coffee', 'Turmeric']), description: 'Third-generation spice farmer.', lat: 11.5619, lng: 76.1382 },
        { id: 'farmer-2', name: 'Lakshmi Amma', farmName: 'Lakshmi Organic Estate', village: 'Kalpetta', region: 'Wayanad', since: 2005, crops: JSON.stringify(['Ginger', 'Turmeric', 'Kudampuli']), description: 'Pioneer of women-led organic farming.', lat: 11.6086, lng: 76.0849 },
        { id: 'farmer-3', name: 'Thomas Varghese', farmName: 'Varghese Paddy Fields', village: 'Mannarkkad', region: 'Palakkad', since: 1990, crops: JSON.stringify(['Kuthari Rice', 'Pachari Rice']), description: 'Preserving heirloom rice varieties.' },
        { id: 'farmer-4', name: 'Suresh Menon', farmName: 'Menon Coconut Grove', village: 'Thrissur', region: 'Thrissur', since: 2001, crops: JSON.stringify(['Coconut Oil', 'Banana Chips']), description: 'Family-run coconut farm.' },
      ]
    })

    // 5. Customers
    console.log('Seeding Customers...')
    await prisma.customer.createMany({
      data: [
        { id: 'cust-1', name: "Jacob Thomas", email: "jacob@email.com", password: "password123", phone: "+91 98765 43210", location: "Kochi, Kerala", totalSpent: 18450, orderCount: 12 },
        { id: 'cust-2', name: "Mohammed Rashid", email: "rashid@email.com", password: "password123", phone: "+971 50 123 4567", location: "Dubai, UAE", totalSpent: 8200, orderCount: 4 },
        { id: 'cust-3', name: "Priya Krishnan", email: "priya@email.com", password: "password123", phone: "+91 99887 76655", location: "Bangalore, Karnataka", totalSpent: 4560, orderCount: 3 },
      ]
    })

    // 6. Products (Extracted from mock-data.ts)
    console.log('Seeding 17 products...')
    const productsData = [
      {
        id: "prod-1", name: "Wayanad Black Pepper", slug: "wayanad-black-pepper", categoryId: "cat-1", farmerId: "farmer-1", featured: true, image1: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&h=800&fit=crop", status: "published",
        variants: [
          { weight: "100g", price: 149, comparePrice: 199, stock: 200, sku: "BP-100" },
          { weight: "250g", price: 349, comparePrice: 449, stock: 150, sku: "BP-250" },
          { weight: "500g", price: 649, comparePrice: 849, stock: 80, sku: "BP-500" },
          { weight: "1kg", price: 1199, comparePrice: 1599, stock: 50, sku: "BP-1000" },
        ]
      },
      {
        id: "prod-2", name: "Kerala Turmeric Powder", slug: "kerala-turmeric-powder", categoryId: "cat-1", farmerId: "farmer-2", featured: true, image1: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=600&fit=crop", status: "published",
        variants: [
          { weight: "100g", price: 99, comparePrice: 139, stock: 300, sku: "TP-100" },
          { weight: "250g", price: 229, comparePrice: 299, stock: 200, sku: "TP-250" },
        ]
      },
      {
        id: "prod-3", name: "Organic Ginger Powder", slug: "organic-ginger-powder", categoryId: "cat-1", farmerId: "farmer-2", image1: "https://images.unsplash.com/photo-1589733429478-c430ed38ad6e?w=800&h=600&fit=crop", status: "published",
        variants: [{ weight: "100g", price: 119, stock: 180, sku: "GP-100" }]
      },
      {
        id: "prod-4", name: "Kumbil Garam Masala", slug: "kumbil-garam-masala", categoryId: "cat-1", farmerId: "farmer-1", featured: true, image1: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&h=600&fit=crop", status: "published",
        variants: [{ weight: "100g", price: 229, comparePrice: 279, stock: 180, sku: "GM-100" }]
      },
      {
        id: "prod-5", name: "Wayanad Coffee Beans", slug: "wayanad-coffee-beans", categoryId: "cat-2", farmerId: "farmer-1", featured: true, image1: "https://images.unsplash.com/photo-1447933601403-56dc2df4be09?w=800&h=600&fit=crop", status: "published",
        variants: [{ weight: "250g", price: 399, comparePrice: 499, stock: 120, sku: "CB-250" }]
      },
      { id: "prod-6", name: "Filter Coffee Powder", slug: "filter-coffee-powder", categoryId: "cat-2", farmerId: "farmer-1", image1: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "200g", price: 249, stock: 200, sku: "CP-200" }] },
      { id: "prod-7", name: "Malabar Kudampuli", slug: "malabar-kudampuli", categoryId: "cat-3", farmerId: "farmer-2", image1: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "250g", price: 199, stock: 200, sku: "KD-250" }] },
      { id: "prod-8", name: "Kuttam Puli (Kokum)", slug: "kuttam-puli", categoryId: "cat-3", farmerId: "farmer-2", image1: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "250g", price: 179, stock: 160, sku: "KP-250" }] },
      { id: "prod-9", name: "Cold-Pressed Coconut Oil", slug: "cold-pressed-coconut-oil", categoryId: "cat-3", farmerId: "farmer-4", featured: true, image1: "https://images.unsplash.com/photo-1610292040123-a2b476bb25e9?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "1L", price: 649, comparePrice: 849, stock: 100, sku: "CO-1000" }] },
      { id: "prod-10", name: "Kuthari Rice (Red Rice)", slug: "kuthari-red-rice", categoryId: "cat-4", farmerId: "farmer-3", featured: true, image1: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "5kg", price: 699, comparePrice: 899, stock: 120, sku: "KR-5000" }] },
      { id: "prod-11", name: "Pachari Rice (White Rice)", slug: "pachari-white-rice", categoryId: "cat-4", farmerId: "farmer-3", image1: "https://images.unsplash.com/photo-1594495894542-a46cc73e6ade?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "5kg", price: 599, stock: 150, sku: "PR-5000" }] },
      { id: "prod-12", name: "Puttu Podi", slug: "puttu-podi", categoryId: "cat-4", farmerId: "farmer-3", image1: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "1kg", price: 179, stock: 250, sku: "PP-1000" }] },
      { id: "prod-13", name: "Kerala Banana Chips", slug: "kerala-banana-chips", categoryId: "cat-5", farmerId: "farmer-4", featured: true, image1: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "250g", price: 159, comparePrice: 199, stock: 350, sku: "BC-250" }] },
      { id: "prod-14", name: "Sweet Banana Chips", slug: "sweet-banana-chips", categoryId: "cat-5", farmerId: "farmer-4", image1: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "250g", price: 189, stock: 200, sku: "SBC-250" }] },
      { id: "prod-15", name: "Jaggery Chips", slug: "jaggery-chips", categoryId: "cat-5", farmerId: "farmer-4", image1: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "400g", price: 269, stock: 150, sku: "JC-400" }] },
      { id: "prod-16", name: "Achappam", slug: "achappam", categoryId: "cat-5", farmerId: "farmer-4", image1: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "400g", price: 329, stock: 120, sku: "AC-400" }] },
      { id: "prod-17", name: "Unniyappam", slug: "unniyappam", categoryId: "cat-5", farmerId: "farmer-4", image1: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop", status: "published", variants: [{ weight: "500g (24 pcs)", price: 369, stock: 100, sku: "UN-500" }] },
    ]

    for (const prodData of productsData) {
      const { variants, ...others } = prodData;
      await prisma.product.create({
        data: {
          ...others,
          description: "Fresh and organic produce from Kerala.",
          variants: { create: variants }
        }
      })
    }
    console.log('✅ Seeding finished successfully')
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
