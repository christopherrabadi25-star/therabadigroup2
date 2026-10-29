import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/data";
import { POSTS } from "@/lib/posts";
import { CITIES } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const now = new Date();
  const pages: [string, number, "weekly" | "monthly"][] = [
    ["", 1, "weekly"],
    ["/listings", 0.9, "weekly"],
    ["/listings/303-markham-pl-pasadena", 0.9, "monthly"],
    ["/sellers", 0.9, "monthly"],
    ["/buyers", 0.9, "monthly"],
    ["/about", 0.8, "monthly"],
    ["/areas", 0.8, "monthly"],
    ["/commercial", 0.8, "monthly"],
    ["/market", 0.7, "monthly"],
    ["/contact", 0.7, "monthly"],
    ["/blog", 0.6, "monthly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority })),
    ...CITIES.flatMap((c) => [
      { url: `${base}/areas/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
      { url: `${base}/market/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ]),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
