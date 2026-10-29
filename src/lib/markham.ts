// Showcase content for 303 Markham Pl, Pasadena (closed Oct 26, 2026, buyer side)
import type { GalleryPhoto } from "@/components/PhotoGallery";

const CDN = "https://ssl.cdn-redfin.com/photo/45";

/** Largest size first, then the size we know Redfin serves. */
function photo(n: number, alt: string, caption?: string, wide = false): GalleryPhoto {
  return {
    srcs: [`${CDN}/bigphoto/840/P1-28840_${n}_1.jpg`, `${CDN}/mbphotov3/840/genMid.P1-28840_${n}_1.jpg`, `${CDN}/midphoto/840/genMid.P1-28840_${n}_1.jpg`],
    alt,
    caption,
    wide,
  };
}

export const MARKHAM = {
  slug: "303-markham-pl-pasadena",
  address: "303 Markham Pl",
  city: "Pasadena, CA 91105",
  district: "Governor Markham Landmark District",
  price: 4675000,
  closed: "2026-10-26",
  hero: `${CDN}/bigphoto/840/P1-28840_1.jpg`,
  heroFallback: `${CDN}/mbpaddedwide/840/genMid.P1-28840_1.jpg`,
  facts: [
    { value: "1901", label: "Year built" },
    { value: "2 days", label: "Listed to under contract" },
    { value: "4,080", label: "Square feet" },
    { value: "0.39", label: "Acres" },
  ],
  specs: ["4 bedrooms", "5.5 baths", "Chef's kitchen", "Primary suite with balcony", "Pool and spa", "Cabana with outdoor kitchen", "Guest studio"],
  photos: [
    photo(18, "303 Markham Pl, Pasadena", undefined, true),
    photo(10, "Living room at 303 Markham Pl", "Living room"),
    photo(24, "Formal dining room at 303 Markham Pl", "Dining room"),
    photo(21, "Kitchen at 303 Markham Pl", "Kitchen", true),
    photo(56, "303 Markham Pl, Pasadena"),
    photo(30, "303 Markham Pl, Pasadena"),
    photo(34, "Bedroom at 303 Markham Pl", "Primary suite"),
    photo(32, "Bath at 303 Markham Pl", "Marble bath"),
    photo(45, "303 Markham Pl, Pasadena", undefined, true),
    photo(11, "303 Markham Pl, Pasadena"),
    photo(37, "303 Markham Pl, Pasadena"),
  ] as GalleryPhoto[],
  timeline: [
    {
      year: "1879",
      title: "A governor comes to Pasadena",
      body: "Henry Harrison Markham moves to Pasadena. He later serves as Governor of California, 1891 to 1895.",
    },
    {
      year: "1880s",
      title: "Carlisle Heights is laid out",
      body: "George Woodbury Stimson lays out Markham Place, just off South Orange Grove Boulevard.",
    },
    {
      year: "1901",
      title: "The house is built",
      body: "A two-story Colonial Revival rises at 303 Markham Place, attributed to Herbert L. Smith.",
    },
    {
      year: "2013",
      title: "National Register of Historic Places",
      body: "The Markham Place Historic District joins the National Register.",
    },
    {
      year: "2016",
      title: "Restored for a new century",
      body: "James V. Coane renovates it, adding modern systems and keeping the 1901 character.",
    },
    {
      year: "2026",
      title: "A new chapter",
      body: "Under contract for our buyer in two days. Closed October 26 at $4,675,000.",
    },
  ],
} as const;
