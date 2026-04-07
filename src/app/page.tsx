import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicePaths from "@/components/ServicePaths";
import Stats from "@/components/Stats";
import FeaturedListings from "@/components/FeaturedListings";
import AreasServed from "@/components/AreasServed";
import TeamSection from "@/components/TeamSection";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Rabadi Group | Southern California Luxury Real Estate",
  description:
    "Ramzi and Christopher Rabadi — father-and-son luxury real estate team. $100M+ closed, 5.0 Zillow rating, 20+ years. Beverly Hills, Hollywood Hills, Dana Point, La Verne, Claremont. Call (626) 203-1372.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicePaths />
      <Stats />
      <FeaturedListings />

      <CTABanner
        headline="Sellers: We Average 4.2% Above Asking."
        sub="That's real money left on the table by agents who don't know how to negotiate. We do. Find out what your home is actually worth."
        primaryLabel={`Call ${BUSINESS.phone}`}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Free Home Valuation"
        secondaryHref="/sellers"
      />

      <AreasServed />
      <TeamSection />

      {/* Final contact section */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#060606" }}>
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(196,149,58,0.07) 0%, transparent 70%)" }}
        />
        <div className="absolute top-0 left-0 right-0 rule-gold" />

        <div className="relative max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-5">Ready to Start?</span>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[#EDE8DC] mb-5 mt-4 leading-[1.1]">
            Your Next Move Starts<br />With One Call.
          </h2>
          <p className="text-[#5A5550] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you&apos;re buying, selling, or just figuring out the market — a 10-minute call with us is worth more than hours of Zillow research.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg w-full sm:w-auto btn-pulse">
              <PhoneIcon /> Call (626) 203-1372
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg w-full sm:w-auto">
              <TextIcon /> Text Us Now
            </a>
          </div>
          <p className="text-[#252320] text-xs mt-8 tracking-wider">
            We respond fast. No automated responses. Ramzi or Christopher picks up.
          </p>
        </div>
      </section>

      <FAQ />

      <CTABanner
        headline="15+ Cities. Two Agents. Zero Excuses."
        sub="Wherever your deal is in Southern California, we're the call you want to make."
        primaryLabel={`Call ${BUSINESS.phone}`}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="View Properties"
        secondaryHref="/listings"
        dark
      />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
