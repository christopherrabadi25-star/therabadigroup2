import Image from "next/image";
import Link from "next/link";
import { LISTINGS, BUSINESS } from "@/lib/data";

export default function FeaturedListings() {
  const featured = LISTINGS.filter((l) => l.featured);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#060606" }}>

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow mb-4">Closed Transactions</span>
            <h2 className="text-[clamp(2rem,4.2vw,3.2rem)] font-semibold text-[#EDE8DC] mb-3">The Portfolio</h2>
            <p className="text-[#4A4844] max-w-md text-base leading-relaxed">
              From a $7.4M Hollywood Hills estate to a $6.3M Dana Point beachfront. Every deal is real.
            </p>
          </div>
          <Link href="/listings" className="btn btn-outline btn-sm shrink-0">All Deals →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((listing, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#C4953A]/25 transition-all duration-300 hover:-translate-y-1"
              style={{
                animation: `fadeUp 0.55s ease both ${0.1 * i}s`,
                boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4953A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.image}
                  alt={`${listing.address}, ${listing.city}`}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C4953A] text-black text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                    {listing.status} · {listing.date}
                  </span>
                </div>

                {/* Price overlaid on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[1.6rem] font-bold text-white serif leading-none">{listing.price}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <span className="eyebrow text-[0.6rem] mb-1">{listing.neighborhood}</span>
                <h3 className="text-[#EDE8DC] font-semibold text-[0.95rem] mb-0.5">{listing.address}</h3>
                <p className="text-[#3A3834] text-sm mb-3">{listing.city}</p>
                <p className="text-[#4A4844] text-sm leading-relaxed line-clamp-2">{listing.description}</p>
                <div className="mt-4 pt-4 border-t border-[#141414] flex items-center justify-between">
                  <span className="text-[#2A2824] text-xs tracking-wide">{listing.role}</span>
                  <a
                    href={BUSINESS.phoneHref}
                    className="text-[#C4953A] text-xs font-bold tracking-widest uppercase hover:text-[#D4A84A] transition-colors"
                  >
                    Inquire →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 rounded-xl border border-[#1A1A1A] bg-[#090909] p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-[#EDE8DC] font-bold text-lg serif mb-1">Buying in Southern California?</p>
            <p className="text-[#4A4844] text-sm leading-relaxed">Off-market access. Below-ask acquisitions. Call us before you search Zillow.</p>
          </div>
          <a href={BUSINESS.phoneHref} className="btn btn-gold shrink-0">
            <PhoneIcon /> {BUSINESS.phone}
          </a>
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
