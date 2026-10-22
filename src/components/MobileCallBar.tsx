import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import { PhoneIcon, TextIcon } from "./Icons";

/** Thumb-reach contact on phones. Body has matching bottom padding in globals.css. */
export default function MobileCallBar() {
  const item =
    "flex flex-1 items-center justify-center gap-2 text-[0.98rem] font-medium no-underline";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ivory/10 bg-onyx/95 text-ivory backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-[var(--bar-h)]">
        <a href={BUSINESS.phoneHref} className={item}>
          <PhoneIcon size={16} /> Call
        </a>
        <a href={BUSINESS.smsHref} className={`${item} border-x border-ivory/10`}>
          <TextIcon size={16} /> Text
        </a>
        <Link href="/#contact" className={`${item} text-champagne`}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
