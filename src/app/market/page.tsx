import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Market Update | La Verne & Claremont CA Real Estate — The Rabadi Group",
  description:
    "Current real estate market conditions in La Verne, Claremont, San Dimas, Glendora, and the San Gabriel Valley Foothills. Insights from Ramzi and Christopher Rabadi. Updated 2025.",
  keywords: ["La Verne home prices 2025", "Claremont real estate market", "San Gabriel Valley housing market", "Foothill Cities real estate", "La Verne homes for sale", "Claremont CA real estate"],
};

const insights = [
  {
    market: "La Verne",
    headline: "Tight Inventory, Strong Demand",
    body: "La Verne continues to be one of the most competitive markets in the eastern SGV. Properly priced homes on the foothill side — especially on larger lots — are seeing multiple offer situations. The corridor along Baseline Road and north toward the hills remains the strongest micro-market.",
    stat: "From $900K",
    trend: "↑ Appreciating",
  },
  {
    market: "Claremont",
    headline: "Premium Command, Limited Supply",
    body: "Claremont's combination of the colleges, the Village, and north-end custom estates creates a uniquely stable and appreciating luxury tier. Homes in north Claremont — especially foothills properties — are routinely receiving above-list offers. Buyers need to be ready to move.",
    stat: "From $1.1M",
    trend: "↑ Strong",
  },
  {
    market: "San Dimas",
    headline: "Value Play with Growing Premium Tier",
    body: "San Dimas is where the value-to-lifestyle ratio is strongest right now. Larger lots, equestrian properties, and a tight-knit community are attracting buyers priced out of La Verne and Claremont. The north-end custom homes are appreciating faster than the broader market.",
    stat: "From $750K",
    trend: "↑ Gaining",
  },
  {
    market: "Glendora",
    headline: "Consistent Appreciation, Strong Schools",
    body: "Glendora's northside has some of the most desirable addresses in the eastern SGV — hillside estates with canyon views and direct trail access. The school district continues to drive demand from families, keeping absorption rates healthy even as inventory tightens.",
    stat: "From $850K",
    trend: "↑ Steady",
  },
];

export default function MarketPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-5">Market Update · 2025</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#EDE8DC] mb-6 max-w-3xl">
            La Verne, Claremont &amp;<br />the Foothill Cities Market.<br />
            <span className="gold-grad">What You Need to Know.</span>
          </h1>
          <p className="text-[#8A8680] text-xl leading-relaxed mb-4 max-w-xl">
            Straight market intel from Ramzi and Christopher Rabadi —
            the agents who live and work in these neighborhoods every day.
          </p>
          <p className="text-[#5A5650] text-base mb-10 max-w-xl">
            No national averages. No data that doesn&apos;t apply to your street. Just an honest picture
            of what the La Verne and Claremont real estate market looks like right now.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg">
              <PhoneIcon /> Call {BUSINESS.phone}
            </a>
            <a href="/sellers" className="btn btn-outline btn-lg">What&apos;s My Home Worth?</a>
          </div>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Market overview */}
      <section className="py-20 md:py-28 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">Overview</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-8 max-w-xl">
            The SGV Foothill Corridor in 2025.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 card p-7 md:p-9">
              <h3 className="text-xl font-bold text-[#EDE8DC] mb-4">The Big Picture</h3>
              <div className="prose">
                <p className="text-[#7A7570] leading-relaxed mb-4">
                  The La Verne and Claremont real estate market is operating in a environment of constrained inventory
                  and persistent demand. Interest rates have normalized buyer pools, but serious buyers — the ones with
                  pre-approval and real intent — are still competing for the limited quality inventory that comes to market.
                </p>
                <p className="text-[#7A7570] leading-relaxed mb-4">
                  What this means for sellers: properly priced homes in desirable Foothill Cities neighborhoods
                  are still moving fast and receiving competitive offers. The key word is &quot;properly priced&quot; —
                  the market has become more discerning, and overpriced listings are sitting.
                </p>
                <p className="text-[#7A7570] leading-relaxed">
                  What this means for buyers: you have more negotiating leverage than in 2021-2022, but on
                  the best properties, you still need to move decisively. Off-market access is more valuable
                  than ever — homes that don&apos;t hit the public portals are the best opportunities right now.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Market Conditions", val: "Seller-Favorable", note: "Low inventory, qualified demand" },
                { label: "Best Strategy (Sellers)", val: "Price Sharp, Market Hard", note: "Don't chase the market" },
                { label: "Best Strategy (Buyers)", val: "Off-Market First", note: "Best deals aren't on Zillow" },
                { label: "Our Read", val: "Buy Now if Ready", note: "Prices aren't dropping significantly" },
              ].map((s) => (
                <div key={s.label} className="card p-5">
                  <p className="text-[#5A5550] text-[11px] uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-[#EDE8DC] font-semibold text-sm mb-0.5">{s.val}</p>
                  <p className="text-[#4A4844] text-xs">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* City breakdown */}
      <section className="py-20 md:py-28 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">City by City</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-12 max-w-xl">
            Each Market Is Different. Here&apos;s What We&apos;re Seeing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((m) => (
              <div key={m.market} className="card p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="eyebrow mb-1">{m.market}</span>
                    <h3 className="text-xl font-bold text-[#EDE8DC]">{m.headline}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#C4953A] font-bold serif text-lg">{m.stat}</p>
                    <p className="text-[#4A8A4A] text-xs font-medium">{m.trend}</p>
                  </div>
                </div>
                <p className="text-[#7A7570] text-sm leading-relaxed">{m.body}</p>
                <div className="mt-5 pt-4 border-t border-[#1E1E1E]">
                  <a href={BUSINESS.phoneHref} className="text-[#C4953A] text-sm hover:text-[#D4A84A] transition-colors">
                    Ask us about {m.market} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ramzi & Christopher as the experts */}
      <section className="py-20 md:py-28 bg-[#090909] border-y border-[#1E1E1E]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-5">The Experts</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-6">
            Ask Ramzi or Christopher Directly.
          </h2>
          <p className="text-[#7A7570] text-lg leading-relaxed mb-8">
            Ramzi Rabadi has been in the La Verne and Claremont market for over 20 years.
            Christopher Rabadi grew up here. Between them, they&apos;ve seen every market cycle
            this area has produced — and they know exactly how to position you to win in the current one.
          </p>
          <p className="text-[#5A5550] mb-10">
            The Rabadi Group is the only real estate team by that name operating in Southern California.
            When you search for a Rabadi realtor in La Verne or Claremont — this is us.
          </p>
          <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg">
            <PhoneIcon /> Call {BUSINESS.phone}
          </a>
        </div>
      </section>

      <CTABanner
        headline="Talk to the Team That Knows This Market."
        sub="Not a chatbot, not a national call center. Ramzi or Christopher. La Verne and Claremont specialists."
        primaryLabel={"Call " + BUSINESS.phone}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Free Home Valuation"
        secondaryHref="/sellers"
      />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
