"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero/hero-watering.jpg",
    title: "Misty Spices of Wayanad",
    description: "Experience the purity of Kerala's heritage spices, grown in the misty hills of Wayanad and delivered straight to your kitchen.",
    cta: "Shop Spices",
    link: "/shop?category=spices"
  },
  {
    image: "/images/hero/hero-plowing.jpg",
    title: "Generational Farm Heritage",
    description: "We work directly with traditional farmers who have nurtured these lands for generations using zero-chemical methods.",
    cta: "Our Story",
    link: "/about"
  },
  {
    image: "/images/hero/hero-tractor.jpg",
    title: "Organic Cultural Harvest",
    description: "From wild honey to heirloom grains, discover a curated collection of Kerala's finest organic cultural treasures.",
    cta: "Explore All",
    link: "/shop"
  },
  {
    image: "/images/hero/hero-cultural-harvest.png",
    title: "Wayanad Harvest Festiva",
    description: "Celebrate the vibrant spirit of Wayanad with a festive showcase of traditional foods, organic spices, and authentic farm treasures gathered from the hills and farms of Kerala.",
    cta: "Explore All",
    link: "/shop"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${index === current ? "scale-110" : "scale-100"
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-tight px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${index === current
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none"
                }`}
            >
              {index === current && (
                <>
                  {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-white/90 mb-6 animate-fade-scale">
                    <span className="w-2 h-2 rounded-full bg-kumbil-accent animate-pulse" />
                    {slide.subtitle}
                  </div> */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 font-display tracking-tight">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i === slide.title.split(' ').length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-kumbil-accent via-yellow-300 to-kumbil-accent" : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>

                  <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-8 font-medium">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={slide.link}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-kumbil-primary to-kumbil-primary-light text-white font-black uppercase tracking-widest shadow-xl shadow-kumbil-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      href="/track"
                      className="px-8 py-4 rounded-2xl glass text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      Track Origin
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Trust stats (keep consistent across slides) */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: "50+", label: "Farm Partners" },
              { value: "10K+", label: "Customers" },
              { value: "17+", label: "Products" },
              { value: "100%", label: "Organic" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white leading-none">
                  {s.value}
                </div>
                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-kumbil-accent" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
