import { CitySlug, EventTypeSlug, Vendor, VendorPackage } from "@/lib/types";

const PORTFOLIO_SETS: Record<string, string[]> = {
  decor: [
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
    "https://images.unsplash.com/photo-1644135129271-e80c8c673511?w=1200&q=80",
    "https://images.unsplash.com/photo-1684243920725-956d93ff391a?w=1200&q=80",
    "https://images.unsplash.com/photo-1724847764267-12775ec49657?w=1200&q=80",
  ],
  photo: [
    "https://images.unsplash.com/photo-1756143058493-2d14887e41e6?w=1200&q=80",
    "https://images.unsplash.com/photo-1549981832-2ba2ee913334?w=1200&q=80",
    "https://images.unsplash.com/photo-1611550287705-7ff8b459c8eb?w=1200&q=80",
    "https://images.unsplash.com/photo-1629756048377-09540f52caa1?w=1200&q=80",
  ],
  food: [
    "https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=1200&q=80",
    "https://images.unsplash.com/photo-1662982696492-057328dce48b?w=1200&q=80",
    "https://images.unsplash.com/photo-1633424414664-c24a6d28086b?w=1200&q=80",
    "https://images.unsplash.com/photo-1623062553275-39028026d7be?w=1200&q=80",
  ],
  entertainment: [
    "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1200&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
    "https://images.unsplash.com/photo-1541126274323-dbac58d14741?w=1200&q=80",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1610047614301-13c63f00c032?w=1200&q=80",
    "https://images.unsplash.com/photo-1684868268327-7e5590bcfbd6?w=1200&q=80",
    "https://images.unsplash.com/photo-1631549423034-ceb712f24ab2?w=1200&q=80",
    "https://images.unsplash.com/photo-1717835943315-b818e90cb2a1?w=1200&q=80",
  ],
  design: [
    "https://images.unsplash.com/photo-1548838906-c58e48fdb10c?w=1200&q=80",
    "https://images.unsplash.com/photo-1764731080480-58b18e519bd9?w=1200&q=80",
    "https://images.unsplash.com/photo-1758825178518-ca48833a6c57?w=1200&q=80",
    "https://images.unsplash.com/photo-1630300727355-27b9216fcf30?w=1200&q=80",
  ],
  equipment: [
    "https://images.unsplash.com/photo-1561314105-e6ac04c2984a?w=1200&q=80",
    "https://images.unsplash.com/photo-1599739291060-4578e77dac5d?w=1200&q=80",
    "https://images.unsplash.com/photo-1621873493371-9aea49f66b9b?w=1200&q=80",
    "https://images.unsplash.com/photo-1564064927589-19a68c199e42?w=1200&q=80",
  ],
  planning: [
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80",
    "https://images.unsplash.com/photo-1756143058493-2d14887e41e6?w=1200&q=80",
    "https://images.unsplash.com/photo-1548838906-c58e48fdb10c?w=1200&q=80",
    "https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=1200&q=80",
  ],
  printing: [
    "https://images.unsplash.com/photo-1516409590654-e8d51fc2d25c?w=1200&q=80",
    "https://images.unsplash.com/photo-1422036306541-00138cae4dbc?w=1200&q=80",
    "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=1200&q=80",
    "https://images.unsplash.com/photo-1548838906-c58e48fdb10c?w=1200&q=80",
  ],
};

const WEDDING_EVENTS: EventTypeSlug[] = ["weddings", "engagements"];
const CELEBRATION_EVENTS: EventTypeSlug[] = [
  "birthdays",
  "baby-showers",
  "family-functions",
  "private-parties",
];
const CORPORATE_EVENTS: EventTypeSlug[] = [
  "corporate-meetings",
  "conferences",
  "seminars",
  "workshops",
  "product-launches",
  "award-ceremonies",
  "annual-celebrations",
  "team-events",
  "business-events",
  "office-parties",
];
const COLLEGE_EVENTS: EventTypeSlug[] = [];

function packages(base: number, unit: string): VendorPackage[] {
  return [
    {
      name: "Essential",
      price: base,
      features: [`Core ${unit} package`, "Up to 4 hours", "1 coordinator on-site", "Standard add-ons available"],
    },
    {
      name: "Premium",
      price: Math.round(base * 1.8),
      features: [
        `Extended ${unit} package`,
        "Up to 8 hours",
        "Dedicated team on-site",
        "Priority scheduling",
        "Complimentary consultation",
      ],
    },
    {
      name: "Luxe",
      price: Math.round(base * 3.2),
      features: [
        `Full-day ${unit} package`,
        "Unlimited revisions",
        "Senior specialist assigned",
        "Premium materials & add-ons",
        "Post-event support",
      ],
    },
  ];
}

interface VendorSeed {
  businessName: string;
  ownerName: string;
  categorySlug: string;
  citySlug: CitySlug;
  area: string;
  tagline: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  premium?: boolean;
  portfolioSet: keyof typeof PORTFOLIO_SETS;
  services: string[];
  eventTypes: EventTypeSlug[];
  yearsInBusiness: number;
  responseTime: string;
  packageUnit: string;
}

const seeds: VendorSeed[] = [
  { businessName: "Kalyana Decor Studio", ownerName: "Rajesh Kumar", categorySlug: "decorators", citySlug: "chennai", area: "T. Nagar", tagline: "Traditional and contemporary wedding decor", startingPrice: 45000, rating: 4.8, reviewCount: 189, verified: true, premium: true, portfolioSet: "decor", services: ["Stage Decor", "Mandap Decor", "Entrance Decor", "Floral Arrangements"], eventTypes: WEDDING_EVENTS, yearsInBusiness: 12, responseTime: "Under 2 hours", packageUnit: "decor" },
  { businessName: "Petal & Pillar Florists", ownerName: "Anjali Menon", categorySlug: "floral-decorators", citySlug: "kochi", area: "Fort Kochi", tagline: "Fresh floral design for every celebration", startingPrice: 20000, rating: 4.7, reviewCount: 96, verified: true, portfolioSet: "decor", services: ["Floral Arches", "Table Centrepieces", "Garlands", "Car Decoration"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 7, responseTime: "Under 4 hours", packageUnit: "floral setup", },
  { businessName: "Chennai Frames Photography", ownerName: "Vikram Iyer", categorySlug: "photographers", citySlug: "chennai", area: "Adyar", tagline: "Candid storytelling for weddings and events", startingPrice: 35000, rating: 4.9, reviewCount: 256, verified: true, premium: true, portfolioSet: "photo", services: ["Candid Photography", "Traditional Photography", "Pre-wedding Shoots", "Albums"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 9, responseTime: "Under 1 hour", packageUnit: "photography" },
  { businessName: "Bengaluru Cinematics", ownerName: "Arjun Rao", categorySlug: "videographers", citySlug: "bengaluru", area: "Koramangala", tagline: "Cinematic wedding and event films", startingPrice: 40000, rating: 4.7, reviewCount: 143, verified: true, portfolioSet: "photo", services: ["Cinematic Films", "Drone Coverage", "Same-Day Edits", "Highlight Reels"], eventTypes: [...WEDDING_EVENTS, "product-launches"], yearsInBusiness: 6, responseTime: "Under 3 hours", packageUnit: "videography" },
  { businessName: "SkyView Aerials", ownerName: "Karan Mehta", categorySlug: "drone-photography", citySlug: "mumbai", area: "Andheri", tagline: "Licensed aerial coverage for large events", startingPrice: 15000, rating: 4.6, reviewCount: 58, verified: true, portfolioSet: "photo", services: ["Aerial Photography", "Aerial Video", "Live Event Coverage"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS], yearsInBusiness: 4, responseTime: "Under 4 hours", packageUnit: "drone coverage" },
  { businessName: "Spice Route Caterers", ownerName: "Meena Pillai", categorySlug: "caterers", citySlug: "chennai", area: "Mylapore", tagline: "Multi-cuisine catering for 50 to 2000 guests", startingPrice: 500, rating: 4.8, reviewCount: 221, verified: true, premium: true, portfolioSet: "food", services: ["South Indian", "North Indian", "Live Counters", "Buffet Service"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS, ...CORPORATE_EVENTS], yearsInBusiness: 15, responseTime: "Under 2 hours", packageUnit: "per-plate catering" },
  { businessName: "Royal Feast Caterers", ownerName: "Suresh Nair", categorySlug: "caterers", citySlug: "hyderabad", area: "Jubilee Hills", tagline: "Authentic Hyderabadi and multi-cuisine catering", startingPrice: 550, rating: 4.7, reviewCount: 178, verified: true, portfolioSet: "food", services: ["Hyderabadi Biryani Counters", "North Indian", "Chinese", "Desserts"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 11, responseTime: "Under 3 hours", packageUnit: "per-plate catering" },
  { businessName: "Sweet Crumbs Bakery", ownerName: "Divya Shah", categorySlug: "bakers", citySlug: "mumbai", area: "Bandra", tagline: "Custom cakes and dessert tables", startingPrice: 2500, rating: 4.9, reviewCount: 312, verified: true, premium: true, portfolioSet: "food", services: ["Custom Cakes", "Dessert Tables", "Cupcakes", "Cake Tasting"], eventTypes: [...CELEBRATION_EVENTS, ...WEDDING_EVENTS], yearsInBusiness: 8, responseTime: "Under 2 hours", packageUnit: "cake order" },
  { businessName: "Chaat Junction Live Counters", ownerName: "Ravi Verma", categorySlug: "specialty-food-vendors", citySlug: "delhi", area: "Connaught Place", tagline: "Street-food style live counters", startingPrice: 300, rating: 4.5, reviewCount: 87, verified: false, portfolioSet: "food", services: ["Chaat Counters", "Golgappa Stations", "Live Dosa Counter"], eventTypes: [...CELEBRATION_EVENTS, ...WEDDING_EVENTS], yearsInBusiness: 5, responseTime: "Under 5 hours", packageUnit: "live counter" },
  { businessName: "Groove Nation DJs", ownerName: "DJ Rohan", categorySlug: "djs", citySlug: "bengaluru", area: "MG Road", tagline: "High-energy DJ sets for every celebration", startingPrice: 18000, rating: 4.7, reviewCount: 164, verified: true, portfolioSet: "entertainment", services: ["Wedding DJ", "Birthday DJ", "Corporate DJ", "Sound & Lighting"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS, "office-parties"], yearsInBusiness: 6, responseTime: "Under 3 hours", packageUnit: "DJ set" },
  { businessName: "Voice of Chennai — Singers", ownerName: "Priya Raman", categorySlug: "singers", citySlug: "chennai", area: "Nungambakkam", tagline: "Playback-style vocalists for every occasion", startingPrice: 25000, rating: 4.7, reviewCount: 54, verified: true, portfolioSet: "entertainment", services: ["Solo Vocals", "Duet Performances", "Classical Sets"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 9, responseTime: "Under 4 hours", packageUnit: "singing set" },
  { businessName: "Anchor Ananya Hosts", ownerName: "Ananya Krishnan", categorySlug: "anchors-hosts", citySlug: "hyderabad", area: "Madhapur", tagline: "Bilingual event hosting for weddings and corporates", startingPrice: 15000, rating: 4.8, reviewCount: 112, verified: true, portfolioSet: "entertainment", services: ["Wedding Hosting", "Corporate Emceeing", "College Fest Hosting"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 7, responseTime: "Under 2 hours", packageUnit: "hosting" },
  { businessName: "Nritya Dance Collective", ownerName: "Shalini Pillai", categorySlug: "dance-groups", citySlug: "pune", area: "Kothrud", tagline: "Choreographed performances for sangeet and fests", startingPrice: 22000, rating: 4.7, reviewCount: 49, verified: true, portfolioSet: "entertainment", services: ["Sangeet Choreography", "Classical Performances", "Fusion Dance"], eventTypes: [...WEDDING_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 6, responseTime: "Under 4 hours", packageUnit: "dance performance" },
  { businessName: "Glow Bridal Studio", ownerName: "Neha Kapoor", categorySlug: "makeup-artists", citySlug: "delhi", area: "Greater Kailash", tagline: "HD bridal and party makeup", startingPrice: 15000, rating: 4.9, reviewCount: 267, verified: true, premium: true, portfolioSet: "beauty", services: ["Bridal Makeup", "Party Makeup", "Airbrush Makeup", "Trial Sessions"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 8, responseTime: "Under 2 hours", packageUnit: "makeup session" },
  { businessName: "Tresses Hair Studio", ownerName: "Pooja Nambiar", categorySlug: "hair-stylists", citySlug: "kochi", area: "MG Road", tagline: "Bridal hairstyling and party looks", startingPrice: 8000, rating: 4.6, reviewCount: 88, verified: true, portfolioSet: "beauty", services: ["Bridal Hairstyling", "Party Hairstyling", "Hair Trials"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 6, responseTime: "Under 3 hours", packageUnit: "hairstyling" },
  { businessName: "Henna Heritage — Mehendi", ownerName: "Fatima Sheikh", categorySlug: "mehendi-artists", citySlug: "hyderabad", area: "Tolichowki", tagline: "Bridal and Arabic mehendi design", startingPrice: 10000, rating: 4.8, reviewCount: 154, verified: true, portfolioSet: "beauty", services: ["Bridal Mehendi", "Arabic Mehendi", "Guest Mehendi Counters"], eventTypes: [...WEDDING_EVENTS, "baby-showers"], yearsInBusiness: 10, responseTime: "Under 2 hours", packageUnit: "mehendi session" },
  { businessName: "Wedstory Planners", ownerName: "Aditi Sharma", categorySlug: "wedding-planners", citySlug: "mumbai", area: "Lower Parel", tagline: "Full-service wedding planning across India", startingPrice: 150000, rating: 4.9, reviewCount: 198, verified: true, premium: true, portfolioSet: "planning", services: ["End-to-end Planning", "Vendor Management", "Budget Planning", "Day-of Coordination"], eventTypes: WEDDING_EVENTS, yearsInBusiness: 11, responseTime: "Under 2 hours", packageUnit: "wedding planning" },
  { businessName: "Momentum Event Planners", ownerName: "Rahul Nair", categorySlug: "event-planners", citySlug: "bengaluru", area: "HSR Layout", tagline: "Corporate and private event planning specialists", startingPrice: 60000, rating: 4.7, reviewCount: 121, verified: true, portfolioSet: "planning", services: ["Corporate Events", "Birthday Planning", "Vendor Coordination", "On-site Management"], eventTypes: [...CORPORATE_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 7, responseTime: "Under 3 hours", packageUnit: "event planning" },
  { businessName: "Stagecraft Decor & Backdrops", ownerName: "Manoj Pillai", categorySlug: "stage-decorators", citySlug: "chennai", area: "Velachery", tagline: "Elaborate stage and backdrop design", startingPrice: 30000, rating: 4.6, reviewCount: 76, verified: true, portfolioSet: "decor", services: ["Stage Design", "LED Backdrops", "Theme Decor"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 8, responseTime: "Under 3 hours", packageUnit: "stage decor" },
  { businessName: "Frame & Focus Backdrops", ownerName: "Deepika Rao", categorySlug: "backdrop-designers", citySlug: "pune", area: "Baner", tagline: "Custom photo booth backdrops", startingPrice: 12000, rating: 4.5, reviewCount: 42, verified: false, portfolioSet: "decor", services: ["Photo Booth Backdrops", "Balloon Backdrops", "Floral Backdrops"], eventTypes: CELEBRATION_EVENTS, yearsInBusiness: 3, responseTime: "Under 6 hours", packageUnit: "backdrop setup" },
  { businessName: "Inkwell Invitation Studio", ownerName: "Sanjana Iyer", categorySlug: "invitation-designers", citySlug: "chennai", area: "Alwarpet", tagline: "Custom digital and print wedding invitations", startingPrice: 5000, rating: 4.8, reviewCount: 133, verified: true, portfolioSet: "design", services: ["Digital Invites", "Print Invites", "Save-the-Dates", "RSVP Websites"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 6, responseTime: "Under 2 hours", packageUnit: "invitation design" },
  { businessName: "Deckhouse Presentation Design", ownerName: "Varun Malhotra", categorySlug: "presentation-designers", citySlug: "bengaluru", area: "Whitefield", tagline: "Corporate pitch decks and presentation design", startingPrice: 8000, rating: 4.7, reviewCount: 59, verified: true, portfolioSet: "design", services: ["Pitch Decks", "Conference Slides", "Annual Report Design"], eventTypes: CORPORATE_EVENTS, yearsInBusiness: 5, responseTime: "Under 4 hours", packageUnit: "presentation design" },
  { businessName: "Banner Buddies Design Co.", ownerName: "Kiran Joshi", categorySlug: "banner-designers", citySlug: "hyderabad", area: "Kukatpally", tagline: "Eye-catching banners for every event", startingPrice: 3000, rating: 4.4, reviewCount: 38, verified: false, portfolioSet: "design", services: ["Event Banners", "Standee Design", "Hoarding Design"], eventTypes: [...CORPORATE_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 4, responseTime: "Under 5 hours", packageUnit: "banner design" },
  { businessName: "Pixel Fest Creatives", ownerName: "Ritika Verma", categorySlug: "digital-creative-designers", citySlug: "delhi", area: "Saket", tagline: "Digital creatives for event promotion", startingPrice: 6000, rating: 4.6, reviewCount: 47, verified: true, portfolioSet: "design", services: ["Social Media Creatives", "Event Teasers", "Digital Posters"], eventTypes: [...CORPORATE_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 4, responseTime: "Under 3 hours", packageUnit: "creative package" },
  { businessName: "SoundWave Rentals", ownerName: "Vishal Gupta", categorySlug: "sound-systems", citySlug: "mumbai", area: "Malad", tagline: "Professional audio rental for events of any size", startingPrice: 15000, rating: 4.6, reviewCount: 92, verified: true, portfolioSet: "equipment", services: ["PA Systems", "Wireless Mics", "Line Arrays"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 9, responseTime: "Under 3 hours", packageUnit: "sound rental" },
  { businessName: "Luminous Lighting Co.", ownerName: "Arvind Kumar", categorySlug: "lighting", citySlug: "chennai", area: "Ambattur", tagline: "Stage and ambient lighting design", startingPrice: 20000, rating: 4.7, reviewCount: 68, verified: true, portfolioSet: "equipment", services: ["Stage Lighting", "Uplighting", "LED Wash Lights"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS], yearsInBusiness: 7, responseTime: "Under 4 hours", packageUnit: "lighting rental" },
  { businessName: "ScreenPro LED & Projection", ownerName: "Harish Menon", categorySlug: "led-screens", citySlug: "bengaluru", area: "Electronic City", tagline: "Large format LED screens and projection", startingPrice: 25000, rating: 4.5, reviewCount: 44, verified: true, portfolioSet: "equipment", services: ["LED Wall Rental", "Projector Setup", "Live Streaming Support"], eventTypes: [...CORPORATE_EVENTS, "weddings"], yearsInBusiness: 5, responseTime: "Under 4 hours", packageUnit: "screen rental" },
  { businessName: "EventFurnish Rentals", ownerName: "Nitin Desai", categorySlug: "furniture-rentals", citySlug: "pune", area: "Viman Nagar", tagline: "Premium lounge furniture and seating rental", startingPrice: 10000, rating: 4.4, reviewCount: 36, verified: false, portfolioSet: "equipment", services: ["Lounge Furniture", "Chiavari Chairs", "Cocktail Tables"], eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS], yearsInBusiness: 4, responseTime: "Under 5 hours", packageUnit: "furniture rental" },
  { businessName: "PrintHouse Invitations & Cards", ownerName: "Alok Saxena", categorySlug: "invitation-printing", citySlug: "delhi", area: "Karol Bagh", tagline: "Premium invitation and card printing", startingPrice: 2000, rating: 4.6, reviewCount: 81, verified: true, portfolioSet: "printing", services: ["Invitation Printing", "Envelope Printing", "Foil Printing"], eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS], yearsInBusiness: 12, responseTime: "Under 4 hours", packageUnit: "print order" },
  { businessName: "QuickPrint Banners & Standees", ownerName: "Farhan Ali", categorySlug: "standee-printing", citySlug: "hyderabad", area: "Ameerpet", tagline: "Fast-turnaround banner and standee printing", startingPrice: 1500, rating: 4.3, reviewCount: 52, verified: false, portfolioSet: "printing", services: ["Standee Printing", "Banner Printing", "Vinyl Printing"], eventTypes: [...CORPORATE_EVENTS, ...COLLEGE_EVENTS], yearsInBusiness: 6, responseTime: "Under 6 hours", packageUnit: "print order" },
  { businessName: "Campus Certificates Co.", ownerName: "Geeta Rao", categorySlug: "certificate-printing", citySlug: "coimbatore", area: "Peelamedu", tagline: "Certificate printing for college and corporate events", startingPrice: 1000, rating: 4.5, reviewCount: 29, verified: true, portfolioSet: "printing", services: ["Certificate Printing", "Custom Design", "Bulk Orders"], eventTypes: [...COLLEGE_EVENTS, "award-ceremonies"], yearsInBusiness: 5, responseTime: "Under 5 hours", packageUnit: "certificate order" },
];

import { newMappedVendors } from "./new-vendors-data";

const categoriesToReplace = new Set([
  "wedding-planners",
  "event-planners",
  "decorators",
  "caterers",
  "bakers",
  "specialty-food-vendors",
  "photographers",
  "makeup-artists",
  "mehendi-artists",
  "djs",
  "bridal-wear",
  "groom-wear",
  "invitation-designers",
  "banner-designers",
  "gifts",
]);

const seedsMappedVendors: Vendor[] = seeds
  .filter((seed) => !categoriesToReplace.has(seed.categorySlug))
  .map((seed, i) => ({
    id: `vendor-${i + 1}`,
    businessName: seed.businessName,
    ownerName: seed.ownerName,
    categorySlug: seed.categorySlug,
    citySlug: seed.citySlug,
    address: `${seed.area}, ${seed.citySlug[0].toUpperCase()}${seed.citySlug.slice(1)}`,
    tagline: seed.tagline,
    description: `${seed.businessName} is a ${seed.verified ? "verified " : ""}${seed.categorySlug.replace(/-/g, " ")} based in ${seed.area}, ${seed.citySlug}, with ${seed.yearsInBusiness} years of experience delivering ${seed.services.join(", ").toLowerCase()} for events across the city.`,
    startingPrice: seed.startingPrice,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    verified: seed.verified,
    premium: seed.premium,
    coverImage: PORTFOLIO_SETS[seed.portfolioSet][0],
    logoImage: PORTFOLIO_SETS[seed.portfolioSet][1],
    portfolio: PORTFOLIO_SETS[seed.portfolioSet],
    services: seed.services,
    packages: packages(seed.startingPrice, seed.packageUnit),
    eventTypes: seed.eventTypes,
    yearsInBusiness: seed.yearsInBusiness,
    responseTime: seed.responseTime,
  }));

export const vendors: Vendor[] = [...seedsMappedVendors, ...newMappedVendors];

export function getVendorById(id: string) {
  return vendors.find((v) => v.id === id);
}

export function getVendorsByCategory(categorySlug: string) {
  return vendors.filter((v) => v.categorySlug === categorySlug);
}

export interface VendorFilters {
  city?: CitySlug;
  eventType?: EventTypeSlug;
  categorySlug?: string;
  categoryGroup?: string;
  maxPrice?: number;
  minRating?: number;
  verifiedOnly?: boolean;
}

export function filterVendors(filters: VendorFilters): Vendor[] {
  return vendors.filter((v) => {
    if (filters.city && v.citySlug !== filters.city) return false;
    if (filters.eventType && !v.eventTypes.includes(filters.eventType)) return false;
    if (filters.categorySlug && v.categorySlug !== filters.categorySlug) return false;
    if (filters.maxPrice && v.startingPrice > filters.maxPrice) return false;
    if (filters.minRating && v.rating < filters.minRating) return false;
    if (filters.verifiedOnly && !v.verified) return false;
    return true;
  });
}
