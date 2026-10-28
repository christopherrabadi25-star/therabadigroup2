// Storage for visitor tracking + leads, backed by Supabase Postgres.
// Uses the POSTGRES_URL that Vercel's Supabase integration adds automatically.
// Tables are created on first use, with row level security switched on so
// nothing is readable through Supabase's public API keys.
// In local dev with no database configured, an in-memory fallback is used.

import postgres from "postgres";
import type { StoredEvent } from "@/lib/tracking";

// Vercel's Supabase integration may add a custom prefix (e.g. STORAGE_POSTGRES_URL),
// so look for any variable ending in POSTGRES_URL.
function findDbUrl(): string | undefined {
  const env = process.env;
  const keys = Object.keys(env);
  const pick = (re: RegExp) => keys.filter((k) => re.test(k) && env[k]).sort((a, b) => a.length - b.length)[0];
  const k =
    pick(/(^|_)POSTGRES_URL$/) ||
    pick(/(^|_)POSTGRES_URL_NON_POOLING$/) ||
    pick(/(^|_)SUPABASE_DB_URL$/) ||
    pick(/(^|_)DATABASE_URL$/);
  return k ? env[k] : undefined;
}
const DB_URL = findDbUrl();

export const remoteConfigured = Boolean(DB_URL);
const useMemory = !remoteConfigured && process.env.NODE_ENV !== "production";
export const storeConfigured = remoteConfigured || useMemory;

export const TZ = "America/Los_Angeles";
export const DAY_MS = 86400000;

export function dayKey(ts: number): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(ts);
}

export function lastDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) out.push(dayKey(now - i * DAY_MS));
  return [...new Set(out)];
}

export interface LeadRecord {
  id: string;
  ts: number;
  data: Record<string, unknown>;
  status: string;
}

// ---------------- Postgres ----------------

type Sql = ReturnType<typeof postgres>;
const g = globalThis as unknown as { __rgSql?: Sql; __rgReady?: Promise<void>; __rgMem?: Mem };

function db(): Sql {
  if (!g.__rgSql) {
    g.__rgSql = postgres(DB_URL!, {
      prepare: false, // required for Supabase's transaction pooler
      max: 3,
      idle_timeout: 20,
      ssl: /localhost|127\.0\.0\.1/.test(DB_URL!) ? false : "require",
    });
  }
  return g.__rgSql;
}

async function ready(): Promise<Sql> {
  const sql = db();
  g.__rgReady ||= (async () => {
    await sql.unsafe(`
      create table if not exists rg_events (
        id bigserial primary key,
        ts bigint not null,
        vid text not null,
        sid text not null,
        t text not null,
        path text,
        data jsonb not null
      );
      create index if not exists rg_events_ts on rg_events (ts);
      create index if not exists rg_events_vid on rg_events (vid, ts);
      create table if not exists rg_visitors (
        vid text primary key,
        first jsonb not null,
        created bigint not null
      );
      create table if not exists rg_leads (
        id text primary key,
        ts bigint not null,
        status text not null default 'New',
        data jsonb not null
      );
      create index if not exists rg_leads_ts on rg_leads (ts);
      alter table rg_events enable row level security;
      alter table rg_visitors enable row level security;
      alter table rg_leads enable row level security;
    `);
  })().catch((e) => {
    g.__rgReady = undefined;
    throw e;
  });
  await g.__rgReady;
  return sql;
}

// ---------------- in-memory (dev only) ----------------

interface Mem {
  events: StoredEvent[];
  visitors: Map<string, StoredEvent>;
  leads: LeadRecord[];
}
function mem(): Mem {
  return (g.__rgMem ||= { events: [], visitors: new Map(), leads: [] });
}

// ---------------- API ----------------

export async function saveEvents(events: StoredEvent[]): Promise<void> {
  if (!events.length) return;
  if (remoteConfigured) {
    const sql = await ready();
    const rows = events.map((e) => ({ ts: e.ts, vid: e.vid, sid: e.sid, t: e.t, path: e.path, data: sql.json(e as never) }));
    await sql`insert into rg_events ${sql(rows, "ts", "vid", "sid", "t", "path", "data")}`;
    const firsts = events.filter((e) => e.t === "pageview");
    for (const f of firsts.slice(0, 1)) {
      await sql`insert into rg_visitors (vid, first, created) values (${f.vid}, ${sql.json(f as never)}, ${f.ts}) on conflict (vid) do nothing`;
    }
    // occasional cleanup: keep 400 days of raw events
    if (Math.random() < 0.01) await sql`delete from rg_events where ts < ${Date.now() - 400 * DAY_MS}`;
    return;
  }
  if (useMemory) {
    const m = mem();
    m.events.push(...events);
    for (const e of events) if (e.t === "pageview" && !m.visitors.has(e.vid)) m.visitors.set(e.vid, e);
  }
}

export async function getEventsSince(since: number): Promise<StoredEvent[]> {
  if (remoteConfigured) {
    const sql = await ready();
    const rows = await sql<{ data: StoredEvent }[]>`select data from rg_events where ts >= ${since} order by ts asc limit 200000`;
    return rows.map((r) => r.data);
  }
  if (useMemory) return mem().events.filter((e) => e.ts >= since);
  return [];
}

export async function getVisitor(vid: string): Promise<{ first: StoredEvent | null; journey: StoredEvent[] }> {
  if (remoteConfigured) {
    const sql = await ready();
    const [f] = await sql<{ first: StoredEvent }[]>`select first from rg_visitors where vid = ${vid}`;
    const j = await sql<{ data: StoredEvent }[]>`select data from rg_events where vid = ${vid} order by ts asc limit 300`;
    return { first: f?.first || null, journey: j.map((r) => r.data) };
  }
  if (useMemory) {
    const m = mem();
    return { first: m.visitors.get(vid) || null, journey: m.events.filter((e) => e.vid === vid) };
  }
  return { first: null, journey: [] };
}

export async function getLive(since: number): Promise<{ vid: string; path: string; ts: number }[]> {
  if (remoteConfigured) {
    const sql = await ready();
    const rows = await sql<{ vid: string; path: string; ts: string }[]>`
      select distinct on (vid) vid, path, ts from rg_events
      where t = 'pageview' and ts >= ${since}
      order by vid, ts desc`;
    return rows.map((r) => ({ vid: r.vid, path: r.path, ts: Number(r.ts) }));
  }
  if (useMemory) {
    const latest = new Map<string, { vid: string; path: string; ts: number }>();
    for (const e of mem().events) if (e.t === "pageview" && e.ts >= since) latest.set(e.vid, { vid: e.vid, path: e.path, ts: e.ts });
    return [...latest.values()];
  }
  return [];
}

export async function insertLead(rec: LeadRecord): Promise<void> {
  if (remoteConfigured) {
    const sql = await ready();
    await sql`insert into rg_leads (id, ts, status, data) values (${rec.id}, ${rec.ts}, ${rec.status}, ${sql.json(rec.data as never)})`;
    return;
  }
  if (useMemory) mem().leads.unshift(rec);
}

export async function listLeads(): Promise<LeadRecord[]> {
  if (remoteConfigured) {
    const sql = await ready();
    const rows = await sql<{ id: string; ts: string; status: string; data: Record<string, unknown> }[]>`
      select id, ts, status, data from rg_leads order by ts desc limit 5000`;
    return rows.map((r) => ({ id: r.id, ts: Number(r.ts), status: r.status, data: r.data }));
  }
  if (useMemory) return mem().leads;
  return [];
}

export async function updateLeadStatus(id: string, status: string): Promise<void> {
  if (remoteConfigured) {
    const sql = await ready();
    await sql`update rg_leads set status = ${status} where id = ${id}`;
    return;
  }
  if (useMemory) {
    const l = mem().leads.find((x) => x.id === id);
    if (l) l.status = status;
  }
}
