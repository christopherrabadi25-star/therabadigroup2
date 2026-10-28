import { redis, DAY } from "@/lib/store";
import type { StoredEvent } from "@/lib/tracking";

export interface Lead {
  id: string;
  ts: number;
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
  page: string; // page they submitted from
  emailed: boolean;
  vid?: string;
  // attribution (from the visitor's first recorded visit)
  src?: string;
  refHost?: string;
  campaign?: string;
  term?: string;
  landing?: string;
  firstSeen?: number;
  city?: string;
  region?: string;
  device?: string;
  browser?: string;
  // journey
  pages?: { path: string; ts: number }[];
  sessions?: number;
  status?: string;
}

export const LEAD_STATUSES = ["New", "Contacted", "Appointment", "Client", "Closed", "Not a fit"];

export async function saveLead(input: Omit<Lead, "id" | "ts">): Promise<Lead> {
  const ts = Date.now();
  const lead: Lead = { ...input, id: ts.toString(36) + Math.random().toString(36).slice(2, 6), ts };
  if (lead.vid) {
    const [first, journey] = (await redis([
      ["GET", `vf:${lead.vid}`],
      ["LRANGE", `vj:${lead.vid}`, 0, 299],
    ])) as [string | null, string[] | null];
    const f: StoredEvent | null = first ? JSON.parse(first) : null;
    const evs: StoredEvent[] = (journey || []).map((j) => JSON.parse(j));
    if (f) {
      Object.assign(lead, {
        src: f.src,
        refHost: f.refHost,
        campaign: f.campaign,
        term: f.term,
        landing: f.landing || f.path,
        firstSeen: f.ts,
        city: f.city,
        region: f.region,
        device: f.device,
        browser: f.browser,
      });
    } else if (evs.length) {
      const last = evs[evs.length - 1];
      Object.assign(lead, { src: last.src, city: last.city, region: last.region, device: last.device, firstSeen: last.ts });
    }
    lead.pages = evs
      .filter((e) => e.t === "pageview")
      .reverse()
      .map((e) => ({ path: e.path, ts: e.ts }));
    lead.sessions = new Set(evs.map((e) => e.sid)).size;
  }
  await redis([
    ["LPUSH", "leads", JSON.stringify(lead)],
    ["LTRIM", "leads", 0, 4999],
    ["EXPIRE", `vj:${lead.vid || "none"}`, 365 * DAY],
  ]);
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const [list, statuses] = (await redis([
    ["LRANGE", "leads", 0, 4999],
    ["HGETALL", "leadstatus"],
  ])) as [string[] | null, string[] | Record<string, string> | null];
  const st: Record<string, string> = {};
  if (Array.isArray(statuses)) for (let i = 0; i < statuses.length; i += 2) st[statuses[i]] = statuses[i + 1];
  else if (statuses) Object.assign(st, statuses);
  return (list || []).map((j) => {
    const l = JSON.parse(j) as Lead;
    l.status = st[l.id] || "New";
    return l;
  });
}

export async function setLeadStatus(id: string, status: string) {
  await redis([["HSET", "leadstatus", id, status]]);
}
