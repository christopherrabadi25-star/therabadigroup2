import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS, SALES_BY_DATE, TEAM, formatPrice, saleStatus } from "@/lib/data";
import { CITIES, getCity, pct } from "@/lib/cities";
import PageIntro from "@/components/PageIntro";
import CityShot from "@/components/CityShot";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";
import { PhoneIcon } from "@/components/Icons";
import { Reveal } from "@/components/Motion";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).city);
  if (!city) return {};
  return {
    title: { absolute: `${city.name} Realtor | The Rabadi Group, ${city.name} CA Real Estate` },
    description: `${city.name} real estate with Ramzi and Christopher Rabadi. Father and son team in Claremont, $110M+ closed. Call (626) 203-1372.`,
    alternates: { canonical: `/areas/${city.slug}` },
    openGraph: {
      title: `${city.name} Realtor | The Rabadi Group`,
      url: `${BUSINESS.url}/areas/${city.slug}`,
      images: city.photos[0].src.startsWith("/") ? [{ url: city.photos[0].src }] : undefined,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const city = getCity((await params).city);
  if (!city) notFound();

  const url = `${BUSINESS.url}/areas/${city.slug}`;
  const sales = SALES_BY_DATE.filter((s) => city.areas.includes(s.area));
  const [hero, ...rest] = city.photos;
  const m = city.market;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: BUSINESS.name,
    url,
    telephone: "+16262031372",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "California" } },
    employee: TEAM.map((t) => ({ "@type": "Person", name: t.name, ...(t.zillow ? { sameAs: [t.zillow] } : {}) })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.url },
      { "@type": "ListItem", position: 2, name: "Areas", item: `${BUSINESS.url}/areas` },
      { "@type": "ListItem", position: 3, name: city.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <PageIntro title={`${city.name} real estate`} lead={city.tagline} image={hero.src} fallback="/images/sgv.jpg" imageAlt={hero.alt}>
        <a href={BUSINESS.phoneHref} className="btn btn-light">
          <PhoneIcon size={16} /> {BUSINESS.phone}
        </a>
        <Link href="#contact" className="btn btn-glass">
          What is my home worth?
        </Link>
      </PageIntro>

      {/* Market snapshot */}
      <section className="light section">
        <div className="wrap grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="kicker text-champagne-deep">{city.name} market, {m.month}</p>
            <p className="num mt-4 text-[clamp(3rem,9vw,5.6rem)] leading-none">{formatPrice(m.medianPrice, true)}</p>
            <p className="mt-3 text-ink-soft">
              Median sale price, {pct(m.yoy)} from a year ago
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1.15rem]">{m.take}</p>
            <Link href={`/market/${city.slug}`} className="link-more mt-6 inline-block">
              {city.name} market update
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Photo pair */}
      {rest.length > 0 && (
        <section aria-label={`${city.name} photos`} className="bg-onyx">
          <div className="grid gap-1 md:grid-cols-2">
            {rest.map((p) => (
              <CityShot key={p.src} photo={p} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
            ))}
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-10">Neighborhoods</h2>
          </Reveal>
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {city.neighborhoods.map((n, i) => (
              <Reveal as="li" key={n.name} delay={(i % 4) * 0.06} className="border-t border-ivory/15 py-6">
                <h3 className="text-[1.5rem]">{n.name}</h3>
                <p className="mt-2 text-ivory/70">{n.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {sales.length > 0 && (
        <section className="section !pt-0 bg-onyx">
          <div className="wrap">
            <Reveal>
              <h2 className="h-section mb-8">Sold in {city.name}</h2>
            </Reveal>
            <ul className="text-[1.02rem]">
              {sales.map((s) => (
                <li key={s.slug} className="flex justify-between gap-4 border-t border-ivory/10 py-3">
                  <span>
                    {s.address} <span className="text-ivory/55">{saleStatus(s, "")}</span>
                  </span>
                  <span className="num shrink-0 text-[1.15rem]">{formatPrice(s.price, true)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ heading={`${city.name} questions`} items={city.faqs} />

      {city.guide && (
        <section className="light section !pt-0">
          <div className="wrap">
            <Link href={city.guide} className="link-more">
              {city.name} guide
            </Link>
          </div>
        </section>
      )}

      <ContactPanel
        heading={`Buying or selling in ${city.name}?`}
        intro="Send the address or what you're looking for."
        defaultTopic="A value for my home"
      />
    </>
  );
}
