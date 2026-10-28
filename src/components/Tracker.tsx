"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// First-party visitor tracking. Anonymous ids only; a visitor's name/phone is
// attached only when they submit the contact form themselves.

const VID_KEY = "rg_vid";
const SES_KEY = "rg_ses";
const SESSION_MS = 30 * 60 * 1000;

type Session = { sid: string; last: number; landing: Record<string, string> };

function rid() {
  return (crypto.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36)).replace(/-/g, "").slice(0, 24);
}

function safeGet(store: Storage | undefined, k: string) {
  try {
    return store?.getItem(k) ?? null;
  } catch {
    return null;
  }
}
function safeSet(store: Storage | undefined, k: string, v: string) {
  try {
    store?.setItem(k, v);
  } catch {}
}

function gpc() {
  return Boolean((navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl);
}

// Visitors with Global Privacy Control on get a per-tab id only (not persisted).
function persistent(): Storage | undefined {
  if (typeof window === "undefined") return undefined;
  return gpc() ? window.sessionStorage : window.localStorage;
}

export function getIds(): { vid: string; sid: string; isNew: boolean } {
  const store = persistent();
  let vid = safeGet(store, VID_KEY);
  const isNew = !vid;
  if (!vid) {
    vid = rid();
    safeSet(store, VID_KEY, vid);
  }
  const s = session();
  return { vid, sid: s.sid, isNew };
}

function session(): Session {
  const now = Date.now();
  let s: Session | null = null;
  try {
    s = JSON.parse(safeGet(window.localStorage, SES_KEY) || "null");
  } catch {}
  if (!s || now - s.last > SESSION_MS) {
    const q = new URLSearchParams(location.search);
    const landing: Record<string, string> = { ref: document.referrer || "", page: location.pathname };
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = q.get(k);
      if (v) landing[k] = v;
    }
    if (q.get("gclid") || q.get("gbraid") || q.get("wbraid")) landing.gclid = "1";
    if (q.get("fbclid")) landing.fbclid = "1";
    s = { sid: rid(), last: now, landing };
  }
  s.last = now;
  safeSet(window.localStorage, SES_KEY, JSON.stringify(s));
  return s;
}

export function getLanding(): Record<string, string> {
  return session().landing;
}

function send(events: Record<string, unknown>[]) {
  const body = JSON.stringify({ events });
  try {
    if (navigator.sendBeacon && navigator.sendBeacon("/api/track", new Blob([body], { type: "text/plain" }))) return;
  } catch {}
  fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
}

export default function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const page = useRef<{ path: string; start: number; scroll: number; sent: boolean } | null>(null);
  const isNewRef = useRef<boolean | null>(null);

  function base(t: string, path: string) {
    const { vid, sid, isNew } = getIds();
    if (isNewRef.current === null) isNewRef.current = isNew;
    return {
      t,
      vid,
      sid,
      path,
      title: document.title,
      landing: getLanding(),
      newVisitor: isNewRef.current,
      screen: `${screen.width}x${screen.height}`,
      lang: navigator.language,
    };
  }

  function flushLeave() {
    const p = page.current;
    if (!p || p.sent) return;
    p.sent = true;
    send([{ ...base("leave", p.path), dur: (Date.now() - p.start) / 1000, scroll: p.scroll }]);
  }

  // Page views (fires on every route change, including client-side navigation)
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    flushLeave();
    page.current = { path: pathname, start: Date.now(), scroll: 0, sent: false };
    // wait a tick so document.title reflects the new page
    const t = setTimeout(() => send([base("pageview", pathname)]), 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  useEffect(() => {
    function onScroll() {
      const p = page.current;
      if (!p) return;
      const h = document.documentElement.scrollHeight - innerHeight;
      const pct = h > 0 ? Math.round((scrollY / h) * 100) : 100;
      if (pct > p.scroll) p.scroll = Math.min(pct, 100);
    }
    function onHide() {
      if (document.visibilityState === "hidden") flushLeave();
      else if (page.current?.sent) {
        // came back to the tab: restart the timer for this page
        page.current = { path: page.current.path, start: Date.now(), scroll: page.current.scroll, sent: false };
      }
    }
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a,[data-track]") as HTMLElement | null;
      if (!a || location.pathname.startsWith("/admin")) return;
      const href = a.getAttribute("href") || "";
      let label = a.getAttribute("data-track") || "";
      if (!label) {
        if (href.startsWith("tel:")) label = "Call";
        else if (href.startsWith("sms:")) label = "Text";
        else if (href.startsWith("mailto:")) label = "Email";
        else if (/^https?:/.test(href) && !href.includes(location.host)) {
          try {
            label = "Outbound: " + new URL(href).hostname.replace(/^www\./, "");
          } catch {}
        }
      }
      if (!label) return;
      send([{ ...base("click", location.pathname), label, href: href.split("?")[0] }]);
    }
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    addEventListener("pagehide", flushLeave);
    document.addEventListener("click", onClick, true);
    return () => {
      removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      removeEventListener("pagehide", flushLeave);
      document.removeEventListener("click", onClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
