import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { AREAS, BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Areas Served | The Rabadi Group",
  description:
    "The Rabadi Group serves 15+ cities across Southern California — Beverly Hills, Pasadena, Hollywood Hills, Dana Point, Laguna Beach, La Habra Heights, and more. Luxury real estate experts in every market.",
  openGraph: {
    title: "Areas Served | The Rabadi Group",
    description:
      "Luxury real estate across 15+ Southern California cities. Beverly Hills, Pasadena, Hollywood Hills, Dana Point, Laguna Beach.",
  },
};

const areasSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "The Rabadi Group",
  url: "https://therabadigroup.com",
  areaServed: AREAS.map((area) => ({
    "@type": "City",
    name: area.name,
    containedInPlace: {
      "@type": "State",
      name: "California",
    },
  })),
};

const otherCities = [
  "Arcadia",
  "Monrovia",
  "La Verne",
  "San Dimas",
  "Claremont",
  "Upland",
  "West Hollywood",
  "Bel Air",
  "Pacific Palisades",
  "Rancho Palos Verdes",
  "Newport Beach",
  "San Marino",
  "Glendora",
  "Covina",
];

export default function AreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase">
              Where We Work
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            15+ Cities.
            <br />
            One Standard.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            We know these markets like few agents do — because we've closed deals in
            all of them. From the canyons of La Verne to the beaches of Dana Point.
          </p>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Areas detail */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {AREAS.map((area, i) => (
              <div
                key={i}
                id={area.name.toLowerCase().replace(/\s+/g, "-")}
                className="card-hover group bg-[#141414] border border-[#2A2A2A] hover:border-[#C9A84C]/30 rounded-xl overflow-hidden transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image */}
                  <div className="relative sm:w-56 shrink-0 aspect-square sm:aspect-auto overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 224px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414]/50 sm:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent sm:hidden" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center">
                    <p className="text-[#C9A84C] text-xs tracking-[0.15em] uppercase mb-1">
                      {area.startingFrom}
                    </p>
                    <h2
                      className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {area.name}
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      {area.description}
                    </p>
                    <a
                      href={BUSINESS.phoneHref}
                      className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#D4B866] transition-colors group/link"
                    >
                      Find homes in {area.name}
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional cities */}
      <section className="py-16 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              And Beyond
            </h2>
            <p className="text-gray-400">
              We also serve these markets and more across Los Angeles, Orange County,
              and the Inland Empire.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {otherCities.map((city) => (
              <span
                key={city}
                className="text-sm text-gray-400 border border-[#2A2A2A] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] px-4 py-2 rounded-full transition-colors cursor-default"
              >
                {city}
              </span>
            ))}
            <span className="text-sm text-gray-600 border border-[#1A1A1A] px-4 py-2 rounded-full">
              + Many more
            </span>
          </div>
        </div>
      </section>

      {/* Market insight */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-4">
            Market Expertise
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            We Don't Just Know the Markets — We've Closed In Them
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg mb-10">
            The Rabadi Group has transacted in neighborhoods from Beverly Hills to
            La Verne, Dana Point to the Hollywood Hills. This isn't theoretical
            market knowledge — it's boots-on-the-ground experience from two
            decades of closed deals across Southern California.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                region: "Los Angeles County",
                cities: "Beverly Hills, Hollywood Hills, West Hollywood, Pasadena, Arcadia, Monrovia, La Verne, La Habra Heights",
              },
              {
                region: "Orange County",
                cities: "Dana Point, Laguna Beach, Newport Beach, and the OC coast",
              },
              {
                region: "Inland Empire",
                cities: "Claremont, Upland, San Dimas, Rancho Cucamonga, and surrounding cities",
              },
            ].map((region) => (
              <div
                key={region.region}
                className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-5"
              >
                <p className="text-[#C9A84C] text-xs tracking-wide uppercase mb-2">
                  {region.region}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {region.cities}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Looking in a Specific Market?"
        sub="Tell us where — and what you're looking for. We'll let you know exactly what's possible."
        primaryLabel={`Call ${BUSINESS.phone}`}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Us"
        secondaryHref={BUSINESS.smsHref}
      />
    </>
  );
}
