import { CitySlug, EventTypeSlug, Venue, VenueType } from "@/lib/types";

const HALL_IMG = [
  "https://images.unsplash.com/photo-1768851142332-75f3d1b47452?w=1200&q=80",
  "https://images.unsplash.com/photo-1762765684665-6b6855bb6fe6?w=1200&q=80",
  "https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=1200&q=80",
  "https://images.unsplash.com/photo-1761114905078-163aa92141c8?w=1200&q=80",
  "https://images.unsplash.com/photo-1780337092331-6580fd9ccb47?w=1200&q=80",
  "https://images.unsplash.com/photo-1783314867628-220ab03cac99?w=1200&q=80",
  "https://images.unsplash.com/photo-1717680281618-442cb9c12b6c?w=1200&q=80",
  "https://images.unsplash.com/photo-1780542900375-0cf459e38fbb?w=1200&q=80",
];

const OUTDOOR_IMG = [
  "https://images.unsplash.com/photo-1696271026740-4c0c1a367f03?w=1200&q=80",
  "https://images.unsplash.com/photo-1700062069869-0c59ff21fa3b?w=1200&q=80",
  "https://images.unsplash.com/photo-1613256253906-3e5e19769403?w=1200&q=80",
  "https://images.unsplash.com/photo-1696204868903-91d809b4df09?w=1200&q=80",
];

const CORPORATE_IMG = [
  "https://images.unsplash.com/photo-1765768737206-8f94009da6f0?w=1200&q=80",
  "https://images.unsplash.com/photo-1762176264161-09219da49794?w=1200&q=80",
  "https://images.unsplash.com/photo-1764471444363-e6dc0f9773bc?w=1200&q=80",
];

const WEDDING_EVENTS: EventTypeSlug[] = [
  "weddings",
  "engagements",
  "anniversaries",
  "religious-celebrations",
];
const CELEBRATION_EVENTS: EventTypeSlug[] = [
  "weddings",
  "birthdays",
  "baby-showers",
  "housewarming",
  "family-functions",
  "private-parties",
  "cultural-celebrations",
];
const CORPORATE_EVENTS: EventTypeSlug[] = [
  "corporate-meetings",
  "conferences",
  "seminars",
  "workshops",
  "product-launches",
  "award-ceremonies",
  "annual-celebrations",
  "business-events",
];
const COLLEGE_EVENTS: EventTypeSlug[] = [
  "college-cultural-events",
  "symposiums",
  "freshers-events",
  "farewell-events",
  "college-functions",
];

interface VenueSeed {
  name: string;
  venueType: VenueType;
  citySlug: CitySlug;
  area: string;
  minGuests: number;
  maxGuests: number;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  images: string[];
  verified: boolean;
  premium?: boolean;
  eventTypes: EventTypeSlug[];
  ac: boolean;
  parking: boolean;
  cateringIncluded: boolean;
  rooms: number;
  description: string;
}

const seeds: VenueSeed[] = [
  {
    name: "Sri Lakshmi Mahal",
    venueType: "Marriage Hall",
    citySlug: "chennai",
    area: "T. Nagar",
    minGuests: 500,
    maxGuests: 800,
    startingPrice: 125000,
    rating: 4.8,
    reviewCount: 214,
    amenities: ["Valet Parking", "Bridal Room", "In-house Catering", "Generator Backup"],
    images: HALL_IMG,
    verified: true,
    premium: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: true,
    rooms: 4,
    description:
      "A grand marriage hall in the heart of Chennai with traditional architecture, a spacious mandapam and dedicated catering block for large Tamil weddings.",
  },
  {
    name: "The Grand Regalia",
    venueType: "Banquet Hall",
    citySlug: "bengaluru",
    area: "Indiranagar",
    minGuests: 200,
    maxGuests: 500,
    startingPrice: 95000,
    rating: 4.6,
    reviewCount: 168,
    amenities: ["Air Conditioning", "Valet Parking", "In-house Decor", "Dance Floor"],
    images: HALL_IMG.slice(1),
    verified: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 2,
    description:
      "A contemporary banquet hall in Indiranagar popular for wedding receptions, sangeet nights and milestone birthday parties.",
  },
  {
    name: "Coimbatore Convention Centre",
    venueType: "Convention Center",
    citySlug: "coimbatore",
    area: "Avinashi Road",
    minGuests: 300,
    maxGuests: 1200,
    startingPrice: 180000,
    rating: 4.7,
    reviewCount: 96,
    amenities: ["Conference AV", "Exhibition Space", "Ample Parking", "Green Rooms"],
    images: CORPORATE_IMG,
    verified: true,
    premium: true,
    eventTypes: [...CORPORATE_EVENTS, ...COLLEGE_EVENTS, "weddings"],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 6,
    description:
      "Coimbatore's largest convention centre, built for conferences, exhibitions and large weddings alike with modular hall configurations.",
  },
  {
    name: "Meenakshi Kalyana Mandapam",
    venueType: "Wedding Hall",
    citySlug: "madurai",
    area: "K.K. Nagar",
    minGuests: 400,
    maxGuests: 900,
    startingPrice: 110000,
    rating: 4.5,
    reviewCount: 142,
    amenities: ["In-house Catering", "Bridal Suite", "Parking", "Traditional Decor"],
    images: HALL_IMG.slice(2),
    verified: true,
    eventTypes: WEDDING_EVENTS,
    ac: false,
    parking: true,
    cateringIncluded: true,
    rooms: 3,
    description:
      "A classic Madurai kalyana mandapam known for authentic South Indian wedding hospitality and spacious open courtyards.",
  },
  {
    name: "Hyderabad Pearl Banquets",
    venueType: "Banquet Hall",
    citySlug: "hyderabad",
    area: "Banjara Hills",
    minGuests: 150,
    maxGuests: 400,
    startingPrice: 85000,
    rating: 4.4,
    reviewCount: 121,
    amenities: ["Air Conditioning", "Valet Parking", "Rooftop Deck", "In-house Bar License"],
    images: HALL_IMG.slice(3),
    verified: true,
    eventTypes: [...CELEBRATION_EVENTS, "engagements"],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 2,
    description:
      "An upscale banquet space in Banjara Hills, favoured for engagement ceremonies, birthday parties and corporate socials.",
  },
  {
    name: "The Taj Continental",
    venueType: "Hotel & Resort",
    citySlug: "mumbai",
    area: "Bandra Kurla Complex",
    minGuests: 100,
    maxGuests: 600,
    startingPrice: 250000,
    rating: 4.9,
    reviewCount: 310,
    amenities: ["5-Star Catering", "Valet Parking", "In-house Decor Team", "Guest Rooms"],
    images: HALL_IMG.slice(4),
    verified: true,
    premium: true,
    eventTypes: [...WEDDING_EVENTS, ...CORPORATE_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: true,
    rooms: 40,
    description:
      "A landmark 5-star property in BKC with multiple event spaces, from intimate boardrooms to a grand ballroom for 600 guests.",
  },
  {
    name: "Delhi Heritage Lawns",
    venueType: "Outdoor Venue",
    citySlug: "delhi",
    area: "Chhatarpur",
    minGuests: 300,
    maxGuests: 1500,
    startingPrice: 200000,
    rating: 4.6,
    reviewCount: 187,
    amenities: ["Open Lawns", "Tent & Decor Setup", "Parking for 200 cars", "Power Backup"],
    images: OUTDOOR_IMG,
    verified: true,
    premium: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: false,
    parking: true,
    cateringIncluded: false,
    rooms: 0,
    description:
      "Sprawling heritage lawns in South Delhi, a favourite for destination-style weddings without leaving the city.",
  },
  {
    name: "Pune Business Conclave",
    venueType: "Conference Hall",
    citySlug: "pune",
    area: "Hinjewadi",
    minGuests: 50,
    maxGuests: 300,
    startingPrice: 45000,
    rating: 4.5,
    reviewCount: 74,
    amenities: ["High-speed WiFi", "Projector & AV", "Boardroom Setup", "Parking"],
    images: CORPORATE_IMG.slice(1),
    verified: true,
    eventTypes: CORPORATE_EVENTS,
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 5,
    description:
      "A dedicated conference facility in Hinjewadi tech park, built for seminars, workshops and product launches.",
  },
  {
    name: "Kochi Backwater Resort",
    venueType: "Hotel & Resort",
    citySlug: "kochi",
    area: "Vembanad Lake",
    minGuests: 80,
    maxGuests: 350,
    startingPrice: 160000,
    rating: 4.8,
    reviewCount: 132,
    amenities: ["Lakeside Deck", "In-house Catering", "Guest Rooms", "Boat Access"],
    images: OUTDOOR_IMG.slice(1),
    verified: true,
    premium: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: true,
    rooms: 30,
    description:
      "A serene backwater resort near Vembanad Lake offering a picturesque setting for weddings and destination celebrations.",
  },
  {
    name: "Kolkata Rajbari Manor",
    venueType: "Banquet Hall",
    citySlug: "kolkata",
    area: "Alipore",
    minGuests: 150,
    maxGuests: 500,
    startingPrice: 100000,
    rating: 4.6,
    reviewCount: 98,
    amenities: ["Heritage Architecture", "In-house Catering", "Parking", "Bridal Room"],
    images: HALL_IMG.slice(5),
    verified: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: true,
    rooms: 5,
    description:
      "A restored heritage manor in Alipore combining old-Kolkata charm with modern event infrastructure.",
  },
  {
    name: "Anna University Auditorium",
    venueType: "Auditorium",
    citySlug: "chennai",
    area: "Guindy",
    minGuests: 300,
    maxGuests: 1000,
    startingPrice: 60000,
    rating: 4.3,
    reviewCount: 88,
    amenities: ["Tiered Seating", "Stage & AV", "Green Rooms", "Parking"],
    images: CORPORATE_IMG,
    verified: true,
    eventTypes: [...COLLEGE_EVENTS, ...CORPORATE_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 2,
    description:
      "A large tiered auditorium popular for college symposiums, cultural fests and graduation ceremonies.",
  },
  {
    name: "Cubbon Garden Pavilion",
    venueType: "Garden",
    citySlug: "bengaluru",
    area: "Cubbon Park",
    minGuests: 50,
    maxGuests: 250,
    startingPrice: 55000,
    rating: 4.5,
    reviewCount: 61,
    amenities: ["Open-air Setting", "Landscaped Garden", "Basic Power Backup", "Parking Nearby"],
    images: OUTDOOR_IMG,
    verified: false,
    eventTypes: [...CELEBRATION_EVENTS, "engagements"],
    ac: false,
    parking: false,
    cateringIncluded: false,
    rooms: 0,
    description:
      "A leafy garden pavilion ideal for intimate birthday parties, baby showers and small private celebrations.",
  },
  {
    name: "Whitefield Tech Park Hall",
    venueType: "Meeting Hall",
    citySlug: "bengaluru",
    area: "Whitefield",
    minGuests: 20,
    maxGuests: 120,
    startingPrice: 25000,
    rating: 4.4,
    reviewCount: 53,
    amenities: ["High-speed WiFi", "Video Conferencing", "Whiteboard", "Coffee Service"],
    images: CORPORATE_IMG.slice(1),
    verified: true,
    eventTypes: ["corporate-meetings", "workshops", "team-events"],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 3,
    description:
      "A compact, well-equipped meeting hall in Whitefield ideal for corporate meetings and small workshops.",
  },
  {
    name: "Green Acres Farmhouse",
    venueType: "Farmhouse",
    citySlug: "delhi",
    area: "Gurugram Road",
    minGuests: 100,
    maxGuests: 600,
    startingPrice: 140000,
    rating: 4.5,
    reviewCount: 109,
    amenities: ["Private Pool", "Open Lawns", "In-house DJ Setup", "Parking for 150 cars"],
    images: OUTDOOR_IMG,
    verified: true,
    premium: true,
    eventTypes: [...CELEBRATION_EVENTS, "weddings"],
    ac: false,
    parking: true,
    cateringIncluded: false,
    rooms: 6,
    description:
      "A sprawling farmhouse on the outskirts of Delhi with a private pool and lawns, popular for sangeet nights and pool parties.",
  },
  {
    name: "Marina Skyline Rooftop",
    venueType: "Rooftop Venue",
    citySlug: "chennai",
    area: "OMR",
    minGuests: 50,
    maxGuests: 200,
    startingPrice: 70000,
    rating: 4.6,
    reviewCount: 77,
    amenities: ["Sea View", "In-house Bar", "Ambient Lighting", "Valet Parking"],
    images: HALL_IMG.slice(6),
    verified: true,
    eventTypes: [...CELEBRATION_EVENTS, "engagements"],
    ac: false,
    parking: true,
    cateringIncluded: false,
    rooms: 0,
    description:
      "A chic rooftop venue with sweeping views of the Bay of Bengal, ideal for cocktail parties and intimate receptions.",
  },
  {
    name: "Nungambakkam Community Hall",
    venueType: "Community Hall",
    citySlug: "chennai",
    area: "Nungambakkam",
    minGuests: 100,
    maxGuests: 350,
    startingPrice: 40000,
    rating: 4.2,
    reviewCount: 64,
    amenities: ["Basic AV", "Parking", "Kitchen Access", "Generator Backup"],
    images: HALL_IMG.slice(1),
    verified: false,
    eventTypes: [...CELEBRATION_EVENTS, ...COLLEGE_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 1,
    description:
      "An affordable, well-connected community hall suited for family functions, naming ceremonies and small college events.",
  },
  {
    name: "Hitex Exhibition Halls",
    venueType: "Convention Center",
    citySlug: "hyderabad",
    area: "Izzat Nagar",
    minGuests: 500,
    maxGuests: 3000,
    startingPrice: 300000,
    rating: 4.7,
    reviewCount: 143,
    amenities: ["Exhibition Grade Power", "Loading Dock", "Ample Parking", "On-site Catering Partners"],
    images: CORPORATE_IMG,
    verified: true,
    premium: true,
    eventTypes: [...CORPORATE_EVENTS, "product-launches"],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 8,
    description:
      "A large-format exhibition and convention venue used for trade shows, product launches and mega conferences.",
  },
  {
    name: "Worli Sea Face Banquet",
    venueType: "Banquet Hall",
    citySlug: "mumbai",
    area: "Worli",
    minGuests: 120,
    maxGuests: 450,
    startingPrice: 175000,
    rating: 4.7,
    reviewCount: 156,
    amenities: ["Sea-facing Deck", "Valet Parking", "In-house Catering", "Premium Decor"],
    images: HALL_IMG.slice(2),
    verified: true,
    premium: true,
    eventTypes: [...WEDDING_EVENTS, ...CELEBRATION_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: true,
    rooms: 2,
    description:
      "A premium sea-facing banquet hall in Worli, popular with Mumbai's wedding and reception crowd.",
  },
  {
    name: "Aundh Party Terrace",
    venueType: "Rooftop Venue",
    citySlug: "pune",
    area: "Aundh",
    minGuests: 40,
    maxGuests: 150,
    startingPrice: 35000,
    rating: 4.3,
    reviewCount: 47,
    amenities: ["Open Terrace", "In-house DJ", "String Lighting", "Parking Nearby"],
    images: OUTDOOR_IMG.slice(1),
    verified: false,
    eventTypes: [...CELEBRATION_EVENTS],
    ac: false,
    parking: false,
    cateringIncluded: false,
    rooms: 0,
    description:
      "A trendy party terrace in Aundh, popular for birthday parties and casual private celebrations.",
  },
  {
    name: "Salt Lake Convention Hub",
    venueType: "Convention Center",
    citySlug: "kolkata",
    area: "Salt Lake",
    minGuests: 200,
    maxGuests: 900,
    startingPrice: 130000,
    rating: 4.5,
    reviewCount: 91,
    amenities: ["Conference AV", "Breakout Rooms", "Ample Parking", "Catering Partners"],
    images: CORPORATE_IMG.slice(1),
    verified: true,
    eventTypes: [...CORPORATE_EVENTS, ...COLLEGE_EVENTS],
    ac: true,
    parking: true,
    cateringIncluded: false,
    rooms: 5,
    description:
      "A modern convention hub in Salt Lake City suited for conferences, seminars and college symposiums.",
  },
  {
    name: "Fort Kochi Garden House",
    venueType: "Garden",
    citySlug: "kochi",
    area: "Fort Kochi",
    minGuests: 60,
    maxGuests: 220,
    startingPrice: 65000,
    rating: 4.6,
    reviewCount: 58,
    amenities: ["Heritage Garden", "In-house Decor", "Parking Nearby", "Power Backup"],
    images: OUTDOOR_IMG,
    verified: true,
    eventTypes: [...CELEBRATION_EVENTS, "engagements"],
    ac: false,
    parking: false,
    cateringIncluded: false,
    rooms: 0,
    description:
      "A charming heritage garden venue in Fort Kochi, ideal for engagement ceremonies and boutique celebrations.",
  },
  {
    name: "Madurai College Grounds",
    venueType: "Auditorium",
    citySlug: "madurai",
    area: "Anna Nagar",
    minGuests: 200,
    maxGuests: 800,
    startingPrice: 50000,
    rating: 4.1,
    reviewCount: 39,
    amenities: ["Stage & AV", "Open Grounds", "Parking", "Generator Backup"],
    images: CORPORATE_IMG,
    verified: false,
    eventTypes: COLLEGE_EVENTS,
    ac: false,
    parking: true,
    cateringIncluded: false,
    rooms: 1,
    description:
      "Spacious college grounds regularly used for cultural fests, farewell events and symposiums.",
  },
];

export const venues: Venue[] = seeds.map((seed, i) => ({
  id: `venue-${i + 1}`,
  name: seed.name,
  venueType: seed.venueType,
  citySlug: seed.citySlug,
  address: `${seed.area}, ${seed.citySlug[0].toUpperCase()}${seed.citySlug.slice(1)}`,
  minGuests: seed.minGuests,
  maxGuests: seed.maxGuests,
  startingPrice: seed.startingPrice,
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  amenities: seed.amenities,
  images: seed.images,
  verified: seed.verified,
  premium: seed.premium,
  eventTypes: seed.eventTypes,
  ac: seed.ac,
  parking: seed.parking,
  cateringIncluded: seed.cateringIncluded,
  rooms: seed.rooms,
  description: seed.description,
}));

export function getVenueById(id: string) {
  return venues.find((v) => v.id === id);
}

export interface VenueFilters {
  city?: CitySlug;
  eventType?: EventTypeSlug;
  venueType?: VenueType;
  minCapacity?: number;
  maxPrice?: number;
  ac?: boolean;
  parking?: boolean;
  cateringIncluded?: boolean;
  minRating?: number;
  verifiedOnly?: boolean;
}

export function filterVenues(filters: VenueFilters): Venue[] {
  return venues.filter((v) => {
    if (filters.city && v.citySlug !== filters.city) return false;
    if (filters.eventType && !v.eventTypes.includes(filters.eventType)) return false;
    if (filters.venueType && v.venueType !== filters.venueType) return false;
    if (filters.minCapacity && v.maxGuests < filters.minCapacity) return false;
    if (filters.maxPrice && v.startingPrice > filters.maxPrice) return false;
    if (filters.ac && !v.ac) return false;
    if (filters.parking && !v.parking) return false;
    if (filters.cateringIncluded && !v.cateringIncluded) return false;
    if (filters.minRating && v.rating < filters.minRating) return false;
    if (filters.verifiedOnly && !v.verified) return false;
    return true;
  });
}

export const venueTypes: VenueType[] = [
  "Marriage Hall",
  "Wedding Hall",
  "Party Hall",
  "Banquet Hall",
  "Convention Center",
  "Hotel & Resort",
  "Conference Hall",
  "Meeting Hall",
  "Auditorium",
  "Outdoor Venue",
  "Community Hall",
  "Garden",
  "Farmhouse",
  "Rooftop Venue",
];
