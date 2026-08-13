import { notFound } from "next/navigation";
import { MapPin, Users, DoorOpen, ParkingCircle, Wind, ChefHat } from "lucide-react";
import { getVenueById, venues } from "@/lib/data/venues";
import { getCityBySlug } from "@/lib/data/cities";
import { getReviewsFor } from "@/lib/data/reviews";
import { getEventTypeBySlug } from "@/lib/data/event-types";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { Rating } from "@/components/shared/rating";
import { PriceDisplay } from "@/components/shared/price-display";
import { ImageGallery } from "@/components/shared/image-gallery";
import { ReviewCard } from "@/components/shared/review-card";
import { VenueDetailActions } from "@/components/venues/venue-detail-actions";
import { VenueCard } from "@/components/shared/venue-card";

export function generateStaticParams() {
  return venues.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps<"/venues/[id]">) {
  const { id } = await params;
  const venue = getVenueById(id);
  return { title: venue ? `${venue.name} | Evently` : "Venue | Evently" };
}

export default async function VenueDetailPage({ params }: PageProps<"/venues/[id]">) {
  const { id } = await params;
  const venue = getVenueById(id);
  if (!venue) notFound();

  const city = getCityBySlug(venue.citySlug);
  const reviews = getReviewsFor("venue", venue.id);
  const similarVenues = venues
    .filter((v) => v.id !== venue.id && v.citySlug === venue.citySlug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ImageGallery images={venue.images} alt={venue.name} />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-3xl font-extrabold text-charcoal">
                {venue.name}
              </h1>
              {venue.verified && <VerifiedBadge />}
              {venue.premium && <PremiumBadge />}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {venue.address}, {city?.state}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {venue.minGuests.toLocaleString("en-IN")}–{venue.maxGuests.toLocaleString("en-IN")} Guests
              </span>
              <Rating value={venue.rating} reviewCount={venue.reviewCount} />
            </div>
          </div>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal">About this venue</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {venue.description}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal">Venue Details</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1 rounded-xl border border-border p-3 text-center">
                <Wind className="h-5 w-5 text-rose" />
                <span className="text-xs text-muted-foreground">{venue.ac ? "AC Available" : "Non-AC"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-border p-3 text-center">
                <ParkingCircle className="h-5 w-5 text-rose" />
                <span className="text-xs text-muted-foreground">{venue.parking ? "Parking Available" : "No Parking"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-border p-3 text-center">
                <ChefHat className="h-5 w-5 text-rose" />
                <span className="text-xs text-muted-foreground">{venue.cateringIncluded ? "Catering Included" : "External Catering"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-border p-3 text-center">
                <DoorOpen className="h-5 w-5 text-rose" />
                <span className="text-xs text-muted-foreground">{venue.rooms} Rooms</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {venue.amenities.map((a) => (
                <span key={a} className="rounded-full bg-blush px-3 py-1 text-sm text-burgundy">
                  {a}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-charcoal">Suitable For</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {venue.eventTypes.map((slug) => {
                const et = getEventTypeBySlug(slug);
                return et ? (
                  <span key={slug} className="rounded-full border border-border px-3 py-1 text-sm text-charcoal">
                    {et.name}
                  </span>
                ) : null;
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-charcoal">
                Reviews ({reviews.length})
              </h2>
              <Rating value={venue.rating} />
            </div>
            <div className="mt-4 space-y-4">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full shrink-0 lg:w-80">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-border bg-white p-5">
            <PriceDisplay amount={venue.startingPrice} prefix="Starting from" amountClassName="text-2xl" />
            <p className="text-xs text-muted-foreground">
              Final pricing depends on date, guest count and add-on services.
            </p>
            <VenueDetailActions venueName={venue.name} />
          </div>
        </aside>
      </div>

      {similarVenues.length > 0 && (
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            More venues in {city?.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarVenues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
