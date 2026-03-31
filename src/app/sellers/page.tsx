import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import ServiceTabs from "@/components/ServiceTabs";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Seller's Guide | The Rabadi Group — La Verne & Claremont CA",
  description:
    "Selling your home in La Verne, Claremont, or the San Gabriel Valley? The Rabadi Group averages 4.2% above asking price. Free home valuations. Call Ramzi or Christopher Rabadi at (626) 203-1372.",
  keywords: ["sell home La Verne CA", "sell house Claremont CA", "best listing agent La Verne", "Ramzi Rabadi", "home valuation La Verne", "top realtor San Gabriel Valley", "sell home above asking"],
};

const steps = [
  { num: "01", title: "Free Home Valuation", body: "We start with a no-obligation valuation based on real-time comparables, current market conditions in your specific neighborhood, and 20+ years of pricing experience. We'll tell you what your home is actually worth — not what you want to hear, what's real." },
  { num: "02", title: "Pre-Listing Strategy", body: "Before your home hits the market, we build a plan: what to fix, what to stage, what to leave alone. Small moves here translate directly to dollars at closing." },
  { num: "03", title: "Professional Marketing", body: "Your listing gets professional photography, compelling copy, and a distribution strategy that reaches qualified buyers — on Zillow, Realtor.com, the MLS, and our private agent network across La Verne, Claremont, and the broader SGV." },
  { num: "04", title: "Showings & Offers", body: "We manage every showing, collect every piece of feedback, and keep you informed in real time. When offers come in, we analyze every term — not just the price." },
  { num: "05", title: "Negotiation", body: "This is where Ramzi's 20+ years earns its keep. We've seen every offer structure, every contingency play, every lowball tactic. We negotiate hard on every point — price, terms, credits, timeline." },
  { num: "06", title: "Close Strong", body: "We manage escrow, title, lender coordination, and the final walkthrough. You close at maximum value with minimum stress. Then we stay in touch — because a relationship isn't over at closing." },
];

export default function SellersPage() {
  return (
    <>
      <ServiceTabs active="sellers" />
      {/* Hero */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-5">Seller&apos;s Guide</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#EDE8DC] mb-6 max-w-3xl">
            Selling in La Verne, Claremont,<br />the SGV or Foothill Cities?<br />
            <span className="gold-grad">We Will Sell It Right.</span>
          </h1>
          <p className="text-[#8A8680] text-xl leading-relaxed mb-4 max-w-xl">
            The Rabadi Group averages 4.2% above asking price on qualifying seller listings — based on our closed portfolio.
            That&apos;s not marketing copy — that&apos;s the number from our closed deals.
          </p>
          <p className="text-[#5A5650] text-base mb-10 max-w-xl">
            Ramzi Rabadi has been selling homes in La Verne, Claremont, and the Foothill Cities for over
            20 years. He knows this market better than anyone. Let&apos;s talk about yours.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg">
              <PhoneIcon /> Call {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg">Free Home Valuation</a>
          </div>
        </div>
      </section>

      <div className="rule-gold" />

      {/* 4.2% claim */}
      <section className="py-20 md:py-28 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow mb-4">What 4.2% Above Ask Means</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-5">
                On a $900,000 Home, That&apos;s an Extra $37,800 in Your Pocket.
              </h2>
              <p className="text-[#7A7570] leading-relaxed mb-4">
                Most agents list your home and hope for the best. We price it with precision, market it
                aggressively, and negotiate every point of every offer. The 4.2% above-ask average
                is the result of doing all three things right, every time.
              </p>
              <p className="text-[#7A7570] leading-relaxed mb-8">
                In the current La Verne and Claremont market, properly priced and marketed homes
                are still moving fast. The difference between a good agent and a great one shows
                up directly in your net proceeds.
              </p>
              <a href={BUSINESS.phoneHref} className="btn btn-gold">
                <PhoneIcon /> Get a Free Valuation
              </a>
            </div>
            <div className="space-y-4">
              {[
                { label: "Average Above Ask", value: "4.2%", sub: "On qualifying closed listings" },
                { label: "Years Selling La Verne & Claremont", value: "20+", sub: "Ramzi Rabadi's market tenure" },
                { label: "Zillow Rating", value: "5.0 ★", sub: "35+ verified client reviews" },
                { label: "Avg Days to Offer", value: "Fast", sub: "Properly priced homes move" },
              ].map((s) => (
                <div key={s.label} className="card p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[#EDE8DC] font-semibold text-sm">{s.label}</p>
                    <p className="text-[#5A5550] text-xs mt-0.5">{s.sub}</p>
                  </div>
                  <p className="text-2xl font-bold text-[#C4953A] serif">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">How We Sell</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-14 max-w-xl">
            Six Steps to a Maximum-Value Sale.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <p className="step-num shrink-0 w-16">{step.num}</p>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-[#EDE8DC] mb-2">{step.title}</h3>
                  <p className="text-[#7A7570] text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="What's Your Home Worth?"
        sub="Free valuation. Real numbers. No pressure. Ramzi or Christopher will call you back the same day."
        primaryLabel={"Call " + BUSINESS.phone}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Us for Free CMA"
        secondaryHref={BUSINESS.smsHref}
      />

      {/* CTA */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-4">Get Your Valuation</span>
          <h2 className="text-3xl font-semibold text-[#EDE8DC] mb-4 mt-2">What&apos;s Your Home Worth?</h2>
          <p className="text-[#6A6560] mb-8">Call or text Ramzi or Christopher directly. We&apos;ll give you a real, data-backed number — no pressure, no obligation.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg w-full sm:w-auto">
              <PhoneIcon /> Call (626) 203-1372
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg w-full sm:w-auto">
              Text Us
            </a>
          </div>
        </div>
      </section>
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
