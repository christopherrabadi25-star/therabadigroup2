import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES, SALES_BY_DATE, formatPrice, placeLabel, saleStatus } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon } from "@/components/Icons";
import { Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Commercial Real Estate",
  description:
    "Commercial and investment real estate in Southern California with Ramzi Rabadi: multi-family, retail, industrial, office, gas stations, and ground leases. 20+ years. Call (626) 203-1372.",
  alternates: { canonical: "/commercial" },
};

const TYPES = [
  { title: "Multi-family", body: "Duplexes to apartment buildings." },
  { title: "Retail", body: "Strip centers and storefronts." },
  { title: "Industrial", body: "Warehouse, flex, and distribution." },
  { title: "Gas stations", body: "Fee simple, leased fee, leasebacks." },
  { title: "Ground leases", body: "Landlord and tenant side." },
  { title: "Office and mixed-use", body: "Professional and residential over retail." },
];

const STEPS = [
  { title: "The objective", body: "Buy, sell, 1031, or reposition." },
  { title: "The value", body: "Comps, cap rates, and the rent roll." },
  { title: "The market", body: "On and off-market, to buyers we know." },
  { title: "Due diligence", body: "Inspections, leases, title, zoning." },
  { title: "Negotiation and close", body: "Terms, credits, and a clean close." },
];

export default function CommercialPage() {
  const deals = ["811-n-croft-ave-west-hollywood", "8417-waring-ave-west-hollywood", "9550-w-olympic-blvd-beverly-hills"]
    .map((slug) => SALES.find((s) => s.slug === slug)!)
    .filter(Boolean);
  const closed = SALES_BY_DATE.filter((s) => s.commercial);

  return (
    <>
      <PageIntro
        title="Commercial"
        lead="Twenty years of multi-family, retail, gas station, and ground lease deals."
        image="/images/waring-ave.jpg"
        imageAlt="A West Hollywood multi-unit building we sold"
      >
        <a href={BUSINESS.phoneHref} className="btn btn-light">
          <PhoneIcon size={16} /> Call Ramzi
        </a>
        <Link href="#contact" className="btn btn-glass">
          Share your deal
        </Link>
      </PageIntro>

      <section className="light section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <h2 className="h-section">What we handle</h2>
          </Reveal>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {TYPES.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 2) * 0.08} className="border-t border-ink/15 py-6">
                <h3 className="text-[1.6rem]">{t.title}</h3>
                <p className="mt-2 text-ink-soft">{t.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">How a commercial deal runs</h2>
          </Reveal>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section !pt-0 bg-onyx">
        <div className="wrap">
          <Reveal>
            <h2 className="h-section mb-12">Income property closed</h2>
          </Reveal>
          <div className="rail">
            {deals.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <SaleCard sale={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="light section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <h2 className="h-section">Commercial closed</h2>
            <p className="lead mt-5 text-ink-soft">Gas stations and industrial, from public records.</p>
          </Reveal>
          <ul>
            {closed.map((s) => (
              <li
                key={s.slug}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-ink/12 py-4 first:border-t-0 first:pt-1 md:grid-cols-[1.3fr_1fr_140px] md:items-baseline md:gap-x-8"
              >
                <p className="font-medium">{s.address}</p>
                <p className="num text-right text-[1.35rem] leading-none md:order-3">{formatPrice(s.price)}</p>
                <p className="text-ink-soft md:order-2">
                  {[s.type, placeLabel(s), saleStatus(s, "")].filter(Boolean).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactPanel
        heading="Tell us about the property"
        intro="Asset, location, goal. Ramzi will call you back."
        defaultTopic="Commercial or investment"
      />
    </>
  );
}
