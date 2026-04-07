"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";

const TABS = [
  {
    id: "buy",
    label: "Buy a Home",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
      </svg>
    ),
    href: "/buyers",
    kicker: "Access every listing — including off-market",
    detail: "We know what's coming before it hits Zillow. First home or fifth, we get you in at the right price.",
    cta: "Start Your Search",
    stat: "5.0 ★ Zillow",
  },
  {
    id: "sell",
    label: "Sell a Home",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    href: "/sellers",
    kicker: "We average 4.2% above asking",
    detail: "Precision pricing. Aggressive marketing. A negotiator who doesn't leave money on the table.",
    cta: "Get Free Valuation",
    stat: "4.2% Above Ask",
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="9" height="18" rx="1"/><rect x="13" y="8" width="9" height="13" rx="1"/>
      </svg>
    ),
    href: "/commercial",
    kicker: "$100M+ in commercial transactions closed",
    detail: "Multi-family, industrial, gas stations, ground leases, retail. We handle what most agents won't touch.",
    cta: "Discuss Your Deal",
    stat: "$100M+ Closed",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#050505]">

      {/* Background team photo */}
      <Image
        src="/images/hero-bg.png"
        alt="Ramzi and Christopher Rabadi — The Rabadi Group"
        fill priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Cinematic overlay stack — lighter than before so photo breathes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

      {/* Ambient gold light bloom behind content */}
      <div
        className="absolute left-0 top-1/4 blob blob-gold"
        style={{ width: "600px", height: "600px", opacity: 0.5, animation: "drift 20s ease-in-out infinite" }}
      />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(196,149,58,0.7) 30%, rgba(196,149,58,0.9) 50%, rgba(196,149,58,0.7) 70%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pb-12 md:pb-20 pt-[96px]">
        <div className="max-w-[700px]">

          {/* Location eyebrow */}
          <div className="flex items-center gap-3 mb-6" style={{ animation: "fadeIn 0.6s ease both 0.15s" }}>
            <div className="h-px w-8 bg-[#C4953A]" />
            <span className="eyebrow text-[0.65rem]">La Verne · Claremont · Beverly Hills · All of SoCal</span>
          </div>

          {/* Main headline — dramatic serif */}
          <h1
            className="text-[clamp(2.6rem,6vw,4.8rem)] font-semibold text-[#EDE8DC] leading-[1.08] mb-6"
            style={{ animation: "fadeUp 0.8s ease both 0.25s", letterSpacing: "-0.02em" }}
          >
            Southern California&apos;s<br />
            <span className="gold-grad italic">Real Estate Team.</span>
          </h1>

          <p
            className="text-[#7A7570] text-lg md:text-xl leading-relaxed mb-8 max-w-[520px]"
            style={{ animation: "fadeUp 0.8s ease both 0.35s" }}
          >
            Father and son. Born and raised in the SGV.
            $100M+ closed across all price ranges.
          </p>

          {/* Interactive tab selector */}
          <div style={{ animation: "fadeUp 0.7s ease both 0.45s" }}>

            {/* Tab pills */}
            <div className="flex gap-1 w-fit"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px 10px 0 0",
                padding: "5px 5px 0 5px",
              }}
            >
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-t-lg transition-all duration-200 border-b-2 ${
                    active === i
                      ? "text-black border-[#C4953A] bg-[#C4953A] shadow-[0_4px_16px_rgba(196,149,58,0.3)]"
                      : "text-[#5A5550] border-transparent hover:text-[#EDE8DC] hover:bg-white/5"
                  }`}
                >
                  <span className={active === i ? "text-black" : "text-[#C4953A]"}>{t.icon}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Service panel */}
            <div
              key={tab.id}
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: "1px solid rgba(196,149,58,0.2)",
                borderRadius: "0 10px 10px 10px",
                padding: "20px 24px",
                animation: "fadeIn 0.25s ease both",
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                <div className="flex-1">
                  <p className="text-[#C4953A] text-[0.7rem] font-bold uppercase tracking-widest mb-2">{tab.kicker}</p>
                  <p className="text-[#8A8680] text-sm leading-relaxed">{tab.detail}</p>
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <Link
                    href={tab.href}
                    className="btn btn-gold btn-sm"
                  >
                    {tab.cta} →
                  </Link>
                  <a href={BUSINESS.phoneHref} className="btn btn-outline btn-sm">
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animation: "fadeUp 0.7s ease both 0.6s" }}
          >
            <div className="h-px w-full border-t border-white/[0.06] hidden sm:block" style={{ display: "none" }} />
            {[
              { n: "$100M+", l: "Closed Volume" },
              { n: "5.0 ★", l: "Zillow Rating" },
              { n: "4.2%", l: "Above Ask Avg" },
              { n: "20+", l: "Yrs Experience" },
            ].map(({ n, l }) => (
              <div key={l} className="flex items-center gap-3">
                <p className="text-[1.2rem] font-bold text-[#C4953A] serif leading-none">{n}</p>
                <p className="text-[10px] text-[#3A3834] uppercase tracking-[0.18em]">{l}</p>
              </div>
            ))}
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-gold btn-sm btn-pulse ml-auto hidden md:inline-flex"
            >
              <PhoneIcon /> {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
