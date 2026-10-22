import type { Metadata } from "next";
import { BUSINESS, REGIONS, formatPrice, formatDate, salesIn } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";

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
    areaServed: REGIONS.flatMap((r) => r.cities.map((c) => ({ "@type": "City", name: c.name, containedInPlace: { "@type": "State", name: "California" } }))),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro
        title="Where we work"
        lead="Based in Claremont, closing from the foothills to the coast. Here's each area and what we've sold there."
      />

      <nav aria-label="Regions" className="wrap pt-8">
        <ul className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <li key={r.name}>
              <a href={`#${slug(r.name)}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 no-underline hover:border-ink">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {REGIONS.map((r, ri) => (
        <section key={r.name} id={slug(r.name)} className={`section ${ri % 2 ? "bg-stone" : ""}`}>
          <div className="wrap">
            <h2 className="h-section max-w-[20ch]">{r.name}</h2>
            <p className="lead mt-3 text-ink-soft">{r.note}</p>
            <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
              {r.cities.map((c) => {
                const sold = salesIn(c.name);
                return (
                  <li key={c.name} id={slug(c.name)} className="border-t border-line py-6">
                    <h3 className="text-[1.75rem]">{c.name}</h3>
                    <p className="mt-1 text-ink-soft">{c.desc}</p>
                    {sold.length > 0 && (
                      <ul className="mt-4 space-y-1 text-[0.97rem]">
                        {sold.map((s) => (
                          <li key={s.slug} className="flex justify-between gap-4">
                            <span>
                              {s.address} <span className="text-ink-soft">({formatDate(s.date)})</span>
                            </span>
                            <span className="num shrink-0 text-[1.1rem]">{formatPrice(s.price, true)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <ContactPanel heading="Looking in a specific area?" intro="Tell us where and what you need. We'll tell you what's realistic there right now." defaultTopic="Buy a home" />
    </>
  );
}
