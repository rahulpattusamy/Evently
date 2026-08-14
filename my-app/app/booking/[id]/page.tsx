import { notFound } from "next/navigation";
import { getVenueById, venues } from "@/lib/data/venues";
import { getVendorById, vendors } from "@/lib/data/vendors";
import { BookingFlow, type BookingTarget } from "@/components/booking/booking-flow";

export function generateStaticParams() {
  return [...venues.map((v) => ({ id: v.id })), ...vendors.map((v) => ({ id: v.id }))];
}

export async function generateMetadata({ params }: PageProps<"/booking/[id]">) {
  const { id } = await params;
  const venue = getVenueById(id);
  const vendor = getVendorById(id);
  const name = venue?.name ?? vendor?.businessName;
  return { title: name ? `Book ${name} | Evently` : "Book | Evently" };
}

export default async function BookingPage({ params }: PageProps<"/booking/[id]">) {
  const { id } = await params;
  const venue = getVenueById(id);
  const vendor = getVendorById(id);

  if (!venue && !vendor) notFound();

  const target: BookingTarget = venue
    ? {
        id: venue.id,
        name: venue.name,
        image: venue.images[0],
        isVenue: true,
        startingPrice: venue.startingPrice,
        packages: [
          { name: "Essential", price: venue.startingPrice, features: ["Venue rental", "Basic setup", "4-hour slot"] },
          { name: "Premium", price: Math.round(venue.startingPrice * 1.8), features: ["Venue rental", "Full-day slot", "Complimentary decor", "Dedicated coordinator"] },
        ],
      }
    : {
        id: vendor!.id,
        name: vendor!.businessName,
        image: vendor!.coverImage,
        isVenue: false,
        startingPrice: vendor!.startingPrice,
        packages: vendor!.packages,
      };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">
        Book {target.name}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Complete the steps below to hold your slot and confirm your booking.
      </p>
      <BookingFlow target={target} />
    </div>
  );
}
