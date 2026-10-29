// City pages and market updates for our core foothill cities.
// To refresh a market update: change `market` for each city (numbers, month, and source link).

export type CityPhoto = {
  src: string;
  alt: string;
  /** Photo credit. Unsplash photos are free for commercial use; credit is a courtesy. */
  credit?: string;
  creditUrl?: string;
};

export type CityMarket = {
  /** Month the figures describe, e.g. "August 2026" */
  month: string;
  medianPrice: number;
  /** Year-over-year change in median sale price, in percent */
  yoy: number;
  source: string;
  sourceUrl: string;
  /** Our read, one or two short sentences */
  take: string;
};

export type City = {
  slug: string;
  name: string;
  /** Sale.area values to pull sales from */
  areas: string[];
  tagline: string;
  photos: CityPhoto[];
  neighborhoods: { name: string; body: string }[];
  market: CityMarket;
  guide?: string;
  faqs: { question: string; answer: string }[];
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const CITIES: City[] = [
  {
    slug: "claremont",
    name: "Claremont",
    areas: ["Claremont"],
    tagline: "The Village, the Colleges, and the foothills. Our office is on Foothill Boulevard.",
    photos: [
      { src: "/images/claremont.jpg", alt: "Claremont Village storefronts" },
      {
        src: u("photo-1712158990640-fb28cdae29fa"),
        alt: "California poppies at the California Botanic Garden in Claremont",
        credit: "Richard Hedrick on Unsplash",
        creditUrl: "https://unsplash.com/photos/a-field-full-of-orange-flowers-with-trees-in-the-background-X-a4sxDVhbs",
      },
      {
        src: u("photo-1727106995145-9c67493806e5"),
        alt: "Palms at the California Botanic Garden in Claremont",
        credit: "Tara-mae Miller on Unsplash",
        creditUrl: "https://unsplash.com/photos/a-couple-of-palm-trees-sitting-next-to-each-other-u4Lbv844Y6M",
      },
    ],
    neighborhoods: [
      { name: "The Village", body: "Walk to restaurants, the Packing House, and the Colleges." },
      { name: "North Claremont", body: "Bigger lots, custom homes, and mountain views." },
      { name: "Near the Colleges", body: "Character homes on quiet, tree-lined blocks." },
      { name: "South Claremont", body: "The most accessible way into Claremont schools." },
    ],
    market: {
      month: "August 2026",
      medianPrice: 1024322,
      yoy: 2.4,
      source: "Redfin",
      sourceUrl: "https://www.redfin.com/city/3578/CA/Claremont/housing-market",
      take: "Prices are holding. Well-priced homes near the Village and the foothills still draw competition.",
    },
    guide: "/blog/claremont-ca-home-buyers-guide-2025",
    faqs: [
      {
        question: "Who is a good realtor in Claremont, CA?",
        answer:
          "The Rabadi Group: Ramzi and Christopher Rabadi, a father and son team at Agency 8 Real Estate Group, 940 W Foothill Blvd, Claremont. $110M+ closed. Call or text (626) 203-1372.",
      },
      {
        question: "What is my Claremont home worth?",
        answer: "Send us your address or call (626) 203-1372. We'll send a value range from the closest recent sales, free.",
      },
    ],
  },
  {
    slug: "la-verne",
    name: "La Verne",
    areas: ["La Verne"],
    tagline: "Bonita schools, canyon estates, and very little inventory.",
    photos: [
      {
        src: u("photo-1597372073352-2be01efd00f9"),
        alt: "Aerial view of La Verne at golden hour",
        credit: "Albert Hu on Unsplash",
        creditUrl: "https://unsplash.com/photos/aerial-view-of-city-during-daytime-1hQ7m1KfpBU",
      },
      { src: "/images/la-verne.jpg", alt: "A landmark church in La Verne" },
      {
        src: u("photo-1743271823953-53cfe2f4b1f0"),
        alt: "Sunset over the hills from Valencia Drive in La Verne",
        credit: "Silas Lundquist on Unsplash",
        creditUrl: "https://unsplash.com/photos/highway-view-with-mountains-and-a-car-4oj0MxtO26Y",
      },
    ],
    neighborhoods: [
      { name: "North of Baseline", body: "Larger foothill lots and the tightest inventory." },
      { name: "Live Oak and Webb Canyon", body: "Canyon estates with privacy and views." },
      { name: "Old Town", body: "Walkable blocks near the University of La Verne." },
      { name: "South La Verne", body: "Solid value with Bonita Unified schools." },
    ],
    market: {
      month: "August 2026",
      medianPrice: 936750,
      yoy: 4.1,
      source: "Redfin",
      sourceUrl: "https://www.redfin.com/city/10417/CA/La-Verne/housing-market",
      take: "Up year over year with few homes for sale. Priced right, La Verne homes still move.",
    },
    guide: "/blog/la-verne-real-estate-market-guide-2025",
    faqs: [
      {
        question: "Who is a good realtor in La Verne, CA?",
        answer:
          "The Rabadi Group: Ramzi and Christopher Rabadi, based next door in Claremont at Agency 8 Real Estate Group. $110M+ closed, including a $4.2M La Verne estate. Call (626) 203-1372.",
      },
      {
        question: "What is my La Verne home worth?",
        answer: "Send us your address or call (626) 203-1372. We'll send a value range from the closest recent sales, free.",
      },
    ],
  },
  {
    slug: "glendora",
    name: "Glendora",
    areas: ["Glendora"],
    tagline: "Hillside homes, strong schools, and the foothills out the back door.",
    photos: [
      {
        src: u("photo-1791523514192-684cd12da629"),
        alt: "Low sun over Glendora Mountain Road",
        credit: "Sam Patel on Unsplash",
        creditUrl: "https://unsplash.com/photos/low-sun-over-winding-asphalt-road-00azigAqVqA",
      },
      {
        src: u("photo-1791407385309-fc9ba11b107e"),
        alt: "Downtown Los Angeles seen from Glendora Mountain Road",
        credit: "Sam Patel on Unsplash",
        creditUrl: "https://unsplash.com/photos/los-angeles-skyline-from-mountain-ridge-E4Hf-7ZOCJY",
      },
      {
        src: u("photo-1498238514646-ed76e9633cf2"),
        alt: "The San Gabriel Mountains above Glendora",
        credit: "Duncan Shaffer on Unsplash",
        creditUrl: "https://unsplash.com/photos/green-mountains-under-white-sky-during-daytime-aN1UfTsJdH8",
      },
    ],
    neighborhoods: [
      { name: "The Village", body: "Downtown Glendora's walkable center." },
      { name: "North Glendora", body: "Hillside homes and views near the foothills." },
      { name: "Glendora Country Club", body: "Established homes around the course." },
      { name: "South Glendora", body: "Single-story homes and easy 210 access." },
    ],
    market: {
      month: "August 2026",
      medianPrice: 925000,
      yoy: -6.1,
      source: "Redfin",
      sourceUrl: "https://www.redfin.com/city/7650/CA/Glendora",
      take: "Down from a year ago. Buyers have room to negotiate, especially on homes that have been sitting.",
    },
    guide: "/blog/san-dimas-glendora-real-estate-guide-2025",
    faqs: [
      {
        question: "Who is a good realtor in Glendora, CA?",
        answer:
          "The Rabadi Group: Ramzi and Christopher Rabadi, a father and son team at Agency 8 Real Estate Group in nearby Claremont. $110M+ closed. Call (626) 203-1372.",
      },
      {
        question: "Is now a good time to buy in Glendora?",
        answer:
          "With the median down from last year, buyers have more leverage than they did. Call (626) 203-1372 and we'll walk you through what's selling and for how much.",
      },
    ],
  },
  {
    slug: "san-dimas",
    name: "San Dimas",
    areas: ["San Dimas"],
    tagline: "Bigger lots, horse properties, and a small-town feel.",
    photos: [
      {
        src: u("photo-1596760248654-252c1b212e3e"),
        alt: "Sunset on the dock at Puddingstone Reservoir in San Dimas",
        credit: "Albert Hu on Unsplash",
        creditUrl: "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-and-black-pants-standing-on-dock-during-daytime-ZeeMJSfu7yI",
      },
      { src: "/images/sgv.jpg", alt: "Aerial view of Puddingstone Reservoir and the foothills" },
      {
        src: u("photo-1595863235337-953e8a52000b"),
        alt: "Palm trees against a blue sky in San Dimas",
        credit: "Daniel Hooper on Unsplash",
        creditUrl: "https://unsplash.com/photos/green-palm-trees-on-snow-covered-ground-under-blue-sky-during-daytime-ICgXRZRPwiw",
      },
    ],
    neighborhoods: [
      { name: "Downtown", body: "Western-style storefronts and a walkable main street." },
      { name: "Via Verde", body: "Hillside homes near the country club." },
      { name: "North San Dimas", body: "Larger lots and horse-zoned properties." },
      { name: "Near Puddingstone", body: "Lake, trails, and Bonelli Park nearby." },
    ],
    market: {
      month: "August 2026",
      medianPrice: 890000,
      yoy: -9.1,
      source: "Redfin",
      sourceUrl: "https://www.redfin.com/city/16923/CA/San-Dimas",
      take: "The biggest drop of our four cities. A good window for buyers who want space.",
    },
    guide: "/blog/san-dimas-glendora-real-estate-guide-2025",
    faqs: [
      {
        question: "Who is a good realtor in San Dimas, CA?",
        answer:
          "The Rabadi Group: Ramzi and Christopher Rabadi, a father and son team at Agency 8 Real Estate Group in nearby Claremont. $110M+ closed. Call (626) 203-1372.",
      },
      {
        question: "Is now a good time to buy in San Dimas?",
        answer:
          "With the median down from last year, buyers have more leverage than they did. Call (626) 203-1372 and we'll walk you through what's selling and for how much.",
      },
    ],
  },
];

export function getCity(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

export function pct(n: number) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
}
