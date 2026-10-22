import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import { HomeValueIcon, PhoneIcon, TextIcon } from "./Icons";

/** Thumb-reach actions on phones. Body has matching bottom padding in globals.css. */
export default function MobileCallBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 text-[0.8rem] font-semibold no-underline";
  return (
    <nav
      aria-label="Quick contact"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-oak-deep bg-oak text-paper"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-[var(--bar-h)]">
        <a href={BUSINESS.phoneHref} className={item}>
          <PhoneIcon size={20} /> Call
        </a>
        <a href={BUSINESS.smsHref} className={`${item} border-x border-white/15`}>
          <TextIcon size={20} /> Text
        </a>
        <Link href="/#contact" className={`${item} text-brass`}>
          <HomeValueIcon size={20} /> Home value
        </Link>
      </div>
    </nav>
  );
}
