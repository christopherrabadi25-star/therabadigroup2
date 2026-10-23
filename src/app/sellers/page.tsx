import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, PHOTOS, SALES_BY_DATE, formatDate, formatPrice, placeLabel } from "@/lib/data";
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
  { title: "An honest value", body: "We price from the closest recent sales, not wishful thinking." },
  { title: "Preparation", body: "What to fix, stage, or leave alone." },
  { title: "Marketing", body: "Professional photos, the MLS, every major portal, and calls to agents with buyers." },
  { title: "Showings and offers", body: "We run showings and compare every term of every offer." },
  { title: "Negotiation", body: "Price, credits, contingencies, timing. Twenty years of experience on your side." },
  { title: "Closing", body: "Escrow, title, and lender, managed through to close." },
];

export default function SellersPage() {
  const sellerSales = SALES_BY_DATE.filter((s) => s.side === "Seller").slice(0, 3);

  return (
    <>
      <PageIntro
        title="Sell for more"
        lead="Our seller listings average 4.2% above asking."
        image={PHOTOS.cromwellLiving}
        fallback="/images/rising-glen.jpg"
        imageAlt="Living room of a Los Feliz estate"
        position="50% 50%"
      >
        <Link href="#contact" className="btn btn-light">
          Get a home value
        </Link>
        <a href={BUSINESS.phoneHref} className="btn btn-glass">
          <PhoneIcon size={16} /> {BUSINESS.phone}
        </a>
      </PageIntro>

      <section className="section bg-onyx">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-24">
          <Reveal>
            <p className="num text-[clamp(6rem,20vw,12rem)] leading-[0.85] text-champagne">
              <CountUp value="4.2%" />
            </p>
            <p className="mt-4 text-ivory/80">Average above asking on our listings</p>
          </Reveal>
          <Reveal delay={0.12} className="prose-body text-[1.12rem]">
            <p>On a $900,000 home, that&apos;s about $37,800 more at closing.</p>
            <p className="text-ivory/75">
              It comes from pricing right on day one, presenting the home well, and negotiating every term.
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
            <Link href="/listings" className="link-more text-ivory">
              All sold homes
            </Link>
          </div>
          <ul>
            {sellerSales.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.08} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-ivory/15 py-7 last:border-b md:grid-cols-[1.4fr_1fr_auto]">
                <div>
                  <p className="font-display text-[1.7rem] leading-tight">{s.address}</p>
                  <p className="text-ivory/75 md:hidden">{placeLabel(s)}, {formatDate(s.date)}</p>
                </div>
                <p className="hidden text-ivory/75 md:block">{placeLabel(s)}, {formatDate(s.date)}</p>
                <p className="num text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-champagne">{formatPrice(s.price)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel heading="What is your home worth?" intro="Send the address. We'll reply with a value range, usually the same day." />
    </>
  );
}
