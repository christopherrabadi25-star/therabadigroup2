import { BUSINESS } from "@/lib/data";

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#070707" }}>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blob blob-gold"
        style={{ width: "800px", height: "400px", opacity: 0.6 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="eyebrow mb-4">Track Record</span>
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold text-[#EDE8DC]">
              Built Deal by Deal.<br />
              <span style={{ color: "#5A5550", fontWeight: 400, fontSize: "0.72em" }}>
                Every number is real. No fluff.
              </span>
            </h2>
          </div>
          <a href={BUSINESS.phoneHref} className="btn btn-gold shrink-0 btn-pulse">
            <PhoneIcon /> {BUSINESS.phone}
          </a>
        </div>

        {/* Hero stats — 3 large editorial numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#181818] rounded-2xl overflow-hidden mb-px">
          {[
            { n: "$100M+", l: "In Closed Transactions", s: "Residential, commercial, and investment — all price ranges." },
            { n: "4.2%", l: "Above Asking (Avg)", s: "Our sellers consistently close above list price." },
            { n: "5.0 ★", l: "Zillow Rating", s: "35+ verified reviews. Every client, every deal." },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#080808] px-8 md:px-10 py-10 md:py-12 group hover:bg-[#0C0C0C] transition-colors"
              style={{ animation: `fadeUp 0.6s ease both ${0.08 * i}s` }}
            >
              <p className="text-[clamp(2.8rem,5vw,4rem)] font-bold gold-grad serif leading-none mb-3">{s.n}</p>
              <p className="text-[0.8rem] font-bold text-[#EDE8DC] uppercase tracking-widest mb-2">{s.l}</p>
              <p className="text-[0.82rem] text-[#3A3834] leading-relaxed">{s.s}</p>
            </div>
          ))}
        </div>

        {/* Supporting stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#181818] rounded-b-2xl overflow-hidden">
          {[
            { n: "20+", l: "Years in SGV", s: "La Verne roots" },
            { n: "$1.7M", l: "Avg Sale Price", s: "Luxury tier" },
            { n: "15+", l: "Cities Served", s: "LA · OC · IE" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#060606] px-7 py-7 group hover:bg-[#090909] transition-colors"
              style={{ animation: `fadeUp 0.6s ease both ${0.12 + 0.08 * i}s` }}
            >
              <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#C4953A] serif leading-none mb-1.5">{s.n}</p>
              <p className="text-[0.72rem] font-bold text-[#EDE8DC] uppercase tracking-widest mb-0.5">{s.l}</p>
              <p className="text-[0.72rem] text-[#2E2C2A]">{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
