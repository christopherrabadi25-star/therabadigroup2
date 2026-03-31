import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import ScrollReveal from "@/components/ScrollReveal";

const playfair = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "The Rabadi Group | Southern California Luxury Real Estate",
    template: "%s | The Rabadi Group",
  },
  description:
    "The Rabadi Group — Ramzi and Christopher Rabadi, La Verne and Claremont real estate specialists serving the SGV, Foothill Cities, and all of Southern California. All price ranges. $100M+ closed, 5.0 Zillow rating, 20+ years. Call (626) 203-1372.",
  keywords: [
    "real estate agent La Verne CA",
    "realtor Claremont CA",
    "Ramzi Rabadi La Verne",
    "Christopher Rabadi realtor",
    "Rabadi Group real estate",
    "La Verne luxury homes",
    "Claremont CA homes for sale",
    "best realtor La Verne California",
    "Foothill Cities real estate agent",
    "luxury real estate Los Angeles",
    "luxury real estate agent Beverly Hills",
    "Rabadi Group",
    "Ramzi Rabadi",
    "Christopher Rabadi",
    "luxury homes Southern California",
    "real estate agent Pasadena",
    "luxury property agent Hollywood Hills",
    "Dana Point luxury real estate",
    "Laguna Beach homes for sale",
    "commercial real estate Los Angeles",
    "Agency 8 Real Estate",
    "top real estate agent Los Angeles",
    "luxury buyer agent Southern California",
    "San Gabriel Valley real estate",
  ],
  authors: [{ name: "The Rabadi Group", url: BUSINESS.url }],
  creator: "The Rabadi Group",
  publisher: "The Rabadi Group",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "The Rabadi Group | Southern California Luxury Real Estate",
    description:
      "Father-and-son luxury real estate team. $100M+ in closed transactions. La Verne, Claremont, Beverly Hills, Hollywood Hills, Dana Point. Call (626) 203-1372.",
    images: [
      {
        url: "https://therabadigroup.com/assets/team-hero-bg-Cpz6m23g.png",
        width: 1200,
        height: 630,
        alt: "The Rabadi Group — Southern California Luxury Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rabadi Group | Southern California Luxury Real Estate",
    description:
      "Father-and-son luxury real estate team. $100M+ in closed transactions. Call (626) 203-1372.",
    images: ["https://therabadigroup.com/assets/team-hero-bg-Cpz6m23g.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: BUSINESS.url,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "The Rabadi Group",
  url: BUSINESS.url,
  logo: "https://therabadigroup.com/assets/team-hero-bg-Cpz6m23g.png",
  image: "https://therabadigroup.com/assets/team-hero-bg-Cpz6m23g.png",
  telephone: "+16262031372",
  email: BUSINESS.email,
  description:
    "The Rabadi Group is a father-and-son luxury real estate team in La Verne and Claremont, California with $100M+ in closed transactions, 20+ years of experience, and a 5.0 Zillow rating. Serving La Verne, Claremont, San Dimas, Glendora, Beverly Hills, Hollywood Hills, Dana Point, Laguna Beach, and all of Southern California.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Verne",
    addressRegion: "CA",
    postalCode: "91750",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "34.0967",
    longitude: "-117.7198",
  },
  areaServed: [
    "La Verne",
    "Claremont",
    "San Dimas",
    "Glendora",
    "Beverly Hills",
    "Pasadena",
    "Hollywood Hills",
    "West Hollywood",
    "Dana Point",
    "Laguna Beach",
    "San Gabriel Valley",
    "Arcadia",
    "Upland",
    "La Habra Heights",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "35",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://instagram.com/therabadigroup",
    "https://www.zillow.com/profile/ramzirbd",
  ],
  member: [
    {
      "@type": "Person",
      name: "Ramzi Rabadi",
      jobTitle: "Principal / Broker Associate",
      telephone: "+16262031372",
      email: BUSINESS.email,
      image: "https://therabadigroup.com/assets/christopher-headshot-ByytXibX.png",
      description:
        "Ramzi Rabadi is a luxury real estate broker based in La Verne and Claremont, California with 20+ years of experience and $100M+ in closed transactions in Southern California.",
      knowsAbout: [
        "Luxury Residential Real Estate",
        "Commercial Real Estate",
        "Multi-Family Properties",
        "Ground Leases",
        "Industrial Real Estate",
        "Gas Station Properties",
      ],
    },
    {
      "@type": "Person",
      name: "Christopher Rabadi",
      jobTitle: "Agent / Buyer Specialist",
      telephone: "+16262031372",
      email: BUSINESS.email,
      image: "https://therabadigroup.com/assets/ramzi-headshot-UsesxrYX.png",
      description:
        "Christopher Rabadi works alongside his father Ramzi Rabadi as part of The Rabadi Group, serving buyers and sellers in La Verne, Claremont, the San Gabriel Valley, and all of Southern California.",
      knowsAbout: [
        "Buyer Representation",
        "San Gabriel Valley Real Estate",
        "La Verne Real Estate",
        "Claremont Real Estate",
        "Foothill Cities Real Estate",
        "Digital Marketing for Real Estate",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-[#EDE8DC] pb-16 md:pb-0">
        <Header />
        <ScrollReveal />
        <main className="flex-1 pt-[96px]">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
