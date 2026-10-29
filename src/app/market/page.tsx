import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";
import CityTiles from "@/components/CityTiles";
import { Reveal } from "@/components/Motion";
import { CITIES } from "@/lib/cities";

const month = CITIES[0].market.month;

export const metadata: Metadata = {
  title: `Market Updates: Claremont, La Verne, Glendora & San Dimas, ${month}`,
  description:
    "Monthly housing market updates for Claremont, La Verne, Glendora, and San Dimas: median sale prices, year-over-year change, and what it means for buyers and sellers.",
  alternates: { canonical: "/market" },
};

export default function MarketPage() {
  return (
    <>
      <PageIntro title="Market updates" lead={`Our four home cities, ${month}.`} image="/images/sgv.jpg" imageAlt="The foothill cities from above" />

      <section aria-label="Cities" className="bg-onyx">
        <CityTiles to="market" />
      </section>

      <section className="light section">
        <div className="wrap grid gap-14 md:grid-cols-2 md:gap-24">
          <Reveal>
            <h2 className="h-section">Sellers</h2>
            <p className="mt-5 text-[1.12rem] text-ink-soft">Priced right, homes still sell. Priced high, they sit.</p>
            <Link href="/sellers" className="link-more mt-6 inline-block">
              How we sell
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-section">Buyers</h2>
            <p className="mt-5 text-[1.12rem] text-ink-soft">More room to negotiate than a few years ago. Still move fast on the best homes.</p>
            <Link href="/buyers" className="link-more mt-6 inline-block">
              How we buy
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactPanel heading="Ask about your street" intro="Tell us the neighborhood. We'll share what's selling and for how much." />
    </>
  );
}
