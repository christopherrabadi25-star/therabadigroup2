import { formatPrice, placeLabel, saleStatus, type Sale } from "@/lib/data";
import SafeImage from "./SafeImage";

function PhotoFallback({ sale }: { sale: Sale }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,#2e2a26_0%,#121110_75%)]">
      <div className="absolute inset-4 rounded-[12px] border border-champagne/25" />
      <div className="absolute inset-x-0 top-[30%] text-center">
        <span className="font-display text-[3.4rem] leading-none tracking-[0.06em] text-champagne/70">RG</span>
        <span className="mt-3 block text-[0.95rem] text-ivory/75">{sale.city}</span>
      </div>
    </div>
  );
}

/**
 * Editorial property card: the photo carries it, with the price set large
 * over the image like a film title.
 */
export default function SaleCard({
  sale,
  sizes = "(min-width: 768px) 33vw, 86vw",
  preload = false,
  showDescription = false,
  tall = true,
}: {
  sale: Sale;
  sizes?: string;
  preload?: boolean;
  showDescription?: boolean;
  tall?: boolean;
}) {
  return (
    <article className="group flex flex-col">
      <div className={`zoom-on-hover relative overflow-hidden rounded-[20px] bg-coal ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <SafeImage
          srcs={sale.images ?? []}
          alt={sale.imageAlt ?? `${sale.address}, ${sale.city}`}
          sizes={sizes}
          preload={preload}
          fallback={<PhotoFallback sale={sale} />}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/10 to-transparent" />
        <p className="absolute left-4 top-4 rounded-full bg-onyx/55 px-3 py-1 text-[0.85rem] font-medium text-ivory backdrop-blur-md">
          {saleStatus(sale)}
        </p>
        <div className="absolute inset-x-5 bottom-5 text-ivory">
          <p className="num text-[clamp(2.2rem,5vw,2.8rem)] leading-none">{formatPrice(sale.price)}</p>
          <h3 className="mt-3 text-[1.05rem]">{sale.address}</h3>
          <p className="text-[0.98rem] text-ivory/85">{placeLabel(sale)}</p>
        </div>
      </div>
      <div className="pt-5">
        <p className="text-[0.95rem] font-semibold text-champagne">
          {sale.side === "Buyer" ? "Represented the buyer" : "Represented the seller"}
        </p>
        {sale.facts && <p className="mt-1 text-[0.98rem] opacity-80">{sale.facts.join(", ")}</p>}
        {sale.highlight && <p className="mt-2 leading-relaxed">{sale.highlight}</p>}
        {showDescription && sale.description && <p className="mt-2 opacity-80">{sale.description}</p>}
      </div>
    </article>
  );
}
