"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS, NAV_LINKS } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.04)]" : ""
        }`}
        style={{ background: scrolled ? "rgba(5,5,5,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}
      >
        {/* Gold announcement bar — 36px */}
        <a
          href={BUSINESS.phoneHref}
          className="flex items-center justify-center gap-2 bg-[#C4953A] text-black text-xs font-bold tracking-wide py-2.5 hover:bg-[#D4A84A] transition-colors"
          style={{ minHeight: "36px" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Call or Text — {BUSINESS.phone} — Free Consultations
        </a>

        {/* Nav — 60px */}
        <div className={`border-b transition-colors duration-300 ${scrolled ? "border-[#1A1A1A]" : "border-transparent"}`} style={{ height: "60px" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="group flex flex-col leading-none shrink-0">
              <span
                className="font-bold text-[1.05rem] text-[#EDE8DC] group-hover:text-[#C4953A] transition-colors tracking-wide"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                The Rabadi Group
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#C4953A] mt-0.5 font-semibold">
                La Verne · Claremont · SoCal
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.82rem] font-medium tracking-wide transition-colors duration-200 ${
                    pathname === link.href ? "text-[#C4953A]" : "text-[#9A9690] hover:text-[#EDE8DC]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/sellers"
                className="text-[0.8rem] font-semibold text-[#C4953A] border border-[#C4953A]/25 hover:border-[#C4953A]/60 px-4 py-2 rounded transition-all duration-200"
              >
                Free Valuation
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
              aria-label="Menu"
            >
              <span className={`block w-5 h-[1.5px] bg-[#EDE8DC] origin-center transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[#EDE8DC] transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-[#EDE8DC] origin-center transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`fixed left-0 right-0 z-40 bg-[#080808] border-b border-[#1E1E1E] overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ top: "96px", maxHeight: mobileOpen ? "420px" : "0", opacity: mobileOpen ? 1 : 0 }}
      >
        <div className="px-5 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#C4953A] bg-[#C4953A]/8"
                  : "text-[#B0ACA6] hover:text-[#EDE8DC] hover:bg-white/4"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-[#1E1E1E] flex flex-col gap-2">
            <a href={BUSINESS.phoneHref} className="btn btn-gold justify-center py-4 text-sm">
              Call {BUSINESS.phone}
            </a>
            <a href="/sellers" className="btn btn-outline justify-center py-3 text-sm">
              Free Home Valuation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
