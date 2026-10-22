"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS, NAV_LINKS, MORE_LINKS } from "@/lib/data";
import { CloseIcon, MenuIcon, PhoneIcon, TextIcon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu after navigating
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            className="no-underline leading-none"
            aria-label="The Rabadi Group, home"
          >
            <span className="whitespace-nowrap font-serif text-[1.3rem] tracking-[-0.01em] sm:text-[1.45rem]">
              The Rabadi Group
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-[0.97rem] no-underline py-2 border-b-2 ${
                  isActive(l.href)
                    ? "border-brass text-ink"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:block">
              <a
                href={BUSINESS.phoneHref}
                className="btn btn-oak !min-h-[44px] !px-5"
              >
                <PhoneIcon size={16} /> {BUSINESS.phone}
              </a>
            </span>
            <a
              href={BUSINESS.phoneHref}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-oak text-paper"
              aria-label={`Call ${BUSINESS.phone}`}
            >
              <PhoneIcon size={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[0.95rem] font-semibold"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would trap a fixed overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[var(--header-h)] bottom-0 z-50 overflow-y-auto overscroll-contain bg-paper"
        >
          <nav aria-label="Mobile" className="wrap pt-4 pb-10">
            <ul>
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-4 font-serif text-[2rem] leading-tight no-underline ${
                      (l.href === "/" ? pathname === "/" : isActive(l.href))
                        ? "text-brass-ink"
                        : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {MORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-ink-soft text-[1.05rem]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a href={BUSINESS.phoneHref} className="btn btn-oak">
                <PhoneIcon /> Call
              </a>
              <a href={BUSINESS.smsHref} className="btn btn-line">
                <TextIcon /> Text
              </a>
            </div>
            <p className="mt-4 text-center text-ink-soft">{BUSINESS.phone}</p>
          </nav>
        </div>
      )}
    </>
  );
}
