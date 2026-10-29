import Link from "next/link";
import { LISTINGS, listingNumbers, usd } from "@/lib/listings";
import { Reveal } from "./Motion";

/** Band linking to each coming-soon / active listing's brochure page. */
export default function ComingSoon({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (!LISTINGS.length) return null;
  const dark = tone === "dark";
  return (
    <section className={dark ? "section bg-onyx text-ivory" : "light section"}>
      <div className="wrap">
        <Reveal>
          <h2 className="h-section mb-10">Coming soon</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {LISTINGS.map((l) => {
            const n = listingNumbers(l);
            return (
              <Reveal key={l.slug}>
                <Link
                  href={`/listings/${l.slug}`}
                  className={`group block rounded-[20px] border p-7 transition-colors md:p-9 ${
                    dark ? "border-champagne/30 hover:border-champagne/70" : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <p className={`text-[0.85rem] font-semibold uppercase tracking-[0.18em] ${dark ? "text-champagne" : "text-champagne-deep"}`}>
                    {l.status}
                  </p>
                  <p className="num mt-4 text-[clamp(2.4rem,6vw,3.4rem)] leading-none">{usd(l.price)}</p>
                  <h3 className="mt-4 text-[1.2rem]">{l.address}</h3>
                  <p className="opacity-80">
                    {l.city}. {l.type}, {l.units.length} units, {usd(n.monthly)}/mo in rents.
                  </p>
                  <p className="mt-5 font-semibold underline-offset-4 group-hover:underline">See the investment brochure</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
