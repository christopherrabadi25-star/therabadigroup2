import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BUSINESS, TEAM } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";

const newsreader = localFont({
  src: "../fonts/newsreader-latin-opsz-normal.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  display: "swap",
});

const schibsted = localFont({
  src: "../fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1d3a2b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "The Rabadi Group | Southern California Luxury Real Estate",
    template: "%s | The Rabadi Group",
  },
  description:
    "Ramzi and Christopher Rabadi, a father and son real estate team in Claremont serving the San Gabriel Valley, Los Angeles, and Orange County. $100M+ closed, 20+ years, 5.0 on Zillow. Call (626) 203-1372.",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/logo-512.png",
  },
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
        url: "/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Ramzi and Christopher Rabadi of The Rabadi Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rabadi Group | Southern California Luxury Real Estate",
    description:
      "Father-and-son luxury real estate team. $100M+ in closed transactions. Call (626) 203-1372.",
    images: ["/images/hero-bg.png"],
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
  alternates: {
    canonical: BUSINESS.url,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "The Rabadi Group",
  url: BUSINESS.url,
  logo: `${BUSINESS.url}/images/logo-512.png`,
  image: `${BUSINESS.url}/images/hero-bg.png`,
  telephone: "+16262031372",
  email: BUSINESS.email,
  description:
    "The Rabadi Group is a father-and-son real estate team in Claremont, California with $100M+ in closed transactions, 20+ years of experience, and a 5.0 Zillow rating. Serving La Verne, Claremont, San Dimas, Glendora, Beverly Hills, Hollywood Hills, Dana Point, Laguna Beach, and all of Southern California.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: "CA",
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  parentOrganization: { "@type": "RealEstateAgent", name: BUSINESS.brokerage },
  areaServed: [
    "Claremont",
    "La Verne",
    "Pasadena",
    "Sierra Madre",
    "Monrovia",
    "Glendora",
    "San Dimas",
    "Upland",
    "Los Feliz",
    "Hollywood Hills",
    "West Hollywood",
    "Beverly Hills",
    "Dana Point",
    "Laguna Beach",
    "San Gabriel Valley",
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
      jobTitle: TEAM[0].title,
      telephone: "+16262031372",
      email: BUSINESS.email,
      image: `${BUSINESS.url}/images/ramzi.png`,
      description:
        "Ramzi Rabadi is a real estate agent based in Claremont, California with 20+ years of experience and $100M+ in closed transactions in Southern California.",
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
      jobTitle: TEAM[1].title,
      telephone: "+16262031372",
      email: BUSINESS.email,
      image: `${BUSINESS.url}/images/christopher.png`,
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
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
