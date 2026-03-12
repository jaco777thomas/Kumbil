import type { Metadata } from "next";
import Link from "next/link";
import { farmers } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About Us — Kumbil | Eat For Health",
  description:
    "Learn about Kumbil — our mission to bring pure, organic products from Kerala farms to global doorsteps. Meet our farmers and discover our values.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=600&fit=crop"
            alt="Wayanad hills"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-kumbil-primary/80" />
        </div>
        <div className="container-tight px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-6">
            Our Journey
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            The Kumbil Story
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            From the misty hills of Wayanad to kitchens across the world — we
            connect Kerala&apos;s organic farmers with health-conscious families
            everywhere.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-xs font-semibold mb-6">
                📖 OUR STORY
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Born in Wayanad, Grown for the World
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>&quot;Kumbil&quot;</strong> — the tender young banana leaf
                used to serve food in Kerala — symbolises freshness, purity, and
                the warmth of sharing a meal. Our marketplace carries this spirit
                in every product.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We started with a simple observation: while Kerala&apos;s
                farmers grew some of the world&apos;s finest spices, rice, and
                traditional foods using methods perfected over generations, most
                of these incredible products never made it beyond local markets.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Kumbil bridges this gap. We partner directly with organic farmers
                in Wayanad, Palakkad, and Thrissur — ensuring they receive fair
                prices while delivering premium produce to health-conscious
                customers in India and across the globe.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
                  alt="Organic farm in Wayanad"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-kumbil-primary text-white shadow-xl">
                <div className="text-3xl font-extrabold">50+</div>
                <div className="text-sm text-white/70">Farm Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-kumbil-primary to-kumbil-primary-dark text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                To revolutionise the way the world experiences organic food — by
                empowering Kerala&apos;s farmers with fair trade, preserving
                traditional farming, and delivering the purest products directly
                to global consumers. Every purchase sustains a farmer, nurtures
                the earth, and nourishes a family.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-2xl bg-kumbil-secondary border border-kumbil-accent/20">
              <div className="w-14 h-14 rounded-2xl bg-kumbil-accent/10 flex items-center justify-center mb-6">
                <span className="text-3xl">🔭</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To be the world&apos;s most trusted organic marketplace —
                where every product comes with full traceability, every farmer
                earns a livelihood with dignity, and every customer knows
                exactly where their food comes from. We envision a world where
                &quot;Eat For Health&quot; isn&apos;t a slogan — it&apos;s a way
                of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Our Core Values
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Three pillars that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Transparency",
                desc: "Complete supply chain visibility. Every product links to its farm, farmer, harvest date, and quality report. No hidden processes, no black boxes.",
                features: [
                  "Batch tracking codes on every package",
                  "Farmer profiles with farm photos",
                  "Quality test results publicly available",
                  "Real-time order tracking",
                ],
              },
              {
                icon: "🏛️",
                title: "Heritage Preservation",
                desc: "We protect Kerala's traditional farming techniques, heirloom crop varieties, and ancestral food processing methods that have been perfected over centuries.",
                features: [
                  "Stone-ground spices (no machines)",
                  "Chekku-pressed coconut oil",
                  "Heirloom rice varieties preserved",
                  "Traditional recipes documented",
                ],
              },
              {
                icon: "🤝",
                title: "Farmer Prosperity",
                desc: "Fair trade is our non-negotiable. We pay farmers 20-40% above market price, provide advance payments, and invest in their farm infrastructure.",
                features: [
                  "20-40% above-market pricing",
                  "Advance payments before harvest",
                  "Organic certification sponsorship",
                  "Farm infrastructure support",
                ],
              },
            ].map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-slate-50 hover:bg-kumbil-secondary/50 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {value.desc}
                </p>
                <ul className="space-y-2">
                  {value.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <svg className="w-4 h-4 text-kumbil-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Highlight */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Our Farmer Community
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                className="p-6 rounded-2xl bg-white shadow-soft hover:shadow-premium transition-all"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-4 ring-kumbil-primary/10">
                  <img
                    src={farmer.photo}
                    alt={farmer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  {farmer.name}
                </h3>
                <p className="text-xs text-kumbil-primary font-semibold">
                  {farmer.farmName}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {farmer.village}, {farmer.region}
                </p>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  {farmer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-kumbil-secondary">
        <div className="container-tight text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Join the Kumbil Family
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-8">
            Experience the taste of authentic Kerala. Eat For Health — shop our
            premium organic products today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-semibold shadow-xl shadow-kumbil-primary/25 hover:shadow-2xl transition-all"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}
