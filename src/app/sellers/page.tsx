import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, SALES_BY_DATE } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import SaleCard from "@/components/SaleCard";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Selling a home in Claremont, La Verne, Pasadena, or the San Gabriel Valley? Ramzi and Christopher Rabadi price from real comps and negotiate every term. Free home value. Call (626) 203-1372.",
  alternates: { canonical: "/sellers" },
};

const STEPS = [
  { title: "Get a real number", body: "We pull the recent sales on your street and walk the house with you. You get an honest value range, not the number you want to hear." },
  { title: "Prepare the house", body: "We tell you what to fix, what to stage, and what to leave alone. Small changes here show up at closing." },
  { title: "Launch it properly", body: "Professional photos, a clear listing, the MLS and every major site, plus a direct push to agents we know with buyers looking." },
  { title: "Run showings and offers", body: "We handle every showing and keep you updated. When offers arrive we compare all the terms, not only the price." },
  { title: "Negotiate", body: "Price, credits, contingencies, timing. Ramzi has seen every kind of offer in 20+ years and pushes back on each point." },
  { title: "Close", body: "We manage escrow, title, the buyer's lender, and the final walkthrough until the deed records." },
];

export default function SellersPage() {
  const sellerSales = SALES_BY_DATE.filter((s) => s.side === "Seller").slice(0, 3);

  return (
    <>
      <PageIntro
        title="Sell your home for what it's worth"
        lead="We price from the comps on your street, prepare the house to show well, and negotiate every term of every offer."
      >
        <Link href="#contact" className="btn btn-brass">
          Get your home&apos;s value
        </Link>
        <a href={BUSINESS.phoneHref} className="btn btn-line">
          <PhoneIcon /> Call {BUSINESS.phone}
        </a>
      </PageIntro>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="num text-[5rem] leading-none text-oak md:text-[7rem]">4.2%</p>
            <p className="mt-3 text-ink-soft">average above asking on our seller listings</p>
          </div>
          <div className="prose-body text-[1.1rem]">
            <p>
              On a $900,000 home, 4.2% is about $37,800 more at closing. That comes from pricing it right the first
              day, making the house easy to say yes to, and not giving ground in negotiations.
            </p>
            <p className="text-ink-soft">
              Homes that are priced well still sell quickly in the Foothill Cities. Homes that start too high sit,
              and then sell for less. We would rather tell you the truth up front.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section mb-10">How a sale works with us</h2>
          <Steps items={STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-section">Recent seller sales</h2>
            <Link href="/listings" className="link">
              All sold homes
            </Link>
          </div>
          <div className="rail">
            {sellerSales.map((s) => (
              <SaleCard key={s.slug} sale={s} />
            ))}
          </div>
        </div>
      </section>

      <ContactPanel heading="What's your home worth?" intro="Send the address and anything we should know. We'll get back to you with a value range, usually the same day." />
    </>
  );
}
