import Link from "next/link";
import { BUSINESS, NAV_LINKS, TEAM } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="serif text-xl font-bold text-white mb-1">The Rabadi Group</p>
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#C8A96A] mb-5">Southern California Luxury</p>
            <p className="text-sm text-[#666] leading-relaxed mb-5">
              Father-and-son luxury real estate. $100M+ closed.
              20+ years. Claremont, CA.
            </p>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer"
              className="text-sm text-[#555] hover:text-[#C8A96A] transition-colors flex items-center gap-2">
              <IgIcon /> {BUSINESS.instagramHandle}
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#C8A96A] font-medium mb-5">Pages</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#C8A96A] font-medium mb-5">Licensed Agents</h3>
            <ul className="space-y-4">
              {TEAM.map((m) => (
                <li key={m.name}>
                  <p className="text-sm text-white font-medium">{m.name}</p>
                  <p className="text-xs text-[#555]">{m.title}</p>
                  <p className="text-xs text-[#3A3A3A] mt-0.5">{m.dre}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-[#C8A96A] font-medium mb-5">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href={BUSINESS.phoneHref} className="text-sm text-[#666] hover:text-[#C8A96A] transition-colors">
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-[#666] hover:text-[#C8A96A] transition-colors break-all">
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <p className="text-sm text-[#444]">{BUSINESS.brokerage}<br />{BUSINESS.brokerageCity}</p>
              </li>
            </ul>
            <a href="/contact" className="btn btn-gold py-3 px-5 text-sm">Free Valuation</a>
          </div>
        </div>

        <div className="rule-gold mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#3A3A3A]">
          <p>© {new Date().getFullYear()} The Rabadi Group. Brokered by {BUSINESS.brokerage}.</p>
          <p>Ramzi Rabadi CA DRE #01738777 &nbsp;·&nbsp; Christopher Rabadi CA DRE #02246356</p>
        </div>
        <p className="text-center text-[10px] text-[#2A2A2A] mt-3">
          Equal Housing Opportunity. Information deemed reliable but not guaranteed. All properties subject to prior sale, change, or withdrawal. Neither listing broker(s) nor The Rabadi Group shall be responsible for typographical errors, misinformation, or misprints.
        </p>
      </div>
    </footer>
  );
}

function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
