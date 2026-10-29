import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { CITIES, pct } from "@/lib/cities";
import CityShot from "./CityShot";

/** Photo tiles for our core cities, linking to their area or market page. */
export default function CityTiles({ to = "areas" }: { to?: "areas" | "market" }) {
  return (
    <div className="grid gap-1 sm:grid-cols-2">
      {CITIES.map((c, i) => (
        <Link key={c.slug} href={`/${to}/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden no-underline">
          <CityShot
            photo={c.photos[0]}
            sizes="(min-width: 640px) 50vw, 100vw"
            preload={i < 2}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-ivory md:bottom-8 md:left-8 md:right-8">
            <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none">{c.name}</p>
            <p className="num text-right text-[1.25rem] leading-tight text-ivory/90">
              {formatPrice(c.market.medianPrice, true)}
              <span className="block text-[0.85rem] font-sans text-ivory/70">
                median, {pct(c.market.yoy)}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
