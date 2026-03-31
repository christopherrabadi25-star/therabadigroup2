import { BUSINESS } from "@/lib/data";

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex border-t border-[#1A1A1A]" style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(12px)" }}>
      <a
        href={BUSINESS.phoneHref}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-black font-bold bg-[#C4953A] hover:bg-[#D4A84A] transition-colors active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <span className="text-[11px] font-bold tracking-wide uppercase">Call Now</span>
      </a>
      <a
        href={`sms:+16262031372`}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-[#C4953A] hover:bg-white/4 transition-colors active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <span className="text-[11px] font-bold tracking-wide uppercase">Text Us</span>
      </a>
    </div>
  );
}
