import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { TextIcon } from "@/components/Icons";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Buy a Home",
  description:
    "Buying in Claremont, La Verne, Pasadena, Sierra Madre, Los Angeles, or the Orange County coast? Ramzi and Christopher Rabadi find the right home and negotiate hard. Our latest buyer closed $119,500 under asking.",
  alternates: { canonical: "/buyers" },
};

const STEPS = [
  { title: "A conversation", body: "What you want, your timeline, your budget. We tell you what's realistic in the neighborhoods you love." },
  { title: "Financing in place", body: "We introduce lenders who move quickly and close on time, so sellers take your offer seriously." },
  { title: "The right homes", body: "We screen before you spend a weekend touring, and we hear about homes before they reach the portals." },
  { title: "A winning offer", body: "We study the comparable sales and the seller's situation, then write terms that win without overpaying." },
  { title: "Inspection and leverage", body: "We attend inspections with you and use what we find to secure repairs or credits. If it's wrong, we say walk away." },
  { title: "The keys", body: "Escrow, the loan, title, and the final walkthrough, managed until the home is yours." },
];

export default function BuyersPage() {
  const wins = ["602-n-michillinda-ave-sierra-madre", "4426-cromwell-ave-los-feliz", "5000-live-oak-canyon-rd-la-verne"]
    .map((slug) => SALES.find((s) => s.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      <PageIntro
        title="Find the one"
        lead="From a Foothill Cities first home to a 1931 Spanish estate in Los Feliz, we find it, write the offer, and fight for the terms."
        image="/images/dana-point.jpg"
        imageAlt="The Dana Point coastline"
        position="50% 60%"
      >
        <Link href="#contact" className="btn btn-gold">
          Begin your search
        </Link>
        <a href={BUSINESS.smsHref} className="btn btn-ghost">
          <TextIcon size={16} /> Text us
        </a>
      </PageIntro>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section max-w-[16ch]">What our buyers secured this year</h2>
            <p className="lead mt-6 text-taupe">
              In Sierra Madre, $119,500 under asking plus $10,000 in credits. In Los Feliz, a 1931 Spanish estate won in a
              multiple-offer round.
            </p>
          </Reveal>
          <div className="rail mt-12">
            {wins.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <SaleCard sale={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="light section">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">From first call to keys</h2>
          </Reveal>
          <Steps items={STEPS} />
        </div>
      </section>

      <ContactPanel
        heading="Tell us what you're looking for"
        intro="Area, budget, timing, the details that matter. We'll reply with what's realistic and what's coming."
        defaultTopic="Buying a home"
      />
    </>
  );
}
