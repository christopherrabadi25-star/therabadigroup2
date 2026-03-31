import { BUSINESS } from "@/lib/data";

interface Props {
  headline?: string;
  sub?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTABanner({
  headline = "One Call. Real Answers.",
  sub = "No pitch, no pressure. Just 10 minutes with agents who know this market better than anyone.",
  primaryLabel = "Call " + BUSINESS.phone,
  primaryHref = BUSINESS.phoneHref,
  secondaryLabel = "Free Home Valuation",
  secondaryHref = "/sellers",
  dark = false,
}: Props) {
  return (
    <section
      className="relative overflow-hidden border-y border-[#1A1A1A] py-20 md:py-28"
      style={{ background: dark ? "#050505" : "#0A0A0A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,149,58,0.07) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto px-5 md:px-10 text-center">
        <span className="eyebrow mb-5">The Rabadi Group · La Verne &amp; Claremont, CA</span>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold text-[#EDE8DC] mb-5 mt-3">
          {headline}
        </h2>
        <p className="text-[#6A6560] text-lg mb-10 max-w-xl mx-auto leading-relaxed">{sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={primaryHref} className="btn btn-gold btn-lg w-full sm:w-auto">
            <PhoneIcon />{primaryLabel}
          </a>
          <a href={secondaryHref} className="btn btn-outline btn-lg w-full sm:w-auto">
            {secondaryLabel}
          </a>
        </div>
        <p className="text-[#2E2B27] text-xs mt-8 tracking-wider">
          5.0 ★ Zillow · $100M+ Closed · CA DRE #01738777 #02246356
        </p>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "2px" }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
