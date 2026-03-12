import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-slate-800">
          {/* Branding */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white tracking-tighter mb-6">
              Kumbil — Eat For Health
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Premium marketplace for Kerala&apos;s organic heritage produce.
              Connecting generational farmers with health-conscious families
              worldwide.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter", "whatsapp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-kumbil-primary hover:text-white transition-all shadow-lg"
                  aria-label={social}
                >
                  <span className="capitalize text-[10px] font-bold">{social.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/shop?category=spices" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Organic Spices</Link>
              </li>
              <li>
                <Link href="/shop?category=coffee" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Premium Coffee</Link>
              </li>
              <li>
                <Link href="/shop?category=traditional" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Traditional Items</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Health Blog</Link>
              </li>
              <li>
                <Link href="/track" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Track Order</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-kumbil-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Kumbil Warehouse, Kalpetta, Wayanad, Kerala 673121
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <p className="text-sm text-slate-400">hello@kumbil.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <p className="text-sm text-slate-400">+91 9988776655</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Kumbil Inc. All rights reserved.
          </p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">FSSAI</div>
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">ISO</div>
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">USDA</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
