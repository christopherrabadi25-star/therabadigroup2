import type { Metadata } from "next";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "The Rabadi Group's commitment to an accessible website, and how to reach us if anything gets in your way.",
  alternates: { canonical: "/accessibility" },
};

const UPDATED = "November 8, 2026";

export default function AccessibilityPage() {
  return (
    <>
      <div className="h-[var(--header-h)] bg-onyx" aria-hidden />
      <section className="light section">
        <div className="wrap max-w-[52rem]">
          <h1 className="h-section">Accessibility</h1>
          <p className="lead mt-6 text-ink-soft">
            We want everyone to be able to use this site, including people who rely on screen readers, keyboards,
            magnification or captions.
          </p>

          <div className="prose-body mt-14 space-y-12 text-[1.08rem] leading-relaxed">
            <div>
              <h2 className="text-[1.5rem] font-semibold">Our standard</h2>
              <p className="mt-3">
                We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA. We check every page
                with automated accessibility testing and review it by hand for keyboard use.
              </p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-semibold">What we&apos;ve built in</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Every page can be used with a keyboard alone, with a visible focus outline and a skip link.</li>
                <li>Photos have text descriptions, and charts come with a table of the same numbers.</li>
                <li>Text and controls meet AA color contrast.</li>
                <li>The home page slideshow has a pause button, and motion stops if your device asks for reduced motion.</li>
                <li>Forms have labels, mark required fields and explain any errors.</li>
                <li>Pages work when zoomed to 200% and on small screens.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-semibold">Known limits</h2>
              <p className="mt-3">
                Some listing photos come from outside sources. Their descriptions are ours, but we can&apos;t
                always control the photos themselves. Links to Zillow and Instagram lead to sites we don&apos;t run.
              </p>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-semibold">Tell us if something doesn&apos;t work</h2>
              <p className="mt-3">
                If any part of this site is hard to use, call or text{" "}
                <a href={BUSINESS.phoneHref} className="font-semibold underline underline-offset-4">
                  {BUSINESS.phone}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${BUSINESS.email}`} className="font-semibold underline underline-offset-4">
                  {BUSINESS.email}
                </a>
                . We&apos;ll get you the information another way and fix the problem. We aim to reply within two
                business days.
              </p>
            </div>

            <p className="text-[0.95rem] text-ink-soft">Last reviewed {UPDATED}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
