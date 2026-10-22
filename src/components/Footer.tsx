import Link from "next/link";
import { BUSINESS, NAV_LINKS, MORE_LINKS, TEAM } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-onyx text-ivory">
      <div className="wrap pb-12 pt-20 md:pt-28">
        <p className="font-display text-[clamp(2.2rem,7vw,5rem)] uppercase leading-[0.95] tracking-[0.08em]">
          The Rabadi Group
        </p>
        <div className="mt-14 grid gap-12 border-t border-ivory/10 pt-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="max-w-sm text-ivory/75">
              Ramzi and Christopher Rabadi, a father and son team, with more than twenty years of Southern California
              real estate behind them.
            </p>
            <div className="mt-6 space-y-1.5">
              <a href={BUSINESS.phoneHref} className="block font-display text-[1.5rem] no-underline hover:text-champagne">
                {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="block text-ivory/75 no-underline hover:text-ivory">
                {BUSINESS.email}
              </a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="block text-ivory/75 no-underline hover:text-ivory">
                Instagram {BUSINESS.instagramHandle}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {[...NAV_LINKS, ...MORE_LINKS].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/75 no-underline hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-ivory/75">
            <p className="text-ivory">{BUSINESS.brokerage}</p>
            <p className="mt-1">{BUSINESS.address.full}</p>
            <ul className="mt-5 space-y-1">
              {TEAM.map((m) => (
                <li key={m.name}>
                  {m.name}, {m.dre}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-[0.8rem] leading-relaxed text-ivory/65">
          © {new Date().getFullYear()} The Rabadi Group at {BUSINESS.brokerage}. Sales shown include transactions where
          we represented the buyer or the seller. Information is deemed reliable but not guaranteed. Equal Housing
          Opportunity.
        </p>
      </div>
    </footer>
  );
}
