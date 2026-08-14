import { User, UserEvent } from "@/lib/types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "9840012345",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
    city: "chennai",
    joinedDate: "2025-02-14",
  },
  {
    id: "user-2",
    name: "Priya Sundaram",
    email: "priya.s@example.com",
    phone: "9663312211",
    role: "vendor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    city: "chennai",
    joinedDate: "2023-06-01",
    vendorId: "vendor-1",
  },
  {
    id: "user-3",
    name: "Meena Ramachandran",
    email: "meena.r@example.com",
    phone: "9884456789",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80",
    city: "bengaluru",
    joinedDate: "2022-11-20",
  },
];

export const currentUser = users[0];
export const currentVendorUser = users[1];
export const currentAdminUser = users[2];

export const userEvents: UserEvent[] = [
  {
    id: "event-1",
    userId: "user-1",
    title: "Rahul's Birthday",
    eventType: "birthdays",
    date: "2026-10-20",
    citySlug: "chennai",
    guests: 150,
    budget: 100000,
    progress: 65,
    coverImage:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    requirements: [
      { label: "Venue", category: "venue", done: true },
      { label: "Catering", category: "food", done: true },
      { label: "Photography", category: "photography", done: true },
      { label: "Decoration", category: "decoration", done: true },
      { label: "DJ", category: "entertainment", done: false },
      { label: "Entertainment", category: "entertainment", done: false },
    ],
  },
  {
    id: "event-2",
    userId: "user-1",
    title: "Anitha & Karthik's Wedding",
    eventType: "weddings",
    date: "2027-01-18",
    citySlug: "chennai",
    guests: 600,
    budget: 2500000,
    progress: 30,
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    requirements: [
      { label: "Venue", category: "venue", done: true },
      { label: "Planner", category: "planning", done: true },
      { label: "Catering", category: "food", done: false },
      { label: "Photography", category: "photography", done: false },
      { label: "Decoration", category: "decoration", done: false },
      { label: "Makeup Artist", category: "beauty", done: false },
      { label: "Invitations", category: "design", done: false },
    ],
  },
  {
    id: "event-3",
    userId: "user-1",
    title: "Annual Team Offsite",
    eventType: "team-events",
    date: "2026-11-05",
    citySlug: "bengaluru",
    guests: 80,
    budget: 400000,
    progress: 90,
    coverImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    requirements: [
      { label: "Venue", category: "venue", done: true },
      { label: "Catering", category: "food", done: true },
      { label: "Sound & Lighting", category: "equipment", done: true },
      { label: "Photography", category: "photography", done: true },
      { label: "Anchor / Host", category: "entertainment", done: false },
    ],
  },
];

export function getUserEvents(userId: string) {
  return userEvents.filter((e) => e.userId === userId);
}
