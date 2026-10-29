"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types and helpers                                                   */
/* ------------------------------------------------------------------ */

type Pt = { x: number; y: number; label?: string };
type Series = {
  name: string;
  color: string;
  points: Pt[];
  /** Points with x >= dashFrom draw dashed (projection). */
  dashFrom?: number;
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const short = (n: number) => (n === 0 ? "$0" : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${Math.round(n / 1000)}K`);
const pct = (n: number) => `${n.toFixed(1)}%`;

/** Gold carries the primary series, blue the comparison. Validated against the ivory surface. */
const GOLD = "#9a6a1c";
const BLUE = "#2f6db0";
/** Neutral ink for recorded history that forks into scenarios. */
const INK = "#5c554d";

/** Round tick step (1, 2, 2.5 or 5 x 10^n) giving at most 5 intervals. */
function niceStep(max: number) {
  const raw = max / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const s of [1, 2, 2.5, 5, 10]) if (s * mag >= raw) return s * mag;
  return 10 * mag;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(720);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/* ------------------------------------------------------------------ */
/* Line chart with crosshair tooltip                                   */
/* ------------------------------------------------------------------ */

function LineChart({ series, yMin = 0, title, desc }: { series: Series[]; yMin?: number; title: string; desc: string }) {
  const [wrap, width] = useWidth<HTMLDivElement>();
  const [hoverX, setHoverX] = useState<number | null>(null);
  const height = 300;
  const m = { t: 16, r: width < 520 ? 16 : 120, b: 32, l: 64 };
  const xs = [...new Set(series.flatMap((s) => s.points.map((p) => p.x)))].sort((a, b) => a - b);
  const x0 = xs[0];
  const x1 = xs[xs.length - 1];
  const dataMax = Math.max(...series.flatMap((s) => s.points.map((p) => p.y)));
  const step = niceStep(dataMax - yMin);
  const yMax = yMin + Math.ceil((dataMax - yMin) / step) * step;
  const sx = (x: number) => m.l + ((x - x0) / (x1 - x0 || 1)) * (width - m.l - m.r);
  const sy = (y: number) => m.t + (1 - (y - yMin) / (yMax - yMin)) * (height - m.t - m.b);
  const ticks = Array.from({ length: Math.round((yMax - yMin) / step) + 1 }, (_, i) => yMin + step * i);
  // Label every recorded point, then every few years, dropping labels that would collide.
  const marked = new Set(series.flatMap((s) => s.points.filter((p) => p.label).map((p) => p.x)));
  const every = x1 - x0 > 14 ? 5 : x1 - x0 > 7 ? 2 : 1;
  const xTicks: number[] = [];
  for (const x of xs) {
    const want = marked.has(x) || x === x1 || (x1 - x) % every === 0;
    const last = xTicks[xTicks.length - 1];
    if (!want) continue;
    if (last !== undefined && sx(x) - sx(last) < 40) {
      if (marked.has(x) || x === x1) xTicks[xTicks.length - 1] = x;
      continue;
    }
    xTicks.push(x);
  }

  const path = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join("");

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left + m.l;
    let best = xs[0];
    for (const x of xs) if (Math.abs(sx(x) - px) < Math.abs(sx(best) - px)) best = x;
    setHoverX(best);
  };

  const hovered = hoverX === null ? [] : series.map((s) => ({ s, p: s.points.find((p) => p.x === hoverX) })).filter((h) => h.p);
  const tipLeft = hoverX === null ? 0 : Math.min(Math.max(sx(hoverX) + 12, 8), width - 200);

  return (
    <div ref={wrap} className="relative">
      <svg width={width} height={height} role="img" aria-label={`${title}. ${desc}`} className="block overflow-visible">
        {/* grid + y axis */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={width - m.r} y1={sy(t)} y2={sy(t)} stroke="#1a1714" strokeOpacity={t === yMin ? 0.35 : 0.1} />
            <text x={m.l - 10} y={sy(t)} dy="0.32em" textAnchor="end" fontSize={12} fill="#5c554d">
              {short(t)}
            </text>
          </g>
        ))}
        {xTicks.map((x) => (
          <text key={x} x={sx(x)} y={height - 8} textAnchor="middle" fontSize={12} fill="#5c554d">
            {x}
          </text>
        ))}

        {/* series */}
        {series.map((s) => {
          const solid = s.dashFrom === undefined ? s.points : s.points.filter((p) => p.x <= s.dashFrom!);
          const dashed = s.dashFrom === undefined ? [] : s.points.filter((p) => p.x >= s.dashFrom!);
          const last = s.points[s.points.length - 1];
          return (
            <g key={s.name}>
              {solid.length > 1 && <path d={path(solid)} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" />}
              {dashed.length > 1 && <path d={path(dashed)} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray="6 5" />}
              {s.points
                .filter((p) => p.label)
                .map((p) => (
                  <circle key={p.x} cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill={s.color} stroke="#f4f0e8" strokeWidth={2} />
                ))}
              {width >= 520 && last.x === x1 && (
                <text x={sx(last.x) + 8} y={sy(last.y)} dy="0.32em" fontSize={12} fill="#1a1714">
                  <tspan fontWeight={600}>{short(last.y)}</tspan>
                  <tspan x={sx(last.x) + 8} dy="1.25em" fill="#5c554d">
                    {s.name}
                  </tspan>
                </text>
              )}
            </g>
          );
        })}

        {/* crosshair */}
        {hoverX !== null && (
          <g pointerEvents="none">
            <line x1={sx(hoverX)} x2={sx(hoverX)} y1={m.t} y2={height - m.b} stroke="#1a1714" strokeOpacity={0.35} />
            {hovered.map(({ s, p }) => (
              <circle key={s.name} cx={sx(p!.x)} cy={sy(p!.y)} r={5} fill={s.color} stroke="#f4f0e8" strokeWidth={2} />
            ))}
          </g>
        )}
        <rect
          x={m.l}
          y={m.t}
          width={Math.max(0, width - m.l - m.r)}
          height={height - m.t - m.b}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHoverX(null)}
          style={{ touchAction: "pan-y" }}
        />
      </svg>

      {hoverX !== null && hovered.length > 0 && (
        <div
          className="pointer-events-none absolute top-2 z-10 min-w-[180px] rounded-[12px] border border-ink/15 bg-ivory px-3 py-2 text-[0.88rem] shadow-lg"
          style={{ left: tipLeft }}
        >
          <p className="font-semibold">{hoverX}</p>
          {hovered.map(({ s, p }) => (
            <p key={s.name} className="mt-1 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-ink-soft">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="num font-medium text-ink">{usd(p!.y)}</span>
            </p>
          ))}
          {hovered[0].p!.label && <p className="mt-1 text-[0.8rem] text-ink-soft">{hovered[0].p!.label}</p>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-[0.92rem]">
        <span className="font-medium">{label}</span>
        <span className="num text-[1.1rem]">{pct(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#9a6a1c]"
      />
      {hint && <span className="mt-1 block text-[0.82rem] text-ink-soft">{hint}</span>}
    </label>
  );
}

function Legend({ items }: { items: { name: string; color: string; dashed?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.88rem] text-ink-soft">
      {items.map((i) => (
        <li key={i.name} className="flex items-center gap-2">
          <svg width="22" height="8" aria-hidden>
            <line x1="1" x2="21" y1="4" y2="4" stroke={i.color} strokeWidth={2} strokeDasharray={i.dashed ? "5 4" : undefined} />
          </svg>
          {i.name}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export interface ProjectionInput {
  price: number;
  startYear: number;
  annualRent: number;
  valueHistory: { year: number; value: number; label: string }[];
  rentHistory: { year: number; annual: number; label: string }[];
  historicAppreciation: number; // %/yr, from valueHistory
  historicRentGrowth: number; // %/yr, from rentHistory
  cpi: number; // regional CPI used in the current AB 1482 cap
}

export default function ProjectionCharts({ data }: { data: ProjectionInput }) {
  const [years, setYears] = useState(10);
  const [appr, setAppr] = useState(4);
  const [rentGrowth, setRentGrowth] = useState(3.5);
  const [cpi, setCpi] = useState(data.cpi);
  const [showTable, setShowTable] = useState(false);
  const cap = Math.min(5 + cpi, 10);

  const rows = useMemo(
    () =>
      Array.from({ length: years + 1 }, (_, t) => ({
        year: data.startYear + t,
        value: data.price * Math.pow(1 + appr / 100, t),
        market: data.annualRent * Math.pow(1 + rentGrowth / 100, t),
        legal: data.annualRent * Math.pow(1 + cap / 100, t),
      })),
    [years, appr, rentGrowth, cap, data],
  );

  const valueSeries: Series[] = [
    {
      name: "Property value",
      color: GOLD,
      dashFrom: data.startYear,
      points: [
        ...data.valueHistory.filter((h) => h.year < data.startYear).map((h) => ({ x: h.year, y: h.value, label: h.label })),
        { x: data.startYear, y: data.price, label: `${data.startYear} list price` },
        ...rows.slice(1).map((r) => ({ x: r.year, y: r.value })),
      ],
    },
  ];

  const historyRent = data.rentHistory.filter((h) => h.year < data.startYear).map((h) => ({ x: h.year, y: h.annual, label: h.label }));
  const rentSeries: Series[] = [
    {
      name: "Recorded rent",
      color: INK,
      points: [...historyRent, { x: data.startYear, y: data.annualRent, label: "Current rents" }],
    },
    {
      name: "Legal maximum",
      color: GOLD,
      dashFrom: data.startYear,
      points: [{ x: data.startYear, y: data.annualRent }, ...rows.slice(1).map((r) => ({ x: r.year, y: r.legal }))],
    },
    {
      name: "Market growth",
      color: BLUE,
      dashFrom: data.startYear,
      points: [{ x: data.startYear, y: data.annualRent }, ...rows.slice(1).map((r) => ({ x: r.year, y: r.market }))],
    },
  ];

  const end = rows[rows.length - 1];
  const firstHistYear = data.valueHistory[0]?.year ?? data.startYear;

  return (
    <div className="space-y-12">
      {/* Controls, one row above both charts */}
      <div className="no-print grid gap-6 rounded-[20px] border border-ink/15 p-6 md:grid-cols-4 md:p-7">
        <div>
          <span className="block text-[0.92rem] font-medium">Horizon</span>
          <div className="mt-2 inline-flex rounded-full border border-ink/20 p-1" role="group" aria-label="Years to project">
            {[5, 10, 15].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYears(y)}
                aria-pressed={years === y}
                className={`rounded-full px-4 py-1.5 text-[0.92rem] ${years === y ? "bg-ink text-ivory" : "text-ink"}`}
              >
                {y} yrs
              </button>
            ))}
          </div>
        </div>
        <Slider label="Appreciation" value={appr} onChange={setAppr} min={0} max={8} step={0.5} hint={`This property: ${pct(data.historicAppreciation)}/yr since ${data.valueHistory.find((h) => h.year >= 2018)?.year ?? firstHistYear}`} />
        <Slider label="Market rent growth" value={rentGrowth} onChange={setRentGrowth} min={0} max={8} step={0.5} hint={`Rents here grew ${pct(data.historicRentGrowth)}/yr since 2018`} />
        <Slider label="Regional CPI" value={cpi} onChange={setCpi} min={0} max={6} step={0.1} hint={`Legal cap = 5% + CPI, max 10%. Now ${pct(cap)}`} />
      </div>

      {/* Value */}
      <figure>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <figcaption>
            <h3 className="text-[1.4rem] font-semibold">Property value</h3>
            <p className="text-ink-soft">
              Recorded sales, then {pct(appr)} a year from list price. {years} years out: <span className="num font-semibold text-ink">{usd(end.value)}</span>
            </p>
          </figcaption>
          <Legend items={[{ name: "Recorded", color: GOLD }, { name: "Projected", color: GOLD, dashed: true }]} />
        </div>
        <LineChart series={valueSeries} yMin={0} title="Property value over time" desc={`Projected at ${appr}% a year to ${usd(end.value)} in ${end.year}`} />
      </figure>

      {/* Rent */}
      <figure>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <figcaption>
            <h3 className="text-[1.4rem] font-semibold">Gross annual rent</h3>
            <p className="text-ink-soft">
              The most rent can rise under state law ({pct(cap)} a year) against a market pace of {pct(rentGrowth)}. In {end.year}:{" "}
              <span className="num font-semibold text-ink">{usd(end.market)}</span> at market,{" "}
              <span className="num font-semibold text-ink">{usd(end.legal)}</span> at the legal maximum.
            </p>
          </figcaption>
          <Legend
            items={[
              { name: "Recorded rent", color: INK },
              { name: "Legal maximum", color: GOLD, dashed: true },
              { name: "Market growth", color: BLUE, dashed: true },
            ]}
          />
        </div>
        <LineChart series={rentSeries} yMin={0} title="Gross annual rent over time" desc={`Legal maximum ${usd(end.legal)} and market ${usd(end.market)} in ${end.year}`} />
      </figure>

      {/* Table view */}
      <div>
        <button type="button" onClick={() => setShowTable((v) => !v)} className="link-more no-print" aria-expanded={showTable}>
          {showTable ? "Hide" : "Show"} the numbers by year
        </button>
        {showTable && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-ink/20 text-ink-soft">
                  <th className="py-2 pr-4 font-medium">Year</th>
                  <th className="py-2 pr-4 text-right font-medium">Value</th>
                  <th className="py-2 pr-4 text-right font-medium">Rent, market</th>
                  <th className="py-2 text-right font-medium">Rent, legal max</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year} className="border-b border-ink/10">
                    <td className="py-2 pr-4">{r.year}</td>
                    <td className="num py-2 pr-4 text-right">{usd(r.value)}</td>
                    <td className="num py-2 pr-4 text-right">{usd(r.market)}</td>
                    <td className="num py-2 text-right">{usd(r.legal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
