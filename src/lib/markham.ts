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
      body: "Civil War veteran Henry Harrison Markham moves his family to Pasadena. He later serves in Congress and, from 1891 to 1895, as Governor of California. The neighborhood around his estate still carries his name.",
    },
    {
      year: "1880s",
      title: "Carlisle Heights is laid out",
      body: "Developer George Woodbury Stimson subdivides the Carlisle Heights tract and designs the layout of Markham Place, a short, quiet street just off South Orange Grove Boulevard, Pasadena's Millionaires' Row.",
    },
    {
      year: "1901",
      title: "The house is built",
      body: "A two-story Colonial Revival rises at 303 Markham Place, attributed to architect Herbert L. Smith. It joins Queen Anne, Shingle, and Craftsman neighbors designed by some of the most important architects working in early Pasadena.",
    },
    {
      year: "2013",
      title: "National Register of Historic Places",
      body: "Nominated by Pasadena Heritage, the Markham Place Historic District is listed on the National Register. Nearly every house in the district was built between 1891 and 1933.",
    },
    {
      year: "2016",
      title: "Restored for a new century",
      body: "Pasadena architect James V. Coane leads a renovation that adds a chef's kitchen and modern systems, including a retrofitted foundation, rebuilt chimney, and 200-amp service, while keeping the 1901 character intact.",
    },
    {
      year: "2026",
      title: "A new chapter",
      body: "The house lists in September for the first time in over a decade. Two days later it is under contract with our buyer, and on October 26 it closes at $4,675,000.",
    },
  ],
} as const;
