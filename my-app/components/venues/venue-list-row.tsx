import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Venue } from "@/lib/types";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";
import { getCityBySlug } from "@/lib/data/cities";

export function VenueListRow({ venue }: { venue: Venue }) {
  const city = getCityBySlug(venue.citySlug);
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-white p-3 sm:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-64">
        <Image src={venue.images[0]} alt={venue.name} fill sizes="(min-width: 640px) 256px, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 py-1 pr-2">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-bold text-charcoal">{venue.name}</h3>
            {venue.verified && <VerifiedBadge />}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {venue.address}, {city?.state}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {venue.minGuests.toLocaleString("en-IN")}–{venue.maxGuests.toLocaleString("en-IN")} Guests
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{venue.description}</p>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <PriceDisplay amount={venue.startingPrice} />
            <Rating value={venue.rating} reviewCount={venue.reviewCount} />
          </div>
          <Button asChild className="bg-rose text-white hover:bg-burgundy">
            <Link href={`/venues/${venue.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
