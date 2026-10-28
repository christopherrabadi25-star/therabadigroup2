import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { LEAD_STATUSES, setLeadStatus } from "@/lib/leads";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = (await req.json()) as { id?: string; status?: string };
  if (!id || !status || !LEAD_STATUSES.includes(status)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await setLeadStatus(String(id).slice(0, 40), status);
  return NextResponse.json({ ok: true });
}
