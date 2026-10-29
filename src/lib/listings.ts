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

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
