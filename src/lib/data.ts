// Business data for The Rabadi Group

export const BUSINESS = {
  name: "The Rabadi Group",
  tagline: "Father and son real estate, from the foothills to the coast",
  domain: "therabadigroup.com",
  url: "https://therabadigroup.com",
  email: "ramzirbd@aim.com",
  phone: "(626) 203-1372",
  phoneHref: "tel:+16262031372",
  smsHref: "sms:+16262031372",
  instagram: "https://instagram.com/therabadigroup",
  instagramHandle: "@therabadigroup",
  zillow: "https://www.zillow.com/profile/ramzirbd",
  brokerage: "Agency 8 Real Estate Group",
  brokerageCity: "Claremont, California",
  address: {
    street: "940 W Foothill Blvd",
    city: "Claremont",
    state: "CA",
    zip: "91711",
    full: "940 W Foothill Blvd, Claremont, CA 91711",
  },
} as const;

export const STATS = [
  { value: "$110M+", label: "Closed sales volume" },
  { value: "20+", label: "Years in real estate" },
  { value: "35+", label: "Properties sold" },
  { value: "$7.4M", label: "Highest single sale" },
] as const;

/** Real photos from homes we sold (listing photography). Remote, so always paired with a local fallback. */
export const PHOTOS = {
  cromwellExterior: "https://tracydo.com/wp-content/uploads/2026/03/0_78-copy.jpg",
  cromwellRedfin: "https://ssl.cdn-redfin.com/photo/40/bigphoto/811/26659811_1.jpg",
  markham: "https://ssl.cdn-redfin.com/photo/45/bigphoto/840/P1-28840_1.jpg",
  saintAnns: "https://ssl.cdn-redfin.com/photo/45/bigphoto/526/LG24134526_1.jpg",
  risingGlen: "https://www.compass.com/m/243102dcc22db564159e038057b107dc4d1f4df0_img_0/origin.webp",
  danaPoint: "https://ssl.cdn-redfin.com/photo/45/bigphoto/529/PW21068529_0.jpg",
  monrovia: "https://ssl.cdn-redfin.com/photo/45/bigphoto/033/CV25203033_1.jpg",
  liveOak: "https://ssl.cdn-redfin.com/photo/45/bigphoto/140/PW25026140_P.jpg",
  peppertree: "https://ssl.cdn-redfin.com/photo/45/bigphoto/445/CV21157445_1.jpg",
  foxbrook: "https://ssl.cdn-redfin.com/photo/45/bigphoto/171/AR25009171_G.jpg",
} as const;

export const TEAM = [
  {
    name: "Ramzi Rabadi",
    first: "Ramzi",
    title: "Agent, 20+ years",
    dre: "CA DRE #01738777",
    image: "/images/ramzi.png",
    zillow: "https://www.zillow.com/profile/ramzirbd",
    specialties: ["Luxury homes", "Commercial", "Multi-family", "Gas stations", "Ground leases", "Industrial"],
    short:
      "Two decades of deals, from a $7.4M Hollywood Hills mid-century to ground leases and gas stations most agents never touch.",
    bio: "20+ years in Southern California real estate, from a $7.4M William Krisel home in the Hollywood Hills and $6.3M oceanfront in Dana Point to income buildings and commercial deals. He prices carefully and negotiates every term.",
  },
  {
    name: "Christopher Rabadi",
    first: "Christopher",
    title: "Agent",
    dre: "CA DRE #02246356",
    image: "/images/christopher.png",
    // Add Christopher's Zillow profile URL here; the link shows up on the site automatically once it's set.
    zillow: "",
    specialties: ["Buyer representation", "San Gabriel Valley", "Foothill Cities", "Market research", "Marketing"],
    short:
      "Raised in the San Gabriel Valley. Runs the research, comps, and marketing, and works side by side with buyers.",
    bio: "Raised in the San Gabriel Valley. Christopher runs the research, pricing, and marketing, and works with buyers from first showing to keys. In 2026: a $4.675M Pasadena estate, a $4.495M Los Feliz estate, and a Sierra Madre home $119,500 under asking.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Closed sales                                                        */
/* ------------------------------------------------------------------ */

export type Side = "Buyer" | "Seller";

export interface Sale {
  slug: string;
  address: string;
  city: string;
  neighborhood?: string;
  /** Area grouping used on the Areas page */
  area: string;
  price: number;
  date: string; // ISO yyyy-mm-dd (close of escrow)
  side: Side;
  type?: string;
  facts?: string[];
  highlight?: string;
  description?: string;
  /** Photos in order of preference. Remote photos fall back to the next one. */
  images?: string[];
  imageAlt?: string;
  featured?: boolean;
  /** Under contract, not yet closed. Shown as "In escrow" instead of a sold date. */
  inEscrow?: boolean;
  /** Dedicated showcase page for this sale, if it has one. */
  page?: string;
}

export const SALES: Sale[] = [
  {
    slug: "303-markham-pl-pasadena",
    address: "303 Markham Pl",
    city: "Pasadena",
    neighborhood: "Governor Markham District",
    area: "Pasadena",
    price: 4675000,
    date: "2026-10-26",
    side: "Buyer",
    type: "1901 Colonial Revival",
    facts: ["4 beds", "5.5 baths", "4,080 sq ft", "0.39 acres"],
    highlight:
      "A 1901 landmark-district estate attributed to architect Herbert L. Smith, under contract for our buyer in two days and closed at $4,675,000.",
    description:
      "Chef's kitchen with two islands, primary suite with a marble bath and balcony, and grounds with a pool, spa, cabana and guest studio.",
    images: [
      "https://ssl.cdn-redfin.com/photo/45/bigphoto/840/P1-28840_1.jpg",
      "https://ssl.cdn-redfin.com/photo/45/mbpaddedwide/840/genMid.P1-28840_1.jpg",
    ],
    imageAlt: "303 Markham Pl, a 1901 Colonial Revival estate in Pasadena",
    featured: true,
    page: "/listings/303-markham-pl-pasadena",
  },
  {
    slug: "602-n-michillinda-ave-sierra-madre",
    address: "602 N Michillinda Ave",
    city: "Sierra Madre",
    area: "Sierra Madre",
    price: 1580000,
    date: "2026-10-20",
    side: "Buyer",
    type: "Single-story pool home",
    facts: ["3 beds", "2 baths", "2,049 sq ft", "Built 1960"],
    highlight:
      "Closed $119,500 under the $1,699,500 asking price, plus $10,000 in credits we negotiated for our buyer.",
    description:
      "Single-story pool home with a fireplace, formal dining room overlooking the pool, and views of the San Gabriel Mountains on a 10,000+ sq ft lot.",
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/859/TR26141859_1.jpg"],
    imageAlt: "602 N Michillinda Ave, Sierra Madre",
    featured: true,
  },
  {
    slug: "4426-cromwell-ave-los-feliz",
    address: "4426 Cromwell Ave",
    city: "Los Angeles",
    neighborhood: "Los Feliz",
    area: "Los Feliz",
    price: 4495000,
    date: "2026-04-14",
    side: "Buyer",
    type: "1931 Spanish Colonial Revival",
    facts: ["4 beds", "5 baths", "4,099 sq ft", "Pool and JADU"],
    highlight:
      "Won for our buyer in a multiple-offer, best-and-final round.",
    description:
      "Gated 1931 Spanish estate north of Los Feliz Boulevard with arched doorways, original tile, a pool, fruit trees, and a junior ADU with its own entrance.",
    images: [
      "https://tracydo.com/wp-content/uploads/2026/03/0_78-copy.jpg",
      "https://ssl.cdn-redfin.com/photo/40/bigphoto/811/26659811_1.jpg",
      "https://ssl.cdn-redfin.com/photo/40/mbpaddedwide/811/genMid.26659811_1.jpg",
    ],
    imageAlt: "4426 Cromwell Ave, a 1931 Spanish estate in Los Feliz",
    featured: true,
  },
  {
    slug: "235-e-foothill-blvd-b-monrovia-2025",
    address: "235 E Foothill Blvd, Unit B",
    city: "Monrovia",
    area: "Monrovia",
    price: 650000,
    date: "2025-12-23",
    side: "Seller",
    type: "Townhome",
    facts: ["2 beds", "1.5 baths", "1,134 sq ft"],
    highlight: "Listed and sold for our seller, a few minutes from Old Town Monrovia.",
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/033/CV25203033_1.jpg"],
    imageAlt: "235 E Foothill Blvd, Unit B, Monrovia",
    featured: true,
  },
  {
    slug: "5000-live-oak-canyon-rd-la-verne",
    address: "5000 Live Oak Canyon Rd",
    city: "La Verne",
    area: "La Verne",
    price: 4200000,
    date: "2025-06-26",
    side: "Buyer",
    type: "Architectural estate",
    facts: ["3 beds", "3.5 baths", "3,628 sq ft", "9.97 acres"],
    highlight:
      "Designed by Foster Rhodes Jackson, a disciple of Frank Lloyd Wright, with a bell tower and canyon views.",
    images: [
      "https://ssl.cdn-redfin.com/photo/45/bigphoto/140/PW25026140_P.jpg",
      "https://media.relahq.com/public/styles/gallery_grid/s3/property-images/prop-nid-179354336/011-0011_809.jpg",
    ],
    imageAlt: "5000 Live Oak Canyon Rd, La Verne",
    featured: true,
  },
  {
    slug: "647-foxbrook-dr-glendora",
    address: "647 Foxbrook Dr",
    city: "Glendora",
    neighborhood: "South Hills",
    area: "Glendora",
    price: 1525000,
    date: "2025-06-20",
    side: "Buyer",
    type: "Mid-century post-and-beam",
    facts: ["4 beds", "2,579 sq ft", "0.42 acres", "Pool and spa"],
    highlight: "Hillside mid-century in Glendora's South Hills with mountain views, a saltwater pool and an outdoor kitchen.",
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/171/AR25009171_G.jpg"],
    imageAlt: "647 Foxbrook Dr, a mid-century home in Glendora",
    featured: true,
  },
  { slug: "1595-w-foothill-blvd-upland", address: "1595 W Foothill Blvd", city: "Upland", area: "Upland", price: 1300000, date: "2024-11-21", side: "Buyer" },
  { slug: "2252-zinnia-st-upland", address: "2252 Zinnia St", city: "Upland", area: "Upland", price: 1110000, date: "2024-11-15", side: "Buyer" },
  {
    slug: "8417-waring-ave-west-hollywood",
    address: "8417 Waring Ave",
    city: "Los Angeles",
    neighborhood: "West Hollywood",
    area: "West Hollywood",
    price: 2110000,
    date: "2024-09-26",
    side: "Buyer",
    type: "1939 multi-unit",
    facts: ["7 beds", "5 baths", "4,167 sq ft", "4-car garage"],
    images: ["/images/waring-ave.jpg"],
    imageAlt: "8417 Waring Ave, West Hollywood",
    featured: true,
  },
  {
    slug: "705-saint-anns-dr-laguna-beach",
    address: "705 Saint Anns Dr",
    city: "Laguna Beach",
    area: "Laguna Beach",
    price: 1800000,
    date: "2024-09-03",
    side: "Buyer",
    type: "1928 Laguna Beach cottage",
    facts: ["Corner lot", "Two decks", "Two-car garage"],
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/526/LG24134526_1.jpg"],
    imageAlt: "705 Saint Anns Dr, Laguna Beach",
    featured: true,
  },
  { slug: "360-anita-dr-pasadena", address: "360 Anita Dr", city: "Pasadena", neighborhood: "San Rafael", area: "Pasadena", price: 1900000, date: "2023-07-06", side: "Buyer" },
  {
    slug: "811-n-croft-ave-west-hollywood",
    address: "811 N Croft Ave",
    city: "Los Angeles",
    neighborhood: "West Hollywood",
    area: "West Hollywood",
    price: 2650000,
    date: "2023-05-18",
    side: "Buyer",
    type: "Fourplex",
    highlight: "Half a block from Melrose Place, with large private patios.",
    images: ["/images/croft-ave.jpg"],
    imageAlt: "811 N Croft Ave, West Hollywood",
    featured: true,
  },
  {
    slug: "1411-rising-glen-rd-hollywood-hills",
    address: "1411 Rising Glen Rd",
    city: "Los Angeles",
    neighborhood: "Hollywood Hills",
    area: "Hollywood Hills",
    price: 7400000,
    date: "2023-01-18",
    side: "Buyer",
    type: "William Krisel mid-century",
    highlight:
      "Butterfly-roofed Krisel design, once home to Bobby Darin and Sandra Dee and featured in Architectural Digest.",
    images: [
      "https://www.compass.com/m/243102dcc22db564159e038057b107dc4d1f4df0_img_0/origin.webp",
      "/images/rising-glen.jpg",
    ],
    imageAlt: "1411 Rising Glen Rd, Hollywood Hills",
    featured: true,
  },
  { slug: "25-annandale-rd-pasadena", address: "25 Annandale Rd", city: "Pasadena", area: "Pasadena", price: 1654000, date: "2022-11-04", side: "Buyer" },
  { slug: "235-e-foothill-blvd-b-monrovia-2022", address: "235 E Foothill Blvd, Unit B", city: "Monrovia", area: "Monrovia", price: 575000, date: "2022-11-28", side: "Buyer" },
  { slug: "32733-state-hwy-18-lucerne-valley", address: "32733 State Hwy 18", city: "Lucerne Valley", area: "High Desert", price: 400000, date: "2022-05-03", side: "Buyer" },
  {
    slug: "1426-peppertree-dr-la-habra-heights",
    address: "1426 Peppertree Dr",
    city: "La Habra Heights",
    area: "La Habra Heights",
    price: 2103000,
    date: "2021-11-09",
    side: "Seller",
    type: "Gated estate",
    facts: ["6 beds", "5,034 sq ft", "0.9 acres", "Pool"],
    highlight: "Privately gated estate on nearly an acre with a heated pool, gazebo and fruit trees.",
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/445/CV21157445_1.jpg"],
    imageAlt: "1426 Peppertree Dr, a gated estate in La Habra Heights",
    featured: true,
  },
  { slug: "389-s-east-end-ave-pomona", address: "389 S East End Ave", city: "Pomona", area: "Pomona", price: 1140000, date: "2021-10-05", side: "Buyer" },
  {
    slug: "35099-beach-rd-dana-point",
    address: "35099 Beach Rd",
    city: "Dana Point",
    area: "Dana Point",
    price: 6300000,
    date: "2021-09-28",
    side: "Buyer",
    type: "Oceanfront",
    highlight: "On the sand in Capistrano Beach's gated Beach Road community, with ocean views from both levels.",
    images: ["https://ssl.cdn-redfin.com/photo/45/bigphoto/529/PW21068529_0.jpg"],
    imageAlt: "35099 Beach Rd, Dana Point, on the sand",
    featured: true,
  },
  { slug: "418-vista-dr-claremont", address: "418 Vista Dr", city: "Claremont", area: "Claremont", price: 660000, date: "2021-04-26", side: "Buyer" },
  { slug: "6968-angus-dr-la-verne", address: "6968 Angus Dr", city: "La Verne", area: "La Verne", price: 898000, date: "2021-01-22", side: "Buyer" },
  { slug: "128-n-5th-ave-monrovia", address: "128 N 5th Ave", city: "Monrovia", area: "Monrovia", price: 690000, date: "2019-10-03", side: "Buyer" },
  {
    slug: "9550-w-olympic-blvd-beverly-hills",
    address: "9550 W Olympic Blvd",
    city: "Beverly Hills",
    area: "Beverly Hills",
    price: 3050000,
    date: "2019-04-09",
    side: "Buyer",
    highlight: "On the Olympic Boulevard corridor in the 90212.",
    images: ["/images/olympic-blvd.jpg"],
    imageAlt: "9550 W Olympic Blvd, Beverly Hills",
    featured: true,
  },
  { slug: "745-w-foothill-blvd-glendora", address: "745 W Foothill Blvd", city: "Glendora", area: "Glendora", price: 720000, date: "2018-08-16", side: "Buyer" },
  { slug: "1546-steinhart-ave-redondo-beach", address: "1546 Steinhart Ave", city: "Redondo Beach", area: "South Bay", price: 1075000, date: "2017-09-01", side: "Buyer" },
  { slug: "216-half-30th-st-newport-beach", address: "216 1/2 30th St", city: "Newport Beach", area: "Newport Beach", price: 1021000, date: "2017-03-27", side: "Buyer" },
  { slug: "2060-liliano-dr-sierra-madre", address: "2060 Liliano Dr", city: "Sierra Madre", area: "Sierra Madre", price: 905000, date: "2012-12-06", side: "Buyer" },
  { slug: "1970-n-altadena-dr-pasadena", address: "1970 N Altadena Dr", city: "Pasadena", area: "Pasadena", price: 836000, date: "2012-12-03", side: "Seller" },
];

/** Newest first */
export const SALES_BY_DATE = [...SALES].sort((a, b) => b.date.localeCompare(a.date));

export const RECENT_SALES = SALES_BY_DATE.slice(0, 3);

export function formatPrice(n: number, short = false) {
  if (short) {
    if (n >= 1_000_000) return `$${Number((n / 1_000_000).toFixed(3))}M`;
    return `$${Math.round(n / 1000)}K`;
  }
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatDate(iso: string, style: "month" | "full" = "month") {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    month: style === "full" ? "long" : "short",
    year: "numeric",
    ...(style === "full" ? { day: "numeric" } : {}),
    timeZone: "UTC",
  });
}

/** "In escrow" for open deals, otherwise "Sold Oct 2026". */
export function saleStatus(s: Sale, prefix = "Sold ") {
  return s.inEscrow ? "In escrow" : `${prefix}${formatDate(s.date)}`;
}

export function placeLabel(s: Sale) {
  return s.neighborhood ? `${s.neighborhood}, ${s.city}` : s.city;
}

/* ------------------------------------------------------------------ */
/* Areas                                                               */
/* ------------------------------------------------------------------ */

export const REGIONS = [
  {
    name: "Foothill Cities and the San Gabriel Valley",
    note: "Our home base. We live, work, and close here more than anywhere else.",
    cities: [
      { name: "Claremont", desc: "The Village, the Colleges, and tree-lined streets running up to the foothills. Our office is on Foothill Boulevard." },
      { name: "La Verne", desc: "Bonita Unified schools, canyon estates along Live Oak and Webb Canyon, and very little inventory." },
      { name: "Pasadena", desc: "Craftsman blocks, San Rafael, and the estates of South Orange Grove." },
      { name: "Sierra Madre", desc: "A small village at the base of the mountains. Single-story homes on big lots rarely last." },
      { name: "Monrovia", desc: "Old Town, walkable blocks, and some of the best value along the 210." },
      { name: "Glendora", desc: "Hillside homes, strong schools, and steady appreciation." },
      { name: "San Dimas", desc: "Bigger lots, horse properties, and a small-town feel." },
      { name: "Upland", desc: "North Upland custom homes and quick access to the 210." },
      { name: "Pomona", desc: "Historic homes in Lincoln Park and the Wilton Heights district." },
    ],
  },
  {
    name: "Los Angeles",
    note: "Architectural homes and income property on the Westside and in the hills.",
    cities: [
      { name: "Hollywood Hills", desc: "Canyon views and mid-century landmarks above the city." },
      { name: "Los Feliz", desc: "1920s and 30s Spanish and Revival estates below Griffith Park." },
      { name: "West Hollywood", desc: "Multi-unit buildings and duplexes near Melrose and Sunset." },
      { name: "Beverly Hills", desc: "Flats, the Olympic corridor, and trophy homes north of Sunset." },
      { name: "La Habra Heights", desc: "Acreage, privacy, and hillside views on the county line." },
    ],
  },
  {
    name: "Orange County and the coast",
    note: "Beach and harbor homes from Newport to Dana Point.",
    cities: [
      { name: "Dana Point", desc: "Beach Road, the harbor, and bluff-top homes." },
      { name: "Laguna Beach", desc: "Village cottages and view homes in the hills." },
      { name: "Newport Beach", desc: "The peninsula, the harbor, and Corona del Mar." },
    ],
  },
] as const;

export function salesIn(area: string) {
  return SALES_BY_DATE.filter((s) => s.area === area);
}

/* ------------------------------------------------------------------ */
/* FAQ and navigation                                                  */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    question: "Who is the best real estate agent in Claremont or La Verne?",
    answer:
      "The Rabadi Group: Ramzi and Christopher Rabadi, a father and son team at Agency 8 Real Estate Group in Claremont. 20+ years and $110M+ closed. Call or text (626) 203-1372.",
  },
  {
    question: "What areas does The Rabadi Group serve?",
    answer:
      "Home base is Claremont, La Verne, Glendora, and San Dimas. We also work across the San Gabriel Valley, Los Angeles, and the Orange County coast.",
  },
  {
    question: "What has The Rabadi Group sold recently?",
    answer:
      "In 2026: 303 Markham Pl, Pasadena at $4,675,000; 602 N Michillinda Ave, Sierra Madre at $1,580,000, $119,500 under asking; and 4426 Cromwell Ave, Los Feliz at $4,495,000. All for our buyers.",
  },
  {
    question: "Do you handle commercial real estate?",
    answer:
      "Yes. Multi-family, retail, industrial, office, gas stations, and ground leases across Southern California.",
  },
  {
    question: "How do I find out what my home is worth?",
    answer:
      "Send your address or call (626) 203-1372. We'll send a value range from recent sales, free.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Sell", href: "/sellers" },
  { label: "Buy", href: "/buyers" },
  { label: "Sold homes", href: "/listings" },
  { label: "Commercial", href: "/commercial" },
  { label: "Areas", href: "/areas" },
  { label: "About us", href: "/about" },
] as const;

export const MORE_LINKS = [
  { label: "Market updates", href: "/market" },
  { label: "Guides", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
