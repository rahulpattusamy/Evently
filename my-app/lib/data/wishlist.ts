import { WishlistItem } from "@/lib/types";

export const wishlistItems: WishlistItem[] = [
  { id: "wish-1", userId: "user-1", targetType: "venue", targetId: "venue-2", addedAt: "2026-07-01" },
  { id: "wish-2", userId: "user-1", targetType: "venue", targetId: "venue-9", addedAt: "2026-07-05" },
  { id: "wish-3", userId: "user-1", targetType: "vendor", targetId: "vendor-3", addedAt: "2026-07-10" },
  { id: "wish-4", userId: "user-1", targetType: "vendor", targetId: "vendor-9", addedAt: "2026-07-15" },
  { id: "wish-5", userId: "user-1", targetType: "vendor", targetId: "vendor-14", addedAt: "2026-08-02" },
];

export function getWishlistByUser(userId: string) {
  return wishlistItems.filter((w) => w.userId === userId);
}
