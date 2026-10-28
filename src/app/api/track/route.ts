import { NextRequest, NextResponse } from "next/server";
import { saveEvents } from "@/lib/store";
import { classifySource, clean, parseUA, type Landing, type StoredEvent, type EventType } from "@/lib/tracking";

const TYPES: EventType[] = ["pageview", "leave", "click"];

interface IncomingEvent {
  t: EventType;
  vid: string;
  sid: string;
  path: string;
  title?: string;
  landing?: Landing;
  newVisitor?: boolean;
  screen?: string;
  lang?: string;
  dur?: number;
  scroll?: number;
  label?: string;
  href?: string;
}

export async function POST(req: NextRequest) {
  // Never count the team's own visits (cookie is set when you log in to /admin).
  if (req.cookies.get("rg_internal")?.value === "1") return new NextResponse(null, { status: 204 });

  const ua = req.headers.get("user-agent") || "";
  const { device, browser, os, bot } = parseUA(ua);
  if (bot) return new NextResponse(null, { status: 204 });

  let events: IncomingEvent[] = [];
  try {
    const body = JSON.parse(await req.text());
    events = Array.isArray(body?.events) ? body.events.slice(0, 20) : [];
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const decode = (v: string | null) => {
    try {
      return v ? decodeURIComponent(v) : undefined;
    } catch {
      return v || undefined;
    }
  };
  const city = decode(req.headers.get("x-vercel-ip-city"));
  const region = decode(req.headers.get("x-vercel-ip-country-region"));
  const country = decode(req.headers.get("x-vercel-ip-country"));

  const now = Date.now();
  const out: StoredEvent[] = [];

  for (const e of events) {
    if (!TYPES.includes(e.t) || !e.vid || !e.sid || !e.path) continue;
    const path = clean(e.path, 200);
    if (path.startsWith("/admin") || path.startsWith("/api")) continue;
    const l: Landing = {
      ref: clean(e.landing?.ref, 500),
      utm_source: clean(e.landing?.utm_source, 80),
      utm_medium: clean(e.landing?.utm_medium, 80),
      utm_campaign: clean(e.landing?.utm_campaign, 120),
      utm_term: clean(e.landing?.utm_term, 120),
      utm_content: clean(e.landing?.utm_content, 120),
      gclid: clean(e.landing?.gclid, 10),
      fbclid: clean(e.landing?.fbclid, 10),
      page: clean(e.landing?.page, 200),
    };
    const { src, refHost } = classifySource(l);
    const ev: StoredEvent = {
      t: e.t,
      ts: now,
      vid: clean(e.vid, 40),
      sid: clean(e.sid, 40),
      path,
      title: clean(e.title, 140) || undefined,
      src,
      refHost: refHost || undefined,
      campaign: l.utm_campaign || (l.gclid ? "(Google Ads auto-tagged)" : undefined),
      term: l.utm_term || undefined,
      landing: l.page || undefined,
      newVisitor: Boolean(e.newVisitor),
      device,
      browser,
      os,
      screen: clean(e.screen, 20) || undefined,
      lang: clean(e.lang, 20) || undefined,
      city,
      region,
      country,
      dur: e.t === "leave" ? Math.min(Math.max(Math.round(Number(e.dur) || 0), 0), 3600) : undefined,
      scroll: e.t === "leave" ? Math.min(Math.max(Math.round(Number(e.scroll) || 0), 0), 100) : undefined,
      label: e.t === "click" ? clean(e.label, 80) : undefined,
      href: e.t === "click" ? clean(e.href, 300) : undefined,
    };
    out.push(ev);
  }

  try {
    await saveEvents(out);
  } catch (err) {
    console.error("track store error", err);
  }
  return new NextResponse(null, { status: 204 });
}
