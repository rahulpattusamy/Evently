import { Review } from "@/lib/types";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";

const NAMES = [
  "Arun Kumar",
  "Priya Sundaram",
  "Rahul Mehta",
  "Sneha Reddy",
  "Vikram Singh",
  "Divya Krishnan",
  "Karthik Raja",
  "Ananya Iyer",
  "Rohan Kapoor",
  "Meera Nair",
  "Siddharth Rao",
  "Lakshmi Venkatesh",
  "Aditya Sharma",
  "Pooja Agarwal",
  "Naveen Pillai",
];

const COMMENTS = [
  "Absolutely wonderful experience from start to finish. Highly recommend for anyone planning an event.",
  "Professional, punctual and the results exceeded our expectations. Will book again.",
  "Great value for money and the team was very responsive throughout the planning process.",
  "The quality of work was outstanding — our guests are still talking about it.",
  "A few minor hiccups on the day but the team handled everything smoothly.",
  "Loved the attention to detail. Made our event truly special.",
  "Communication could have been better initially, but the final execution was excellent.",
  "One of the best decisions we made for our event. Worth every rupee.",
  "Very accommodating with our last-minute changes. Truly appreciated the flexibility.",
  "Exceptional service and a beautiful outcome. Couldn't have asked for more.",
];

function seededReviews(
  targetType: "venue" | "vendor",
  targetId: string,
  count: number,
  seedOffset: number
): Review[] {
  return Array.from({ length: count }).map((_, i) => {
    const idx = (seedOffset + i) % NAMES.length;
    return {
      id: `${targetType}-${targetId}-review-${i + 1}`,
      targetType,
      targetId,
      authorName: NAMES[idx],
      rating: 4 + ((seedOffset + i) % 2 === 0 ? 1 : 0),
      date: `2026-0${((seedOffset + i) % 6) + 1}-${10 + ((seedOffset + i) % 15)}`,
      comment: COMMENTS[(seedOffset + i * 3) % COMMENTS.length],
    };
  });
}

export const reviews: Review[] = [
  ...venues.flatMap((v, i) => seededReviews("venue", v.id, 3, i)),
  ...vendors.flatMap((v, i) => seededReviews("vendor", v.id, 3, i + 5)),
];

export function getReviewsFor(targetType: "venue" | "vendor", targetId: string) {
  return reviews.filter((r) => r.targetType === targetType && r.targetId === targetId);
}
