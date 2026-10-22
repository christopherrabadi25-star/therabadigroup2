"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BUSINESS, NAV_LINKS, MORE_LINKS } from "@/lib/data";
import { PhoneIcon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,border-color] duration-500 ${
          solid ? "border-b border-ivory/10 bg-onyx/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="no-underline" aria-label="The Rabadi Group, home">
            <span className="block whitespace-nowrap font-display text-[1rem] uppercase leading-none tracking-[0.22em] md:text-[1.12rem]">
              The Rabadi Group
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative py-2 text-[0.95rem] no-underline transition-colors ${
                  isActive(l.href) ? "text-ivory" : "text-ivory/75 hover:text-ivory"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[0.95rem] font-medium text-ivory no-underline backdrop-blur-xl hover:bg-white/20 lg:inline-flex"
            >
              <PhoneIcon size={15} /> {BUSINESS.phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 items-center gap-3 pl-2 text-[0.95rem] font-medium lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? "Close" : "Menu"}
              <span className="relative block h-3 w-6" aria-hidden>
                <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-onyx pt-[var(--header-h)] text-ivory lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-10 pt-6">
              <ul>
                {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((l, n) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.06 * n + 0.1 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block py-2.5 font-display text-[2.3rem] leading-tight no-underline ${
                        (l.href === "/" ? pathname === "/" : isActive(l.href)) ? "text-champagne" : ""
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-ivory/10 pt-6">
                {MORE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="text-[1rem] text-ivory/75">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <a href={BUSINESS.phoneHref} className="btn btn-light w-full">
                  <PhoneIcon size={16} /> Call {BUSINESS.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
