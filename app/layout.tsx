import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kumbil — From Nature, With Love",
    template: "%s | Kumbil",
  },
  description:
    "Premium organic spices, rice, oils, and natural foods sourced directly from Kerala farms. Experience authentic flavors delivered to your doorstep.",
  keywords: [
    "organic spices", "Kerala spices", "turmeric", "black pepper",
    "coconut oil", "natural food", "farm to table", "kumbil",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kumbil.in",
    siteName: "Kumbil",
    title: "Kumbil — From Nature, With Love",
    description: "Premium organic spices and natural foods from Kerala farms.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kumbil",
              "url": "https://kumbil.com",
              "logo": "https://kumbil.com/logo.png",
              "slogan": "Eat For Health",
              "description": "Premium organic Kerala products directly from heritage farms.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9988776655",
                "contactType": "customer service"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://kumbil.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kumbil.com/shop?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
