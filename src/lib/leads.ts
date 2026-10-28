import { getVisitor, insertLead, listLeads, updateLeadStatus } from "@/lib/store";

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
    const { first: f, journey: evs } = await getVisitor(lead.vid);
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
      .map((e) => ({ path: e.path, ts: e.ts }));
    lead.sessions = new Set(evs.map((e) => e.sid)).size;
  }
  await insertLead({ id: lead.id, ts: lead.ts, status: "New", data: lead as unknown as Record<string, unknown> });
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const rows = await listLeads();
  return rows.map((r) => ({ ...(r.data as unknown as Lead), id: r.id, ts: r.ts, status: r.status || "New" }));
}

export async function setLeadStatus(id: string, status: string) {
  await updateLeadStatus(id, status);
}
