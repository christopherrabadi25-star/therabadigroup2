import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { TEAM, BUSINESS, STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | The Rabadi Group",
  description:
    "Meet Ramzi and Christopher Rabadi — a father-and-son luxury real estate team with $100M+ in closed transactions and 20+ years of Southern California experience. CA DRE #01738777 | #02246356.",
  openGraph: {
    title: "About The Rabadi Group | Southern California Luxury Real Estate",
    description:
      "Father-and-son luxury real estate team. $100M+ in closed transactions. 20+ years experience.",
  },
};

const teamSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TEAM.map((member, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: member.name,
      jobTitle: member.title,
      worksFor: {
        "@type": "RealEstateAgent",
        name: "The Rabadi Group",
      },
      description: member.bio,
      telephone: "+16262031372",
      image: member.image,
    },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase">
              The Team
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The People
            <br />
            Behind the Deals
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            A father-and-son team. Veteran experience meets next-generation strategy.
            Together, we bring a depth of expertise that few agencies can match —
            across luxury residential, commercial, and investment real estate.
          </p>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Stats */}
      <section className="py-14 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-3xl font-bold gold-grad mb-1"
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

      {/* Team members */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative ${i % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Gold accent */}
                <div
                  className={`absolute -bottom-4 ${i % 2 === 0 ? "-right-4" : "-left-4"} w-32 h-32 border-2 border-[#C9A84C]/20 rounded-xl -z-10`}
                />
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-2">
                  {member.title}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {member.name}
                </h2>
                <p className="text-gray-600 text-sm mb-6">{member.dre}</p>

                {/* Stats row */}
                <div className="flex gap-6 mb-8 pb-8 border-b border-[#2A2A2A]">
                  {member.stats.map((stat, j) => (
                    <div key={j}>
                      <p
                        className="text-2xl font-bold text-[#C9A84C]"
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

                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((spec, j) => (
                      <span
                        key={j}
                        className="text-sm text-gray-400 border border-[#2A2A2A] hover:border-[#C9A84C]/40 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={BUSINESS.phoneHref}
                    className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4B866] text-black font-semibold px-6 py-3 rounded transition-all duration-200"
                  >
                    Work with Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Roots */}
      <section className="py-20 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C4953A]" />
            <span className="eyebrow">Claremont, California</span>
            <div className="h-px w-8 bg-[#C4953A]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Deep Roots in the San Gabriel Valley
          </h2>
          <p className="text-[#7A7570] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            The Rabadi family has called the San Gabriel Valley home for decades. Ramzi and Christopher know this community — the streets, the schools, the neighborhoods, the people. That local knowledge is what separates good agents from the right agent.
          </p>
          <div className="inline-flex flex-col items-center gap-1">
            <p className="text-white font-medium">{BUSINESS.brokerage}</p>
            <p className="text-[#5A5550] text-sm">{BUSINESS.brokerageCity}</p>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Work Together?"
        sub="Call or text us. We respond fast and talk straight."
        primaryLabel={`Call ${BUSINESS.phone}`}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Us"
        secondaryHref={BUSINESS.smsHref}
      />
    </>
  );
}
