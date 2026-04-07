import Link from "next/link";

const paths = [
  {
    eyebrow: "For Buyers",
    label: "Buy a Home",
    description:
      "First home or fifth — we get you in at the right price. Every neighborhood, all price ranges, full representation from search to close. We know what's coming before it hits Zillow.",
    cta: "How We Help Buyers",
    href: "/buyers",
    icon: <HouseIcon />,
    stat: { value: "5.0 ★", label: "Zillow Rating" },
    accent: "Every listing. Including off-market.",
  },
  {
    eyebrow: "For Sellers",
    label: "Sell Your Home",
    description:
      "Our listings average 4.2% above asking price. Precision pricing, aggressive marketing, and a negotiator who doesn't blink. Find out what your home is actually worth.",
    cta: "How We Sell",
    href: "/sellers",
    icon: <ChartIcon />,
    stat: { value: "4.2%", label: "Above Ask Avg" },
    accent: "More money. Period.",
  },
  {
    eyebrow: "Commercial & Investment",
    label: "Commercial Real Estate",
    description:
      "Multi-family, industrial, gas stations, ground leases, retail strip. Ramzi Rabadi has been closing complex commercial deals across Southern California for over 20 years.",
    cta: "Commercial Experience",
    href: "/commercial",
    icon: <BuildingIcon />,
    stat: { value: "$100M+", label: "Closed Volume" },
    accent: "Deals most agents won't touch.",
  },
];

export default function ServicePaths() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#080808" }}>

      {/* Subtle section divider top */}
      <div className="absolute top-0 left-0 right-0 rule-gold" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-12">
          <span className="eyebrow mb-4">How We Can Help</span>
          <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] font-semibold text-[#EDE8DC]">
            What Are You Looking to Do?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {paths.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="glass-card group flex flex-col justify-between p-7 md:p-8"
              style={{ animation: `fadeUp 0.55s ease both ${0.1 * i}s` }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(196,149,58,0.6), transparent)" }}
              />

              <div>
                {/* Icon circle */}
                <div className="w-11 h-11 rounded-full border border-[#C4953A]/20 bg-[#C4953A]/5 flex items-center justify-center mb-5 text-[#C4953A] group-hover:border-[#C4953A]/50 group-hover:bg-[#C4953A]/10 transition-all duration-300">
                  {p.icon}
                </div>

                <span className="eyebrow mb-2 block text-[0.62rem]">{p.eyebrow}</span>
                <h3 className="text-[1.25rem] font-semibold text-[#EDE8DC] mb-3 leading-snug serif">
                  {p.label}
                </h3>
                <p className="text-[#5A5550] text-sm leading-relaxed">{p.description}</p>

                {/* Accent quote */}
                <p className="text-[#C4953A]/60 text-[0.72rem] font-medium italic mt-4">&ldquo;{p.accent}&rdquo;</p>
              </div>

              <div className="mt-8 flex items-end justify-between pt-6 border-t border-[#1A1A1A]">
                <div>
                  <p className="text-[2rem] font-bold text-[#C4953A] serif leading-none">{p.stat.value}</p>
                  <p className="text-[0.65rem] text-[#3A3834] uppercase tracking-widest mt-1">{p.stat.label}</p>
                </div>
                <span className="text-[#C4953A] text-[0.72rem] font-bold tracking-widest uppercase flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                  {p.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rule-gold" />
    </section>
  );
}

function HouseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="9" height="18" rx="1"/><rect x="13" y="8" width="9" height="13" rx="1"/>
      <path d="M6 7h1M6 11h1M6 15h1M17 12h1M17 16h1"/>
    </svg>
  );
}
