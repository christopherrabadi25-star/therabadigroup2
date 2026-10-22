import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, PHOTOS, SALES } from "@/lib/data";
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
  { title: "A conversation", body: "Your goals, timeline, and budget, and what's realistic." },
  { title: "Financing", body: "Lenders who move fast, so sellers take you seriously." },
  { title: "The right homes", body: "We screen listings and hear about homes before they go public." },
  { title: "A winning offer", body: "Terms that win without overpaying." },
  { title: "Inspections", body: "We use what we find to get repairs or credits." },
  { title: "Closing", body: "Escrow, loan, and walkthrough, managed until you have keys." },
];

export default function BuyersPage() {
  const wins = ["602-n-michillinda-ave-sierra-madre", "4426-cromwell-ave-los-feliz", "5000-live-oak-canyon-rd-la-verne"]
    .map((slug) => SALES.find((s) => s.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      <PageIntro
        title="Buy smarter"
        lead="Our latest buyer closed $119,500 under asking."
        image={PHOTOS.cromwellPool}
        fallback="/images/dana-point.jpg"
        imageAlt="Pool and garden of a Los Feliz estate"
        position="50% 60%"
      >
        <Link href="#contact" className="btn btn-light">
          Start your search
        </Link>
        <a href={BUSINESS.smsHref} className="btn btn-glass">
          <TextIcon size={16} /> Text us
        </a>
      </PageIntro>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section max-w-[16ch]">Recent buyer wins</h2>
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
        heading="Tell us what you want"
        intro="Area, budget, and timing. We'll reply with what's available."
        defaultTopic="Buying a home"
      />
    </>
  );
}
