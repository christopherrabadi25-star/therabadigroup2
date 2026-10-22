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
    body: "The Colleges, the Village, and north Claremont's custom homes keep this market stable. Well-priced homes near the foothills still draw multiple offers, so buyers need to be ready.",
  },
  {
    city: "La Verne",
    headline: "Tight inventory north of Baseline",
    body: "Larger lots on the foothill side, and canyon properties along Live Oak and Webb Canyon, are the strongest part of the market. Properly priced homes move fast.",
  },
  {
    city: "Sierra Madre",
    headline: "Overpriced listings sit",
    body: "Our buyer at 602 N Michillinda closed $119,500 under asking after the home had been on and off the market for a year. Buyers have leverage when a seller starts too high.",
  },
  {
    city: "San Dimas and Glendora",
    headline: "Value for space",
    body: "Bigger lots and horse properties in San Dimas, and hillside homes with strong schools in Glendora, draw buyers priced out of Claremont and La Verne.",
  },
];

export default function MarketPage() {
  return (
    <>
      <PageIntro
        title="Market notes"
        lead="What we're seeing on the ground in the Foothill Cities, written by Ramzi and Christopher."
        image="/images/claremont-new.jpg"
        imageAlt="Claremont Village"
        position="60% 50%"
      />

      <section className="light section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="h-section">For sellers</h2>
            <p className="mt-6 text-[1.12rem] text-ink-soft">
              Homes priced right still sell quickly and often draw more than one offer. Buyers have grown more careful, so
              homes that start too high sit and usually sell for less in the end.
            </p>
            <Link href="/sellers" className="link-line mt-7 text-ink">
              How we sell
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-section">For buyers</h2>
            <p className="mt-6 text-[1.12rem] text-ink-soft">
              You have more room to negotiate than in 2021 and 2022, especially on homes that have been sitting. On the best
              homes you still need to move quickly, with financing ready.
            </p>
            <Link href="/buyers" className="link-line mt-7 text-ink">
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
                <p className="mt-3 text-taupe">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel heading="Ask about your street" intro="Market questions are always welcome. Tell us the neighborhood and we'll share what's selling and for how much." />
    </>
  );
}
