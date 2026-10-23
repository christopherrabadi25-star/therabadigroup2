import type { Metadata } from "next";
import { BUSINESS, REGIONS, formatPrice, formatDate, salesIn } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import { PHOTOS } from "@/lib/data";
import ContactPanel from "@/components/ContactPanel";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "The Rabadi Group sells homes in Claremont, La Verne, Pasadena, Sierra Madre, Monrovia, Glendora, Los Feliz, the Hollywood Hills, West Hollywood, Beverly Hills, Dana Point, and Laguna Beach.",
  alternates: { canonical: "/areas" },
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

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
      <PageIntro
        title="Where we work"
        lead="Every area we work in, and what we've sold there."
        image={PHOTOS.markham2}
        fallback="/images/la-verne-new.jpg"
        imageAlt="A Pasadena estate we sold"
      />

      {REGIONS.map((r, ri) => (
        <section key={r.name} id={slug(r.name)} className={ri % 2 ? "light section" : "section bg-onyx"}>
          <div className="wrap">
            <Reveal>
              <h2 className="h-section max-w-[18ch]">{r.name}</h2>
              <p className={`lead mt-5 ${ri % 2 ? "text-ink-soft" : "text-ivory/75"}`}>{r.note}</p>
            </Reveal>
            <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
              {r.cities.map((c, ci) => {
                const sold = salesIn(c.name);
                return (
                  <Reveal as="li" key={c.name} delay={(ci % 2) * 0.08} className="border-t border-current/15 py-8">
                    <h3 id={slug(c.name)} className="text-[2rem]">
                      {c.name}
                    </h3>
                    <p className="mt-2 opacity-75">{c.desc}</p>
                    {sold.length > 0 && (
                      <ul className="mt-5 space-y-1.5 text-[0.97rem]">
                        {sold.map((s) => (
                          <li key={s.slug} className="flex justify-between gap-4">
                            <span>
                              {s.address} <span className="opacity-60">{formatDate(s.date)}</span>
                            </span>
                            <span className="num shrink-0 text-[1.15rem]">{formatPrice(s.price, true)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <ContactPanel heading="Looking in a particular area?" intro="Tell us where and what you need. We'll share what's realistic there right now." defaultTopic="Buying a home" />
    </>
  );
}
