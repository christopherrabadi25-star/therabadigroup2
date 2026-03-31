import Image from "next/image";
import Link from "next/link";
import { AREAS, BUSINESS } from "@/lib/data";

export default function AreasServed() {
  return (
    <section className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow mb-3">Where We Work</span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-[#EDE8DC] mb-3">
              We Know These Markets Cold.
            </h2>
            <p className="text-[#5A5550] max-w-md">
              Not from Zillow — from 20 years of closed deals across every zip code.
            </p>
          </div>
          <Link href="/areas" className="btn btn-outline btn-sm shrink-0">All Markets →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {AREAS.map((area, i) => (
            <Link
              key={i}
              href={`/areas#${area.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
              style={{ animation: `fadeUp 0.5s ease both ${0.07 * i}s` }}
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="eyebrow text-[9px] mb-1.5">{area.startingFrom}</span>
                <h3 className="text-xl font-semibold text-white serif leading-tight mb-1">{area.name}</h3>
                <p className="text-[#B0ACA6] text-sm leading-snug max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[#3A3834] text-sm mb-4">Don&apos;t see your city? We cover 15+ markets across SoCal.</p>
          <a href={BUSINESS.phoneHref} className="btn btn-gold">
            <PhoneIcon /> Ask About Your Area
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
