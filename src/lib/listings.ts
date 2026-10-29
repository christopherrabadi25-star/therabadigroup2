/**
 * Active and coming-soon listings. Kept separate from SALES so they never
 * count toward closed volume, sales history, or "notable sales".
 */

export interface Unit {
  name: string;
  layout: string;
  rent: number; // monthly
}

export interface Expense {
  label: string;
  amount: number; // annual
  note: string;
}

export interface Comp {
  address: string;
  city: string;
  price: number;
  closed: string; // ISO date
  sqft: number;
  yearBuilt: number;
  lotSqft: number;
  gsi?: number; // gross scheduled income, annual, when reported
  note?: string;
}

export interface Listing {
  slug: string;
  status: "Coming soon" | "Active";
  address: string;
  city: string;
  zip: string;
  price: number;
  type: string;
  yearBuilt: number;
  buildingSqft: number;
  lotSqft: number;
  zoning: string;
  bedsTotal: number;
  bathsTotal: number;
  parking: string;
  units: Unit[];
  expenses: Expense[];
  highlights: string[];
  disclosures: string[];
  comps: Comp[];
  compsSource: string;
  /** Recorded sales and rents, for the appreciation and rent charts. */
  valueHistory: { date: string; value: number; label: string }[];
  rentHistory: { date: string; monthly: number; label: string }[];
  /** Regional CPI behind the current AB 1482 cap (LA area, increases on or after Aug 1, 2026). */
  cpi: number;
}

export const GLENDORA_DUPLEX: Listing = {
  slug: "745-w-foothill-blvd-glendora",
  status: "Coming soon",
  address: "745 W Foothill Blvd",
  city: "Glendora",
  zip: "91741",
  price: 1100000,
  type: "Duplex",
  yearBuilt: 1956,
  buildingSqft: 1806,
  lotSqft: 6407,
  zoning: "GDR2",
  bedsTotal: 4,
  bathsTotal: 2,
  parking: "6 spaces: 2-car garage plus 4 driveway",
  units: [
    { name: "Back unit", layout: "3 bed, 1 bath, den, covered patio, 2-car garage", rent: 3000 },
    { name: "Front unit", layout: "1 bed, 1 bath, remodeled, hardwood floors", rent: 1900 },
  ],
  // Pro forma estimates for a buyer at list price. Buyer to verify.
  expenses: [
    { label: "Property tax", amount: 12980, note: "Est. 1.18% of price, the parcel's current tax rate" },
    { label: "Insurance", amount: 2400, note: "Estimate" },
    { label: "Repairs and reserves", amount: 2940, note: "5% of gross rent" },
    { label: "Vacancy", amount: 1764, note: "3% of gross rent" },
    { label: "Water, sewer and trash", amount: 1400, note: "Owner paid. Estimate" },
    { label: "Gardener", amount: 800, note: "Estimate" },
  ],
  highlights: [
    "Both units leased",
    "Half a block to Citrus College and APU",
    "Separate gas and electric meters",
    "Tenants pay gas and electric",
    "Shared laundry room, washer and dryer included",
    "New water heaters in both units (2018)",
    "Glendora Unified schools",
  ],
  disclosures: [
    "The back unit's third bedroom was split and built to code but without permits.",
    "Building size is 1,806 sq ft per MLS; county records show 1,956 sq ft.",
    "One water meter, shared by both units.",
  ],
  comps: [
    { address: "124 N Vista Bonita Ave", city: "Glendora", price: 1030000, closed: "2026-09-15", sqft: 1815, yearBuilt: 1959, lotSqft: 6400, gsi: 55200, note: "Closest comp. Two remodeled 2-bed units" },
    { address: "1005 N Alameda", city: "Azusa", price: 799000, closed: "2026-10-09", sqft: 1464, yearBuilt: 1928, lotSqft: 7077 },
    { address: "1012 N Vernon Ave", city: "Azusa", price: 900000, closed: "2026-09-24", sqft: 1976, yearBuilt: 1989, lotSqft: 6577, gsi: 47424 },
    { address: "1191 E Laxford", city: "Azusa", price: 938000, closed: "2026-05-13", sqft: 1938, yearBuilt: 2025, lotSqft: 6695, note: "New construction" },
    { address: "302 S Aspan", city: "Azusa", price: 925000, closed: "2026-05-01", sqft: 1831, yearBuilt: 1945, lotSqft: 12695, gsi: 61930 },
    { address: "418 N Dalton Ave", city: "Azusa", price: 1300000, closed: "2025-08-11", sqft: 3354, yearBuilt: 2019, lotSqft: 7427, gsi: 71400, note: "Built 2019" },
    { address: "605 W 1st St", city: "Azusa", price: 950000, closed: "2025-06-18", sqft: 2119, yearBuilt: 1951, lotSqft: 13455, gsi: 40800 },
  ],
  compsSource: "CRMLS closed duplex sales in Glendora and Azusa, May 2025 to October 2026. GRM shown where gross income was reported.",
  valueHistory: [
    { date: "2013-05-13", value: 465000, label: "Sold May 2013" },
    { date: "2018-08-16", value: 720000, label: "Sold Aug 2018" },
  ],
  rentHistory: [{ date: "2018-08-16", monthly: 3320, label: "2018 rents, $3,320/mo (MLS)" }],
  cpi: 3.7,
};

export const LISTINGS: Listing[] = [GLENDORA_DUPLEX];

export function listingNumbers(l: Listing) {
  const monthly = l.units.reduce((s, u) => s + u.rent, 0);
  const gross = monthly * 12;
  const expenses = l.expenses.reduce((s, e) => s + e.amount, 0);
  const noi = gross - expenses;
  return {
    monthly,
    gross,
    expenses,
    noi,
    capRate: (noi / l.price) * 100,
    grossYield: (gross / l.price) * 100,
    grm: l.price / gross,
    perUnit: l.price / l.units.length,
    perSqft: l.price / l.buildingSqft,
  };
}

/** Compound annual growth between two dated values. */
export function cagr(from: number, to: number, fromDate: string, toDate: string) {
  const yrs = (new Date(toDate).getTime() - new Date(fromDate).getTime()) / (365.25 * 864e5);
  return (Math.pow(to / from, 1 / yrs) - 1) * 100;
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
