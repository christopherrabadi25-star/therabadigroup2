import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, TEAM, formatDate, formatPrice } from "@/lib/data";
import { MARKHAM } from "@/lib/markham";
import { ParallaxImage, Reveal } from "@/components/Motion";
import PhotoGallery from "@/components/PhotoGallery";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Just Sold: 303 Markham Pl, Pasadena | $4,675,000",
  description:
    "The Rabadi Group represented the buyer of 303 Markham Pl, a 1901 Colonial Revival estate in Pasadena's Governor Markham Landmark District. Under contract in two days, closed October 26, 2026 at $4,675,000.",
  alternates: { canonical: `/listings/${MARKHAM.slug}` },
  openGraph: {
    title: "Just Sold: 303 Markham Pl, Pasadena",
    description: "A 1901 Colonial Revival in Pasadena's Governor Markham Landmark District. Closed at $4,675,000 for our buyer.",
    images: [MARKHAM.hero],
  },
};

export default function MarkhamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: "303 Markham Pl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "303 Markham Pl",
      addressLocality: "Pasadena",
      addressRegion: "CA",
      postalCode: "91105",
      addressCountry: "US",
    },
    yearBuilt: 1901,
    numberOfRooms: 4,
    floorSize: { "@type": "QuantitativeValue", value: 4080, unitCode: "FTK" },
    image: MARKHAM.hero,
    description: metadata.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-onyx text-ivory">
        <ParallaxImage src={MARKHAM.hero} fallback={MARKHAM.heroFallback} alt="303 Markham Pl, a 1901 Colonial Revival estate in Pasadena" preload strength={8} />
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/70 via-onyx/20 to-transparent" />
        <div className="wrap relative pb-14 pt-[calc(var(--header-h)+40px)] md:pb-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-champagne/60 bg-onyx/40 px-4 py-1.5 text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-champagne backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Just sold
            </p>
          </Reveal>
          <Reveal delay={0.1} y={30}>
            <p className="num mt-6 text-[clamp(3.6rem,13vw,9.5rem)] leading-[0.9]">{formatPrice(MARKHAM.price)}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="display mt-5 text-[clamp(2rem,6vw,3.6rem)]">303 Markham Place</h1>
            <p className="lead mt-3 text-ivory/85">
              A 1901 Colonial Revival in Pasadena&apos;s {MARKHAM.district}. Represented the buyer. Closed {formatDate(MARKHAM.closed, "full")}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Key facts */}
      <section aria-label="Key facts" className="border-b border-ivory/10 bg-onyx">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-20">
          {MARKHAM.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="num text-[clamp(2.4rem,6vw,3.8rem)] leading-none text-champagne">{f.value}</dd>
              <dd className="mt-2 text-[1rem] text-ivory/75">{f.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* The house */}
      <section className="section bg-onyx">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="h-section max-w-[14ch]">125 years on Markham Place</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose-body text-[1.1rem] leading-relaxed text-ivory/85">
              <p>
                One block off South Orange Grove, Pasadena&apos;s old Millionaires&apos; Row. Homes here almost never come up.
              </p>
              <p>
                Attributed to Herbert L. Smith, renovated in 2016 by James V. Coane. Under contract for our buyer in two days.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {MARKHAM.specs.map((s) => (
                <li key={s} className="rounded-full border border-ivory/20 px-4 py-1.5 text-[0.92rem] text-ivory/85">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section aria-label="Photos" className="bg-onyx pb-20 md:pb-32">
        <div className="wrap">
          <PhotoGallery photos={[...MARKHAM.photos]} />
        </div>
      </section>

      {/* History timeline */}
      <section className="light section">
        <div className="wrap">
          <Reveal>
            <p className="kicker text-champagne-deep">The history</p>
            <h2 className="h-section mt-3 max-w-[18ch]">A governor, a landmark district, and a house from 1901</h2>
          </Reveal>
          <ol className="relative mt-14 border-l border-ink/15 pl-8 md:mt-20 md:pl-14">
            {MARKHAM.timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 0.05} className="relative pb-12 last:pb-0 md:pb-16">
                <span className="absolute -left-[37px] top-3 h-2.5 w-2.5 rounded-full bg-champagne-deep md:-left-[61px]" />
                <div className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-10">
                  <p className="num text-[clamp(2.2rem,5vw,3.2rem)] leading-none text-champagne-deep">{t.year}</p>
                  <div>
                    <h3 className="text-[1.3rem] font-semibold">{t.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-ink-soft">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Agents */}
      <section className="light-2 section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="h-section max-w-[16ch]">Looking for a house like this one?</h2>
            <p className="lead mt-5 text-ink-soft">
              Historic Pasadena homes rarely last. We move fast.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BUSINESS.phoneHref} className="btn btn-dark">
                <PhoneIcon size={17} /> {BUSINESS.phone}
              </a>
              <Link href="/listings" className="link-more self-center">
                All our sales
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
                {BUSINESS.brokerage}, {BUSINESS.brokerageCity}. Represented the buyer.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactPanel heading="Buying or selling in Pasadena?" intro="Tell us what you are looking for. We will reply the same day." />
    </>
  );
}
