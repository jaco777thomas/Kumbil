import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch live data from DB
  const [categories, featuredProducts, farmers, blogPosts] = await Promise.all([
    prisma.category.findMany({
      take: 5,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    }),
    prisma.product.findMany({
      where: { featured: true, status: "published" },
      take: 8,
      include: {
        variants: true,
        category: true,
      }
    }),
    prisma.farmer.findMany({
      take: 4,
      orderBy: { createdAt: "desc" }
    }),
    prisma.blog.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: "desc" }
    })
  ]);

  return (
    <div>
      {/* ───── HERO — Premium Slider ───── */}
      <HeroSlider />

      {/* ───── Farm to Global Shipping ───── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-sm font-medium mb-4">
              🌍 Global Shipping
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Farm to Your Doorstep
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              From Wayanad&apos;s organic farms to kitchens worldwide — in 4
              simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "🌱",
                title: "Organic Harvest",
                desc: "Farmers harvest crops at peak maturity using zero-chemical methods",
              },
              {
                step: "02",
                icon: "✅",
                title: "Quality Testing",
                desc: "Every batch tested for purity, potency, and contaminants",
              },
              {
                step: "03",
                icon: "📦",
                title: "Eco Packaging",
                desc: "Packed in biodegradable materials with batch tracking codes",
              },
              {
                step: "04",
                icon: "🚀",
                title: "Global Delivery",
                desc: "Shipped worldwide with real-time tracking and origin traceability",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-kumbil-secondary/50 hover:bg-kumbil-secondary transition-colors group"
              >
                <div className="text-5xl font-extrabold text-kumbil-primary/10 absolute top-4 right-4">
                  {item.step}
                </div>
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-kumbil-primary/30 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Categories ───── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-slate-500">
              Explore our curated collection of Kerala&apos;s finest organic
              products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-soft hover:shadow-premium transition-all"
              >
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm">{cat.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">
                    {cat._count.products} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Featured Products ───── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                Featured Products
              </h2>
              <p className="text-slate-500">
                Our most loved organic products
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-kumbil-primary hover:gap-3 transition-all"
            >
              View All Products
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Story of Kumbil ───── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-premium relative h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
                  alt="Organic farming in Wayanad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-kumbil-primary text-white shadow-xl max-w-[200px]">
                <div className="text-3xl font-extrabold">Since</div>
                <div className="text-kumbil-accent text-2xl font-bold">
                  2020
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-sm font-medium mb-6">
                Our Journey
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                The Story of Kumbil
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Kumbil was born in the misty hills of Wayanad with a simple
                mission: to bridge the gap between Kerala&apos;s traditional
                farmers and health-conscious consumers worldwide.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                <strong>&quot;Kumbil&quot;</strong> — the young banana leaf used
                to serve food in Kerala — symbolises freshness, tradition, and
                the act of nurturing. We carry this spirit in every product we
                deliver.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-kumbil-primary font-semibold hover:gap-3 transition-all"
              >
                Read Our Full Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Farmer Community ───── */}
      <section className="section-padding bg-kumbil-secondary">
        <div className="container-tight">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-sm font-medium mb-4">
              👨‍🌾 Our Farmers
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Meet the Farmers Behind Your Food
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Every product has a story — and it starts with our dedicated
              farmer community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmers.map((farmer) => {
              const crops = JSON.parse(farmer.crops || "[]");
              return (
                <div
                  key={farmer.id}
                  className="p-6 rounded-2xl bg-white shadow-soft hover:shadow-premium transition-all text-center group"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-kumbil-primary/10 group-hover:ring-kumbil-primary/30 transition-all relative">
                    {farmer.photo && (
                      <Image
                        src={farmer.photo}
                        alt={farmer.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    {farmer.name}
                  </h3>
                  <p className="text-xs text-kumbil-primary font-medium mt-1">
                    {farmer.farmName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {farmer.village}, {farmer.region} · Since {farmer.since}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {crops.slice(0, 3).map((crop: string) => (
                      <span
                        key={crop}
                        className="px-2 py-0.5 rounded-full bg-kumbil-primary/5 text-[10px] font-medium text-kumbil-primary"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-slate-500">
              Trusted by 10,000+ health-conscious families
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Anita S.",
                location: "Mumbai",
                text: "The turmeric powder from Kumbil is the best I've ever used. My golden milk has never tasted this good. The quality is unmatched!",
                rating: 5,
              },
              {
                name: "Mohammed R.",
                location: "Dubai, UAE",
                text: "Shipped to Dubai in just 5 days. The pepper is incredibly aromatic. My wife says this is exactly like the pepper from her grandmother's farm.",
                rating: 5,
              },
              {
                name: "Lisa W.",
                location: "Berlin, Germany",
                text: "I love the farm tracking feature. Knowing exactly which farmer grew my spices and when they were harvested gives me so much confidence.",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-kumbil-secondary/50 transition-all"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-kumbil-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  &quot;{t.text}&quot;
                </p>
                <div className="text-sm font-semibold text-slate-800">
                  {t.name}
                </div>
                <div className="text-xs text-slate-400">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Certifications / Quality ───── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Certified Quality You Can Trust
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Every product undergoes rigorous quality checks and meets
              international organic standards
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: "FSSAI", desc: "Food Safety Standards", icon: "🏛️" },
              { name: "India Organic", desc: "NPOP Certified", icon: "🌿" },
              { name: "ISO 22000", desc: "Food Safety Management", icon: "✅" },
              { name: "USDA Organic", desc: "US Organic Standard", icon: "🇺🇸" },
            ].map((cert) => (
              <div
                key={cert.name}
                className="p-6 rounded-2xl bg-white shadow-soft hover:shadow-premium transition-all text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Recent Blog Posts ───── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                From Our Blog
              </h2>
              <p className="text-slate-500">
                Stories, recipes, and health insights
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-kumbil-primary hover:gap-3 transition-all"
            >
              View All Posts →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-premium transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-kumbil-primary">
                    {post.category || ""}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-1 mb-2 group-hover:text-kumbil-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=600&fit=crop"
            alt="Kerala farm"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-kumbil-primary/85" />
        </div>
        <div className="relative z-10 container-tight text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Eat For Health?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Join 10,000+ families who trust Kumbil for premium organic products
            delivered straight from Kerala&apos;s farms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-2xl bg-white text-kumbil-primary font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              Shop Now
            </Link>
            <Link
              href="/track"
              className="px-8 py-4 rounded-2xl glass text-white font-semibold hover:bg-white/20 transition-all"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
