import Link from "next/link";

const paths = [
  {
    eyebrow: "Buyers",
    label: "Buy a Home",
    description:
      "First home or fifth — we get you in at the right price. Every neighborhood, all price ranges, full representation from search to close.",
    cta: "How We Help Buyers",
    href: "/buyers",
    icon: <HouseIcon />,
    stat: { value: "5.0 ★", label: "Zillow Rating" },
  },
  {
    eyebrow: "Sellers",
    label: "Sell Your Home",
    description:
      "We average 4.2% above asking on qualifying listings. Precision pricing, aggressive marketing, and a negotiator who doesn't blink.",
    cta: "How We Sell",
    href: "/sellers",
    icon: <ChartIcon />,
    stat: { value: "4.2%", label: "Above Ask Avg" },
  },
  {
    eyebrow: "Commercial & Investment",
    label: "Commercial & Investment Real Estate",
    description:
      "Multi-family, industrial, gas stations, ground leases, retail. Ramzi Rabadi has closed complex commercial deals across SoCal for 20+ years.",
    cta: "Commercial Experience",
    href: "/commercial",
    icon: <BuildingIcon />,
    stat: { value: "$100M+", label: "Closed Volume" },
  },
];

export default function ServicePaths() {
  return (
    <section className="py-16 md:py-20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-10">
          <span className="eyebrow mb-3">How We Can Help</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold text-[#EDE8DC]">
            What Are You Looking to Do?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paths.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="card group flex flex-col justify-between p-8 hover:border-[#C4953A]/40 transition-colors duration-300"
              style={{ animation: `fadeUp 0.5s ease both ${0.1 * i}s` }}
            >
              <div>
                <div className="mb-5 text-[#C4953A] opacity-80 group-hover:opacity-100 transition-opacity">
                  {p.icon}
                </div>
                <span className="eyebrow mb-2 block">{p.eyebrow}</span>
                <h3 className="text-xl font-semibold text-[#EDE8DC] mb-3 leading-snug">
                  {p.label}
                </h3>
                <p className="text-[#6A6560] text-sm leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#C4953A] serif">{p.stat.value}</p>
                  <p className="text-[10px] text-[#3A3834] uppercase tracking-widest mt-0.5">{p.stat.label}</p>
                </div>
                <span className="text-[#C4953A] text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {p.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="9" height="18" rx="1" />
      <rect x="13" y="8" width="9" height="13" rx="1" />
      <path d="M6 7h1M6 11h1M6 15h1M17 12h1M17 16h1" />
    </svg>
  );
}
