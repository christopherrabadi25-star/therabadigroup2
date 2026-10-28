// Shared types + classification for first-party visitor tracking.

export type EventType = "pageview" | "leave" | "click" | "lead";

export interface Landing {
  ref?: string; // document.referrer at session start
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  page?: string; // landing path
}

export interface StoredEvent {
  t: EventType;
  ts: number;
  vid: string; // anonymous visitor id (first-party)
  sid: string; // session id (30 min inactivity)
  path: string;
  title?: string;
  // attribution
  src: string; // classified channel
  refHost?: string;
  campaign?: string;
  term?: string;
  landing?: string;
  // visitor context
  newVisitor?: boolean;
  device?: string;
  browser?: string;
  os?: string;
  screen?: string;
  lang?: string;
  city?: string;
  region?: string;
  country?: string;
  // engagement
  dur?: number; // seconds on page (leave events)
  scroll?: number; // max scroll % (leave events)
  label?: string; // click label (call, text, email, outbound host)
  href?: string;
}

export function hostOf(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const OWN_HOSTS = ["therabadigroup.com", "localhost", "vercel.app"];

export function classifySource(l: Landing): { src: string; refHost: string } {
  const refHost = hostOf(l.ref);
  const own = OWN_HOSTS.some((h) => refHost === h || refHost.endsWith("." + h));
  const s = (l.utm_source || "").toLowerCase();
  const m = (l.utm_medium || "").toLowerCase();

  if (l.gclid || ((s === "google" || s === "adwords") && /cpc|ppc|paid/.test(m))) return { src: "Google Ads", refHost };
  if (m === "gbp" || m === "gmb" || s === "gbp" || s === "gmb") return { src: "Google Business Profile", refHost };
  if (s) {
    if (/instagram|^ig$/.test(s)) return { src: m.includes("paid") || m.includes("cpc") ? "Instagram Ads" : "Instagram", refHost };
    if (/facebook|^fb$|meta/.test(s)) return { src: l.fbclid && m.includes("paid") ? "Facebook Ads" : "Facebook", refHost };
    if (/email|newsletter/.test(s) || m === "email") return { src: "Email", refHost };
    if (/qr|sign|flyer|print/.test(s + m)) return { src: "Print / QR", refHost };
    return { src: `Campaign: ${l.utm_source}`, refHost };
  }
  if (l.fbclid) return { src: "Facebook", refHost };
  if (!refHost || own) return { src: "Direct", refHost: "" };
  if (/google\./.test(refHost) && /maps/.test(l.ref || "")) return { src: "Google Maps", refHost };
  if (/(^|\.)google\./.test(refHost)) return { src: "Google Search", refHost };
  if (/bing\.com|duckduckgo|yahoo\.|ecosia|brave\.com/.test(refHost)) return { src: "Other Search", refHost };
  if (/chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google|copilot\.microsoft/.test(refHost)) return { src: "AI Assistants", refHost };
  if (/instagram\.com/.test(refHost)) return { src: "Instagram", refHost };
  if (/facebook\.com|fb\.com|fb\.me/.test(refHost)) return { src: "Facebook", refHost };
  if (/linkedin|lnkd\.in/.test(refHost)) return { src: "LinkedIn", refHost };
  if (/tiktok/.test(refHost)) return { src: "TikTok", refHost };
  if (/youtube|youtu\.be/.test(refHost)) return { src: "YouTube", refHost };
  if (/zillow|redfin|realtor\.com|homes\.com|compass\.com|trulia/.test(refHost)) return { src: "Real Estate Portals", refHost };
  if (/yelp/.test(refHost)) return { src: "Yelp", refHost };
  return { src: "Referral", refHost };
}

export function parseUA(ua: string): { device: string; browser: string; os: string; bot: boolean } {
  const bot = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|vercel-screenshot|monitor/i.test(ua);
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(ua) ? "Tablet" : /mobi|iphone|android/i.test(ua) ? "Mobile" : "Desktop";
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /instagram/i.test(ua)
      ? "Instagram in-app"
      : /fban|fbav/i.test(ua)
        ? "Facebook in-app"
        : /crios|chrome\//i.test(ua)
          ? "Chrome"
          : /fxios|firefox/i.test(ua)
            ? "Firefox"
            : /safari/i.test(ua)
              ? "Safari"
              : "Other";
  const os = /iphone|ipad|ios/i.test(ua)
    ? "iOS"
    : /android/i.test(ua)
      ? "Android"
      : /mac os/i.test(ua)
        ? "macOS"
        : /windows/i.test(ua)
          ? "Windows"
          : /linux|cros/i.test(ua)
            ? "Linux / ChromeOS"
            : "Other";
  return { device, browser, os, bot };
}

export function clean(v: unknown, max = 300): string {
  return String(v ?? "").slice(0, max).replace(/[<>]/g, "");
}
