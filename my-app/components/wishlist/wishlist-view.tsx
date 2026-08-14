"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { EmptyState } from "@/components/shared/empty-state";
import { currentUser } from "@/lib/data/users";
import { getWishlistByUser } from "@/lib/data/wishlist";
import { getVenueById } from "@/lib/data/venues";
import { getVendorById } from "@/lib/data/vendors";

export function WishlistView() {
  const initial = getWishlistByUser(currentUser.id);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const items = initial
    .filter((w) => !removedIds.includes(w.id))
    .map((w) => {
      if (w.targetType === "venue") {
        const venue = getVenueById(w.targetId);
        return venue ? { wishId: w.id, kind: "venue" as const, venue } : null;
      }
      const vendor = getVendorById(w.targetId);
      return vendor ? { wishId: w.id, kind: "vendor" as const, vendor } : null;
    })
    .filter((i): i is NonNullable<typeof i> => !!i);

  function remove(wishId: string) {
    setRemovedIds((r) => [...r, wishId]);
    toast.success("Removed from wishlist");
  }

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          title="Your wishlist is empty"
          description="Save venues and vendors you like and they'll show up here."
          actionLabel="Explore Venues"
          actionHref="/venues"
        />
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.wishId} className="relative">
          <button
            onClick={() => remove(item.wishId)}
            aria-label="Remove from wishlist"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
          >
            <X className="h-4 w-4 text-charcoal" />
          </button>
          {item.kind === "venue" ? (
            <VenueCard venue={item.venue} />
          ) : (
            <VendorCard vendor={item.vendor} />
          )}
        </div>
      ))}
    </div>
  );
}
