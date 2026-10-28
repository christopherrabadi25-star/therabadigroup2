import { getEventsSince, getLive, lastDays, TZ, DAY_MS } from "@/lib/store";
import type { StoredEvent } from "@/lib/tracking";
import type { Lead } from "@/lib/leads";

export interface Row {
  key: string;
  visitors: number;
  sessions: number;
  views: number;
  leads: number;
  taps: number;
  avgTime?: number;
  scroll?: number;
}

export interface VisitorSummary {
  vid: string;
  firstSeen: number;
  lastSeen: number;
  src: string;
  refHost?: string;
  campaign?: string;
  city?: string;
  region?: string;
  country?: string;
  device?: string;
  browser?: string;
  os?: string;
  sessions: number;
  views: number;
  time: number;
  taps: string[];
  leadName?: string;
  journey: { t: string; path: string; ts: number; dur?: number; label?: string; sid: string }[];
}

export interface Tap {
  ts: number;
  label: string;
  path: string;
  src: string;
  city?: string;
  device?: string;
  vid: string;
}

export interface Report {
  range: number;
  totals: {
    visitors: number;
    newVisitors: number;
    sessions: number;
    views: number;
    avgSession: number;
    bounce: number;
    leads: number;
    taps: number;
    conversion: number;
  };
  daily: { day: string; visitors: number; views: number; leads: number }[];
  hours: number[];
  sources: Row[];
  campaigns: Row[];
  referrers: Row[];
  pages: Row[];
  landings: Row[];
  cities: Row[];
  devices: Row[];
  browsers: Row[];
  os: Row[];
  terms: Row[];
  visitors: VisitorSummary[];
  taps: Tap[];
  live: { vid: string; path: string; ts: number; src?: string; city?: string }[];
}

function hourOf(ts: number) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", hourCycle: "h23" }).format(ts)) % 24;
}

export async function buildReport(range: number, leads: Lead[]): Promise<Report> {
  const days = lastDays(range);
  const dayStart = Date.now() - range * DAY_MS;
  const [events, liveRows] = await Promise.all([getEventsSince(dayStart), getLive(Date.now() - 5 * 60 * 1000)]);
  events.sort((a, b) => a.ts - b.ts);

  const since = Date.now() - range * 86400000;
  const rangeLeads = leads.filter((l) => l.ts >= since);
  const leadByVid = new Map<string, Lead>();
  for (const l of leads) if (l.vid && !leadByVid.has(l.vid)) leadByVid.set(l.vid, l);

  // session -> source (first event of the session decides)
  const sessionSrc = new Map<string, StoredEvent>();
  const sessionViews = new Map<string, number>();
  const sessionTime = new Map<string, number>();
  for (const e of events) {
    if (!sessionSrc.has(e.sid)) sessionSrc.set(e.sid, e);
    if (e.t === "pageview") sessionViews.set(e.sid, (sessionViews.get(e.sid) || 0) + 1);
    if (e.t === "leave") sessionTime.set(e.sid, (sessionTime.get(e.sid) || 0) + (e.dur || 0));
  }

  type Acc = { v: Set<string>; s: Set<string>; views: number; leads: number; taps: number; time: number; timeN: number; scroll: number; scrollN: number };
  const mk = (): Acc => ({ v: new Set(), s: new Set(), views: 0, leads: 0, taps: 0, time: 0, timeN: 0, scroll: 0, scrollN: 0 });
  const groups: Record<string, Map<string, Acc>> = {};
  const add = (g: string, key: string | undefined, e: StoredEvent, by: "session" | "event" = "session") => {
    if (!key) return;
    const m = (groups[g] ||= new Map());
    const a = m.get(key) || mk();
    m.set(key, a);
    a.v.add(e.vid);
    a.s.add(e.sid);
    if (e.t === "pageview") a.views++;
    if (e.t === "click" && /^(Call|Text|Email)$/.test(e.label || "")) a.taps++;
    if (by === "event" && e.t === "leave") {
      a.time += e.dur || 0;
      a.timeN++;
      a.scroll += e.scroll || 0;
      a.scrollN++;
    }
  };

  const visitors = new Map<string, VisitorSummary>();
  const dailyMap = new Map(days.map((d) => [d, { v: new Set<string>(), views: 0 }]));
  const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const hours = new Array(24).fill(0);
  const taps: Tap[] = [];
  const newV = new Set<string>();

  for (const e of events) {
    const s = sessionSrc.get(e.sid)!;
    add("sources", s.src, e);
    add("campaigns", s.campaign, e);
    add("referrers", s.refHost, e);
    add("terms", s.term, e);
    add("landings", s.landing || s.path, e);
    add("cities", e.city ? [e.city, e.region, e.country !== "US" ? e.country : ""].filter(Boolean).join(", ") : undefined, e);
    add("devices", e.device, e);
    add("browsers", e.browser, e);
    add("os", e.os, e);
    add("pages", e.path, e, "event");
    if (e.newVisitor && e.t === "pageview") newV.add(e.vid);

    const d = dailyMap.get(dayFmt.format(e.ts));
    if (d) {
      d.v.add(e.vid);
      if (e.t === "pageview") d.views++;
    }
    if (e.t === "pageview") hours[hourOf(e.ts)]++;
    if (e.t === "click" && /^(Call|Text|Email)$/.test(e.label || "")) {
      taps.push({ ts: e.ts, label: e.label!, path: e.path, src: s.src, city: e.city, device: e.device, vid: e.vid });
    }

    let v = visitors.get(e.vid);
    if (!v) {
      v = {
        vid: e.vid,
        firstSeen: e.ts,
        lastSeen: e.ts,
        src: s.src,
        refHost: s.refHost,
        campaign: s.campaign,
        city: e.city,
        region: e.region,
        country: e.country,
        device: e.device,
        browser: e.browser,
        os: e.os,
        sessions: 0,
        views: 0,
        time: 0,
        taps: [],
        journey: [],
      };
      visitors.set(e.vid, v);
    }
    v.lastSeen = e.ts;
    if (e.t === "pageview") v.views++;
    if (e.t === "leave") v.time += e.dur || 0;
    if (e.t === "click" && e.label) v.taps.push(e.label);
    if (e.t !== "leave") v.journey.push({ t: e.t, path: e.path, ts: e.ts, label: e.label, sid: e.sid });
    else {
      const last = [...v.journey].reverse().find((j) => j.t === "pageview" && j.path === e.path && j.dur === undefined);
      if (last) last.dur = e.dur;
    }
  }
  for (const v of visitors.values()) {
    v.sessions = new Set(v.journey.map((j) => j.sid)).size;
    const l = leadByVid.get(v.vid);
    if (l) v.leadName = l.name;
  }

  // attribute leads to their source/campaign/landing rows
  for (const l of rangeLeads) {
    const bump = (g: string, k?: string) => {
      if (!k) return;
      const m = (groups[g] ||= new Map());
      const a = m.get(k) || mk();
      a.leads++;
      m.set(k, a);
    };
    bump("sources", l.src || "Unknown");
    bump("campaigns", l.campaign);
    bump("landings", l.landing);
    bump("pages", l.page);
    bump("referrers", l.refHost);
  }

  const rows = (g: string, limit = 25): Row[] =>
    [...(groups[g] || new Map()).entries()]
      .map(([key, a]) => ({
        key,
        visitors: a.v.size,
        sessions: a.s.size,
        views: a.views,
        leads: a.leads,
        taps: a.taps,
        avgTime: a.timeN ? a.time / a.timeN : undefined,
        scroll: a.scrollN ? a.scroll / a.scrollN : undefined,
      }))
      .sort((x, y) => y.sessions - x.sessions || y.leads - x.leads || y.views - x.views)
      .slice(0, limit);

  const sessions = sessionSrc.size;
  const bounced = [...sessionViews.values()].filter((n) => n <= 1).length;
  const totalTime = [...sessionTime.values()].reduce((a, b) => a + b, 0);
  const leadDays = new Map<string, number>();
  for (const l of rangeLeads) leadDays.set(dayFmt.format(l.ts), (leadDays.get(dayFmt.format(l.ts)) || 0) + 1);

  // live: latest page per visitor in last 5 minutes
  const live = liveRows
    .map((x) => ({ ...x, src: visitors.get(x.vid)?.src, city: visitors.get(x.vid)?.city }))
    .sort((a, b) => b.ts - a.ts);

  return {
    range,
    totals: {
      visitors: visitors.size,
      newVisitors: newV.size,
      sessions,
      views: events.filter((e) => e.t === "pageview").length,
      avgSession: sessions ? totalTime / sessions : 0,
      bounce: sessions ? bounced / sessions : 0,
      leads: rangeLeads.length,
      taps: taps.length,
      conversion: visitors.size ? rangeLeads.length / visitors.size : 0,
    },
    daily: days.map((d) => ({ day: d, visitors: dailyMap.get(d)!.v.size, views: dailyMap.get(d)!.views, leads: leadDays.get(d) || 0 })),
    hours,
    sources: rows("sources"),
    campaigns: rows("campaigns"),
    referrers: rows("referrers"),
    pages: rows("pages", 40),
    landings: rows("landings"),
    cities: rows("cities", 30),
    devices: rows("devices"),
    browsers: rows("browsers"),
    os: rows("os"),
    terms: rows("terms"),
    visitors: [...visitors.values()].sort((a, b) => b.lastSeen - a.lastSeen).slice(0, 300),
    taps: taps.reverse().slice(0, 300),
    live,
  };
}
