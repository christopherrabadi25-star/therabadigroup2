import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, PHOTOS, formatDate, RECENT_SALES, STATS, TEAM, SALES, formatPrice } from "@/lib/data";
import HeroCinema, { type Slide } from "@/components/HeroCinema";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";
import { CountUp, ParallaxImage, Reveal } from "@/components/Motion";
import { PhoneIcon } from "@/components/Icons";
import { MARKHAM } from "@/lib/markham";

export const metadata: Metadata = {
  title: { absolute: "The Rabadi Group | Luxury Real Estate in Claremont & Southern California" },
  description:
    "Ramzi and Christopher Rabadi. $110M+ in closed sales and 20+ years in Southern California real estate, including $7.4M in the Hollywood Hills and $6.3M oceanfront in Dana Point. Call (626) 203-1372.",
  alternates: { canonical: BUSINESS.url },
};

// Real homes we sold, in order. Remote listing photos fall back or are skipped if they can't load.
const SLIDES: Slide[] = [
  {
    src: PHOTOS.markham,
    alt: "A 1901 Colonial Revival estate in Pasadena",
    title: "Just sold: 303 Markham Pl, Pasadena",
    detail: "1901 Colonial Revival estate, $4,675,000",
    origin: "50% 50%",
  },
  {
    src: PHOTOS.cromwellExterior,
    fallback: PHOTOS.cromwellRedfin,
    alt: "A 1931 Spanish estate in Los Feliz",
    title: "Los Feliz",
    detail: "1931 Spanish estate, sold for $4.495M",
    origin: "50% 45%",
  },
  {
    src: PHOTOS.saintAnns,
    alt: "A 1928 cottage in Laguna Beach",
    title: "Laguna Beach",
    detail: "Sold for $1.8M",
    origin: "50% 50%",
  },
  {
    src: PHOTOS.risingGlen,
    fallback: "/images/rising-glen.jpg",
    alt: "A William Krisel mid-century home in the Hollywood Hills",
    title: "Hollywood Hills",
    detail: "William Krisel mid-century, sold for $7.4M",
    origin: "40% 60%",
  },
  {
    src: PHOTOS.peppertree,
    alt: "A gated estate in La Habra Heights",
    title: "La Habra Heights",
    detail: "Gated estate, sold for $2.1M",
    origin: "50% 50%",
  },
  {
    src: PHOTOS.foxbrook,
    alt: "A mid-century home in Glendora",
    title: "Glendora",
    detail: "Mid-century post-and-beam, sold for $1.525M",
    origin: "50% 50%",
  },
  {
    src: PHOTOS.danaPoint,
    alt: "An oceanfront home in Dana Point",
    title: "Dana Point",
    detail: "Oceanfront, sold for $6.3M",
    origin: "50% 55%",
  },
];

const SERVICES = [
  { title: "Selling", body: "Sharp pricing, standout presentation, and hard negotiation. Our listings average 4.2% over asking.", href: "/sellers" },
  { title: "Buying", body: "Offers that win without overpaying, from Sierra Madre to a $4.675M Pasadena estate.", href: "/buyers" },
  { title: "Commercial", body: "Multi-family, retail, industrial, gas stations, and ground leases. Twenty years of deals.", href: "/commercial" },
];

export default function HomePage() {
  const signature = ["1411-rising-glen-rd-hollywood-hills", "35099-beach-rd-dana-point"].map((s) => SALES.find((x) => x.slug === s)!);
  const notable = [...SALES].sort((a, b) => b.price - a.price).slice(0, 8);

  return (
    <>
      <HeroCinema slides={SLIDES}>
        <Reveal y={16}>
          <Link
            href={`/listings/${MARKHAM.slug}`}
            className="group mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-champagne/70 bg-onyx/45 py-1.5 pl-1.5 pr-4 no-underline sm:gap-3 sm:pr-5 backdrop-blur-md transition-colors hover:bg-onyx/65"
          >
            <span className="shimmer shrink-0 whitespace-nowrap rounded-full bg-champagne px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-onyx">Just sold</span>
            <span className="whitespace-nowrap text-[0.86rem] text-ivory sm:text-[0.95rem]">
              303 Markham Pl<span className="hidden sm:inline">, Pasadena</span> <span className="text-champagne">{formatPrice(MARKHAM.price, true)}</span>
            </span>
            <span aria-hidden className="text-champagne transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </Reveal>
        <Reveal delay={0.05} y={30}>
          <h1 className="display max-w-[12ch]">Southern California&apos;s premier real estate team.</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead mt-6 text-ivory/90">
            $110M+ in closed sales. More than 20 years of experience. Ramzi and Christopher Rabadi.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/listings" className="btn btn-light">
              See our sales
            </Link>
            <a href={BUSINESS.phoneHref} className="btn btn-glass">
              <PhoneIcon size={17} /> {BUSINESS.phone}
            </a>
          </div>
        </Reveal>
      </HeroCinema>

      {/* Track record, at a glance */}
      <section aria-label="Track record" className="border-b border-ivory/10 bg-onyx">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-16 md:grid-cols-4 md:py-20">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-2 text-[1rem] text-ivory/75">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>


      {/* Just sold feature: 303 Markham Pl */}
      <section aria-label="Just sold: 303 Markham Pl" className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-onyx text-ivory md:min-h-[96svh]">
        <ParallaxImage src={MARKHAM.hero} fallback={MARKHAM.heroFallback} alt="303 Markham Pl, a 1901 Colonial Revival estate in Pasadena" strength={10} />
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/80 via-onyx/25 to-transparent" />
        <div className="wrap relative grid gap-10 pb-14 pt-24 md:pb-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-champagne/60 px-4 py-1.5 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-champagne">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Just sold, {formatDate(MARKHAM.closed, "full")}
            </p>
            <p className="num mt-6 text-[clamp(3.4rem,12vw,8.5rem)] leading-[0.9]">{formatPrice(MARKHAM.price)}</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4.6vw,3rem)] leading-tight">303 Markham Place, Pasadena</h2>
            <p className="lead mt-3 text-ivory/85">
              A 1901 Colonial Revival in the Governor Markham Landmark District, on the National Register of Historic Places. Under contract
              for our buyer in two days.
            </p>
            <Link href={`/listings/${MARKHAM.slug}`} className="btn btn-light mt-8">
              See the house and its history
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ivory/20 pt-6">
              {MARKHAM.facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="num text-[clamp(2rem,4vw,2.8rem)] leading-none text-champagne">{f.value}</dd>
                  <dd className="mt-1 text-[0.95rem] text-ivory/75">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Just sold */}
      <section className="section bg-onyx">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
            <Reveal>
              <h2 className="h-section">Just sold</h2>
            </Reveal>
            <Link href="/listings" className="link-more">
              Full sales history
            </Link>
          </div>
          <div className="rail">
            {RECENT_SALES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <SaleCard sale={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature sales, location only */}
      <section aria-label="Signature sales" className="bg-onyx">
        {signature.map((s, i) => (
          <article key={s.slug} className="relative flex min-h-[72svh] items-end overflow-hidden md:min-h-[88svh]">
            <ParallaxImage
              src={s.images![0]}
              fallback={i === 0 ? "/images/rising-glen.jpg" : undefined}
              alt={s.neighborhood ?? s.city}
              strength={10}
              position={i === 0 ? "40% 55%" : "50% 55%"}
            />
            <div className="grade" />
            <div className="wrap relative pb-12 md:pb-16">
              <Reveal>
                <p className="num text-[clamp(3.4rem,11vw,8rem)] leading-[0.92]">{formatPrice(s.price, true)}</p>
                <h3 className="mt-4 text-[1.3rem]">{s.neighborhood ?? s.city}</h3>
                <p className="text-ivory/80">
                  {s.type}, {s.date.slice(0, 4)}
                </p>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      {/* Notable sales */}
      <section className="section bg-onyx">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <Reveal>
            <h2 className="h-section">Notable sales</h2>
            <p className="lead mt-4 text-ivory/75">Our highest closings on record.</p>
            <Link href="/listings" className="link-more mt-6">
              Full sales history
            </Link>
          </Reveal>
          <ol>
            {notable.map((s, i) => (
              <Reveal
                as="li"
                key={s.slug}
                delay={i * 0.04}
                className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-ivory/12 py-5 last:border-b"
              >
                <div>
                  <p className="text-[1.15rem] font-semibold">{s.neighborhood ?? s.city}</p>
                  <p className="text-[0.95rem] text-ivory/70">
                    {s.type ? `${s.type}, ` : ""}
                    {s.date.slice(0, 4)}
                  </p>
                </div>
                <p className="num text-[clamp(1.7rem,3.6vw,2.4rem)] leading-none text-champagne">{formatPrice(s.price, true)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="light section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section">What we do</h2>
          </Reveal>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.href} delay={i * 0.08} className="border-t border-ink/15 pt-6">
                <h3 className="text-[1.5rem]">{s.title}</h3>
                <p className="mt-3 text-ink-soft">{s.body}</p>
                <Link href={s.href} className="link-more mt-4">
                  Learn more
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="light-2 section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <h2 className="h-section">Ramzi and Christopher</h2>
            <p className="lead mt-5 text-ink-soft">Father and son. Two agents on every deal, and both pick up the phone.</p>
            <Link href="/about" className="link-more mt-6">
              About us
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="zoom-on-hover relative aspect-[3/4] overflow-hidden rounded-[18px] bg-ink/10">
                  <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 28vw, 45vw" className="object-cover object-top" />
                </div>
                <h3 className="mt-4 text-[clamp(1.1rem,2.6vw,1.4rem)]">{m.name}</h3>
                <p className="text-[0.92rem] text-ink-soft">{m.dre}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel heading="What is your home worth?" intro="Send the address. We'll reply with a value range based on the closest recent sales." />

      <FAQ />
    </>
  );
}
