import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Venue } from "@/lib/types";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";
import { getCityBySlug } from "@/lib/data/cities";

export function VenueSpotlight({ venue }: { venue: Venue }) {
  const city = getCityBySlug(venue.citySlug);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white sm:grid-cols-2">
      <div className="relative h-64 sm:h-full">
        <Image
          src={venue.images[0]}
          alt={venue.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {venue.premium && <PremiumBadge className="absolute left-4 top-4 bg-white/90" />}
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        <span className="w-fit rounded-full bg-blush px-3 py-1 text-xs font-semibold text-burgundy">
          Top rated this week
        </span>
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
            {venue.name}
          </h3>
          {venue.verified && <VerifiedBadge />}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {venue.address}, {city?.state}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {venue.minGuests.toLocaleString("en-IN")}–{venue.maxGuests.toLocaleString("en-IN")} Guests
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{venue.description}</p>
        <div className="flex items-center justify-between pt-2">
          <PriceDisplay amount={venue.startingPrice} amountClassName="text-xl" />
          <Rating value={venue.rating} reviewCount={venue.reviewCount} />
        </div>
        <Button asChild className="mt-2 w-fit bg-rose text-white hover:bg-burgundy">
          <Link href={`/venues/${venue.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
