"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlist";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { items, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Fetch session
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setSession(data.session));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide main navbar on admin pages except login
  if (pathname?.startsWith("/admin") && pathname !== "/admin/login") {
    return null;
  }

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "Track Order", href: "/track" },
    { label: "Our Story", href: "/about" },
  ];

  const isHomePage = pathname === "/";
  const showScrolledStyle = isScrolled || !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showScrolledStyle
          ? "py-3 bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kumbil-primary to-kumbil-primary-light flex items-center justify-center shadow-lg shadow-kumbil-primary/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
                showScrolledStyle ? "text-kumbil-primary-dark" : "text-white"
              }`}>
                KUMBIL
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-all tracking-wide ${
                    pathname === link.href
                      ? "text-kumbil-primary"
                      : showScrolledStyle
                      ? "text-slate-700 hover:text-kumbil-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Search */}
            <button
              className={`p-2.5 transition-all rounded-xl ${
                showScrolledStyle 
                  ? "text-slate-600 hover:text-kumbil-primary hover:bg-slate-100/50" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`p-2.5 transition-all relative rounded-xl ${
                showScrolledStyle 
                  ? "text-slate-600 hover:text-kumbil-primary hover:bg-slate-100/50" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce-in">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className={`p-2.5 transition-all relative rounded-xl ${
                showScrolledStyle 
                  ? "text-slate-600 hover:text-kumbil-primary hover:bg-slate-100/50" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {mounted && items.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-kumbil-primary text-[10px] font-bold text-white flex items-center justify-center animate-bounce-in">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Account/Login */}
            {session ? (
              <Link
                href={session.role === "admin" ? "/admin" : "/account"}
                className={`p-2.5 transition-all rounded-xl flex items-center gap-2 group ${
                  showScrolledStyle 
                    ? "text-slate-600 hover:text-kumbil-primary hover:bg-slate-100/50" 
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Account"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden xl:block text-xs font-black uppercase tracking-widest">{session.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    showScrolledStyle 
                      ? "text-slate-600 hover:text-kumbil-primary" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                    showScrolledStyle 
                      ? "bg-slate-900 text-white hover:bg-slate-800" 
                      : "bg-white text-kumbil-primary hover:bg-slate-100"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 transition-all rounded-xl ${
                showScrolledStyle 
                  ? "text-slate-600 hover:text-kumbil-primary hover:bg-slate-100/50" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-2xl p-6 space-y-4 animate-fade-in z-[60]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-bold transition-all ${
                pathname === link.href ? "text-kumbil-primary" : "text-slate-800 hover:text-kumbil-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            {session ? (
              <>
                <Link
                  href={session.role === "admin" ? "/admin" : "/account"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-black text-slate-900"
                >
                  {session.role === "admin" ? "Admin Panel" : "My Account"}
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="block text-lg font-bold text-pink-500"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-black text-slate-800"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 bg-slate-900 text-white text-center rounded-2xl font-black uppercase tracking-widest"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
