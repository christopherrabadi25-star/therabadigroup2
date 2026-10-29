import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, TEAM, formatDate } from "@/lib/data";
import { GLENDORA_DUPLEX as L, listingNumbers, usd } from "@/lib/listings";
import { Reveal } from "@/components/Motion";
import ContactPanel from "@/components/ContactPanel";
import PrintButton from "@/components/PrintButton";
import { PhoneIcon } from "@/components/Icons";

const n = listingNumbers(L);
const pct = (v: number) => `${v.toFixed(2)}%`;

export const metadata: Metadata = {
  title: `Coming Soon: ${L.address}, ${L.city} | Duplex ${usd(L.price)}`,
  description: `Coming soon: a two-unit duplex at ${L.address} in ${L.city}, offered at ${usd(L.price)}. ${usd(n.monthly)} a month in current rents. Investment brochure with rent roll, GRM and pro forma.`,
  alternates: { canonical: `/listings/${L.slug}` },
};

export default function GlendoraDuplexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    price: L.price,
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
    itemOffered: {
      "@type": "Place",
      name: `${L.address}, ${L.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: L.address,
        addressLocality: L.city,
        addressRegion: "CA",
        postalCode: L.zip,
        addressCountry: "US",
      },
    },
  };

  const keyFacts = [
    { value: usd(L.price), label: "Offered at" },
    { value: usd(n.monthly), label: "Monthly rent, both units" },
    { value: n.grm.toFixed(1), label: "Gross rent multiplier" },
    { value: pct(n.capRate), label: "Est. cap rate" },
  ];

  const property = [
    ["Property type", `${L.type}, ${L.units.length} units`],
    ["Year built", String(L.yearBuilt)],
    ["Building size", `${L.buildingSqft.toLocaleString()} sq ft`],
    ["Lot size", `${L.lotSqft.toLocaleString()} sq ft`],
    ["Bedrooms / baths", `${L.bedsTotal} bed, ${L.bathsTotal} bath total`],
    ["Parking", L.parking],
    ["Zoning", L.zoning],
    ["Price per unit", usd(n.perUnit)],
    ["Price per sq ft", usd(n.perSqft)],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-onyx text-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_10%,#2e2a26_0%,#121110_70%)]" />
        <div className="wrap relative pb-16 pt-[calc(var(--header-h)+56px)] md:pb-24">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-champagne/60 bg-onyx/40 px-4 py-1.5 text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Coming soon
            </p>
          </Reveal>
          <Reveal delay={0.1} y={30}>
            <p className="num mt-6 text-[clamp(3.4rem,12vw,8.5rem)] leading-[0.9]">{usd(L.price)}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="display mt-5 text-[clamp(2rem,6vw,3.6rem)]">{L.address}</h1>
            <p className="lead mt-3 text-ivory/85">
              A {L.yearBuilt} duplex half a block from Citrus College. Two leased units, {usd(n.gross)} a year in current rents.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BUSINESS.phoneHref} className="btn btn-light no-print">
                <PhoneIcon size={16} /> Request the full package
              </a>
              <PrintButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Key numbers */}
      <section aria-label="Key numbers" className="border-y border-ivory/10 bg-onyx text-ivory">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-20">
          {keyFacts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="num text-[clamp(2.2rem,5.5vw,3.6rem)] leading-none text-champagne">{f.value}</dd>
              <dd className="mt-2 text-[1rem] text-ivory/75">{f.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Rent roll + pro forma */}
      <section className="light section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="h-section">Rent roll</h2>
            <table className="mt-8 w-full text-left">
              <thead>
                <tr className="border-b border-ink/20 text-[0.92rem] text-ink-soft">
                  <th className="py-3 font-medium">Unit</th>
                  <th className="py-3 text-right font-medium">Monthly</th>
                  <th className="py-3 text-right font-medium">Annual</th>
                </tr>
              </thead>
              <tbody>
                {L.units.map((u) => (
                  <tr key={u.name} className="border-b border-ink/10">
                    <td className="py-4">
                      {u.name}
                      <span className="block text-[0.85rem] text-ink-soft">{u.layout}</span>
                    </td>
                    <td className="num py-4 text-right text-[1.2rem]">{usd(u.rent)}</td>
                    <td className="num py-4 text-right text-[1.2rem]">{usd(u.rent * 12)}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="py-4">Total</td>
                  <td className="num py-4 text-right text-[1.3rem]">{usd(n.monthly)}</td>
                  <td className="num py-4 text-right text-[1.3rem]">{usd(n.gross)}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-[0.92rem] text-ink-soft">Current rents as reported by the seller.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="h-section">Pro forma</h2>
            <table className="mt-8 w-full text-left">
              <tbody>
                <tr className="border-b border-ink/10">
                  <td className="py-3">Gross scheduled rent</td>
                  <td className="num py-3 text-right text-[1.15rem]">{usd(n.gross)}</td>
                </tr>
                {L.expenses.map((e) => (
                  <tr key={e.label} className="border-b border-ink/10">
                    <td className="py-3">
                      {e.label}
                      <span className="block text-[0.85rem] text-ink-soft">{e.note}</span>
                    </td>
                    <td className="num py-3 text-right text-[1.15rem]">({usd(e.amount)})</td>
                  </tr>
                ))}
                <tr className="border-b border-ink/20 font-semibold">
                  <td className="py-4">Est. net operating income</td>
                  <td className="num py-4 text-right text-[1.3rem]">{usd(n.noi)}</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-3">Est. cap rate at list</td>
                  <td className="num py-3 text-right text-[1.15rem]">{pct(n.capRate)}</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <td className="py-3">Gross yield</td>
                  <td className="num py-3 text-right text-[1.15rem]">{pct(n.grossYield)}</td>
                </tr>
                <tr>
                  <td className="py-3">Gross rent multiplier</td>
                  <td className="num py-3 text-right text-[1.15rem]">{n.grm.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-[0.92rem] text-ink-soft">
              Expenses are estimates for a buyer at list price. Tenants pay their own gas and electric. Buyer to verify all figures.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Comparable sales */}
      <section className="light-2 section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">Comparable sales</h2>
            <p className="lead mt-5 max-w-[60ch] text-ink-soft">
              Duplexes sold nearby in the last 18 months. At {usd(n.gross)} a year, 745 W Foothill rents for {usd(n.gross - L.comps[0].gsi!)} more than 124 N Vista Bonita, the closest Glendora comp.
            </p>
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-ink/20 text-[0.9rem] text-ink-soft">
                  <th className="py-3 pr-4 font-medium">Address</th>
                  <th className="py-3 pr-4 text-right font-medium">Sold price</th>
                  <th className="py-3 pr-4 font-medium">Closed</th>
                  <th className="py-3 pr-4 text-right font-medium">Sq ft</th>
                  <th className="py-3 pr-4 text-right font-medium">$/sq ft</th>
                  <th className="py-3 pr-4 text-right font-medium">Built</th>
                  <th className="py-3 text-right font-medium">GRM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink/20 bg-champagne/10 font-semibold">
                  <td className="py-4 pl-3 pr-4">
                    {L.address}, {L.city}
                    <span className="block text-[0.85rem] font-normal text-ink-soft">This property, at list price</span>
                  </td>
                  <td className="num py-4 pr-4 text-right text-[1.15rem]">{usd(L.price)}</td>
                  <td className="py-4 pr-4">{L.status}</td>
                  <td className="py-4 pr-4 text-right">{L.buildingSqft.toLocaleString()}</td>
                  <td className="py-4 pr-4 text-right">{usd(n.perSqft)}</td>
                  <td className="py-4 pr-4 text-right">{L.yearBuilt}</td>
                  <td className="py-4 pr-3 text-right">{n.grm.toFixed(1)}</td>
                </tr>
                {L.comps.map((c) => (
                  <tr key={c.address} className="border-b border-ink/10">
                    <td className="py-4 pl-3 pr-4">
                      {c.address}, {c.city}
                      {c.note && <span className="block text-[0.85rem] text-ink-soft">{c.note}</span>}
                    </td>
                    <td className="num py-4 pr-4 text-right text-[1.15rem]">{usd(c.price)}</td>
                    <td className="py-4 pr-4">{formatDate(c.closed)}</td>
                    <td className="py-4 pr-4 text-right">{c.sqft.toLocaleString()}</td>
                    <td className="py-4 pr-4 text-right">{usd(c.price / c.sqft)}</td>
                    <td className="py-4 pr-4 text-right">{c.yearBuilt}</td>
                    <td className="py-4 pr-3 text-right">{c.gsi ? (c.price / c.gsi).toFixed(1) : "n/a"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.9rem] text-ink-soft">{L.compsSource} Deemed reliable but not guaranteed.</p>
        </div>
      </section>

      {/* Property */}
      <section className="light section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <h2 className="h-section">The property</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {L.highlights.map((h) => (
                <li key={h} className="rounded-full border border-ink/20 px-4 py-1.5 text-[0.92rem]">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {property.map(([k, v], i) => (
              <Reveal key={k} delay={(i % 2) * 0.06} className="border-t border-ink/15 py-5">
                <dt className="text-[0.92rem] text-ink-soft">{k}</dt>
                <dd className="mt-1 text-[1.25rem] font-medium">{v}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="lg:col-start-2">
            <h3 className="text-[1.1rem] font-semibold">Disclosures</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
              {L.disclosures.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Agents */}
      <section className="light-2 section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="h-section max-w-[16ch]">Get the package before it hits the market</h2>
            <p className="lead mt-5 text-ink-soft">Leases, showing times, and the full offering. Call or text.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BUSINESS.phoneHref} className="btn btn-dark no-print">
                <PhoneIcon size={17} /> {BUSINESS.phone}
              </a>
              <Link href="/commercial" className="link-more self-center no-print">
                Our income property sales
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-4 text-[0.98rem]">
              {TEAM.map((m) => (
                <li key={m.name} className="border-t border-ink/15 pt-4">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-ink-soft">{m.dre}</p>
                </li>
              ))}
              <li className="border-t border-ink/15 pt-4 text-ink-soft">
                {BUSINESS.brokerage}, {BUSINESS.brokerageCity}. Information deemed reliable but not guaranteed. Buyer to independently verify rents, expenses, square footage and zoning.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="no-print">
        <ContactPanel
          heading="Interested in this duplex?"
          intro="Send your name and number. We will send the full package."
          defaultTopic="Commercial or investment"
        />
      </div>
    </>
  );
}
