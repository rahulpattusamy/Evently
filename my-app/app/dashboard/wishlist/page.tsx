import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { Rating } from "@/components/shared/rating";
import { PriceDisplay } from "@/components/shared/price-display";
import { currentUser } from "@/lib/data/users";
import { getWishlistByUser } from "@/lib/data/wishlist";
import { getVenueById } from "@/lib/data/venues";
import { getVendorById } from "@/lib/data/vendors";

export const metadata = {
  title: "Wishlist | Evently",
};

export default function DashboardWishlistPage() {
  const items = getWishlistByUser(currentUser.id);

  const resolved = items
    .map((item) => {
      if (item.targetType === "venue") {
        const venue = getVenueById(item.targetId);
        if (!venue) return null;
        return {
          id: item.id,
          href: `/venues/${venue.id}`,
          image: venue.images[0],
          name: venue.name,
          rating: venue.rating,
          reviewCount: venue.reviewCount,
          price: venue.startingPrice,
        };
      }
      const vendor = getVendorById(item.targetId);
      if (!vendor) return null;
      return {
        id: item.id,
        href: `/vendors/${vendor.id}`,
        image: vendor.coverImage,
        name: vendor.businessName,
        rating: vendor.rating,
        reviewCount: vendor.reviewCount,
        price: vendor.startingPrice,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Wishlist</h1>
        <p className="mt-1 text-sm text-muted-foreground">Venues and vendors you&apos;ve saved for later.</p>
      </div>

      {resolved.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart icon on any venue or vendor to save it here."
          actionLabel="Explore Venues"
          actionHref="/venues"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resolved.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md"
            >
              <div
                className="h-40 w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-4">
                <h3 className="truncate font-heading text-sm font-bold text-charcoal">{item.name}</h3>
                <Rating value={item.rating} reviewCount={item.reviewCount} className="mt-1" />
                <PriceDisplay amount={item.price} className="mt-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
