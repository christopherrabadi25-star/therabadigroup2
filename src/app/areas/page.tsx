import type { Metadata } from "next";
import { BUSINESS, REGIONS } from "@/lib/data";
import { CITIES } from "@/lib/cities";
import PageIntro from "@/components/PageIntro";
import CityTiles from "@/components/CityTiles";
import ContactPanel from "@/components/ContactPanel";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Claremont, La Verne, Glendora, and San Dimas, plus Pasadena, Sierra Madre, Los Angeles, and the Orange County coast. The Rabadi Group, Claremont.",
  alternates: { canonical: "/areas" },
};

const core = new Set(CITIES.map((c) => c.name));

export default function AreasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: BUSINESS.name,
    url: BUSINESS.url,
    areaServed: REGIONS.flatMap((r) =>
      r.cities.map((c) => ({ "@type": "City", name: c.name, containedInPlace: { "@type": "State", name: "California" } })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro title="Where we work" lead="Home base: the foothill cities." image="/images/sgv.jpg" imageAlt="The foothill cities from above" />

      <section aria-label="Our home cities" className="bg-onyx">
        <CityTiles to="areas" />
      </section>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">Also serving</h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {REGIONS.map((r, ri) => (
              <Reveal key={r.name} delay={ri * 0.08}>
                <p className="kicker text-champagne">{r.name}</p>
                <ul className="mt-4">
                  {r.cities
                    .filter((c) => !core.has(c.name))
                    .map((c) => (
                      <li key={c.name} className="border-t border-ivory/10 py-3">
                        {c.name}
                      </li>
                    ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel heading="Looking in a particular area?" intro="Tell us where. We'll tell you what's realistic." defaultTopic="Buying a home" />
    </>
  );
}
