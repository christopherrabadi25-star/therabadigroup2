// Tiny Redis client for the visitor tracking + lead store.
// Works with Upstash Redis (connect it in Vercel > Storage > Upstash for Redis,
// which sets KV_REST_API_URL / KV_REST_API_TOKEN automatically).
// In local dev with no store configured, an in-memory fallback is used so the
// dashboard can be exercised.

type Cmd = (string | number)[];

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const remoteConfigured = Boolean(URL_ && TOKEN);
const useMemory = !remoteConfigured && process.env.NODE_ENV !== "production";
export const storeConfigured = remoteConfigured || useMemory;

export async function redis(cmds: Cmd[]): Promise<unknown[]> {
  if (cmds.length === 0) return [];
  if (remoteConfigured) {
    const res = await fetch(`${URL_}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds.map((c) => c.map(String))),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Store error ${res.status}: ${await res.text()}`);
    const json = (await res.json()) as { result?: unknown; error?: string }[];
    return json.map((r) => r.result);
  }
  if (useMemory) return cmds.map(memExec);
  return [];
}

// ---- in-memory fallback (dev only) ----
const g = globalThis as unknown as { __rgMem?: Map<string, unknown> };
const mem: Map<string, unknown> = (g.__rgMem ||= new Map());

function memExec(cmd: Cmd): unknown {
  const [op, key, ...a] = cmd.map(String);
  switch (op.toUpperCase()) {
    case "LPUSH": {
      const l = (mem.get(key) as string[]) || [];
      for (const v of a) l.unshift(v);
      mem.set(key, l);
      return l.length;
    }
    case "LTRIM": {
      const l = (mem.get(key) as string[]) || [];
      mem.set(key, l.slice(Number(a[0]), Number(a[1]) === -1 ? undefined : Number(a[1]) + 1));
      return "OK";
    }
    case "LRANGE": {
      const l = (mem.get(key) as string[]) || [];
      return l.slice(Number(a[0]), Number(a[1]) === -1 ? undefined : Number(a[1]) + 1);
    }
    case "EXPIRE":
      return 1;
    case "SET": {
      if (a.includes("NX") && mem.has(key)) return null;
      mem.set(key, a[0]);
      return "OK";
    }
    case "GET":
      return (mem.get(key) as string) ?? null;
    case "HSET": {
      const h = (mem.get(key) as Record<string, string>) || {};
      for (let i = 0; i < a.length; i += 2) h[a[i]] = a[i + 1];
      mem.set(key, h);
      return 1;
    }
    case "HGETALL": {
      const h = (mem.get(key) as Record<string, string>) || {};
      return Object.entries(h).flat();
    }
    case "ZADD": {
      const z = (mem.get(key) as Record<string, number>) || {};
      z[a[1]] = Number(a[0]);
      mem.set(key, z);
      return 1;
    }
    case "ZREMRANGEBYSCORE": {
      const z = (mem.get(key) as Record<string, number>) || {};
      for (const [m, s] of Object.entries(z)) if (s < Number(a[1])) delete z[m];
      return 1;
    }
    case "ZRANGE": {
      const z = (mem.get(key) as Record<string, number>) || {};
      return Object.entries(z)
        .sort((x, y) => x[1] - y[1])
        .flatMap(([m, s]) => [m, String(s)]);
    }
    default:
      return null;
  }
}

// ---- helpers ----
export const TZ = "America/Los_Angeles";

export function dayKey(ts: number): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(ts);
}

export function lastDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) out.push(dayKey(now - i * 86400000));
  return [...new Set(out)];
}

export const DAY = 86400;
