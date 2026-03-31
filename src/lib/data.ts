// Business data for The Rabadi Group

export const BUSINESS = {
  name: "The Rabadi Group",
  tagline: "Your SGV & Foothill Cities Real Estate Specialists",
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
  laverne: true,
  claremont: true,
  address: {
    street: "Claremont",
    state: "CA",
    zip: "91711",
    full: "Claremont, CA",
  },
} as const;

export const STATS = [
  { value: "$100M+", label: "In Closed Transactions" },
  { value: "35+", label: "Properties Sold" },
  { value: "20+", label: "Years Experience" },
  { value: "5.0★", label: "Zillow Rating" },
  { value: "$1.7M", label: "Average Sale Price" },
  { value: "4.2%", label: "Above Asking (Sellers)" },
] as const;

export const TEAM = [
  {
    name: "Ramzi Rabadi",
    title: "Principal / Broker Associate",
    dre: "CA DRE #01738777",
    experience: "20+ years",
    image: "https://therabadigroup.com/assets/christopher-headshot-ByytXibX.png",
    specialties: [
      "Luxury Residential",
      "Commercial",
      "Multi-Family",
      "Gas Stations",
      "Ground Leases",
      "Industrial",
    ],
    bio: "Twenty years in Southern California real estate — and still the hardest-working agent in the room. Ramzi Rabadi has closed over $100M in transactions across La Verne, Claremont, Beverly Hills, Hollywood Hills, Dana Point, and everywhere in between. He knows the Foothill Cities corridor better than anyone in the business. From a $7.4M Hollywood Hills estate to complex commercial ground leases, Ramzi has negotiated deals most agents don't even know exist. He doesn't sweet-talk. He closes.",
    stats: [
      { value: "$100M+", label: "Closed Volume" },
      { value: "20+", label: "Years Experience" },
      { value: "35+", label: "Transactions" },
    ],
  },
  {
    name: "Christopher Rabadi",
    title: "Agent / Buyer Specialist",
    dre: "CA DRE #02246356",
    experience: "Next generation",
    image: "https://therabadigroup.com/assets/ramzi-headshot-UsesxrYX.png",
    specialties: [
      "Buyer Representation",
      "San Gabriel Valley",
      "Foothill Cities",
      "Orange County Coast",
      "Digital Marketing",
      "Client Relations",
    ],
    bio: "Born and raised in the San Gabriel Valley. Christopher Rabadi works side by side with his father Ramzi — two agents, one deal, twice the firepower. He knows La Verne, Claremont, and the Foothill Cities on a street-by-street level and brings a tech-forward, client-first approach to every transaction. When you work with Christopher, you get the full team behind you.",
    stats: [
      { value: "SGV", label: "Home Market" },
      { value: "Father + Son", label: "Team Power" },
      { value: "20+", label: "Yrs Combined" },
    ],
  },
] as const;

export const LISTINGS = [
  {
    address: "1411 Rising Glen Rd",
    city: "Los Angeles, CA",
    price: "$7,400,000",
    status: "SOLD",
    date: "Jan 2023",
    role: "Buyer Representative",
    description:
      "Hollywood Hills. Historic butterfly-roofed Mid-Century masterpiece by William Krisel. Once home to Bobby Darin & Sandra Dee, featured in Architectural Digest.",
    image:
      "https://www.compass.com/m/243102dcc22db564159e038057b107dc4d1f4df0_img_0/origin.webp",
    neighborhood: "Hollywood Hills",
    featured: true,
  },
  {
    address: "35099 Beach Rd",
    city: "Dana Point, CA",
    price: "$6,300,000",
    status: "SOLD",
    date: "Sep 2021",
    role: "Buyer Representative",
    description:
      "Beachfront living on Dana Point's prestigious coastline. Direct sand access with unobstructed Pacific views.",
    image: "https://therabadigroup.com/assets/35099-beach-rd-BdCwmhO2.png",
    neighborhood: "Dana Point Oceanfront",
    featured: true,
  },
  {
    address: "5000 Live Oak Canyon Rd",
    city: "La Verne, CA",
    price: "$4,200,000",
    status: "SOLD",
    date: "Jun 2025",
    role: "Listing Agent",
    description:
      "Designed by Foster Rhodes Jackson, a disciple of Frank Lloyd Wright. Nearly 10 acres with bell tower and panoramic canyon views. 3 Bed, 4 Bath, 3,628 SF, 9.97 Acres.",
    image:
      "https://media.relahq.com/public/styles/gallery_grid/s3/property-images/prop-nid-179354336/011-0011_809.jpg",
    neighborhood: "La Verne Estates",
    featured: true,
  },
  {
    address: "9550 W Olympic Blvd",
    city: "Beverly Hills, CA",
    price: "$3,050,000",
    status: "SOLD",
    date: "Apr 2019",
    role: "Buyer Representative",
    description:
      "Prime address on the prestigious Olympic Boulevard corridor. Heart of the 90210.",
    image:
      "https://www.compass.com/m/3e5df21608cf45e1939694a7eabb7e1e797ce685_img_0/origin.jpg",
    neighborhood: "Beverly Hills",
    featured: false,
  },
  {
    address: "811 N Croft Ave",
    city: "Los Angeles, CA",
    price: "$2,650,000",
    status: "SOLD",
    date: "May 2023",
    role: "Buyer Representative",
    description:
      "West Hollywood. Charming 4-plex half a block from Melrose Place. Great curb appeal with huge private patios.",
    image:
      "https://dlajgvw9htjpb.cloudfront.net/cms/5aaa9488-9739-436e-a856-f098468e0a5f/23-254109/7108976295704662576.jpg",
    neighborhood: "West Hollywood",
    featured: false,
  },
  {
    address: "8417 Waring Ave",
    city: "Los Angeles, CA",
    price: "$2,110,000",
    status: "SOLD",
    date: "Sep 2024",
    role: "Buyer Representative",
    description:
      "West Hollywood. Classic 1939 multi-unit. 7 beds, 5 baths, 4,167 SF, 4-car garage.",
    image:
      "https://api.cotality.com/trestle/Media/Property/PHOTO-Jpeg/1073206880/1/MzM2Ny84NDU0LzIw/MjAvMTY3OTUvMTc2NzgzNDY0MQ/eI17gYq01uRln6HtYyl9fBSTbkDzYhLsY4eDwR_4774",
    neighborhood: "West Hollywood",
    featured: false,
  },
] as const;

export const AREAS = [
  {
    name: "Pasadena",
    description:
      "Historic architecture, legacy estates, and one of the strongest luxury markets in the region.",
    startingFrom: "From $1.9M",
    image: "https://therabadigroup.com/assets/pasadena-DoCvWyxE.jpg",
  },
  {
    name: "Beverly Hills",
    description:
      "Prestige, privacy, and trophy properties at the highest tier of Los Angeles real estate.",
    startingFrom: "From $7.4M",
    image: "https://therabadigroup.com/assets/beverly-hills-COH4ONqZ.jpg",
  },
  {
    name: "La Habra Heights",
    description:
      "Hillside estates, larger lots, and panoramic settings with a quieter luxury feel.",
    startingFrom: "From $2.1M",
    image: "https://therabadigroup.com/assets/la-habra-heights-KnGYZe6W.jpg",
  },
  {
    name: "Laguna Beach",
    description:
      "Iconic coastal living with design-forward homes and world-class ocean views.",
    startingFrom: "From $1.8M",
    image: "https://therabadigroup.com/assets/laguna-beach-BoRuC0pL.jpg",
  },
  {
    name: "Dana Point",
    description:
      "Harborfront luxury, dramatic cliffs, and a refined coastal lifestyle.",
    startingFrom: "From $6.3M",
    image: "https://therabadigroup.com/assets/dana-point-D5lAHv2w.jpg",
  },
  {
    name: "Hollywood Hills",
    description:
      "Architectural homes, skyline views, and standout addresses above the city.",
    startingFrom: "From $2.7M",
    image: "https://therabadigroup.com/assets/hollywood-hills-BUOdg5MZ.jpg",
  },
] as const;

export const SERVICES = [
  {
    title: "Luxury Residential",
    description:
      "Buying or selling a luxury home in Southern California? We negotiate hard, market aggressively, and deliver results.",
    icon: "🏡",
  },
  {
    title: "Seller Representation",
    description:
      "Our listings sell 4.2% above asking on average. We price with precision and market with authority.",
    icon: "📈",
  },
  {
    title: "Buyer Representation",
    description:
      "Off-market access, below-ask acquisitions, and a relentless advocate at every negotiating table.",
    icon: "🔑",
  },
  {
    title: "Commercial Real Estate",
    description:
      "Industrial, retail, mixed-use, gas stations, ground leases — we handle the full commercial spectrum.",
    icon: "🏢",
  },
  {
    title: "Investment Properties",
    description:
      "Multi-family, income-producing assets, and portfolio acquisitions across Los Angeles and beyond.",
    icon: "💼",
  },
  {
    title: "Free Home Valuation",
    description:
      "Know your home's true market value. Complimentary CMA based on real-time data and local expertise.",
    icon: "📊",
  },
] as const;

export const FAQS = [
  {
    question:
      "Who is the best luxury real estate agent in La Verne or Claremont CA?",
    answer:
      "The Rabadi Group, led by Ramzi Rabadi with 20+ years of experience and $100M+ in closed transactions, is the leading luxury real estate team in La Verne and Claremont, California.",
  },
  {
    question: "What areas does The Rabadi Group serve?",
    answer:
      "La Verne, Claremont, San Dimas, Glendora, Upland, Rancho Cucamonga (primary Foothill Cities markets), plus Los Angeles County (Beverly Hills, Pasadena, Hollywood Hills, West Hollywood), and Orange County (Dana Point, Laguna Beach).",
  },
  {
    question: "Does The Rabadi Group handle commercial real estate?",
    answer:
      "Yes. The portfolio includes $100M+ in transactions across luxury residential, commercial, industrial, retail, gas stations, ground leases, and investment properties across Los Angeles and San Bernardino counties.",
  },
  {
    question: "How do I get a home valuation?",
    answer:
      "Call or text us at (626) 203-1372. We provide complimentary home valuations based on real-time market data, recent comparable sales, and deep knowledge of local market conditions.",
  },
  {
    question: "What makes The Rabadi Group different from other agents?",
    answer:
      "We are a father-and-son team combining 20+ years of veteran experience with next-generation digital marketing strategy. Our listings sell 4.2% above asking on average. We handle both luxury residential and commercial — a depth of expertise few teams can match.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buyers" },
  { label: "Sell", href: "/sellers" },
  { label: "Commercial", href: "/commercial" },
  { label: "Properties", href: "/listings" },
  { label: "Areas", href: "/areas" },
  { label: "Guides", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const LOCAL_AREAS = [
  { name: "La Verne", state: "CA", type: "city", desc: "Our home market. La Verne's estate corridor along Baseline and the foothill properties represent some of the best value-to-lifestyle ratio in all of LA County." },
  { name: "Claremont", state: "CA", type: "city", desc: "The Village, the colleges, and some of the most architecturally significant homes in the Inland Valley. Claremont's luxury market is undervalued and moving fast." },
  { name: "San Dimas", state: "CA", type: "city", desc: "Larger lots, equestrian properties, and a strong community feel. San Dimas is a hidden gem for buyers who want space without sacrificing location." },
  { name: "Glendora", state: "CA", type: "city", desc: "Consistently strong appreciation, trophy hillside estates, and one of the safest and most desirable communities in the San Gabriel Valley." },
  { name: "Upland", state: "CA", type: "city", desc: "Growing luxury market, new development, and easy access to the 210 corridor. Upland's north-end custom homes are some of the best buys in the region." },
  { name: "Rancho Cucamonga", state: "CA", type: "city", desc: "Victoria Gardens corridor, excellent schools, and a rapidly appreciating luxury tier. One of the fastest-moving markets we work in." },
] as const;
