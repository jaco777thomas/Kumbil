// ─── Site Settings ────────────────────────────────────

export const siteSettings = {
  siteName: "Kumbil",
  tagline: "Eat For Health",
  description:
    "Premium organic agricultural marketplace connecting Kerala farmers to global health-conscious customers.",
  phone: "+91 484 234 5678",
  email: "info@kumbil.in",
  address: "Wayanad, Kerala, India — 673 121",
  socials: {
    instagram: "https://instagram.com/kumbil",
    facebook: "https://facebook.com/kumbil",
    twitter: "https://twitter.com/kumbil",
    whatsapp: "https://wa.me/914842345678",
  },
  certifications: ["FSSAI", "India Organic", "ISO 22000", "USDA Organic"],
};

// ─── Categories ──────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Spices",
    slug: "spices",
    description: "Hand-picked, stone-ground spices from Wayanad's organic farms",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop",
    productCount: 4,
    subcategories: ["Pepper", "Turmeric", "Ginger", "Garam Masala"],
  },
  {
    id: "cat-2",
    name: "Coffee",
    slug: "coffee",
    description: "Single-origin Arabica & Robusta from Wayanad hill estates",
    image: "https://images.unsplash.com/photo-1447933601403-56dc2df4be09?w=600&h=400&fit=crop",
    productCount: 2,
    subcategories: ["Bean", "Powder"],
  },
  {
    id: "cat-3",
    name: "Traditional Items",
    slug: "traditional-items",
    description: "Time-honoured Kerala ingredients for authentic cooking",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&h=400&fit=crop",
    productCount: 3,
    subcategories: ["Kudampuli", "Kuttam Puli", "Coconut Oil"],
  },
  {
    id: "cat-4",
    name: "Rice",
    slug: "rice",
    description: "Heritage Kerala rice varieties grown in paddy fields of Palakkad",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop",
    productCount: 3,
    subcategories: ["Kuthari", "Pachari", "Puttu Podi"],
  },
  {
    id: "cat-5",
    name: "Snacks",
    slug: "snacks",
    description: "Handmade Kerala snacks crafted with love and tradition",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop",
    productCount: 5,
    subcategories: ["Banana Chips", "Sweet Banana Chips", "Jaggery Chips", "Achappam", "Unniyappam"],
  },
];

// ─── Farmers ────────────────────────────────────────

export interface Farmer {
  id: string;
  name: string;
  photo: string;
  farmName: string;
  village: string;
  region: string;
  since: number;
  crops: string[];
  description: string;
  coordinates: { lat: number; lng: number };
}

export const farmers: Farmer[] = [
  {
    id: "farmer-1",
    name: "Rajan Kutty",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    farmName: "Rajan's Hill Farm",
    village: "Meppadi",
    region: "Wayanad",
    since: 1998,
    crops: ["Pepper", "Coffee", "Turmeric"],
    description: "Third-generation spice farmer using traditional organic methods passed down through his family.",
    coordinates: { lat: 11.5619, lng: 76.1382 },
  },
  {
    id: "farmer-2",
    name: "Lakshmi Amma",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    farmName: "Lakshmi Organic Estate",
    village: "Kalpetta",
    region: "Wayanad",
    since: 2005,
    crops: ["Ginger", "Turmeric", "Kudampuli"],
    description: "Pioneer of women-led organic farming in Wayanad. Her ginger is sought after across Kerala.",
    coordinates: { lat: 11.6086, lng: 76.0849 },
  },
  {
    id: "farmer-3",
    name: "Thomas Varghese",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    farmName: "Varghese Paddy Fields",
    village: "Mannarkkad",
    region: "Palakkad",
    since: 1990,
    crops: ["Kuthari Rice", "Pachari Rice"],
    description: "Preserving heirloom rice varieties in Palakkad's fertile plains using zero-chemical methods.",
    coordinates: { lat: 10.9918, lng: 76.4669 },
  },
  {
    id: "farmer-4",
    name: "Suresh Menon",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    farmName: "Menon Coconut Grove",
    village: "Thrissur",
    region: "Thrissur",
    since: 2001,
    crops: ["Coconut Oil", "Banana Chips", "Jaggery"],
    description: "Family-run coconut farm producing cold-pressed oil using traditional wooden presses (chekku).",
    coordinates: { lat: 10.527, lng: 76.2144 },
  },
];

// ─── Products ───────────────────────────────────────

export interface ProductVariant {
  weight: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  categoryId: string; // Ensure this matches usage in components
  subcategory?: string;
  image1: string;
  image2?: string;
  image3?: string;
  variants: ProductVariant[];
  price: number;
  comparePrice?: number;
  stock: number;
  status: "published" | "draft";
  featured: boolean;
  farmerId: string;
  batchNumber: string;
  harvestDate: string;
  qualityReport: string;
  avgRating: number;
  reviewCount: number;
}

export const products: Product[] = [
  // ── Spices ──
  {
    id: "prod-1",
    name: "Wayanad Black Pepper",
    slug: "wayanad-black-pepper",
    description: "Bold, aromatic whole black pepper hand-picked from Wayanad hills.",
    longDescription: "Our Wayanad black pepper is renowned for its pungent aroma, bold flavour, and high piperine content. Each peppercorn is hand-picked at peak maturity, sun-dried on bamboo mats, and packed without any processing chemicals. Sourced from Rajan Kutty's Hill Farm in Meppadi, Wayanad.",
    categoryId: "spices",
    subcategory: "Pepper",
    image1: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&h=800&fit=crop",
    image2: "https://images.unsplash.com/photo-1599909533601-aa8c344e1544?w=1200&h=800&fit=crop",
    image3: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=1200&h=800&fit=crop",
    variants: [
      { weight: "100g", price: 149, comparePrice: 199, stock: 200, sku: "BP-100" },
      { weight: "250g", price: 349, comparePrice: 449, stock: 150, sku: "BP-250" },
      { weight: "500g", price: 649, comparePrice: 849, stock: 80, sku: "BP-500" },
      { weight: "1kg", price: 1199, comparePrice: 1599, stock: 50, sku: "BP-1000" },
    ],
    price: 349,
    comparePrice: 449,
    stock: 480,
    status: "published",
    featured: true,
    farmerId: "farmer-1",
    batchNumber: "KBL-BP-2026-001",
    harvestDate: "2026-01-15",
    qualityReport: "Piperine: 6.2% · Moisture: 11% · Grade: TGSEB",
    avgRating: 4.8,
    reviewCount: 124,
  },
  {
    id: "prod-2",
    name: "Kerala Turmeric Powder",
    slug: "kerala-turmeric-powder",
    description: "Premium hand-ground turmeric with high curcumin content (5–6%).",
    longDescription: "Grown in the lush farms of Wayanad without chemical pesticides. Our turmeric is sun-dried and stone-ground to preserve its high curcumin content. Rich golden colour and earthy aroma make it perfect for curries, milk, and health remedies. Each batch is tested for purity and potency.",
    categoryId: "spices",
    subcategory: "Turmeric",
    image1: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1564500674714-0e5fa2f6c03e?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
    variants: [
      { weight: "100g", price: 99, comparePrice: 139, stock: 300, sku: "TP-100" },
      { weight: "250g", price: 229, comparePrice: 299, stock: 200, sku: "TP-250" },
      { weight: "500g", price: 419, comparePrice: 549, stock: 100, sku: "TP-500" },
    ],
    price: 229,
    comparePrice: 299,
    stock: 600,
    status: "published",
    featured: true,
    farmerId: "farmer-2",
    batchNumber: "KBL-TP-2026-003",
    harvestDate: "2025-12-20",
    qualityReport: "Curcumin: 5.8% · Moisture: 9% · No artificial colour",
    avgRating: 4.9,
    reviewCount: 208,
  },
  {
    id: "prod-3",
    name: "Organic Ginger Powder",
    slug: "organic-ginger-powder",
    description: "Pungent, fresh-ground ginger from traditional Wayanad farms.",
    longDescription: "Our ginger is grown by Lakshmi Amma using ancestral farming methods. Harvested at the right maturity, slowly dried, and finely ground. Perfect for tea, cooking, and health tonics. Free from additives and preservatives.",
    categoryId: "spices",
    subcategory: "Ginger",
    image1: "https://images.unsplash.com/photo-1589733429478-c430ed38ad6e?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
    variants: [
      { weight: "100g", price: 119, stock: 180, sku: "GP-100" },
      { weight: "250g", price: 269, stock: 120, sku: "GP-250" },
      { weight: "500g", price: 499, stock: 60, sku: "GP-500" },
    ],
    price: 269,
    stock: 360,
    status: "published",
    featured: false,
    farmerId: "farmer-2",
    batchNumber: "KBL-GP-2026-002",
    harvestDate: "2026-01-05",
    qualityReport: "Gingerol: 3.1% · Moisture: 10% · 100% natural",
    avgRating: 4.6,
    reviewCount: 67,
  },
  {
    id: "prod-4",
    name: "Kumbil Garam Masala",
    slug: "kumbil-garam-masala",
    description: "Authentic Kerala garam masala — a perfumed blend of 12 whole spices.",
    longDescription: "Our signature garam masala is a traditional Kerala recipe. Each batch is hand-roasted, stone-ground, and blended from whole spices: black pepper, cardamom, cloves, cinnamon, fennel, star anise, mace, nutmeg, bay leaf, cumin, coriander, and dried ginger. No fillers, no anti-caking agents.",
    categoryId: "spices",
    subcategory: "Garam Masala",
    image1: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1591147551066-e8d1ec87ef76?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
    variants: [
      { weight: "50g", price: 129, stock: 250, sku: "GM-50" },
      { weight: "100g", price: 229, comparePrice: 279, stock: 180, sku: "GM-100" },
      { weight: "250g", price: 529, comparePrice: 649, stock: 80, sku: "GM-250" },
    ],
    price: 229,
    comparePrice: 279,
    stock: 510,
    status: "published",
    featured: true,
    farmerId: "farmer-1",
    batchNumber: "KBL-GM-2026-001",
    harvestDate: "2026-02-01",
    qualityReport: "12-spice blend · No fillers · Stone-ground fresh",
    avgRating: 4.7,
    reviewCount: 93,
  },
  // ── Coffee ──
  {
    id: "prod-5",
    name: "Wayanad Coffee Beans",
    slug: "wayanad-coffee-beans",
    description: "Single-origin Arabica beans from shade-grown estates.",
    longDescription: "These premium Arabica beans are shade-grown under silver oak and pepper vines at 900m elevation in Wayanad. Medium-dark roast with notes of chocolate, caramel, and a hint of citrus. Perfect for pour-over, French press, or espresso.",
    categoryId: "coffee",
    subcategory: "Bean",
    image1: "https://images.unsplash.com/photo-1447933601403-56dc2df4be09?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    variants: [
      { weight: "250g", price: 399, comparePrice: 499, stock: 120, sku: "CB-250" },
      { weight: "500g", price: 749, comparePrice: 949, stock: 80, sku: "CB-500" },
      { weight: "1kg", price: 1399, comparePrice: 1799, stock: 40, sku: "CB-1000" },
    ],
    price: 399,
    comparePrice: 499,
    stock: 240,
    status: "published",
    featured: true,
    farmerId: "farmer-1",
    batchNumber: "KBL-CB-2026-001",
    harvestDate: "2025-11-20",
    qualityReport: "Arabica · Shade-grown · Altitude 900m · Cupping score 84",
    avgRating: 4.9,
    reviewCount: 156,
  },
  {
    id: "prod-6",
    name: "Filter Coffee Powder",
    slug: "filter-coffee-powder",
    description: "Traditional South Indian filter coffee — 80:20 Arabica-Robusta blend.",
    longDescription: "The perfect blend for your filter decoction. 80% Arabica for smoothness and 20% Robusta for body and crema. Freshly roasted and ground to a fine consistency, perfect for the traditional South Indian drip filter (davara-tumbler).",
    categoryId: "coffee",
    subcategory: "Powder",
    image1: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1447933601403-56dc2df4be09?w=800&h=600&fit=crop",
    variants: [
      { weight: "200g", price: 249, stock: 200, sku: "CP-200" },
      { weight: "500g", price: 579, stock: 120, sku: "CP-500" },
    ],
    price: 249,
    stock: 320,
    status: "published",
    featured: false,
    farmerId: "farmer-1",
    batchNumber: "KBL-CP-2026-002",
    harvestDate: "2025-12-01",
    qualityReport: "80:20 Arabica-Robusta · Medium roast · Fine grind",
    avgRating: 4.5,
    reviewCount: 89,
  },
  // ── Traditional Items ──
  {
    id: "prod-7",
    name: "Malabar Kudampuli",
    slug: "malabar-kudampuli",
    description: "Smoked Garcinia cambogia — essential for Kerala fish curry.",
    longDescription: "Kudampuli (Malabar tamarind) is slowly smoked over coconut husks for weeks, giving it a deep, tangy flavour. Essential for authentic Kerala fish curry, it also has traditional medicinal properties. Sourced from Lakshmi Amma's heritage trees.",
    categoryId: "traditional-items",
    subcategory: "Kudampuli",
    image1: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
    variants: [
      { weight: "100g", price: 89, stock: 300, sku: "KD-100" },
      { weight: "250g", price: 199, stock: 200, sku: "KD-250" },
      { weight: "500g", price: 369, stock: 100, sku: "KD-500" },
    ],
    price: 199,
    stock: 600,
    status: "published",
    featured: false,
    farmerId: "farmer-2",
    batchNumber: "KBL-KD-2026-001",
    harvestDate: "2025-10-15",
    qualityReport: "Smoked 21 days · HCA content 60% · No artificial additives",
    avgRating: 4.7,
    reviewCount: 73,
  },
  {
    id: "prod-8",
    name: "Kuttam Puli (Kokum)",
    slug: "kuttam-puli",
    description: "Dried black kokum — tangy souring agent for Kerala & Goan cuisine.",
    longDescription: "Kuttam Puli is the dried rind of Garcinia indica, used as a natural souring agent in curries and beverages. Sun-dried for deep flavour concentration. Also used in traditional Ayurvedic preparations for digestion.",
    categoryId: "traditional-items",
    subcategory: "Kuttam Puli",
    image1: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop",
    variants: [
      { weight: "100g", price: 79, stock: 250, sku: "KP-100" },
      { weight: "250g", price: 179, stock: 160, sku: "KP-250" },
    ],
    price: 179,
    stock: 410,
    status: "published",
    featured: false,
    farmerId: "farmer-2",
    batchNumber: "KBL-KP-2026-001",
    harvestDate: "2025-11-10",
    qualityReport: "Sun-dried · Natural souring agent · No preservatives",
    avgRating: 4.4,
    reviewCount: 42,
  },
  {
    id: "prod-9",
    name: "Cold-Pressed Coconut Oil",
    slug: "cold-pressed-coconut-oil",
    description: "Traditional chekku-pressed virgin coconut oil from Thrissur.",
    longDescription: "Made using the ancient wooden press (chekku/ghani) method. Our virgin coconut oil retains all natural nutrients, lauric acid, and the unmistakable aroma of fresh coconut. Perfect for cooking, hair care, and skin care. No heat processing, no chemicals.",
    categoryId: "traditional-items",
    subcategory: "Coconut Oil",
    image1: "https://images.unsplash.com/photo-1610292040123-a2b476bb25e9?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&h=600&fit=crop",
    variants: [
      { weight: "500ml", price: 349, comparePrice: 449, stock: 150, sku: "CO-500" },
      { weight: "1L", price: 649, comparePrice: 849, stock: 100, sku: "CO-1000" },
      { weight: "5L", price: 2999, comparePrice: 3999, stock: 30, sku: "CO-5000" },
    ],
    price: 349,
    comparePrice: 449,
    stock: 280,
    status: "published",
    featured: true,
    farmerId: "farmer-4",
    batchNumber: "KBL-CO-2026-004",
    harvestDate: "2026-02-10",
    qualityReport: "Lauric acid: 48% · Cold-pressed · FSSAI certified",
    avgRating: 4.8,
    reviewCount: 187,
  },
  // ── Rice ──
  {
    id: "prod-10",
    name: "Kuthari Rice (Red Rice)",
    slug: "kuthari-red-rice",
    description: "Traditional Kerala red rice — nutrient-rich heirloom variety.",
    longDescription: "Kuthari is a heritage red rice variety cultivated in the organic paddy fields of Palakkad by Thomas Varghese. Rich in fibre, iron, and antioxidants. The nutty flavour and slightly chewy texture make it the healthiest option for daily meals, kanji (porridge), and idli/dosa batter.",
    categoryId: "rice",
    subcategory: "Kuthari",
    image1: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1594495894542-a46cc73e6ade?w=800&h=600&fit=crop",
    variants: [
      { weight: "1kg", price: 149, comparePrice: 189, stock: 300, sku: "KR-1000" },
      { weight: "5kg", price: 699, comparePrice: 899, stock: 120, sku: "KR-5000" },
      { weight: "10kg", price: 1299, comparePrice: 1699, stock: 60, sku: "KR-10000" },
    ],
    price: 149,
    comparePrice: 189,
    stock: 480,
    status: "published",
    featured: true,
    farmerId: "farmer-3",
    batchNumber: "KBL-KR-2026-003",
    harvestDate: "2025-12-05",
    qualityReport: "Fibre: 3.2g/100g · Iron: 3.5mg/100g · Heirloom variety",
    avgRating: 4.6,
    reviewCount: 134,
  },
  {
    id: "prod-11",
    name: "Pachari Rice (White Rice)",
    slug: "pachari-white-rice",
    description: "Soft, fragrant Palakkad Pachari — Kerala's everyday rice.",
    longDescription: "Pachari is the daily staple of Kerala households. Grown without pesticides in Palakkad's paddy fields, this soft white rice has a delicate flavour perfect for sadya (feast) meals, kanji, and biriyani. Hand-milled to preserve nutrients.",
    categoryId: "rice",
    subcategory: "Pachari",
    image1: "https://images.unsplash.com/photo-1594495894542-a46cc73e6ade?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&h=600&fit=crop",
    variants: [
      { weight: "1kg", price: 129, stock: 350, sku: "PR-1000" },
      { weight: "5kg", price: 599, stock: 150, sku: "PR-5000" },
      { weight: "10kg", price: 1099, stock: 80, sku: "PR-10000" },
    ],
    price: 129,
    stock: 580,
    status: "published",
    featured: false,
    farmerId: "farmer-3",
    batchNumber: "KBL-PR-2026-003",
    harvestDate: "2025-12-10",
    qualityReport: "Hand-milled · No polishing chemicals · Pesticide-free",
    avgRating: 4.5,
    reviewCount: 98,
  },
  {
    id: "prod-12",
    name: "Puttu Podi",
    slug: "puttu-podi",
    description: "Stone-ground rice flour for authentic Kerala Puttu.",
    longDescription: "Made from Pachari rice that is soaked, drained, and stone-ground to the perfect coarseness for fluffy Puttu. No additives. Just pure rice, traditionally prepared. Pairs perfectly with banana, kadala curry, or papadom.",
    categoryId: "rice",
    subcategory: "Puttu Podi",
    image1: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1594495894542-a46cc73e6ade?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
    variants: [
      { weight: "500g", price: 99, stock: 400, sku: "PP-500" },
      { weight: "1kg", price: 179, stock: 250, sku: "PP-1000" },
    ],
    price: 99,
    stock: 650,
    status: "published",
    featured: false,
    farmerId: "farmer-3",
    batchNumber: "KBL-PP-2026-003",
    harvestDate: "2026-01-15",
    qualityReport: "Stone-ground · Coarse texture · No bleaching",
    avgRating: 4.4,
    reviewCount: 56,
  },
  // ── Snacks ──
  {
    id: "prod-13",
    name: "Kerala Banana Chips",
    slug: "kerala-banana-chips",
    description: "Crispy nendran banana chips fried in pure coconut oil.",
    longDescription: "Made from raw nendran bananas sliced thin and fried to perfection in cold-pressed coconut oil. The result is a crispy, golden, slightly salty snack that's 100% natural. A staple of Kerala's teatime tradition.",
    categoryId: "snacks",
    subcategory: "Banana Chips",
    image1: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
    variants: [
      { weight: "150g", price: 99, stock: 500, sku: "BC-150" },
      { weight: "250g", price: 159, comparePrice: 199, stock: 350, sku: "BC-250" },
      { weight: "500g", price: 289, comparePrice: 349, stock: 200, sku: "BC-500" },
    ],
    price: 159,
    comparePrice: 199,
    stock: 1050,
    status: "published",
    featured: true,
    farmerId: "farmer-4",
    batchNumber: "KBL-BC-2026-004",
    harvestDate: "2026-02-18",
    qualityReport: "Coconut oil fried · No trans fat · No preservatives",
    avgRating: 4.7,
    reviewCount: 246,
  },
  {
    id: "prod-14",
    name: "Sweet Banana Chips",
    slug: "sweet-banana-chips",
    description: "Jaggery-coated nendran banana chips — a sweet-salty delight.",
    longDescription: "Our sweet banana chips combine the crunch of nendran banana with the warmth of organic jaggery coating. Fried in coconut oil and gently glazed with melted jaggery, these are an irresistible snack for any time of day.",
    categoryId: "snacks",
    subcategory: "Sweet Banana Chips",
    image1: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
    variants: [
      { weight: "150g", price: 119, stock: 300, sku: "SBC-150" },
      { weight: "250g", price: 189, stock: 200, sku: "SBC-250" },
    ],
    price: 119,
    stock: 500,
    status: "published",
    featured: false,
    farmerId: "farmer-4",
    batchNumber: "KBL-SBC-2026-004",
    harvestDate: "2026-02-15",
    qualityReport: "Jaggery-coated · Coconut oil · No refined sugar",
    avgRating: 4.6,
    reviewCount: 78,
  },
  {
    id: "prod-15",
    name: "Jaggery Chips",
    slug: "jaggery-chips",
    description: "Crispy tapioca chips glazed with pure palm jaggery.",
    longDescription: "Thin tapioca slices deep-fried in coconut oil and coated with melted palm jaggery. A traditional Kerala sweet snack perfect for Vishu and Onam celebrations. Each batch is small-batch made for freshness.",
    categoryId: "snacks",
    subcategory: "Jaggery Chips",
    image1: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
    variants: [
      { weight: "200g", price: 149, stock: 250, sku: "JC-200" },
      { weight: "400g", price: 269, stock: 150, sku: "JC-400" },
    ],
    price: 149,
    stock: 400,
    status: "published",
    featured: false,
    farmerId: "farmer-4",
    batchNumber: "KBL-JC-2026-004",
    harvestDate: "2026-02-20",
    qualityReport: "Palm jaggery · Coconut oil · No artificial sweetener",
    avgRating: 4.5,
    reviewCount: 45,
  },
  {
    id: "prod-16",
    name: "Achappam",
    slug: "achappam",
    description: "Traditional Kerala rose cookies — crispy, sweet, and floral.",
    longDescription: "Achappam is a delicate, flower-shaped crispy snack made from rice flour, coconut milk, eggs, and sugar. Deep-fried in coconut oil using a traditional achappam mould. A festive favourite from Kerala's Syrian Christian kitchen.",
    categoryId: "snacks",
    subcategory: "Achappam",
    image1: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&h=600&fit=crop",
    variants: [
      { weight: "200g", price: 179, stock: 200, sku: "AC-200" },
      { weight: "400g", price: 329, stock: 120, sku: "AC-400" },
    ],
    price: 179,
    stock: 320,
    status: "published",
    featured: false,
    farmerId: "farmer-4",
    batchNumber: "KBL-AC-2026-004",
    harvestDate: "2026-02-22",
    qualityReport: "Handmade · Coconut oil · Traditional mould",
    avgRating: 4.8,
    reviewCount: 62,
  },
  {
    id: "prod-17",
    name: "Unniyappam",
    slug: "unniyappam",
    description: "Sweet rice fritters with banana and jaggery — Kerala's beloved dessert.",
    longDescription: "Unniyappam is a traditional Kerala dessert snack made from ripe bananas, rice flour, jaggery, cardamom, and ghee. Fried in an unniyappam pan to achieve the perfect golden dome shape. A must-have during temple festivals and celebrations.",
    categoryId: "snacks",
    subcategory: "Unniyappam",
    image1: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    image2: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop",
    image3: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=600&fit=crop",
    variants: [
      { weight: "250g (12 pcs)", price: 199, stock: 180, sku: "UN-250" },
      { weight: "500g (24 pcs)", price: 369, stock: 100, sku: "UN-500" },
    ],
    price: 199,
    stock: 280,
    status: "published",
    featured: false,
    farmerId: "farmer-4",
    batchNumber: "KBL-UN-2026-004",
    harvestDate: "2026-02-25",
    qualityReport: "Handmade · Jaggery-sweetened · No maida",
    avgRating: 4.9,
    reviewCount: 84,
  },
];

// ─── Batches ────────────────────────────────────────

export interface Batch {
  batchNumber: string;
  productId: string;
  farmerId: string;
  harvestDate: string;
  qualityReport: string;
  certification: string[];
  labTestReportUrl: string;
}

export const batches: Batch[] = [
  {
    batchNumber: "KBL-BP-2026-001",
    productId: "prod-1",
    farmerId: "farmer-1",
    harvestDate: "2026-01-15",
    qualityReport: "Piperine: 6.2% · Moisture: 11% · Grade: TGSEB",
    certification: ["India Organic", "FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/BP-2026-001.pdf",
  },
  {
    batchNumber: "KBL-TP-2026-003",
    productId: "prod-2",
    farmerId: "farmer-2",
    harvestDate: "2025-12-20",
    qualityReport: "Curcumin: 5.8% · Moisture: 9% · No artificial colour",
    certification: ["India Organic", "ISO 22000"],
    labTestReportUrl: "https://kumbil.in/reports/TP-2026-003.pdf",
  },
  {
    batchNumber: "KBL-GP-2026-002",
    productId: "prod-3",
    farmerId: "farmer-2",
    harvestDate: "2026-01-05",
    qualityReport: "Gingerol: 3.1% · Moisture: 10% · 100% natural",
    certification: ["India Organic"],
    labTestReportUrl: "https://kumbil.in/reports/GP-2026-002.pdf",
  },
  {
    batchNumber: "KBL-GM-2026-001",
    productId: "prod-4",
    farmerId: "farmer-1",
    harvestDate: "2026-02-01",
    qualityReport: "12-spice blend · No fillers · Stone-ground fresh",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/GM-2026-001.pdf",
  },
  {
    batchNumber: "KBL-CB-2026-001",
    productId: "prod-5",
    farmerId: "farmer-1",
    harvestDate: "2025-11-20",
    qualityReport: "Arabica · Shade-grown · Altitude 900m · Cupping score 84",
    certification: ["India Organic", "USDA Organic"],
    labTestReportUrl: "https://kumbil.in/reports/CB-2026-001.pdf",
  },
  {
    batchNumber: "KBL-CP-2026-002",
    productId: "prod-6",
    farmerId: "farmer-1",
    harvestDate: "2025-12-01",
    qualityReport: "80:20 Arabica-Robusta · Medium roast · Fine grind",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/CP-2026-002.pdf",
  },
  {
    batchNumber: "KBL-KD-2026-001",
    productId: "prod-7",
    farmerId: "farmer-2",
    harvestDate: "2025-10-15",
    qualityReport: "Smoked 21 days · HCA content 60% · No artificial additives",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/KD-2026-001.pdf",
  },
  {
    batchNumber: "KBL-KP-2026-001",
    productId: "prod-8",
    farmerId: "farmer-2",
    harvestDate: "2025-11-10",
    qualityReport: "Sun-dried · Natural souring agent · No preservatives",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/KP-2026-001.pdf",
  },
  {
    batchNumber: "KBL-CO-2026-004",
    productId: "prod-9",
    farmerId: "farmer-4",
    harvestDate: "2026-02-10",
    qualityReport: "Lauric acid: 48% · Cold-pressed · FSSAI certified",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/CO-2026-004.pdf",
  },
  {
    batchNumber: "KBL-KR-2026-003",
    productId: "prod-10",
    farmerId: "farmer-3",
    harvestDate: "2025-12-05",
    qualityReport: "Fibre: 3.2g/100g · Iron: 3.5mg/100g · Heirloom variety",
    certification: ["India Organic"],
    labTestReportUrl: "https://kumbil.in/reports/KR-2026-003.pdf",
  },
  {
    batchNumber: "KBL-PR-2026-003",
    productId: "prod-11",
    farmerId: "farmer-3",
    harvestDate: "2025-12-10",
    qualityReport: "Hand-milled · No polishing chemicals · Pesticide-free",
    certification: ["India Organic"],
    labTestReportUrl: "https://kumbil.in/reports/PR-2026-003.pdf",
  },
  {
    batchNumber: "KBL-PP-2026-003",
    productId: "prod-12",
    farmerId: "farmer-3",
    harvestDate: "2026-01-15",
    qualityReport: "Stone-ground · Coarse texture · No bleaching",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/PP-2026-003.pdf",
  },
  {
    batchNumber: "KBL-BC-2026-004",
    productId: "prod-13",
    farmerId: "farmer-4",
    harvestDate: "2026-02-18",
    qualityReport: "Coconut oil fried · No trans fat · No preservatives",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/BC-2026-004.pdf",
  },
  {
    batchNumber: "KBL-SBC-2026-004",
    productId: "prod-14",
    farmerId: "farmer-4",
    harvestDate: "2026-02-15",
    qualityReport: "Jaggery-coated · Coconut oil · No refined sugar",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/SBC-2026-004.pdf",
  },
  {
    batchNumber: "KBL-JC-2026-004",
    productId: "prod-15",
    farmerId: "farmer-4",
    harvestDate: "2026-02-20",
    qualityReport: "Palm jaggery · Coconut oil · No artificial sweetener",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/JC-2026-004.pdf",
  },
  {
    batchNumber: "KBL-AC-2026-004",
    productId: "prod-16",
    farmerId: "farmer-4",
    harvestDate: "2026-02-22",
    qualityReport: "Handmade · Coconut oil · Traditional mould",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/AC-2026-004.pdf",
  },
  {
    batchNumber: "KBL-UN-2026-004",
    productId: "prod-17",
    farmerId: "farmer-4",
    harvestDate: "2026-02-25",
    qualityReport: "Handmade · Jaggery-sweetened · No maida",
    certification: ["FSSAI"],
    labTestReportUrl: "https://kumbil.in/reports/UN-2026-004.pdf",
  },
];

// ─── Reviews ────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  { id: "rev-1", productId: "prod-1", customerName: "Anita S.", rating: 5, comment: "Best black pepper I've ever tasted! The aroma is incredible. You can tell it's fresh and pure.", date: "2026-02-28", verified: true },
  { id: "rev-2", productId: "prod-1", customerName: "Mohammed R.", rating: 5, comment: "Shipped to Dubai, arrived in perfect condition. My wife says this is exactly like the pepper from her grandmother's farm.", date: "2026-02-25", verified: true },
  { id: "rev-3", productId: "prod-1", customerName: "Priya K.", rating: 4, comment: "Great quality pepper. The 500g pack is good value. Wish they had a 2kg option.", date: "2026-02-20", verified: true },
  { id: "rev-4", productId: "prod-2", customerName: "Dr. Suresh M.", rating: 5, comment: "As a naturopath, I recommend this turmeric to all my patients. The curcumin content is genuine.", date: "2026-03-01", verified: true },
  { id: "rev-5", productId: "prod-2", customerName: "Lisa W.", rating: 5, comment: "I use this in my golden milk every morning. The color and taste are far superior to store brands.", date: "2026-02-15", verified: true },
  { id: "rev-6", productId: "prod-5", customerName: "Arjun P.", rating: 5, comment: "This coffee has ruined all other coffee for me. The chocolate notes are divine. Will subscribe monthly!", date: "2026-03-02", verified: true },
  { id: "rev-7", productId: "prod-9", customerName: "Deepa N.", rating: 5, comment: "The aroma when you open the bottle is heavenly. You can tell this is real chekku oil. My grandmother would approve!", date: "2026-02-22", verified: true },
  { id: "rev-8", productId: "prod-13", customerName: "Rajesh T.", rating: 5, comment: "Crispy, salty, perfectly thin. These banana chips are exactly what you get at roadside shops in Kerala. Authentic!", date: "2026-02-18", verified: true },
  { id: "rev-9", productId: "prod-10", customerName: "Sarah J.", rating: 4, comment: "Great red rice! Very nutritious. The kids took some time to adjust from white rice but now they love it.", date: "2026-02-10", verified: true },
  { id: "rev-10", productId: "prod-17", customerName: "Meera V.", rating: 5, comment: "Tastes exactly like the unniyappam at Guruvayoor temple! Brought tears of nostalgia. Thank you Kumbil!", date: "2026-03-05", verified: true },
];

// ─── Blog Posts ─────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "health" | "recipes" | "farming" | "farmer-stories";
  image: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Organic Turmeric Is 10x More Powerful Than Regular Turmeric",
    slug: "organic-turmeric-benefits",
    excerpt: "Discover why organically grown turmeric contains significantly higher curcumin levels and what that means for your health.",
    content: "Turmeric has been used in Ayurveda for over 4,000 years. But not all turmeric is created equal...\n\nOrganic turmeric grown in Kerala's Western Ghats has been found to contain curcumin levels of 5–7%, compared to 2–3% in commercially farmed turmeric. This is because organic farming preserves the soil microbiome, which in turn enhances the plant's natural bioactive compounds.\n\n## The Curcumin Difference\n\nCurcumin is the active compound responsible for turmeric's anti-inflammatory, antioxidant, and anti-cancer properties. Higher curcumin means more health benefits per gram.\n\n## How We Grow Our Turmeric\n\nAt Kumbil, our turmeric is grown by Lakshmi Amma in Wayanad using zero-chemical methods. The rhizomes are sun-dried for 10 days and stone-ground to preserve essential oils.\n\n## Tips for Maximum Absorption\n\n- Always combine turmeric with black pepper (piperine increases absorption by 2000%)\n- Use with healthy fats like coconut oil\n- Avoid boiling — add at the end of cooking",
    category: "health",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=500&fit=crop",
    author: "Dr. Meera Nair",
    publishedAt: "2026-03-01",
    readTime: 5,
  },
  {
    id: "blog-2",
    title: "Authentic Kerala Fish Curry with Kudampuli — Family Recipe",
    slug: "kerala-fish-curry-kudampuli",
    excerpt: "A step-by-step guide to making the classic Kerala fish curry using smoked Kudampuli for that authentic tangy flavour.",
    content: "Kerala fish curry (Meen Curry) is the soul of Malayali cooking. The secret? Kudampuli — smoked Malabar tamarind that gives the curry its distinctive tang.\n\n## Ingredients\n- 500g fresh fish (Seer/Kingfish or Sardines)\n- 4–5 pieces Kumbil Kudampuli\n- 2 tbsp Kumbil Turmeric Powder\n- 3 tbsp coconut oil\n- Shallots, curry leaves, green chillies\n\n## Method\n1. Soak Kudampuli in warm water for 10 minutes\n2. Heat coconut oil in a clay pot (manchatti)\n3. Add fenugreek seeds, shallots, curry leaves\n4. Add turmeric, chilli powder, and soaked Kudampuli\n5. Add water, bring to a boil\n6. Gently slide in fish pieces\n7. Cook on low heat for 12–15 minutes\n8. Let it rest overnight — it tastes even better the next day!",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&h=500&fit=crop",
    author: "Asha Thomas",
    publishedAt: "2026-02-25",
    readTime: 7,
  },
  {
    id: "blog-3",
    title: "Meet Rajan Kutty: The Third-Generation Pepper Farmer of Meppadi",
    slug: "meet-rajan-kutty-pepper-farmer",
    excerpt: "From his grandfather's 2-acre plot to a 25-acre organic estate — the inspiring story of Wayanad's most dedicated pepper farmer.",
    content: "In the misty hills of Meppadi, Wayanad, Rajan Kutty walks through rows of pepper vines at dawn...\n\n## A Family Legacy\n\nRajan's grandfather started growing pepper in 1960 on a small 2-acre plot. Today, Rajan manages 25 acres of certified organic farmland.\n\n## Going Organic\n\n\"My grandfather never used chemicals — they didn't exist back then,\" Rajan says with a smile. \"I'm not 'going organic.' I'm continuing what was always natural.\"\n\n## The Challenges\n\nOrganic farming isn't easy. Rajan faces lower yields, pest challenges, and pressure from neighbouring farms that use chemicals. But his commitment has never wavered.\n\n## Working with Kumbil\n\n\"Kumbil understands our struggle. They pay fair prices and help us reach customers who value purity. When a customer in Mumbai messages me to say my pepper changed their cooking — that's my reward.\"",
    category: "farmer-stories",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=500&fit=crop",
    author: "Kumbil Team",
    publishedAt: "2026-02-20",
    readTime: 6,
  },
  {
    id: "blog-4",
    title: "Organic Farming in Wayanad: How Ancient Methods Outperform Modern Agriculture",
    slug: "organic-farming-wayanad",
    excerpt: "Scientific studies reveal that traditional farming methods in Kerala's Western Ghats produce healthier soil, better crops, and higher nutrition.",
    content: "Wayanad's farmers have been practising what scientists now call 'regenerative agriculture' for centuries...\n\n## The Science Behind Tradition\n\nRecent studies from Kerala Agricultural University show that organic plots in Wayanad have 40% higher microbial diversity than chemical-farmed plots.\n\n## Key Practices\n\n- **Companion planting**: Pepper vines on silver oak, coffee under shade trees\n- **Natural pest control**: Neem oil, tobacco decoction, pheromone traps\n- **Composting**: Kitchen waste + cow dung + green leaves\n- **Water management**: Contour trenching in hilly terrain\n\n## The Results\n\nOrganic farms in Wayanad show:\n- 15% lower yield but 30% higher market price\n- 50% lower input costs\n- Higher nutrient density in produce\n- Carbon sequestration benefits",
    category: "farming",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
    author: "Dr. Arun Kumar",
    publishedAt: "2026-02-15",
    readTime: 8,
  },
  {
    id: "blog-5",
    title: "Golden Milk Recipe: Kerala's Ancient Health Elixir",
    slug: "golden-milk-recipe",
    excerpt: "Learn how to make the perfect turmeric latte using Kumbil's organic turmeric and black pepper for maximum health benefits.",
    content: "Golden milk (Haldi Doodh) has been a bedtime ritual in Kerala homes for generations...\n\n## Ingredients\n- 1 cup warm milk (dairy or coconut)\n- 1 tsp Kumbil Turmeric Powder\n- A pinch of Kumbil Black Pepper\n- 1 tsp honey or jaggery\n- 1/2 tsp Kumbil Coconut Oil\n- Cardamom and cinnamon (optional)\n\n## Method\n1. Warm milk gently (don't boil)\n2. Add turmeric and stir well\n3. Add a pinch of black pepper (essential for curcumin absorption!)\n4. Add coconut oil for healthy fats\n5. Sweeten with honey or jaggery\n6. Sip slowly before bed",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1564500674714-0e5fa2f6c03e?w=800&h=500&fit=crop",
    author: "Lakshmi R.",
    publishedAt: "2026-02-10",
    readTime: 4,
  },
];

// ─── Orders ──────────────────────────────────────────

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  weight: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  createdAt: string;
}

export const orders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "KBL-10001",
    customerName: "Anita Sharma",
    customerEmail: "anita@email.com",
    items: [
      { name: "Wayanad Black Pepper", qty: 2, price: 349, weight: "250g" },
      { name: "Kerala Turmeric Powder", qty: 1, price: 229, weight: "250g" },
    ],
    total: 927,
    status: "delivered",
    paymentMethod: "UPI",
    createdAt: "2026-03-08T10:00:00",
  },
  {
    id: "ord-2",
    orderNumber: "KBL-10002",
    customerName: "Mohammed Rashid",
    customerEmail: "rashid@email.com",
    items: [
      { name: "Wayanad Coffee Beans", qty: 1, price: 749, weight: "500g" },
      { name: "Kerala Banana Chips", qty: 3, price: 159, weight: "250g" },
    ],
    total: 1226,
    status: "shipped",
    paymentMethod: "Razorpay",
    createdAt: "2026-03-07T14:30:00",
  },
  {
    id: "ord-3",
    orderNumber: "KBL-10003",
    customerName: "Priya Krishnan",
    customerEmail: "priya@email.com",
    items: [
      { name: "Cold-Pressed Coconut Oil", qty: 1, price: 649, weight: "1L" },
      { name: "Kuthari Red Rice", qty: 1, price: 699, weight: "5kg" },
      { name: "Puttu Podi", qty: 2, price: 99, weight: "500g" },
    ],
    total: 1546,
    status: "processing",
    paymentMethod: "Card",
    createdAt: "2026-03-06T09:15:00",
  },
  {
    id: "ord-4",
    orderNumber: "KBL-10004",
    customerName: "Lisa Williams",
    customerEmail: "lisa@email.com",
    items: [
      { name: "Kumbil Garam Masala", qty: 2, price: 229, weight: "100g" },
      { name: "Kerala Turmeric Powder", qty: 1, price: 419, weight: "500g" },
      { name: "Organic Ginger Powder", qty: 1, price: 269, weight: "250g" },
    ],
    total: 1146,
    status: "pending",
    paymentMethod: "PayPal",
    createdAt: "2026-03-09T08:45:00",
  },
  {
    id: "ord-5",
    orderNumber: "KBL-10005",
    customerName: "Arjun Pillai",
    customerEmail: "arjun@email.com",
    items: [
      { name: "Unniyappam", qty: 2, price: 199, weight: "250g" },
      { name: "Achappam", qty: 1, price: 179, weight: "200g" },
      { name: "Sweet Banana Chips", qty: 1, price: 189, weight: "250g" },
    ],
    total: 766,
    status: "cancelled",
    paymentMethod: "UPI",
    createdAt: "2026-03-05T16:20:00",
  },
];

// ─── Customers ───────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedAt: string;
  orderCount: number;
  totalSpent: number;
}

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Jacob Thomas",
    email: "jacob@email.com",
    phone: "+91 98765 43210",
    location: "Kochi, Kerala",
    joinedAt: "2025-11-20",
    orderCount: 12,
    totalSpent: 18450,
  },
  {
    id: "cust-2",
    name: "Mohammed Rashid",
    email: "rashid@email.com",
    phone: "+971 50 123 4567",
    location: "Dubai, UAE",
    joinedAt: "2026-01-05",
    orderCount: 4,
    totalSpent: 8200,
  },
  {
    id: "cust-3",
    name: "Priya Krishnan",
    email: "priya@email.com",
    phone: "+91 99887 76655",
    location: "Bangalore, Karnataka",
    joinedAt: "2026-02-12",
    orderCount: 3,
    totalSpent: 4560,
  },
  {
    id: "cust-4",
    name: "Lisa Williams",
    email: "lisa@email.com",
    phone: "+1 212 555 0198",
    location: "New York, USA",
    joinedAt: "2026-02-28",
    orderCount: 1,
    totalSpent: 2150,
  },
  {
    id: "cust-5",
    name: "Arjun Pillai",
    email: "arjun@email.com",
    phone: "+91 94470 12345",
    location: "Thiruvananthapuram, Kerala",
    joinedAt: "2025-12-15",
    orderCount: 8,
    totalSpent: 11200,
  },
];

// ─── Coupons ────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  maxDiscount?: number;
  expiresAt: string;
  active: boolean;
  usageCount: number;
  usageLimit: number;
}

export const coupons: Coupon[] = [
  {
    id: "coup-1",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minOrder: 499,
    maxDiscount: 200,
    expiresAt: "2026-06-30",
    active: true,
    usageCount: 342,
    usageLimit: 1000,
  },
  {
    id: "coup-2",
    code: "SPICE20",
    discount: 20,
    type: "percentage",
    minOrder: 999,
    maxDiscount: 500,
    expiresAt: "2026-04-30",
    active: true,
    usageCount: 128,
    usageLimit: 500,
  },
  {
    id: "coup-3",
    code: "FLAT100",
    discount: 100,
    type: "fixed",
    minOrder: 799,
    expiresAt: "2026-03-31",
    active: true,
    usageCount: 67,
    usageLimit: 200,
  },
  {
    id: "coup-4",
    code: "FIRSTCOFFEE",
    discount: 15,
    type: "percentage",
    minOrder: 399,
    maxDiscount: 150,
    expiresAt: "2026-12-31",
    active: true,
    usageCount: 89,
    usageLimit: 300,
  },
];

// ─── Admin ──────────────────────────────────────────

export const mockAdmin = {
  id: "admin-1",
  name: "Administrator",
  email: "admin@kumbil.in",
  password: "admin",
  role: "superadmin" as const,
};

// ─── Helpers ────────────────────────────────────────

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategoryId(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured && p.status === "published");
}

export function getFarmerById(id: string) {
  return farmers.find((f) => f.id === id);
}

export function getReviewsByProductId(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}

export function getBlogBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug);
}

export const getBatchByNumber = (batchNumber: string) => {
  return batches.find((b) => b.batchNumber === batchNumber);
};

export function getCouponByCode(code: string) {
  return coupons.find((c) => c.code.toLowerCase() === code.toLowerCase() && c.active);
}
