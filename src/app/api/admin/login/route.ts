import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, passwordMatches } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const pw = String(form.get("password") || "");
  const url = new URL("/admin", req.url);
  if (!passwordMatches(pw)) {
    await new Promise((r) => setTimeout(r, 800));
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }
  const res = NextResponse.redirect(url, 303);
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ADMIN_COOKIE, adminToken()!, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  // Marks this browser as internal so your own visits are not counted.
  res.cookies.set("rg_internal", "1", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 400 });
  return res;
}
