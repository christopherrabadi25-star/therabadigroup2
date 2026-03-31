import Image from "next/image";
import Link from "next/link";
import { LISTINGS, BUSINESS } from "@/lib/data";

export default function FeaturedListings() {
  const featured = LISTINGS.filter((l) => l.featured);

  return (
    <section className="py-20 md:py-28 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow mb-3">Closed Transactions</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-[#EDE8DC] mb-3">The Portfolio</h2>
            <p className="text-[#5A5550] max-w-md text-base">
              Every number is real. From a $7.4M Hollywood Hills estate to a $6.3M Dana Point beachfront.
            </p>
          </div>
          <Link href="/listings" className="btn btn-outline btn-sm shrink-0">All Deals →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {featured.map((listing, i) => (
            <article
              key={i}
              className="card group"
              style={{ animation: `fadeUp 0.5s ease both ${0.1 * i}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={listing.image}
                  alt={`${listing.address}, ${listing.city}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C4953A] text-black text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide">
                    {listing.status} · {listing.date}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-2xl font-bold text-white serif leading-none">{listing.price}</p>
                </div>
              </div>
              <div className="p-5">
                <span className="eyebrow text-[9px] mb-1">{listing.neighborhood}</span>
                <h3 className="text-[#EDE8DC] font-semibold text-[0.95rem] mb-0.5">{listing.address}</h3>
                <p className="text-[#444] text-sm mb-3">{listing.city}</p>
                <p className="text-[#5A5550] text-sm leading-relaxed line-clamp-2">{listing.description}</p>
                <div className="mt-4 pt-4 border-t border-[#161616] flex items-center justify-between">
                  <span className="text-[#333] text-xs">{listing.role}</span>
                  <a href={BUSINESS.phoneHref} className="text-[#C4953A] text-xs font-medium hover:text-[#D4A84A] transition-colors">
                    Inquire →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[#1E1E1E] bg-[#0C0C0C] p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-[#EDE8DC] font-bold text-lg mb-1">Buying in Southern California?</p>
            <p className="text-[#5A5550] text-sm">Off-market access. Below-ask acquisitions. Call us before you search Zillow.</p>
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
