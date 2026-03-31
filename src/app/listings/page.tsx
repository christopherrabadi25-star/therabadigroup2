import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { LISTINGS, BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Properties | The Rabadi Group",
  description:
    "Explore The Rabadi Group's portfolio of closed transactions — from $7.4M Hollywood Hills estates to $6.3M Dana Point beachfront. $100M+ in closed transactions across Southern California.",
  openGraph: {
    title: "Property Portfolio | The Rabadi Group",
    description:
      "$100M+ in closed transactions. Hollywood Hills, Beverly Hills, Dana Point, and more.",
  },
};

export default function ListingsPage() {
  const totalVolume = LISTINGS.reduce((acc, l) => {
    const num = parseFloat(l.price.replace(/[$,]/g, ""));
    return acc + num;
  }, 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase">
              Closed Transactions
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            Every deal on this page is real. Every number is verified. This is
            what $100M+ in closed volume looks like — from Hollywood Hills
            estates to Dana Point beachfront.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: "$100M+", label: "Total Closed Volume" },
              { value: "35+", label: "Transactions" },
              { value: "$1.7M", label: "Avg. Sale Price" },
              { value: "15+", label: "Cities Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-3xl font-bold gold-grad"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Listings grid */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LISTINGS.map((listing, i) => (
              <article
                key={i}
                className="card-hover group bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={`${listing.address}, ${listing.city}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 rounded">
                      {listing.status}
                    </span>
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded backdrop-blur-sm">
                      {listing.date}
                    </span>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {listing.price}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[#C9A84C] text-xs tracking-wide uppercase mb-1">
                    {listing.neighborhood}
                  </p>
                  <h2 className="text-lg font-semibold text-white mb-0.5">
                    {listing.address}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{listing.city}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {listing.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                    <span className="text-xs text-gray-600">{listing.role}</span>
                    <a
                      href={BUSINESS.phoneHref}
                      className="text-xs text-[#C9A84C] hover:text-[#D4B866] transition-colors"
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zillow badge section */}
      <section className="py-16 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-4">Verified on Zillow</p>
          <div className="inline-flex items-center gap-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-8 py-5">
            <div className="text-4xl">⭐</div>
            <div className="text-left">
              <p
                className="text-3xl font-bold text-[#C9A84C]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                5.0
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Zillow Rating · 35+ Transactions
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-6 max-w-xl mx-auto">
            Every sale in our portfolio is backed by real client relationships.
            Our 5.0 Zillow rating reflects what happens when you prioritize
            results over everything else.
          </p>
          <a
            href={BUSINESS.zillow}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-[#C9A84C] hover:text-[#D4B866] transition-colors"
          >
            View on Zillow →
          </a>
        </div>
      </section>

      <CTABanner
        headline="We Know How to Close"
        sub="4.2% above asking for sellers. Below-ask acquisitions for buyers. Let us show you what's possible."
        primaryLabel={`Call ${BUSINESS.phone}`}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Us"
        secondaryHref={BUSINESS.smsHref}
      />
    </>
  );
}
