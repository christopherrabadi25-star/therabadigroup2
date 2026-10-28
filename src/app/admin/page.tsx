import type { Metadata } from "next";
import { isAdmin } from "@/lib/adminAuth";
import { getLeads } from "@/lib/leads";
import { buildReport } from "@/lib/analytics";
import { storeConfigured, remoteConfigured } from "@/lib/store";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string; error?: string; tab?: string }> }) {
  const sp = await searchParams;
  const shell = "fixed inset-0 z-[100] overflow-y-auto bg-onyx text-ivory";

  if (!process.env.ADMIN_PASSWORD) {
    return (
      <div className={shell} data-lenis-prevent>
        <div className="mx-auto max-w-md px-6 py-24">
          <p className="font-display text-3xl">Dashboard not set up yet</p>
          <p className="mt-4 text-ivory/70">
            Add an <code className="text-champagne">ADMIN_PASSWORD</code> environment variable in Vercel, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return (
      <div className={shell} data-lenis-prevent>
        <form action="/api/admin/login" method="post" className="mx-auto mt-[18vh] grid max-w-sm gap-6 px-6">
          <p className="font-display text-4xl">The Rabadi Group</p>
          <p className="-mt-3 text-sm uppercase tracking-[0.2em] text-champagne">Private dashboard</p>
          <input
            type="password"
            name="password"
            autoFocus
            required
            placeholder="Password"
            className="rounded-xl border border-ivory/15 bg-coal px-4 py-3 text-ivory outline-none focus:border-champagne"
          />
          {sp.error && <p className="text-sm text-[#e4876f]">That password didn&apos;t match.</p>}
          <button className="rounded-full bg-champagne px-6 py-3 font-semibold text-onyx">Sign in</button>
        </form>
      </div>
    );
  }

  const range = [1, 7, 30, 90, 365].includes(Number(sp.range)) ? Number(sp.range) : 30;
  let error = "";
  let leads: Awaited<ReturnType<typeof getLeads>> = [];
  let report: Awaited<ReturnType<typeof buildReport>> | null = null;
  try {
    leads = await getLeads();
    report = await buildReport(range, leads);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load data";
  }

  return (
    <div className={shell} data-lenis-prevent>
      <Dashboard
        report={report}
        leads={leads}
        range={range}
        error={error}
        initialTab={sp.tab === "traffic" || sp.tab === "visitors" ? sp.tab : "leads"}
        storeWarning={!storeConfigured ? "missing" : !remoteConfigured ? "memory" : ""}
      />
    </div>
  );
}
