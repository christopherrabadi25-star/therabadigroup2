import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES_BY_DATE, formatDate, formatPrice, placeLabel } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon } from "@/components/Icons";
import { CountUp, Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Selling a home in Claremont, La Verne, Pasadena, or anywhere in Southern California? Ramzi and Christopher Rabadi price from real comps and negotiate every term. Seller listings average 4.2% above asking.",
  alternates: { canonical: "/sellers" },
};

const STEPS = [
  { title: "An honest value", body: "We study the closest recent sales and walk the home with you. You get a considered range, not the number you hoped to hear." },
  { title: "Preparation", body: "What to refresh, what to stage, what to leave alone. Small decisions here show up at closing." },
  { title: "Presentation", body: "Professional photography, a refined listing, the MLS and every major portal, and direct calls to agents with qualified buyers." },
  { title: "Showings and offers", body: "We host every showing and keep you informed. When offers arrive, we compare every term, not only the price." },
  { title: "Negotiation", body: "Price, credits, contingencies, timing. Ramzi has seen every kind of offer in twenty years and pushes on each point." },
  { title: "Closing", body: "Escrow, title, the buyer's lender, and the final walkthrough, managed until the deed records." },
];

export default function SellersPage() {
  const sellerSales = SALES_BY_DATE.filter((s) => s.side === "Seller").slice(0, 3);

  return (
    <>
      <PageIntro
        title="Sell with confidence"
        lead="Precise pricing, beautiful presentation, and negotiation on every term of every offer."
        image="/images/hollywood-hills-area.jpg"
        imageAlt="Los Angeles from the Hollywood Hills at golden hour"
        position="42% 50%"
      >
        <Link href="#contact" className="btn btn-gold">
          Request a home value
        </Link>
        <a href={BUSINESS.phoneHref} className="btn btn-ghost">
          <PhoneIcon size={16} /> {BUSINESS.phone}
        </a>
      </PageIntro>

      <section className="section bg-onyx">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-24">
          <Reveal>
            <p className="num text-[clamp(6rem,20vw,12rem)] leading-[0.85] text-champagne">
              <CountUp value="4.2%" />
            </p>
            <p className="mt-5 text-taupe">average above asking on our seller listings</p>
          </Reveal>
          <Reveal delay={0.12} className="prose-body text-[1.12rem]">
            <p>
              On a $900,000 home, 4.2% is about $37,800 more at closing. It comes from pricing right on the first day,
              presenting the home so buyers fall for it, and never giving ground without a reason.
            </p>
            <p className="text-taupe">
              Well-priced homes still sell quickly across the Foothill Cities. Homes that start too high sit, then sell for
              less. We would rather tell you the truth up front.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="light section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">How we sell</h2>
          </Reveal>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section bg-onyx">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="h-section">Recent seller sales</h2>
            </Reveal>
            <Link href="/listings" className="link-line text-ivory">
              All sold homes
            </Link>
          </div>
          <ul>
            {sellerSales.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.08} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-ivory/15 py-7 last:border-b md:grid-cols-[1.4fr_1fr_auto]">
                <div>
                  <p className="font-display text-[1.7rem] leading-tight">{s.address}</p>
                  <p className="text-taupe md:hidden">{placeLabel(s)}, {formatDate(s.date)}</p>
                </div>
                <p className="hidden text-taupe md:block">{placeLabel(s)}, {formatDate(s.date)}</p>
                <p className="num text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-champagne">{formatPrice(s.price)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel heading="What is your home worth?" intro="Share the address and anything we should know. We'll reply with a considered value range, privately." />
    </>
  );
}
