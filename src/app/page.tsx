import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, RECENT_SALES, STATS, TEAM, SALES_BY_DATE, REGIONS, salesIn } from "@/lib/data";
import SaleCard from "@/components/SaleCard";
import Ridgeline from "@/components/Ridgeline";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: { absolute: "The Rabadi Group | Claremont & Southern California Real Estate" },
  description:
    "Ramzi and Christopher Rabadi, a father and son real estate team in Claremont. $100M+ closed across the San Gabriel Valley, Los Angeles, and Orange County. Recent sales in Sierra Madre and Los Feliz. Call (626) 203-1372.",
  alternates: { canonical: BUSINESS.url },
};

const SERVICES = [
  {
    title: "Selling a home",
    body: "We price from the comps on your street, prepare the house, and negotiate every term, not just the price.",
    href: "/sellers",
    cta: "How we sell",
  },
  {
    title: "Buying a home",
    body: "Pre-approval, the right showings, and offers built to win without overpaying. Our latest buyer saved $129,500.",
    href: "/buyers",
    cta: "How we help buyers",
  },
  {
    title: "Commercial and investment",
    body: "Multi-family, retail, industrial, gas stations, and ground leases, led by Ramzi's 20+ years of deals.",
    href: "/commercial",
    cta: "Commercial services",
  },
];

const HOME_AREAS = ["Claremont", "La Verne", "Pasadena", "Sierra Madre", "Los Feliz", "West Hollywood"];

export default function HomePage() {
  const cityDesc = new Map<string, string>(REGIONS.flatMap((r) => r.cities.map((c) => [c.name, c.desc] as [string, string])));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-oak text-paper">
        <div className="wrap grid gap-10 pb-24 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pb-36 lg:pt-20">
          <div>
            <h1 className="display max-w-[13ch]">Southern California real estate, handled by family.</h1>
            <p className="lead mt-6 text-sage">
              Ramzi and Christopher Rabadi have closed more than $100M in homes and commercial property over 20+
              years, from Claremont and Pasadena to Los Feliz and Dana Point.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#contact" className="btn btn-brass">
                Get your home&apos;s value
              </Link>
              <a href={BUSINESS.phoneHref} className="btn btn-line">
                <PhoneIcon /> Call {BUSINESS.phone}
              </a>
            </div>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] lg:aspect-[4/5]">
              <Image
                src="/images/hero-bg.png"
                alt="Christopher and Ramzi Rabadi"
                fill
                preload
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.95rem] text-sage">Christopher and Ramzi Rabadi, Claremont</figcaption>
          </figure>
        </div>
        <Ridgeline
          draw
          className="absolute inset-x-0 bottom-0 block h-16 w-full md:h-24"
          stroke="var(--color-brass)"
          fill="var(--color-paper)"
        />
      </section>

      {/* Proof */}
      <section aria-label="Track record" className="wrap pt-6 md:pt-2">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line pb-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="num text-[2.6rem] leading-none md:text-[3.2rem]">{s.value}</dd>
              <dd className="mt-2 text-ink-soft">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Recent sales */}
      <section className="section">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div>
              <h2 className="h-section">Recently sold</h2>
              <p className="mt-3 text-ink-soft">Our three latest closings.<span className="md:hidden"> Swipe to see each one.</span></p>
            </div>
            <Link href="/listings" className="link">
              See all {SALES_BY_DATE.length} sales
            </Link>
          </div>
          <div className="rail">
            {RECENT_SALES.map((s, i) => (
              <SaleCard key={s.slug} sale={s} preload={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-stone">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <h2 className="h-section">What we can do for you</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.href} className="border-t border-line py-7 first:border-t-0 first:pt-0 md:grid md:grid-cols-[1fr_1.4fr] md:gap-8">
                <h3 className="text-[1.75rem]">{s.title}</h3>
                <div className="mt-2 md:mt-0">
                  <p className="text-ink-soft">{s.body}</p>
                  <Link href={s.href} className="link mt-3 inline-block">
                    {s.cta}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="wrap">
          <h2 className="h-section max-w-[16ch]">Two agents on every deal</h2>
          <p className="lead mt-4 text-ink-soft">
            You work with both of us. Ramzi brings two decades of negotiating. Christopher brings the research, the
            marketing, and fast answers.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
            {TEAM.map((m) => (
              <article key={m.name} className="grid grid-cols-[112px_1fr] gap-5 sm:grid-cols-[150px_1fr]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-stone">
                  <Image src={m.image} alt={m.name} fill sizes="150px" className="object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-[1.7rem]">{m.name}</h3>
                  <p className="text-[0.95rem] text-ink-soft">
                    {m.title}, {m.dre}
                  </p>
                  <p className="mt-3">{m.short}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/about" className="link mt-10 inline-block">
            More about us
          </Link>
        </div>
      </section>

      {/* Areas */}
      <section className="section bg-stone">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-section">Where we work</h2>
            <Link href="/areas" className="link">
              All areas
            </Link>
          </div>
          <ul className="grid gap-x-12 md:grid-cols-2">
            {HOME_AREAS.map((name) => {
              const n = salesIn(name).length;
              return (
                <li key={name} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                  <div>
                    <Link href={`/areas#${name.toLowerCase().replace(/\s+/g, "-")}`} className="font-serif text-[1.45rem] no-underline hover:text-brass-ink">
                      {name}
                    </Link>
                    <p className="text-[0.95rem] text-ink-soft">{cityDesc.get(name)}</p>
                  </div>
                  {n > 0 && (
                    <span className="shrink-0 text-[0.9rem] text-ink-soft">
                      {n} {n === 1 ? "sale" : "sales"}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactPanel heading="What's your home worth?" intro="Send us the address. We'll pull the recent sales on your street and get back to you with a value range, usually the same day." />

      <FAQ />
    </>
  );
}
