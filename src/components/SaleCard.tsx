import { formatDate, formatPrice, placeLabel, type Sale } from "@/lib/data";
import SafeImage from "./SafeImage";
import Ridgeline from "./Ridgeline";

function PhotoFallback({ sale }: { sale: Sale }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-oak text-paper">
      <Ridgeline className="h-16 w-full text-brass" />
      <span className="px-5 pb-5 pt-3 font-serif text-[1.6rem] leading-tight">{placeLabel(sale)}</span>
    </div>
  );
}

export default function SaleCard({
  sale,
  sizes = "(min-width: 768px) 33vw, 84vw",
  preload = false,
  showDescription = false,
}: {
  sale: Sale;
  sizes?: string;
  preload?: boolean;
  showDescription?: boolean;
}) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-stone">
        <SafeImage
          srcs={sale.images ?? []}
          alt={sale.imageAlt ?? `${sale.address}, ${sale.city}`}
          sizes={sizes}
          preload={preload}
          fallback={<PhotoFallback sale={sale} />}
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper px-3 py-1 text-[0.8rem] font-semibold text-ink">
          Sold {formatDate(sale.date)}
        </span>
      </div>
      <div className="pt-4">
        <p className="num text-[2rem] leading-none">{formatPrice(sale.price)}</p>
        <h3 className="h-sans mt-2 text-[1.05rem]">{sale.address}</h3>
        <p className="text-ink-soft">{placeLabel(sale)}</p>
        <p className="mt-1 text-[0.95rem] font-semibold text-brass-ink">
          {sale.side === "Buyer" ? "We represented the buyer" : "We represented the seller"}
        </p>
        {sale.facts && <p className="mt-2 text-[0.95rem] text-ink-soft">{sale.facts.join(", ")}</p>}
        {sale.highlight && <p className="mt-3 border-l-2 border-brass pl-3 text-[0.98rem]">{sale.highlight}</p>}
        {showDescription && sale.description && <p className="mt-3 text-ink-soft">{sale.description}</p>}
      </div>
    </article>
  );
}
