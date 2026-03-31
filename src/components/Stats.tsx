import { BUSINESS } from "@/lib/data";

const stats = [
  { n: "$100M+", l: "Closed Volume",  s: "Real deals. Verified." },
  { n: "4.2%",   l: "Above Ask Avg",  s: "On seller listings" },
  { n: "5.0 ★",  l: "Zillow Rating",  s: "35+ client reviews" },
  { n: "20+",    l: "Years Active",   s: "SGV market depth" },
  { n: "$1.7M",  l: "Avg Sale Price", s: "Luxury tier" },
  { n: "15+",    l: "Cities Served",  s: "LA · OC · IE" },
];

export default function Stats() {
  return (
    <section className="bg-[#090909] border-y border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow mb-3">By The Numbers</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#EDE8DC]">
              A Track Record Built Deal by Deal.
            </h2>
          </div>
          <a href={BUSINESS.phoneHref} className="btn btn-gold">
            <PhoneIcon /> {BUSINESS.phone}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#1A1A1A] rounded-xl overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 md:p-7 bg-[#0B0B0B] hover:bg-[#0F0F0F] transition-colors border-b border-r border-[#1A1A1A]"
              style={{ animation: `fadeUp 0.5s ease both ${0.05 * i}s` }}
            >
              <p className="text-[clamp(1.5rem,3vw,2rem)] font-bold gold-grad serif leading-none mb-2">{s.n}</p>
              <p className="text-[11px] font-semibold text-[#EDE8DC] uppercase tracking-widest mb-1">{s.l}</p>
              <p className="text-[11px] text-[#3A3834]">{s.s}</p>
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
