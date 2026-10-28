import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rg_admin";

export function adminToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash("sha256").update(`rg-admin-v1:${pw}`).digest("hex");
}

export function passwordMatches(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(pw).digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const t = adminToken();
  if (!t) return false;
  const c = (await cookies()).get(ADMIN_COOKIE)?.value || "";
  if (c.length !== t.length) return false;
  return timingSafeEqual(Buffer.from(c), Buffer.from(t));
}
