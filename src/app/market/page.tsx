import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Market Notes: Claremont, La Verne & the Foothill Cities",
  description:
    "What Ramzi and Christopher Rabadi are seeing in the Claremont, La Verne, San Dimas, Glendora, and Sierra Madre real estate markets, and what it means for buyers and sellers.",
  alternates: { canonical: "/market" },
};

const CITIES = [
  {
    city: "Claremont",
    headline: "Limited supply, steady demand",
    body: "Well-priced homes near the foothills still draw multiple offers.",
  },
  {
    city: "La Verne",
    headline: "Tight inventory north of Baseline",
    body: "Foothill lots and canyon homes move fast when priced right.",
  },
  {
    city: "Sierra Madre",
    headline: "Overpriced listings sit",
    body: "Our buyer at 602 N Michillinda closed $119,500 under asking.",
  },
  {
    city: "San Dimas and Glendora",
    headline: "Value for space",
    body: "Bigger lots for buyers priced out of Claremont and La Verne.",
  },
];

export default function MarketPage() {
  return (
    <>
      <PageIntro
        title="Market notes"
        lead="What we're seeing in the Foothill Cities right now."
        image="https://ssl.cdn-redfin.com/photo/45/bigphoto/859/TR26141859_1.jpg"
        fallback="/images/claremont.jpg"
        imageAlt="A Sierra Madre home we sold in October 2026"
        position="50% 50%"
      />

      <section className="light section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="h-section">For sellers</h2>
            <p className="mt-6 text-[1.12rem] text-ink-soft">
              Priced right, homes still sell fast. Priced high, they sit.
            </p>
            <Link href="/sellers" className="link-more mt-7 text-ink">
              How we sell
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-section">For buyers</h2>
            <p className="mt-6 text-[1.12rem] text-ink-soft">
              More room to negotiate, especially on homes that have sat.
            </p>
            <Link href="/buyers" className="link-more mt-7 text-ink">
              How we buy
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">City by city</h2>
          </Reveal>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {CITIES.map((c, i) => (
              <Reveal as="li" key={c.city} delay={(i % 2) * 0.08} className="border-t border-ivory/15 py-8">
                <p className="kicker text-champagne">{c.city}</p>
                <h3 className="mt-3 text-[1.9rem]">{c.headline}</h3>
                <p className="mt-3 text-ivory/75">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel heading="Ask about your street" intro="Tell us the neighborhood. We'll tell you what's selling." />
    </>
  );
}
