export type CitySlug =
  | "chennai"
  | "bengaluru"
  | "coimbatore"
  | "madurai"
  | "hyderabad"
  | "mumbai"
  | "delhi"
  | "pune"
  | "kochi"
  | "kolkata";

export interface City {
  slug: CitySlug;
  name: string;
  state: string;
}

export type EventTypeSlug =
  | "weddings"
  | "engagements"
  | "birthdays"
  | "baby-showers"
  | "anniversaries"
  | "housewarming"
  | "family-functions"
  | "private-parties"
  | "religious-celebrations"
  | "cultural-celebrations"
  | "office-parties"
  | "corporate-meetings"
  | "conferences"
  | "seminars"
  | "workshops"
  | "product-launches"
  | "award-ceremonies"
  | "annual-celebrations"
  | "team-events"
  | "business-events"
  | "college-cultural-events"
  | "symposiums"
  | "freshers-events"
  | "farewell-events"
  | "college-functions"
  | "community-programs"
  | "cultural-programs";

export type EventGroup = "Family & Personal" | "Corporate" | "College & Community";

export interface EventType {
  slug: EventTypeSlug;
  name: string;
  group: EventGroup;
  description: string;
  image: string;
  featured?: boolean;
}

export type ServiceCategoryGroup =
  | "Planning"
  | "Decorators"
  | "Food"
  | "Photography"
  | "Entertainment"
  | "Beauty"
  | "Design"
  | "Equipment & Rental"
  | "Printing";

export interface ServiceCategory {
  slug: string;
  name: string;
  group: ServiceCategoryGroup;
  icon: string;
  description: string;
}

export type VenueType =
  | "Marriage Hall"
  | "Wedding Hall"
  | "Party Hall"
  | "Banquet Hall"
  | "Convention Center"
  | "Hotel & Resort"
  | "Conference Hall"
  | "Meeting Hall"
  | "Auditorium"
  | "Outdoor Venue"
  | "Community Hall"
  | "Garden"
  | "Farmhouse"
  | "Rooftop Venue";

export interface Venue {
  id: string;
  name: string;
  venueType: VenueType;
  citySlug: CitySlug;
  address: string;
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

export interface VendorPackage {
  name: string;
  price: number;
  features: string[];
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  categorySlug: string;
  citySlug: CitySlug;
  address: string;
  tagline: string;
  description: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  premium?: boolean;
  coverImage: string;
  logoImage: string;
  portfolio: string[];
  services: string[];
  packages: VendorPackage[];
  eventTypes: EventTypeSlug[];
  yearsInBusiness: number;
  responseTime: string;
}

export interface Review {
  id: string;
  targetType: "venue" | "vendor";
  targetId: string;
  authorName: string;
  rating: number;
  date: string;
  comment: string;
  eventType?: EventTypeSlug;
}

export type UserRole = "customer" | "vendor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  city: CitySlug;
  joinedDate: string;
  vendorId?: string;
}

export interface EventRequirement {
  label: string;
  category: string;
  done: boolean;
}

export interface UserEvent {
  id: string;
  userId: string;
  title: string;
  eventType: EventTypeSlug;
  date: string;
  citySlug: CitySlug;
  guests: number;
  budget: number;
  progress: number;
  requirements: EventRequirement[];
  coverImage: string;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  userId: string;
  eventId?: string;
  targetType: "venue" | "vendor";
  targetId: string;
  targetName: string;
  targetImage: string;
  packageName: string;
  amount: number;
  amountPaid: number;
  status: BookingStatus;
  eventDate: string;
  eventTime: string;
  guests: number;
  citySlug: CitySlug;
  createdAt: string;
}

export type QuoteStatus = "pending" | "quoted" | "accepted" | "declined";

export interface QuoteRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  targetType: "venue" | "vendor";
  targetId: string;
  targetName: string;
  eventType: EventTypeSlug;
  eventDate: string;
  citySlug: CitySlug;
  guests: number;
  budget: number;
  requiredServices: string[];
  requirements?: string;
  status: QuoteStatus;
  quotedAmount?: number;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  targetType: "venue" | "vendor";
  targetId: string;
  addedAt: string;
}
