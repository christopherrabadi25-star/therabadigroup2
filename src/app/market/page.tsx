import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";

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
        lead="What we're seeing on the ground in the Foothill Cities, written by Ramzi and Christopher. No national averages."
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="h-section">If you&apos;re selling</h2>
            <p className="mt-5 text-[1.1rem]">
              Homes that are priced right still sell quickly and often draw more than one offer. Buyers have become
              more careful, so homes that start too high sit and usually sell for less in the end.
            </p>
            <Link href="/sellers" className="link mt-5 inline-block">
              How we price and sell
            </Link>
          </div>
          <div>
            <h2 className="h-section">If you&apos;re buying</h2>
            <p className="mt-5 text-[1.1rem]">
              You have more room to negotiate than in 2021 and 2022, especially on homes that have been sitting. On the
              best homes you still need to move quickly, with your financing ready.
            </p>
            <Link href="/buyers" className="link mt-5 inline-block">
              How we help buyers
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section mb-10">City by city</h2>
          <ul className="grid gap-x-12 md:grid-cols-2">
            {CITIES.map((c) => (
              <li key={c.city} className="border-t border-line py-6">
                <p className="text-ink-soft">{c.city}</p>
                <h3 className="mt-1 text-[1.6rem]">{c.headline}</h3>
                <p className="mt-2 text-ink-soft">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel heading="Ask us about your street" intro="Market questions are free. Tell us the neighborhood and we'll share what's selling there and for how much." />
    </>
  );
}
