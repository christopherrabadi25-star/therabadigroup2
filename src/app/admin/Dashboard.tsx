"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Report, Row, VisitorSummary } from "@/lib/analytics";
import type { Lead } from "@/lib/leads";

const STATUSES = ["New", "Contacted", "Appointment", "Client", "Closed", "Not a fit"];
const TZ = "America/Los_Angeles";

const fmtTime = (ts: number) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(ts);
const fmtDay = (d: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(d + "T12:00:00Z"));
const fmtDur = (s?: number) => {
  if (s === undefined || !isFinite(s)) return "–";
  if (s < 60) return `${Math.round(s)}s`;
  const m = Math.floor(s / 60);
  return m < 60 ? `${m}m ${Math.round(s % 60)}s` : `${Math.floor(m / 60)}h ${m % 60}m`;
};
const pct = (n: number) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? 1 : 0)}%`;
const ago = (ts: number) => {
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};
const place = (x: { city?: string; region?: string; country?: string }) =>
  [x.city, x.region, x.country && x.country !== "US" ? x.country : ""].filter(Boolean).join(", ") || "Unknown location";

export type Tab = "leads" | "traffic" | "visitors";

export default function Dashboard({
  report,
  leads,
  range,
  error,
  storeWarning,
  initialTab,
}: {
  report: Report | null;
  leads: Lead[];
  range: number;
  error: string;
  storeWarning: string;
  initialTab: Tab;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);

  useEffect(() => {
    const id = setInterval(() => router.refresh(), 60000);
    return () => clearInterval(id);
  }, [router]);

  function pick(t: Tab) {
    setTab(t);
    history.replaceState(null, "", `/admin?range=${range}&tab=${t}`);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-24 pt-6 md:px-8">
      <header className="flex flex-wrap items-center gap-4 border-b border-ivory/10 pb-5">
        <div className="mr-auto">
          <p className="font-display text-[1.7rem] leading-none">The Rabadi Group</p>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-champagne">Leads &amp; traffic</p>
        </div>
        {report && (
          <span className="flex items-center gap-2 rounded-full border border-ivory/10 px-3 py-1.5 text-sm">
            <span className={`h-2 w-2 rounded-full ${report.live.length ? "animate-pulse bg-[#7fc99a]" : "bg-ivory/30"}`} />
            {report.live.length} on site now
          </span>
        )}
        <nav className="flex rounded-full border border-ivory/10 p-1 text-sm">
          {[1, 7, 30, 90, 365].map((r) => (
            <a
              key={r}
              href={`/admin?range=${r}&tab=${tab}`}
              className={`rounded-full px-3 py-1 no-underline ${r === range ? "bg-ivory text-onyx" : "text-ivory/70 hover:text-ivory"}`}
            >
              {r === 1 ? "Today" : r === 365 ? "1y" : `${r}d`}
            </a>
          ))}
        </nav>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm text-ivory/50 hover:text-ivory">Sign out</button>
        </form>
      </header>

      {storeWarning === "missing" && (
        <Notice>
          Storage isn&apos;t connected, so nothing is being saved yet. In Vercel open this project, go to Storage, connect your{" "}
          <b>Supabase</b> database to it (so it gets a POSTGRES_URL), then redeploy.
        </Notice>
      )}
      {storeWarning === "memory" && <Notice>Local preview: using temporary in-memory storage.</Notice>}
      {error && <Notice>Couldn&apos;t load data: {error}</Notice>}

      <div className="mt-6 flex gap-1 border-b border-ivory/10">
        {(
          [
            ["leads", `Leads${leads.length ? ` · ${leads.filter((l) => l.status === "New").length} new` : ""}`],
            ["traffic", "Traffic sources"],
            ["visitors", "Visitors & journeys"],
          ] as [Tab, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => pick(k)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium ${tab === k ? "border-champagne text-ivory" : "border-transparent text-ivory/55 hover:text-ivory"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "leads" && <LeadsView leads={leads} report={report} />}
      {tab === "traffic" && report && <TrafficView r={report} />}
      {tab === "visitors" && report && <VisitorsView r={report} />}
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 rounded-xl border border-champagne/40 bg-champagne/10 px-4 py-3 text-sm text-ivory/90">{children}</div>;
}

function Card({ title, children, className = "", right }: { title?: string; children: React.ReactNode; className?: string; right?: React.ReactNode }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-ivory/10 bg-coal p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center gap-3">
          <h3 className="mr-auto text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ivory/60">{title}</h3>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-coal px-5 py-4">
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-ivory/55">{label}</p>
      <p className="mt-2 font-display text-[2rem] leading-none">{value}</p>
      {sub && <p className="mt-2 text-xs text-ivory/50">{sub}</p>}
    </div>
  );
}

/* ---------------- Leads ---------------- */

function LeadsView({ leads, report }: { leads: Lead[]; report: Report | null }) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(
    () =>
      leads.filter((l) => {
        const s = status[l.id] || l.status || "New";
        if (filter !== "All" && s !== filter) return false;
        if (q && !`${l.name} ${l.phone} ${l.email} ${l.message} ${l.src}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [leads, filter, q, status],
  );

  async function update(id: string, s: string) {
    setStatus((x) => ({ ...x, [id]: s }));
    await fetch("/api/admin/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: s }) });
  }

  function exportCsv() {
    const cols = ["Date", "Name", "Phone", "Email", "Interest", "Message", "Status", "Source", "Campaign", "Search term", "Landing page", "Submitted from", "Location", "Device", "Pages viewed", "Visits", "First seen"];
    const rows = list.map((l) => [
      fmtTime(l.ts),
      l.name,
      l.phone,
      l.email,
      l.type,
      l.message,
      status[l.id] || l.status,
      l.src,
      l.campaign,
      l.term,
      l.landing,
      l.page,
      place(l),
      l.device,
      (l.pages || []).map((p) => p.path).join(" > "),
      l.sessions,
      l.firstSeen ? fmtTime(l.firstSeen) : "",
    ]);
    const csv = [cols, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `rabadi-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const t = report?.totals;
  const bySrc = new Map<string, number>();
  for (const l of leads) bySrc.set(l.src || "Unknown", (bySrc.get(l.src || "Unknown") || 0) + 1);

  return (
    <div className="mt-6 grid gap-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Form leads" value={String(t?.leads ?? leads.length)} sub={`${leads.length} all time`} />
        <Stat label="Call / text / email taps" value={String(t?.taps ?? 0)} sub="Tapped a contact link" />
        <Stat label="Visitor → lead" value={t ? pct(t.conversion) : "–"} sub="Form leads ÷ visitors" />
        <Stat label="New, not contacted" value={String(leads.filter((l) => (status[l.id] || l.status) === "New").length)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card
          title="Form submissions"
          right={
            <button onClick={exportCsv} className="rounded-full border border-ivory/15 px-3 py-1 text-xs hover:border-champagne">
              Export CSV
            </button>
          }
        >
          <div className="mb-4 flex flex-wrap gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, message…"
              className="min-w-[200px] flex-1 rounded-full border border-ivory/15 bg-onyx px-4 py-2 text-sm outline-none focus:border-champagne"
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-ivory/15 bg-onyx px-3 py-2 text-sm">
              {["All", ...STATUSES].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {list.length === 0 && <Empty>No leads yet. Every contact form submission will land here with where the person came from.</Empty>}
          <ul className="divide-y divide-ivory/10">
            {list.map((l) => {
              const s = status[l.id] || l.status || "New";
              return (
                <li key={l.id} className="py-4">
                  <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
                    <div className="mr-auto min-w-0">
                      <p className="text-[1.05rem] font-semibold">
                        {l.name} {s === "New" && <span className="ml-2 rounded-full bg-champagne px-2 py-0.5 align-middle text-[0.65rem] font-bold uppercase text-onyx">New</span>}
                      </p>
                      <p className="mt-1 text-sm text-ivory/70">
                        <a href={`tel:${l.phone}`} className="text-champagne no-underline">
                          {l.phone}
                        </a>
                        {l.email && (
                          <>
                            {" · "}
                            <a href={`mailto:${l.email}`} className="text-ivory/80">
                              {l.email}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <select
                      value={s}
                      onChange={(e) => update(l.id, e.target.value)}
                      className="rounded-full border border-ivory/15 bg-onyx px-3 py-1.5 text-sm"
                    >
                      {STATUSES.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-sm">
                    <span className="text-ivory/50">{l.type}</span>
                    {l.message && <span className="text-ivory/85"> · {l.message}</span>}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Chip strong>{l.src || "Unknown source"}</Chip>
                    {l.campaign && <Chip>Campaign: {l.campaign}</Chip>}
                    {l.term && <Chip>Searched: {l.term}</Chip>}
                    <Chip>{place(l)}</Chip>
                    {l.device && <Chip>{l.device}</Chip>}
                    {l.pages && <Chip>{l.pages.length} pages · {l.sessions || 1} visit{(l.sessions || 1) > 1 ? "s" : ""}</Chip>}
                    <Chip>{fmtTime(l.ts)}</Chip>
                    {!l.emailed && <Chip warn>Not emailed</Chip>}
                  </div>
                  {l.pages && l.pages.length > 0 && (
                    <button onClick={() => setOpen(open === l.id ? null : l.id)} className="mt-3 text-xs text-champagne">
                      {open === l.id ? "Hide journey" : "Show their journey before contacting you"}
                    </button>
                  )}
                  {open === l.id && l.pages && (
                    <ol className="mt-3 space-y-1 border-l border-champagne/40 pl-4 text-sm">
                      {l.firstSeen && <li className="text-ivory/50">First visit {fmtTime(l.firstSeen)} from {l.refHost || l.src}{l.landing ? `, landed on ${l.landing}` : ""}</li>}
                      {l.pages.map((p, i) => (
                        <li key={i}>
                          <span className="text-ivory/45">{fmtTime(p.ts)}</span> <span className="text-ivory/90">{p.path}</span>
                        </li>
                      ))}
                      <li className="text-champagne">Submitted the form on {l.page || "the site"}</li>
                    </ol>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="grid content-start gap-5">
          <Card title="Leads by source">
            {bySrc.size === 0 ? (
              <Empty>Nothing yet.</Empty>
            ) : (
              <Bars rows={[...bySrc.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ key: k, value: v }))} />
            )}
          </Card>
          <Card title="Recent call / text taps">
            {!report?.taps.length && <Empty>No taps in this range.</Empty>}
            <ul className="space-y-3 text-sm">
              {report?.taps.slice(0, 25).map((tp, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-12 shrink-0 font-semibold text-champagne">{tp.label}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-ivory/85">
                      {tp.src} · {tp.path}
                    </span>
                    <span className="text-xs text-ivory/45">
                      {[tp.city, tp.device, ago(tp.ts)].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, strong, warn }: { children: React.ReactNode; strong?: boolean; warn?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 ${
        warn ? "bg-[#e4876f]/15 text-[#f0a893]" : strong ? "bg-champagne/15 text-champagne" : "bg-ivory/[0.06] text-ivory/70"
      }`}
    >
      {children}
    </span>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-sm text-ivory/50">{children}</p>;
}

/* ---------------- Traffic ---------------- */

function TrafficView({ r }: { r: Report }) {
  const t = r.totals;
  return (
    <div className="mt-6 grid gap-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Visitors" value={t.visitors.toLocaleString()} sub={`${t.newVisitors.toLocaleString()} new`} />
        <Stat label="Visits" value={t.sessions.toLocaleString()} />
        <Stat label="Page views" value={t.views.toLocaleString()} />
        <Stat label="Avg visit" value={fmtDur(t.avgSession)} />
        <Stat label="Bounce" value={pct(t.bounce)} sub="Left after 1 page" />
        <Stat label="Leads" value={String(t.leads)} sub={`+ ${t.taps} call/text taps`} />
      </div>

      <Card title={r.range === 1 ? "Today" : `Daily visitors, last ${r.range} days`}>
        <Columns
          data={r.daily.map((d) => ({ label: fmtDay(d.day), value: d.visitors, tip: `${fmtDay(d.day)}: ${d.visitors} visitors, ${d.views} views${d.leads ? `, ${d.leads} leads` : ""}`, mark: d.leads > 0 }))}
        />
        <p className="mt-3 text-xs text-ivory/45">Gold dot = a lead came in that day. Hover a bar for details.</p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Where your traffic comes from">
          <RowTable rows={r.sources} first="Source" showLeads />
        </Card>
        <Card title="Referring websites">
          <RowTable rows={r.referrers} first="Website" showLeads />
        </Card>
        <Card title="Campaigns (UTM / Google Ads)">
          <RowTable rows={r.campaigns} first="Campaign" showLeads empty="Tag your links with utm_campaign to see campaigns here." />
        </Card>
        <Card title="Landing pages">
          <RowTable rows={r.landings} first="First page seen" showLeads />
        </Card>
      </div>

      <Card title="Pages">
        <RowTable rows={r.pages} first="Page" showTime showLeads />
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Locations" className="lg:col-span-2">
          <RowTable rows={r.cities} first="City" />
        </Card>
        <Card title="Busiest hours (Pacific)">
          <Columns data={r.hours.map((v, h) => ({ label: h % 6 === 0 ? `${((h + 11) % 12) + 1}${h < 12 ? "a" : "p"}` : "", value: v, tip: `${((h + 11) % 12) + 1}${h < 12 ? "am" : "pm"}: ${v} views` }))} height={140} />
        </Card>
        <Card title="Devices">
          <Bars rows={r.devices.map((x) => ({ key: x.key, value: x.visitors }))} />
        </Card>
        <Card title="Browsers / apps">
          <Bars rows={r.browsers.map((x) => ({ key: x.key, value: x.visitors }))} />
        </Card>
        <Card title="Operating systems">
          <Bars rows={r.os.map((x) => ({ key: x.key, value: x.visitors }))} />
        </Card>
      </div>
      {r.terms.length > 0 && (
        <Card title="Search terms (from ad links)">
          <RowTable rows={r.terms} first="Term" showLeads />
        </Card>
      )}
    </div>
  );
}

function Columns({ data, height = 180 }: { data: { label: string; value: number; tip: string; mark?: boolean }[]; height?: number }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const [hover, setHover] = useState<number | null>(null);
  const showEvery = Math.ceil(data.length / 10);
  return (
    <div>
      <div className="relative flex items-end gap-[2px]" style={{ height }} onMouseLeave={() => setHover(null)}>
        {data.map((d, i) => (
          <div
            key={i}
            className="relative flex h-full flex-1 cursor-default items-end"
            onMouseEnter={() => setHover(i)}
            onTouchStart={() => setHover(i)}
          >
            <div
              className={`mx-auto w-full max-w-[56px] rounded-t-[4px] ${hover === i ? "bg-champagne" : "bg-champagne/70"}`}
              style={{ height: `${Math.max(d.value ? 3 : 0, (d.value / max) * 100)}%` }}
            />
            {d.mark && <span className="absolute left-1/2 top-[-6px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-champagne ring-2 ring-coal" />}
          </div>
        ))}
        {hover !== null && (
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-y-full whitespace-nowrap rounded-lg border border-ivory/15 bg-onyx px-3 py-1.5 text-xs text-ivory shadow-lg"
            style={{ left: `${Math.min(Math.max(((hover + 0.5) / data.length) * 100, 12), 88)}%`, transform: "translate(-50%, -100%)" }}
          >
            {data[hover].tip}
          </div>
        )}
      </div>
      <div className="mt-2 flex gap-[2px] text-[0.65rem] text-ivory/45">
        {data.map((d, i) => (
          <span key={i} className="flex-1 overflow-visible whitespace-nowrap text-center">
            {i % showEvery === 0 ? d.label : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function Bars({ rows }: { rows: { key: string; value: number }[] }) {
  const total = rows.reduce((a, b) => a + b.value, 0) || 1;
  if (!rows.length) return <Empty>No data in this range.</Empty>;
  return (
    <ul className="space-y-3">
      {rows.slice(0, 10).map((x) => (
        <li key={x.key} className="text-sm">
          <div className="flex justify-between gap-3">
            <span className="truncate text-ivory/85">{x.key}</span>
            <span className="tabular-nums text-ivory/60">
              {x.value} · {pct(x.value / total)}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-ivory/[0.06]">
            <div className="h-full rounded-full bg-champagne/80" style={{ width: `${(x.value / total) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RowTable({ rows, first, showLeads, showTime, empty }: { rows: Row[]; first: string; showLeads?: boolean; showTime?: boolean; empty?: string }) {
  if (!rows.length) return <Empty>{empty || "No data in this range."}</Empty>;
  const max = Math.max(1, ...rows.map((r) => r.sessions));
  return (
    <div className="-mx-2 overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="text-left text-[0.7rem] uppercase tracking-[0.12em] text-ivory/45">
            <th className="px-2 pb-2 font-medium">{first}</th>
            <th className="px-2 pb-2 text-right font-medium">Visitors</th>
            <th className="px-2 pb-2 text-right font-medium">{showTime ? "Views" : "Visits"}</th>
            {showTime && <th className="px-2 pb-2 text-right font-medium">Avg time</th>}
            {showTime && <th className="px-2 pb-2 text-right font-medium">Scroll</th>}
            {showLeads && <th className="px-2 pb-2 text-right font-medium">Leads</th>}
            {showLeads && <th className="px-2 pb-2 text-right font-medium">Taps</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-ivory/[0.07]">
              <td className="relative max-w-[280px] px-2 py-2">
                <div className="absolute inset-y-1 left-0 rounded-r bg-champagne/[0.09]" style={{ width: `${(r.sessions / max) * 100}%` }} />
                <span className="relative block truncate text-ivory/90" title={r.key}>
                  {r.key}
                </span>
              </td>
              <td className="px-2 py-2 text-right tabular-nums">{r.visitors}</td>
              <td className="px-2 py-2 text-right tabular-nums text-ivory/70">{showTime ? r.views : r.sessions}</td>
              {showTime && <td className="px-2 py-2 text-right tabular-nums text-ivory/70">{fmtDur(r.avgTime)}</td>}
              {showTime && <td className="px-2 py-2 text-right tabular-nums text-ivory/70">{r.scroll !== undefined ? `${Math.round(r.scroll)}%` : "–"}</td>}
              {showLeads && <td className={`px-2 py-2 text-right tabular-nums ${r.leads ? "font-semibold text-champagne" : "text-ivory/40"}`}>{r.leads}</td>}
              {showLeads && <td className={`px-2 py-2 text-right tabular-nums ${r.taps ? "text-ivory" : "text-ivory/40"}`}>{r.taps}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Visitors ---------------- */

function VisitorsView({ r }: { r: Report }) {
  const [open, setOpen] = useState<string | null>(null);
  const [src, setSrc] = useState("All");
  const [onlyEngaged, setOnlyEngaged] = useState(false);
  const sources = ["All", ...new Set(r.visitors.map((v) => v.src))];
  const list = r.visitors.filter((v) => (src === "All" || v.src === src) && (!onlyEngaged || v.views > 1 || v.taps.length || v.leadName));

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
      <Card
        title={`Visitors (${list.length}${r.visitors.length >= 300 ? ", most recent 300" : ""})`}
        right={
          <div className="flex gap-2">
            <label className="flex items-center gap-1.5 text-xs text-ivory/60">
              <input type="checkbox" checked={onlyEngaged} onChange={(e) => setOnlyEngaged(e.target.checked)} /> Engaged only
            </label>
            <select value={src} onChange={(e) => setSrc(e.target.value)} className="rounded-full border border-ivory/15 bg-onyx px-3 py-1 text-xs">
              {sources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        }
      >
        {!list.length && <Empty>No visitors in this range yet.</Empty>}
        <ul className="divide-y divide-ivory/10">
          {list.map((v) => (
            <VisitorRow key={v.vid} v={v} open={open === v.vid} toggle={() => setOpen(open === v.vid ? null : v.vid)} />
          ))}
        </ul>
      </Card>
      <Card title="On the site right now">
        {!r.live.length && <Empty>Nobody in the last 5 minutes.</Empty>}
        <ul className="space-y-3 text-sm">
          {r.live.map((l) => (
            <li key={l.vid}>
              <p className="truncate text-ivory/90">{l.path}</p>
              <p className="text-xs text-ivory/45">{[l.src, l.city, ago(l.ts)].filter(Boolean).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function VisitorRow({ v, open, toggle }: { v: VisitorSummary; open: boolean; toggle: () => void }) {
  return (
    <li className="py-3">
      <button onClick={toggle} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 text-left">
        <span className="mr-auto min-w-0">
          <span className="block font-medium text-ivory">
            {v.leadName ? <span className="text-champagne">{v.leadName}</span> : `Visitor ${v.vid.slice(0, 6)}`}
            <span className="font-normal text-ivory/50"> · {place(v)}</span>
          </span>
          <span className="text-xs text-ivory/50">
            {[v.src, v.refHost, v.campaign, v.device, v.browser].filter(Boolean).join(" · ")}
          </span>
        </span>
        <span className="text-right text-xs tabular-nums text-ivory/60">
          {v.views} pages · {v.sessions} visit{v.sessions > 1 ? "s" : ""} · {fmtDur(v.time)}
          {v.taps.length > 0 && <span className="ml-2 text-champagne">{[...new Set(v.taps)].join(", ")}</span>}
          <span className="block text-ivory/40">{ago(v.lastSeen)}</span>
        </span>
      </button>
      {open && (
        <ol className="mt-3 space-y-1 border-l border-champagne/40 pl-4 text-sm">
          {v.journey.map((j, i) => {
            const newSession = i > 0 && v.journey[i - 1].sid !== j.sid;
            return (
              <li key={i} className={newSession ? "pt-2" : ""}>
                {newSession && <span className="mb-1 block text-[0.68rem] uppercase tracking-[0.14em] text-ivory/35">New visit</span>}
                <span className="text-ivory/45">{fmtTime(j.ts)}</span>{" "}
                {j.t === "click" ? <span className="text-champagne">Tapped {j.label}</span> : <span className="text-ivory/90">{j.path}</span>}
                {j.dur !== undefined && <span className="text-ivory/40"> · {fmtDur(j.dur)}</span>}
              </li>
            );
          })}
        </ol>
      )}
    </li>
  );
}
