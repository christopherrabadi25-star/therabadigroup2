import Link from "next/link";
import { BUSINESS, NAV_LINKS, MORE_LINKS, TEAM } from "@/lib/data";
import Ridgeline from "./Ridgeline";

export default function Footer() {
  return (
    <footer className="bg-oak-deep text-paper">
      <Ridgeline className="block h-16 w-full text-brass/70 md:h-24" />
      <div className="wrap pb-12 pt-10 md:pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-[2rem] leading-none">The Rabadi Group</p>
            <p className="mt-4 max-w-sm text-sage">
              Ramzi and Christopher Rabadi. Father and son real estate agents based in Claremont, working across
              Southern California.
            </p>
            <div className="mt-6 space-y-1">
              <a href={BUSINESS.phoneHref} className="block text-[1.15rem] font-semibold no-underline hover:text-brass">
                {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="block no-underline text-sage hover:text-paper">
                {BUSINESS.email}
              </a>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline text-sage hover:text-paper"
              >
                Instagram {BUSINESS.instagramHandle}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {[...NAV_LINKS, ...MORE_LINKS].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="no-underline text-sage hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sage">
            <p className="font-semibold text-paper">{BUSINESS.brokerage}</p>
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

        <p className="mt-14 border-t border-white/10 pt-6 text-[0.85rem] text-sage/80">
          © {new Date().getFullYear()} The Rabadi Group at {BUSINESS.brokerage}. Sales shown include transactions where
          we represented the buyer, the seller, or both. Information is deemed reliable but not guaranteed. Equal
          Housing Opportunity.
        </p>
      </div>
    </footer>
  );
}
