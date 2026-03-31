import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <Image
        src="https://therabadigroup.com/assets/team-hero-bg-Cpz6m23g.png"
        alt="The Rabadi Group — La Verne, Claremont & SGV Real Estate Specialists"
        fill priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4953A] to-transparent opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pb-16 md:pb-24">
        <div className="max-w-[640px]">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeIn 0.6s ease both 0.1s" }}
          >
            <div className="h-px w-6 bg-[#C4953A]" />
            <span className="eyebrow">La Verne · Claremont · SGV · All of SoCal</span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(2rem,5vw,3.8rem)] text-[#EDE8DC] mb-6"
            style={{ animation: "fadeUp 0.7s ease both 0.2s" }}
          >
            Your SGV &amp; Foothill Cities<br />
            <span className="gold-grad">Real Estate Specialists.</span>
          </h1>

          {/* Sub */}
          <div style={{ animation: "fadeUp 0.7s ease both 0.35s" }}>
            <p className="text-[#9A9690] text-lg leading-relaxed mb-1 max-w-[500px]">
              Ramzi and Christopher Rabadi — born and raised in the area. $100M+ closed across La Verne, Claremont, the SGV, and all of Southern California.
            </p>
            <p className="text-[#5A5550] text-base mb-8">
              All price ranges. Every neighborhood. We know this market cold.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3 mb-12"
            style={{ animation: "fadeUp 0.7s ease both 0.45s" }}
          >
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-gold btn-lg"
              style={{ animation: "pulse-gold 3s ease infinite 2s" }}
            >
              <PhoneIcon />
              Call {BUSINESS.phone}
            </a>
            <Link href="/sellers" className="btn btn-outline btn-lg">
              What&apos;s My Home Worth?
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-x-7 gap-y-4 border-t border-white/[0.08] pt-7"
            style={{ animation: "fadeUp 0.7s ease both 0.55s" }}
          >
            {[
              ["$100M+", "Closed Volume"],
              ["5.0 ★",  "Zillow Rating"],
              ["4.2%",   "Above Ask Avg"],
              ["20+",    "Years Active"],
              ["SGV",    "Home Market"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="text-xl font-bold text-[#C4953A] serif leading-none">{n}</p>
                <p className="text-[10px] text-[#444] uppercase tracking-[0.15em] mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
