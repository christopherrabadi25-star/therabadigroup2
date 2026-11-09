"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside an open overlay (menu, lightbox), closes it on
 * Escape, and hands focus back to whatever opened it once it closes.
 * `extra` are elements outside the container that stay reachable (e.g. the
 * header's Close button for the mobile menu).
 */
export function useFocusTrap<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  extra: () => (HTMLElement | null)[] = () => [],
) {
  const ref = useRef<T>(null);
  const closeRef = useRef(onClose);
  const extraRef = useRef(extra);
  useEffect(() => {
    closeRef.current = onClose;
    extraRef.current = extra;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const items = () => [
      ...extraRef.current().filter((el): el is HTMLElement => !!el),
      ...Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
    ];

    // Move focus in once the overlay has rendered.
    const t = requestAnimationFrame(() => {
      const inside = ref.current?.querySelector<HTMLElement>(FOCUSABLE);
      (inside ?? ref.current)?.focus({ preventScroll: true });
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inTrap = active && list.includes(active);
      if (e.shiftKey && (active === first || !inTrap)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inTrap)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", onKey);
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
