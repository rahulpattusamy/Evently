import { City } from "@/lib/types";

export const cities: City[] = [
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka" },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu" },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { slug: "delhi", name: "Delhi", state: "Delhi" },
  { slug: "pune", name: "Pune", state: "Maharashtra" },
  { slug: "kochi", name: "Kochi", state: "Kerala" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal" },
];

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}
