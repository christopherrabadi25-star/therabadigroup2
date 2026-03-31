import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import ServiceTabs from "@/components/ServiceTabs";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Buyer's Guide | The Rabadi Group — La Verne & Claremont CA",
  description:
    "Buying a home in La Verne, Claremont, or the San Gabriel Valley? The Rabadi Group — Christopher and Ramzi Rabadi — are the area's top buyer specialists. Off-market access, below-ask acquisitions. Call (626) 203-1372.",
  keywords: ["buy home La Verne CA", "buy home Claremont CA", "San Gabriel Valley buyer agent", "Christopher Rabadi", "Ramzi Rabadi", "real estate agent La Verne", "off market homes La Verne"],
};

const steps = [
  {
    num: "01",
    title: "Free Buyer Consultation",
    body: "We start with a straight conversation — no pitch deck, no slideshow. Tell us what you're looking for, your timeline, and your budget. We tell you exactly what's realistic and what the market looks like right now in your target area.",
  },
  {
    num: "02",
    title: "Pre-Approval & Strategy",
    body: "Before we show you a single home, you need to be locked and loaded. We'll connect you with trusted lenders in our network who move fast and close reliably. Then we build your search strategy — including off-market channels most agents don't have.",
  },
  {
    num: "03",
    title: "The Right Property",
    body: "We don't waste your weekends on homes that don't fit. Every property we show you is hand-selected against your criteria. We also have access to off-market inventory — homes that never hit Zillow — through our network in La Verne, Claremont, and the SGV.",
  },
  {
    num: "04",
    title: "Offer & Negotiation",
    body: "This is where most buyers lose money — and where we earn ours. We know how to structure offers that win in competitive situations without overpaying. Our average buyer acquisition comes in at or below list price.",
  },
  {
    num: "05",
    title: "Inspection & Due Diligence",
    body: "We walk every inspection with you. We know what to look for, what to ask for in repairs, and when to walk away. Our job is to protect your investment — not to close a deal at any cost.",
  },
  {
    num: "06",
    title: "Close & Move In",
    body: "We manage the entire closing process — title, escrow, lender coordination, final walkthrough. On closing day, you get keys and a team that stays available. We're not gone after the deal.",
  },
];

const whyUs = [
  { title: "Off-Market Access", body: "We source deals that never hit public portals. Our network in La Verne, Claremont, and the broader SGV gives buyers access other agents can't offer." },
  { title: "Below-Ask Acquisitions", body: "Our buyers routinely come in at or below list price. That's not luck — it's preparation, timing, and knowing how to negotiate in this specific market." },
  { title: "Local Knowledge, Real Depth", body: "We live and work in the Foothill Cities. We know which streets have overhead wires, which blocks have freeway noise, which neighborhoods are appreciating fastest." },
  { title: "Full Representation", body: "We represent your interests. Period. That means we tell you when a property is overpriced, when the inspection flags something serious, and when to walk away." },
];

export default function BuyersPage() {
  return (
    <>
      <ServiceTabs active="buyers" />
      {/* Hero */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-5">Buyer&apos;s Guide</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#EDE8DC] mb-6 max-w-3xl">
            Buying in La Verne, Claremont,<br />the SGV or Anywhere in SoCal?<br />
            <span className="gold-grad">Do It Right.</span>
          </h1>
          <p className="text-[#8A8680] text-xl leading-relaxed mb-4 max-w-xl">
            Christopher and Ramzi Rabadi are the Foothill Cities&apos; most connected buyer specialists.
            Off-market access. Below-ask strategy. Real results.
          </p>
          <p className="text-[#5A5650] text-base mb-10 max-w-xl">
            The La Verne and Claremont market is competitive — inventory is tight and prices are moving.
            The buyers who win are the ones with the best representation.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg">
              <PhoneIcon /> Call {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg">Text Us</a>
          </div>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Why us */}
      <section className="py-20 md:py-28 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">Why Buyers Choose Us</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-12 max-w-xl">
            We Don&apos;t Just Find Homes.<br />We Find the Right One, At the Right Price.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyUs.map((item, i) => (
              <div key={i} className="card p-7">
                <h3 className="text-lg font-bold text-[#EDE8DC] mb-3">{item.title}</h3>
                <p className="text-[#7A7570] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">The Process</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-14 max-w-xl">
            Six Steps From First Call to Moving Day.
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

      {/* Local area focus */}
      <section className="py-20 md:py-28 bg-[#090909] border-y border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow mb-4">Our Home Market</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-5">
                Nobody Knows La Verne &amp; Claremont Like We Do.
              </h2>
              <p className="text-[#7A7570] leading-relaxed mb-5">
                Ramzi Rabadi has been buying and selling in the Foothill Cities corridor for over 20 years.
                Christopher Rabadi grew up here. Together, they know every neighborhood, every value driver,
                and every hidden opportunity in La Verne, Claremont, San Dimas, Glendora, Upland, and surrounding cities.
              </p>
              <p className="text-[#7A7570] leading-relaxed mb-8">
                When you&apos;re buying a home in La Verne or Claremont, you need an agent who knows which streets
                flood in winter, which neighborhoods are appreciating fastest, and which listings are
                overpriced by $50K. That&apos;s us.
              </p>
              <a href={BUSINESS.phoneHref} className="btn btn-gold">
                <PhoneIcon /> Talk to Christopher or Ramzi
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { city: "La Verne", note: "Our home market. Competitive, fast-moving." },
                { city: "Claremont", note: "The Village & north Claremont. Strong appreciation." },
                { city: "San Dimas", note: "Larger lots, equestrian. Hidden value." },
                { city: "Glendora", note: "Hillside estates & strong community." },
                { city: "Upland", note: "North-end custom homes. Growing fast." },
                { city: "Rancho Cucamonga", note: "Best schools, strong appreciation." },
              ].map((a) => (
                <div key={a.city} className="card p-5">
                  <p className="text-[#EDE8DC] font-semibold mb-1">{a.city}</p>
                  <p className="text-[#5A5550] text-xs">{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Start Your Search?"
        sub="Call Christopher or Ramzi directly. We'll tell you exactly what the market looks like right now."
        primaryLabel={"Call " + BUSINESS.phone}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Your Criteria"
        secondaryHref={BUSINESS.smsHref}
      />

      {/* CTA */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-4">Start Your Search</span>
          <h2 className="text-3xl font-semibold text-[#EDE8DC] mb-4 mt-2">Ready to Find Your Home?</h2>
          <p className="text-[#6A6560] mb-8">Call or text Christopher or Ramzi directly. Real answers, no runaround.</p>
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
