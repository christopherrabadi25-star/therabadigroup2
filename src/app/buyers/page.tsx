import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { TextIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Buying in Claremont, La Verne, Pasadena, Sierra Madre, or Los Angeles? Ramzi and Christopher Rabadi find the right home and negotiate hard. Our latest buyer closed $119,500 under asking. Call (626) 203-1372.",
  alternates: { canonical: "/buyers" },
};

const STEPS = [
  { title: "Talk it through", body: "Tell us what you want, your timeline, and your budget. We tell you what's realistic in the neighborhoods you like." },
  { title: "Get pre-approved", body: "We connect you with lenders who move fast and close on time, so your offer is taken seriously." },
  { title: "See the right homes", body: "We screen listings before you spend a weekend on them, and we hear about homes before they hit the portals." },
  { title: "Make a winning offer", body: "We study the comps and the seller's situation, then write an offer that wins without overpaying." },
  { title: "Inspect and negotiate", body: "We walk inspections with you and use what we find to ask for repairs or credits. If it's wrong, we tell you to walk." },
  { title: "Close and move in", body: "We track escrow, the loan, title, and the final walkthrough until you have keys." },
];

export default function BuyersPage() {
  const wins = ["602-n-michillinda-ave-sierra-madre", "4426-cromwell-ave-los-feliz", "5000-live-oak-canyon-rd-la-verne"]
    .map((slug) => SALES.find((s) => s.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      <PageIntro
        title="Buy the right home at the right price"
        lead="From a first home in the Foothill Cities to a Spanish estate in Los Feliz, we find the house, write the offer, and fight for the terms."
      >
        <Link href="#contact" className="btn btn-brass">
          Start your search
        </Link>
        <a href={BUSINESS.smsHref} className="btn btn-line">
          <TextIcon /> Text us what you want
        </a>
      </PageIntro>

      <section className="section">
        <div className="wrap">
          <h2 className="h-section max-w-[18ch]">What our buyers got this year</h2>
          <p className="lead mt-4 text-ink-soft">
            In Sierra Madre our buyer closed $119,500 under asking and got $10,000 in credits. In Los Feliz we won a
            multiple-offer bidding round for a 1931 Spanish estate.
          </p>
          <div className="rail mt-10">
            {wins.map((s) => (
              <SaleCard key={s.slug} sale={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section mb-10">From first call to keys</h2>
          <Steps items={STEPS} />
        </div>
      </section>

      <ContactPanel
        heading="Tell us what you're looking for"
        intro="Area, budget, timing, must-haves. We'll reply with what's realistic and what's coming up."
        defaultTopic="Buy a home"
      />
    </>
  );
}
