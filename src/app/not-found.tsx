import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-onyx pb-20 pt-[calc(var(--header-h)+80px)] text-ivory">
      <div className="wrap">
        <p className="kicker text-champagne">404</p>
        <h1 className="display mt-4 max-w-[14ch]">We couldn&apos;t find that page.</h1>
        <p className="lead mt-6 text-ivory/80">It may have moved. Try one of these instead.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-light">
            Home
          </Link>
          <Link href="/listings" className="btn btn-glass">
            Our sales
          </Link>
          <a href={BUSINESS.phoneHref} className="btn btn-glass">
            Call {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
