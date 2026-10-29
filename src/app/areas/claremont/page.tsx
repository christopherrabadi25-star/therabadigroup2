import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES_BY_DATE, TEAM, formatPrice, saleStatus } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";
import { PhoneIcon } from "@/components/Icons";
import { Reveal } from "@/components/Motion";

const URL = `${BUSINESS.url}/areas/claremont`;

export const metadata: Metadata = {
  title: { absolute: "Claremont Realtor | The Rabadi Group, Claremont CA Real Estate" },
  description:
    "Ramzi and Christopher Rabadi are Claremont realtors based at 940 W Foothill Blvd. Buying or selling in the Village, north Claremont, or near the Colleges? $110M+ closed. Call (626) 203-1372.",
  alternates: { canonical: "/areas/claremont" },
  openGraph: {
    title: "Claremont Realtor | The Rabadi Group",
    description: "Father and son real estate team with an office on Foothill Boulevard in Claremont. $110M+ closed.",
    url: URL,
    images: [{ url: "/images/claremont.jpg" }],
  },
};

const NEIGHBORHOODS = [
  {
    name: "The Village and Old Claremont",
    body: "Tree-lined blocks of Craftsmans, Spanish Revival, and mid-century homes within walking distance of Village restaurants, the Packing House, and the Colleges. Well-priced homes here draw multiple offers, so preparation and timing matter.",
  },
  {
    name: "North Claremont and the foothills",
    body: "Larger lots, custom and semi-custom homes, and mountain views along the base of the San Gabriels. Inventory is thin, and many of the best homes trade quietly between people who already know each other.",
  },
  {
    name: "Near the Claremont Colleges",
    body: "Faculty, staff, and families who want the college-town setting. Buyers here tend to be patient and analytical, and they expect clean disclosures and pricing backed by real comparable sales.",
  },
  {
    name: "South and east Claremont",
    body: "The most accessible way into a Claremont address and Claremont Unified schools: older homes, smaller lots, and room to add value over time.",
  },
];

const REASONS = [
  { title: "Our office is here", body: `${BUSINESS.brokerage}, ${BUSINESS.address.full}. You can walk in, and when you call, Ramzi or Christopher answers.` },
  { title: "Two agents on every deal", body: "Ramzi brings 20+ years of negotiating. Christopher runs the comps, research, and marketing. You get both on your sale or purchase." },
  { title: "Pricing from real sales", body: "We value homes street by street from recent closed sales, not automated estimates, and we tell you honestly what the market will pay." },
  { title: "Reach beyond the foothills", body: "Our buyers and sellers come from Pasadena, Los Angeles, and the coast. That network helps Claremont listings reach people who aren't scrolling local search." },
];

const NEARBY = ["Claremont", "La Verne", "Upland", "Pomona", "Glendora", "San Dimas"];

const CLAREMONT_FAQS = [
  {
    question: "Who is a good realtor in Claremont, CA?",
    answer:
      "The Rabadi Group is a father-and-son team, Ramzi and Christopher Rabadi, based at Agency 8 Real Estate Group, 940 W Foothill Blvd in Claremont. The team has $110M+ in closed sales and 20+ years in Southern California real estate. Call or text (626) 203-1372.",
  },
  {
    question: "How much is my Claremont home worth?",
    answer:
      "Send us your address or call (626) 203-1372. We pull the closest recent sales on and around your street and send a value range at no cost, with an honest note on what would move it up or down.",
  },
  {
    question: "Which parts of Claremont do you work in?",
    answer:
      "All of it: the Village and Old Claremont, north Claremont and the foothills, the neighborhoods around the Claremont Colleges, and south and east Claremont. We also work across La Verne, Upland, San Dimas, Glendora, and Pomona.",
  },
  {
    question: "Do you help buyers in Claremont, or only sellers?",
    answer:
      "Both. Most of our recent closings have been on the buyer side, including a $4,675,000 Pasadena estate in October 2026. In Claremont we help buyers write offers that compete without overpaying.",
  },
] as const;

export default function ClaremontPage() {
  const sales = SALES_BY_DATE.filter((s) => NEARBY.includes(s.area)).slice(0, 8);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: BUSINESS.name,
    url: URL,
    telephone: "+16262031372",
    image: `${BUSINESS.url}/images/claremont.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: "Claremont", containedInPlace: { "@type": "State", name: "California" } },
    employee: TEAM.map((m) => ({ "@type": "Person", name: m.name, ...(m.zillow ? { sameAs: [m.zillow] } : {}) })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
      { "@type": "ListItem", position: 2, name: "Areas", item: `${BUSINESS.url}/areas` },
      { "@type": "ListItem", position: 3, name: "Claremont", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageIntro
        title="Claremont real estate"
        lead="Father and son realtors with an office on Foothill Boulevard. Buying or selling in Claremont, we're down the street."
        image="/images/claremont.jpg"
        imageAlt="A tree-lined street in Claremont, California"
      >
        <a href={BUSINESS.phoneHref} className="btn btn-light">
          <PhoneIcon size={16} /> {BUSINESS.phone}
        </a>
        <Link href="#contact" className="btn btn-glass">
          What is my home worth?
        </Link>
      </PageIntro>

      <section className="light section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <Reveal>
            <h2 className="h-section">Your Claremont realtors</h2>
          </Reveal>
          <Reveal delay={0.1} className="prose-body text-[1.12rem]">
            <p>
              Claremont doesn&apos;t behave like the rest of the San Gabriel Valley. The Village, the Claremont Colleges,
              Claremont Unified schools, and the foothills draw a buyer who cares about walkability, architecture, and
              community as much as square footage. Pricing a home here means knowing the block, not just the zip code.
            </p>
            <p className="text-ink-soft">
              The Rabadi Group is Ramzi and Christopher Rabadi, a father and son team at {BUSINESS.brokerage} in
              Claremont. Together we have $110M+ in closed sales across Southern California, from the foothill cities to
              Pasadena, Los Angeles, and the coast.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12 max-w-[18ch]">Claremont, neighborhood by neighborhood</h2>
          </Reveal>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {NEIGHBORHOODS.map((n, i) => (
              <Reveal as="li" key={n.name} delay={(i % 2) * 0.08} className="border-t border-ivory/15 py-8">
                <h3 className="text-[1.8rem]">{n.name}</h3>
                <p className="mt-2 text-ivory/75">{n.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="light-2 section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">Why work with us in Claremont</h2>
          </Reveal>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 2) * 0.08} className="border-t border-ink/15 py-6">
                <h3 className="text-[1.6rem]">{r.title}</h3>
                <p className="mt-2 text-ink-soft">{r.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {sales.length > 0 && (
        <section className="section bg-onyx">
          <div className="wrap">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="h-section">Sold in Claremont and nearby</h2>
              </Reveal>
              <Link href="/listings" className="link-more">
                Full sales history
              </Link>
            </div>
            <ul className="space-y-1.5 text-[1.02rem]">
              {sales.map((s) => (
                <li key={s.slug} className="flex justify-between gap-4 border-t border-ivory/10 py-3">
                  <span>
                    {s.address}, {s.city} <span className="text-ivory/60">{saleStatus(s, "")}, represented the {s.side.toLowerCase()}</span>
                  </span>
                  <span className="num shrink-0 text-[1.15rem]">{formatPrice(s.price, true)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ heading="Claremont questions" items={CLAREMONT_FAQS} />

      <section className="light section !pt-0">
        <div className="wrap">
          <Link href="/blog/claremont-ca-home-buyers-guide-2025" className="link-more">
            Read our Claremont buyers guide
          </Link>
        </div>
      </section>

      <ContactPanel
        heading="Buying or selling in Claremont?"
        intro="Send the address or tell us what you're looking for. We'll reply with an honest read on the Claremont market right now."
        defaultTopic="A value for my home"
      />
    </>
  );
}
