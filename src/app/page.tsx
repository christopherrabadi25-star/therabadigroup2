import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, RECENT_SALES, STATS, TEAM, SALES, SALES_BY_DATE, formatPrice, formatDate, placeLabel } from "@/lib/data";
import HeroCinema, { type Slide } from "@/components/HeroCinema";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";
import { CountUp, ParallaxImage, Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: { absolute: "The Rabadi Group | Luxury Real Estate in Claremont, Los Angeles & Orange County" },
  description:
    "Ramzi and Christopher Rabadi, a father and son luxury real estate team in Claremont. $100M+ closed, including $7.4M in the Hollywood Hills and $6.3M oceanfront in Dana Point. Call (626) 203-1372.",
  alternates: { canonical: BUSINESS.url },
};

const SLIDES: Slide[] = [
  {
    src: "/images/rising-glen.jpg",
    alt: "1411 Rising Glen Rd at dusk, Hollywood Hills",
    title: "1411 Rising Glen Rd, Hollywood Hills",
    detail: "Sold for $7,400,000",
    origin: "40% 60%",
  },
  {
    src: "/images/dana-point.jpg",
    alt: "The Dana Point coastline from the air",
    title: "Dana Point",
    detail: "Oceanfront on Beach Road, sold for $6,300,000",
    origin: "50% 70%",
    position: "50% 60%",
  },
  {
    src: "/images/hollywood-hills-area.jpg",
    alt: "Los Angeles at golden hour from the Hollywood Hills",
    title: "Los Angeles",
    detail: "From the Hollywood Hills to Los Feliz",
    origin: "45% 40%",
    position: "42% 50%",
  },
  {
    src: "/images/beverly-hills-area.jpg",
    alt: "Palm-lined street in Beverly Hills",
    title: "Beverly Hills",
    detail: "Sold on the Olympic corridor for $3,050,000",
    origin: "50% 30%",
  },
];

const SERVICES = [
  {
    title: "Selling",
    body: "Pricing from the closest comparable sales, a home prepared to show beautifully, and negotiation on every term. Our seller listings average 4.2% above asking.",
    href: "/sellers",
    cta: "How we sell",
  },
  {
    title: "Buying",
    body: "Early access, careful screening, and offers written to win without overpaying. Our latest buyer closed $119,500 under asking with $10,000 in credits.",
    href: "/buyers",
    cta: "How we buy",
  },
  {
    title: "Commercial",
    body: "Multi-family, retail, industrial, gas stations, and ground leases, led by Ramzi's twenty years of commercial deals.",
    href: "/commercial",
    cta: "Commercial",
  },
];

const AREA_TILES = [
  { name: "Claremont", img: "/images/claremont.jpg", pos: "60% 50%" },
  { name: "La Verne", img: "/images/la-verne-new.jpg", pos: "50% 50%" },
  { name: "Hollywood Hills", img: "/images/hollywood-hills-area.jpg", pos: "40% 50%" },
  { name: "Beverly Hills", img: "/images/beverly-hills-area.jpg", pos: "50% 50%" },
  { name: "Dana Point", img: "/images/dana-point.jpg", pos: "50% 60%" },
];

export default function HomePage() {
  const signature = ["1411-rising-glen-rd-hollywood-hills", "35099-beach-rd-dana-point"].map((s) => SALES.find((x) => x.slug === s)!);

  return (
    <>
      <HeroCinema slides={SLIDES}>
        <Reveal y={20}>
          <p className="kicker text-champagne">Ramzi and Christopher Rabadi</p>
        </Reveal>
        <Reveal delay={0.12} y={34}>
          <h1 className="display mt-5 max-w-[11ch]">Exceptional homes, represented by family.</h1>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="lead mt-7 text-ivory/80">
            More than $100M in Southern California real estate, from Claremont and Pasadena to the Hollywood Hills and the
            Dana Point coast.
          </p>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="btn btn-gold">
              Request a consultation
            </Link>
            <Link href="/listings" className="btn btn-ghost">
              View sold homes
            </Link>
          </div>
        </Reveal>
      </HeroCinema>

      {/* Statement and figures */}
      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <p className="max-w-[24ch] font-display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.12]">
              Two generations, one standard. Ramzi brings twenty years of negotiating. Christopher brings the research and
              the reach. Every client gets both.
            </p>
          </Reveal>
          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ivory/10 pt-12 md:mt-24 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="num text-[clamp(2.8rem,6vw,4.6rem)] leading-none text-champagne">
                  <CountUp value={s.value} />
                </dd>
                <dd className="mt-3 text-[0.95rem] text-taupe">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Recently sold */}
      <section className="section !pt-0 bg-onyx">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <Reveal>
              <p className="kicker text-champagne">Just sold</p>
              <h2 className="h-section mt-4">Recent closings</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/listings" className="link-line text-ivory">
                All {SALES_BY_DATE.length} sales
              </Link>
            </Reveal>
          </div>
          <div className="rail">
            {RECENT_SALES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <SaleCard sale={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature sales: full-bleed film frames */}
      <section aria-label="Signature sales" className="bg-onyx">
        {signature.map((s, i) => (
          <article key={s.slug} className="relative flex min-h-[78svh] items-end overflow-hidden md:min-h-[92svh]">
            <ParallaxImage src={s.images![0]} alt={s.imageAlt ?? s.address} strength={10} position={i === 0 ? "40% 55%" : "50% 60%"} />
            <div className="grade" />
            <div className="wrap relative pb-14 md:pb-20">
              <Reveal>
                <p className="kicker text-champagne">Signature sale, {formatDate(s.date)}</p>
                <p className="num mt-4 text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.92]">{formatPrice(s.price)}</p>
                <h2 className="h-sans mt-5 text-[1.1rem]">{s.address}</h2>
                <p className="text-ivory/75">{placeLabel(s)}</p>
                {s.highlight && <p className="mt-4 max-w-[34em] text-ivory/80">{s.highlight}</p>}
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      {/* Services */}
      <section className="light section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section max-w-[14ch]">Representation, start to finish</h2>
          </Reveal>
          <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.href} delay={i * 0.1} className="border-t border-ink/15 pt-8">
                <h3 className="text-[2rem]">{s.title}</h3>
                <p className="mt-4 text-ink-soft">{s.body}</p>
                <Link href={s.href} className="link-line mt-6 text-ink">
                  {s.cta}
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
            <p className="lead mt-6 text-ink-soft">
              A father and son, on every deal. You get two agents, two phones that answer, and one shared standard.
            </p>
            <Link href="/about" className="link-line mt-8 text-ink">
              Our story
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.12}>
                <div className="zoom-on-hover relative aspect-[3/4] overflow-hidden bg-ink/10">
                  <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 28vw, 45vw" className="object-cover object-top" />
                </div>
                <h3 className="mt-5 text-[clamp(1.4rem,3vw,1.9rem)]">{m.name}</h3>
                <p className="mt-1 text-[0.88rem] text-ink-soft">{m.dre}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="section bg-onyx">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="h-section">Where we work</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/areas" className="link-line text-ivory">
                All areas and sales
              </Link>
            </Reveal>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {AREA_TILES.map((a, i) => (
              <Reveal
                as="li"
                key={a.name}
                delay={i * 0.06}
                className={i < 2 ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-2"}
              >
                <Link
                  href={`/areas#${a.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`zoom-on-hover relative block overflow-hidden no-underline ${i < 2 ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[4/3]"}`}
                >
                  <Image src={a.img} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: a.pos }} />
                  <span className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-none md:bottom-6 md:left-6">
                    {a.name}
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.3} className="col-span-1 md:col-span-2">
              <Link
                href="/areas"
                className="flex aspect-[4/5] flex-col justify-end border border-ivory/15 p-4 no-underline transition-colors hover:border-champagne md:aspect-[4/3] md:p-6"
              >
                <span className="text-[0.92rem] text-taupe">Also Pasadena, Sierra Madre, Monrovia, Los Feliz, Laguna Beach and more</span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <ContactPanel
        heading="What is your home worth?"
        intro="Share the address. We'll study the closest recent sales and send you a considered value range, privately and at no cost."
      />

      <FAQ />
    </>
  );
}
