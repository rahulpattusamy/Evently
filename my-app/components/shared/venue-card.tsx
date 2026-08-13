"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Venue } from "@/lib/types";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";
import { getCityBySlug } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

export function VenueCard({ venue, className }: { venue: Venue; className?: string }) {
  const [saved, setSaved] = useState(false);
  const city = getCityBySlug(venue.citySlug);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-charcoal/5",
        className
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={venue.images[0]}
          alt={venue.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
        >
          <Heart
            className={cn(
              "h-4 w-4",
              saved ? "fill-rose text-rose" : "text-charcoal"
            )}
          />
        </button>
        {venue.premium && (
          <PremiumBadge className="absolute left-3 top-3 bg-white/90" />
        )}
      </div>

      <div className="space-y-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-heading text-base font-bold text-charcoal">
            {venue.name}
          </h3>
          {venue.verified && <VerifiedBadge className="shrink-0" />}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {venue.address}, {city?.state}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5 shrink-0" />
          <span>
            {venue.minGuests.toLocaleString("en-IN")}–{venue.maxGuests.toLocaleString("en-IN")} Guests
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {venue.amenities.slice(0, 2).map((a) => (
            <span
              key={a}
              className="rounded-full bg-blush px-2 py-0.5 text-xs text-burgundy"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between pt-1">
          <PriceDisplay amount={venue.startingPrice} />
          <Rating value={venue.rating} reviewCount={venue.reviewCount} />
        </div>

        <Button
          asChild
          className="mt-1 w-full bg-rose text-white hover:bg-burgundy"
        >
          <Link href={`/venues/${venue.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
