import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { CITIES, getCity, pct } from "@/lib/cities";
import PageIntro from "@/components/PageIntro";
import CityShot from "@/components/CityShot";
import ContactPanel from "@/components/ContactPanel";
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
  const m = city.market;
  return {
    title: `${city.name} Housing Market Update, ${m.month}`,
    description: `${city.name}, CA median sale price was ${formatPrice(m.medianPrice)} in ${m.month}, ${pct(m.yoy)} year over year. What it means for buyers and sellers, from The Rabadi Group.`,
    alternates: { canonical: `/market/${city.slug}` },
  };
}

export default async function CityMarketPage({ params }: Props) {
  const city = getCity((await params).city);
  if (!city) notFound();
  const m = city.market;
  const others = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <PageIntro
        title={`${city.name} market update`}
        lead={m.month}
        image={city.photos[0].src}
        fallback="/images/sgv.jpg"
        imageAlt={city.photos[0].alt}
      />

      <section className="light section">
        <div className="wrap">
          <dl className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <dt className="kicker text-champagne-deep">Median sale price</dt>
              <dd className="num mt-3 text-[clamp(3rem,9vw,5.6rem)] leading-none">{formatPrice(m.medianPrice, true)}</dd>
            </Reveal>
            <Reveal delay={0.1}>
              <dt className="kicker text-champagne-deep">Year over year</dt>
              <dd className="num mt-3 text-[clamp(3rem,9vw,5.6rem)] leading-none">{pct(m.yoy)}</dd>
            </Reveal>
          </dl>
          <p className="mt-8 text-[0.85rem] text-ink-soft">
            All home types, {m.month}. Source:{" "}
            <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer">
              {m.source}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section bg-onyx">
        <div className="wrap grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-24">
          <Reveal>
            <h2 className="h-section">Our read</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1.25rem] leading-relaxed">{m.take}</p>
            <Link href={`/areas/${city.slug}`} className="link-more mt-6 inline-block">
              About {city.name}
            </Link>
          </Reveal>
        </div>
      </section>

      <section aria-label="Nearby markets" className="bg-onyx">
        <div className="grid gap-1 md:grid-cols-3">
          {others.map((c) => (
            <Link key={c.slug} href={`/market/${c.slug}`} className="group relative block aspect-[4/3] no-underline">
              <CityShot photo={c.photos[0]} sizes="(min-width: 768px) 33vw, 100vw" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-ivory">
                <p className="text-[1.6rem]">{c.name}</p>
                <p className="num text-[1.3rem] text-ivory/85">
                  {formatPrice(c.market.medianPrice, true)} <span className="text-[1rem]">{pct(c.market.yoy)}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactPanel heading={`Ask about your ${city.name} street`} intro="Tell us the neighborhood. We'll share what's selling and for how much." />
    </>
  );
}
