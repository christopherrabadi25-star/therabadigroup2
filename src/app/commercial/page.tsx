import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Commercial Real Estate",
  description:
    "Commercial and investment real estate in Southern California with Ramzi Rabadi: multi-family, retail, industrial, office, gas stations, and ground leases. 20+ years. Call (626) 203-1372.",
  alternates: { canonical: "/commercial" },
};

const TYPES = [
  { title: "Multi-family", body: "Duplexes to apartment buildings, including West Hollywood income property." },
  { title: "Retail and strip centers", body: "Tenant mix, lease quality, and value-add potential reviewed before you commit." },
  { title: "Industrial", body: "Warehouse, flex, and distribution space, with NNN leases and cap rates underwritten." },
  { title: "Gas stations", body: "Fee simple, leased fee, and leasebacks, including environmental and tank disclosures." },
  { title: "Ground leases", body: "Acquisitions and dispositions from both the landlord and tenant side." },
  { title: "Office and mixed-use", body: "Small professional buildings and residential-over-retail." },
];

const STEPS = [
  { title: "Set the goal", body: "Buy, sell, 1031 exchange, or reposition. We agree on the strategy before any offer or listing." },
  { title: "Value it", body: "Comps, cap rates, and the rent roll, turned into a range the market will actually pay." },
  { title: "Find or market it", body: "Buyers: on and off-market sourcing. Sellers: an offering package sent to qualified buyers we know." },
  { title: "Due diligence", body: "Inspections, environmental, leases, title, and zoning, coordinated so nothing surprises you." },
  { title: "Negotiate and close", body: "Terms, credits, and timing, then escrow and lender coordination through to a clean close." },
];

export default function CommercialPage() {
  const deals = ["811-n-croft-ave-west-hollywood", "8417-waring-ave-west-hollywood", "9550-w-olympic-blvd-beverly-hills"]
    .map((slug) => SALES.find((s) => s.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      <PageIntro
        title="Commercial and investment property"
        lead="Ramzi Rabadi has spent 20+ years on deals most agents pass on: ground leases, gas stations, multi-family, and mixed-use across Southern California."
      >
        <a href={BUSINESS.phoneHref} className="btn btn-brass">
          <PhoneIcon /> Call Ramzi
        </a>
        <Link href="#contact" className="btn btn-line">
          Send us your deal
        </Link>
      </PageIntro>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <h2 className="h-section">Property we handle</h2>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {TYPES.map((t) => (
              <li key={t.title} className="border-t border-line py-5">
                <h3 className="text-[1.4rem]">{t.title}</h3>
                <p className="mt-1 text-ink-soft">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section mb-10">How we work a commercial deal</h2>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h-section mb-10">Income property we&apos;ve closed</h2>
          <div className="rail">
            {deals.map((s) => (
              <SaleCard key={s.slug} sale={s} />
            ))}
          </div>
        </div>
      </section>

      <ContactPanel
        heading="Tell us about the property"
        intro="Asset type, location, and what you want to do. Ramzi will call you back with an honest read."
        defaultTopic="Commercial or investment"
      />
    </>
  );
}
