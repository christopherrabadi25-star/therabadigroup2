import type { Metadata } from "next";
import { PHOTOS, SALES_BY_DATE, formatPrice, placeLabel, saleStatus } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Sold Homes",
  description:
    "Homes The Rabadi Group has sold, newest first: 602 N Michillinda Ave in Sierra Madre ($1.58M), 4426 Cromwell Ave in Los Feliz ($4.495M), 1411 Rising Glen Rd ($7.4M), 35099 Beach Rd in Dana Point ($6.3M) and more.",
  alternates: { canonical: "/listings" },
};

export default function ListingsPage() {
  const featured = SALES_BY_DATE.filter((s) => s.featured);
  const byYear = new Map<string, typeof SALES_BY_DATE>();
  for (const s of SALES_BY_DATE) {
    const y = s.date.slice(0, 4);
    byYear.set(y, [...(byYear.get(y) ?? []), s]);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Homes sold by The Rabadi Group",
    itemListElement: SALES_BY_DATE.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Residence",
        name: `${s.address}, ${s.city}, CA`,
        address: { "@type": "PostalAddress", streetAddress: s.address, addressLocality: s.city, addressRegion: "CA" },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro
        title="Our sales"
        lead="Every home we've closed, newest first."
        image={PHOTOS.cromwellExterior}
        fallback="/images/rising-glen.jpg"
        imageAlt="A Los Feliz estate we sold in 2026"
        position="40% 55%"
      />

      <section className="section bg-onyx">
        <div className="wrap">
          <h2 className="sr-only">Featured sales</h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <SaleCard sale={s} preload={i < 2} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" showDescription />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="light section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">Sales history</h2>
            <p className="lead mt-5 text-ink-soft">
              Residential sales from public records. Commercial and off-market deals are not listed.
            </p>
          </Reveal>
          <div className="mt-14 space-y-14">
            {[...byYear.entries()].map(([year, list]) => (
              <Reveal key={year} className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-10">
                <h3 className="num text-[2.4rem] leading-none text-champagne-deep">{year}</h3>
                <ul>
                  {list.map((s) => (
                    <li
                      key={s.slug}
                      className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-ink/12 py-4 first:border-t-0 first:pt-1 md:grid-cols-[1.3fr_1fr_180px_140px] md:items-baseline md:gap-x-8"
                    >
                      <p className="font-medium">{s.address}</p>
                      <p className="num text-right text-[1.35rem] leading-none md:order-4">{formatPrice(s.price)}</p>
                      <p className="text-ink-soft md:order-2">{placeLabel(s)}</p>
                      <p className="text-right text-[0.92rem] text-ink-soft md:order-3 md:text-left">
                        {s.side === "Buyer" ? "Buyer" : "Seller"}, {saleStatus(s, "")}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel heading="Thinking of selling?" intro="We'll tell you what your home could sell for, based on real comps." />
    </>
  );
}
