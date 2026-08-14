import { Booking } from "@/lib/types";

export const bookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-1",
    eventId: "event-1",
    targetType: "venue",
    targetId: "venue-3",
    targetName: "Sri Lakshmi Mahal",
    targetImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    packageName: "Premium",
    amount: 225000,
    amountPaid: 50000,
    status: "confirmed",
    eventDate: "2026-10-20",
    eventTime: "18:00",
    guests: 150,
    citySlug: "chennai",
    createdAt: "2026-06-02",
  },
  {
    id: "booking-2",
    userId: "user-1",
    eventId: "event-1",
    targetType: "vendor",
    targetId: "vendor-8",
    targetName: "SoundWave Rentals",
    targetImage:
      "https://images.unsplash.com/photo-1561314105-e6ac04c2984a?w=800&q=80",
    packageName: "Essential",
    amount: 15000,
    amountPaid: 15000,
    status: "confirmed",
    eventDate: "2026-10-20",
    eventTime: "17:00",
    guests: 150,
    citySlug: "chennai",
    createdAt: "2026-06-10",
  },
  {
    id: "booking-3",
    userId: "user-1",
    eventId: "event-3",
    targetType: "venue",
    targetId: "venue-9",
    targetName: "Grand Convention Centre",
    targetImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    packageName: "Premium",
    amount: 380000,
    amountPaid: 380000,
    status: "completed",
    eventDate: "2026-11-05",
    eventTime: "09:00",
    guests: 80,
    citySlug: "bengaluru",
    createdAt: "2026-05-01",
  },
  {
    id: "booking-4",
    userId: "user-1",
    eventId: "event-2",
    targetType: "venue",
    targetId: "venue-1",
    targetName: "Grand Regency Banquets",
    targetImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    packageName: "Luxe",
    amount: 1250000,
    amountPaid: 250000,
    status: "pending",
    eventDate: "2027-01-18",
    eventTime: "10:00",
    guests: 600,
    citySlug: "chennai",
    createdAt: "2026-08-01",
  },
];

export function getBookingsByUser(userId: string) {
  return bookings.filter((b) => b.userId === userId);
}

export function getBookingsForVendor(vendorId: string) {
  return bookings.filter((b) => b.targetId === vendorId && b.targetType === "vendor");
}
