import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import ServiceTabs from "@/components/ServiceTabs";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Commercial Real Estate | The Rabadi Group — Southern California",
  description:
    "Commercial real estate in Southern California. Ramzi Rabadi — 20+ years, $100M+ in closed transactions. Multi-family, industrial, gas stations, ground leases, retail, investment properties. Call (626) 203-1372.",
  keywords: [
    "commercial real estate La Verne CA",
    "commercial real estate agent Los Angeles",
    "multi-family real estate Southern California",
    "industrial real estate San Gabriel Valley",
    "gas station properties California",
    "ground lease real estate agent",
    "Ramzi Rabadi commercial",
    "investment property Los Angeles",
    "commercial real estate broker Claremont CA",
  ],
};

const propertyTypes = [
  {
    title: "Multi-Family & Apartments",
    body: "2-unit to large apartment complexes. We represent buyers and sellers of income-producing residential properties across LA, San Bernardino, and Orange counties.",
  },
  {
    title: "Industrial & Warehouse",
    body: "Manufacturing, distribution, flex space. We understand NNN leases, CAP rates, and what industrial tenants actually need in the current market.",
  },
  {
    title: "Gas Station Properties",
    body: "Fee simple, leased fee, and leaseback structures. Ramzi has completed gas station transactions that most agents won't touch — environmental disclosures, underground storage tanks, and all.",
  },
  {
    title: "Ground Leases",
    body: "Long-term ground leases require a specialist. We've negotiated ground lease acquisitions and dispositions from both the landlord and tenant side.",
  },
  {
    title: "Retail & Strip Centers",
    body: "Neighborhood retail, strip centers, anchor-tenant buildings. We analyze tenant mix, lease quality, and value-add potential before you commit.",
  },
  {
    title: "Mixed-Use Properties",
    body: "Residential over retail, live-work buildings, and mixed-use developments. We work across the full mixed-use spectrum in urban and suburban SoCal.",
  },
  {
    title: "Office Buildings",
    body: "From small professional buildings to mid-size office product. We've closed office deals in Beverly Hills, West Hollywood, and throughout the SGV.",
  },
  {
    title: "Investment Acquisitions",
    body: "Cap rate analysis, rent roll underwriting, due diligence management. If you're building a portfolio, we help you buy right and hold smarter.",
  },
];

const credentials = [
  { value: "$100M+", label: "Closed Volume" },
  { value: "20+", label: "Years in SoCal Commercial" },
  { value: "5.0 ★", label: "Zillow Rating" },
  { value: "All Types", label: "Asset Classes Handled" },
];

const steps = [
  {
    num: "01",
    title: "Goals & Discovery",
    body: "We start by understanding your objective — acquire, divest, 1031 exchange, or reposition. Commercial deals require a clear strategy before you ever make an offer or list a property.",
  },
  {
    num: "02",
    title: "Market Analysis & Valuation",
    body: "We pull comp data, analyze cap rates, review rent rolls, and build a realistic value range. No inflated broker opinions — just what the market will actually support.",
  },
  {
    num: "03",
    title: "Property Identification or Marketing",
    body: "Buyers: we source on and off market. Sellers: we prepare a professional offering memorandum and target qualified buyers through our commercial network across Southern California.",
  },
  {
    num: "04",
    title: "Due Diligence",
    body: "Commercial due diligence is where deals die if you're not thorough. We coordinate inspections, environmental reports, lease reviews, title work, and zoning verification so nothing surprises you at closing.",
  },
  {
    num: "05",
    title: "Negotiation",
    body: "Twenty years of commercial negotiation experience. We know the difference between a motivated seller and a fishing expedition. We know when to push and when to walk.",
  },
  {
    num: "06",
    title: "Close",
    body: "We manage escrow, lender coordination, title, and final documentation through to a clean close. Commercial transactions have more moving parts — we track all of them.",
  },
];

const closedDeals = [
  {
    address: "9550 W Olympic Blvd",
    city: "Beverly Hills, CA",
    price: "$3,050,000",
    type: "Office — Buyer Representative",
    note: "Prime Beverly Hills commercial address on the 90210 corridor.",
  },
  {
    address: "811 N Croft Ave",
    city: "Los Angeles, CA",
    price: "$2,650,000",
    type: "4-Plex — Buyer Representative",
    note: "West Hollywood income property. Half a block from Melrose Place.",
  },
  {
    address: "8417 Waring Ave",
    city: "Los Angeles, CA",
    price: "$2,110,000",
    type: "Multi-Unit — Buyer Representative",
    note: "Classic West Hollywood multi-unit. 7 beds, 5 baths, 4,167 SF.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <ServiceTabs active="commercial" />
      {/* Hero */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-5">Commercial &amp; Investment</span>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#EDE8DC] mb-6 max-w-4xl">
            Commercial Real Estate in SoCal.<br />
            <span className="gold-grad">Every Asset Class. Done Right.</span>
          </h1>
          <p className="text-[#8A8680] text-xl leading-relaxed mb-4 max-w-2xl">
            Ramzi Rabadi has been closing commercial real estate transactions in Southern California for over 20 years — from multi-family acquisitions to complex ground leases to gas station properties most agents won&apos;t touch.
          </p>
          <p className="text-[#5A5650] text-base mb-10 max-w-xl">
            Whether you&apos;re buying your first investment property or selling a commercial asset, we bring the experience, the network, and the discipline to get it done.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg">
              <PhoneIcon /> Call {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg">Text Us Your Deal</a>
          </div>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Credentials strip */}
      <section className="py-14 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className="card p-6 text-center">
                <p className="text-3xl font-bold text-[#C4953A] serif mb-1">{c.value}</p>
                <p className="text-[10px] text-[#4A4844] uppercase tracking-widest">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we handle */}
      <section className="py-20 md:py-28 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">What We Handle</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-3 max-w-2xl">
            Every Commercial Asset Class. One Team.
          </h2>
          <p className="text-[#5A5550] text-base mb-12 max-w-xl">
            We don&apos;t cherry-pick the easy deals. We handle the full spectrum — including the complex transactions other agents pass on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {propertyTypes.map((t, i) => (
              <div key={i} className="card p-6">
                <h3 className="text-[#EDE8DC] font-semibold mb-3 text-base">{t.title}</h3>
                <p className="text-[#5A5550] text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ramzi */}
      <section className="py-20 md:py-28 bg-[#090909] border-y border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow mb-4">Experience That Matters</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-6">
                Commercial Deals Are Different.<br />You Need Someone Who&apos;s Done It Before.
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "20+ Years in Commercial",
                    body: "Ramzi Rabadi has been closing commercial transactions across Los Angeles and San Bernardino counties since before most agents knew what a cap rate was.",
                  },
                  {
                    title: "Complex Deals Welcome",
                    body: "Ground leases. Gas stations with UST issues. Distressed multi-family. Sale-leasebacks. We don't shy away from complicated — we close it.",
                  },
                  {
                    title: "Full-Service Representation",
                    body: "We represent buyers, sellers, and in some cases both sides. Commercial deals need an agent who understands the entire transaction — not just one side of it.",
                  },
                  {
                    title: "Network Across SoCal",
                    body: "Our commercial buyer and seller network spans LA, San Bernardino, Orange, and Riverside counties. When you need to move a property fast, we know who to call.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-5 h-5 shrink-0 rounded-full border border-[#C4953A]/40 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4953A]" />
                    </div>
                    <div>
                      <p className="text-[#EDE8DC] font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-[#6A6560] text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a href={BUSINESS.phoneHref} className="btn btn-gold">
                  <PhoneIcon /> Talk to Ramzi
                </a>
              </div>
            </div>
            <div>
              <span className="eyebrow mb-5 block">Closed Commercial Deals</span>
              <div className="space-y-4">
                {closedDeals.map((deal, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="text-[#EDE8DC] font-semibold">{deal.address}</p>
                        <p className="text-[#4A4844] text-xs">{deal.city}</p>
                      </div>
                      <p className="text-[#C4953A] font-bold text-lg serif shrink-0">{deal.price}</p>
                    </div>
                    <p className="text-[10px] text-[#3A3834] uppercase tracking-wider mb-2">SOLD — {deal.type}</p>
                    <p className="text-[#5A5550] text-xs">{deal.note}</p>
                  </div>
                ))}
                <p className="text-[#2A2824] text-xs text-center pt-2">Sample from portfolio. Full history available on request.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <span className="eyebrow mb-4">How We Work</span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#EDE8DC] mb-14 max-w-xl">
            Six Steps From First Call to Close.
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
        headline="Have a Commercial Deal? Let's Talk."
        sub="Call or text Ramzi directly. We respond fast, speak plainly, and close deals."
        primaryLabel={"Call " + BUSINESS.phone}
        primaryHref={BUSINESS.phoneHref}
        secondaryLabel="Text Your Deal"
        secondaryHref={BUSINESS.smsHref}
      />

      {/* Bottom CTA */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-4">Ready to Move?</span>
          <h2 className="text-3xl font-semibold text-[#EDE8DC] mb-4 mt-2">
            Commercial Real Estate Starts With One Call.
          </h2>
          <p className="text-[#6A6560] mb-8 max-w-lg mx-auto">
            Tell us your asset type, your goal, and your timeline. We&apos;ll tell you exactly what it&apos;s worth and what the market looks like right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg w-full sm:w-auto">
              <PhoneIcon /> Call (626) 203-1372
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg w-full sm:w-auto">
              Text Us Your Deal
            </a>
          </div>
          <p className="text-[#2A2824] text-xs mt-8">Ramzi Rabadi · CA DRE #01738777 · Agency 8 Real Estate Group · Claremont, CA</p>
        </div>
      </section>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
