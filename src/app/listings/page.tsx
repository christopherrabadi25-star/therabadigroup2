import type { Metadata } from "next";
import { SALES_BY_DATE, formatDate, formatPrice, placeLabel } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";

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
        title="Sold homes"
        lead="Every sale here closed with Ramzi or Christopher on the deal, from a Monrovia townhome to a $7.4M Hollywood Hills landmark. Newest first."
      />

      <section className="section !pt-10 md:!pt-16">
        <div className="wrap">
          <h2 className="sr-only">Featured sales</h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <SaleCard key={s.slug} sale={s} preload={i < 2} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" showDescription />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section">Every sale on record</h2>
          <p className="lead mt-4 text-ink-soft">
            Residential sales from public records, newest first. Commercial and off-market deals are not listed.
          </p>
          <div className="mt-10 space-y-12">
            {[...byYear.entries()].map(([year, list]) => (
              <div key={year} className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-10">
                <h3 className="num text-[2rem] leading-none text-brass-ink">{year}</h3>
                <ul>
                  {list.map((s) => (
                    <li
                      key={s.slug}
                      className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-line py-4 first:border-t-0 first:pt-0 md:grid-cols-[1.3fr_1fr_170px_130px] md:items-baseline md:gap-x-8"
                    >
                      <p className="font-semibold">{s.address}</p>
                      <p className="num text-right text-[1.3rem] leading-none md:order-4">{formatPrice(s.price)}</p>
                      <p className="text-ink-soft md:order-2">{placeLabel(s)}</p>
                      <p className="text-right text-[0.95rem] text-ink-soft md:order-3 md:text-left">
                        {s.side} side, {formatDate(s.date)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel heading="Thinking about selling?" intro="We'll show you what similar homes near you have sold for and what yours could bring." defaultTopic="Find out what my home is worth" />
    </>
  );
}
