import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eventTypes, getEventTypeBySlug } from "@/lib/data/event-types";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

export function generateStaticParams() {
  return eventTypes.map((e) => ({ type: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[type]">) {
  const { type } = await params;
  const event = getEventTypeBySlug(type);
  return { title: event ? `${event.name} | Evently` : "Events | Evently" };
}

export default async function EventTypePage({ params }: PageProps<"/events/[type]">) {
  const { type } = await params;
  const event = getEventTypeBySlug(type);
  if (!event) notFound();

  const matchingVenues = venues.filter((v) => v.eventTypes.includes(event.slug)).slice(0, 6);
  const matchingVendors = vendors.filter((v) => v.eventTypes.includes(event.slug)).slice(0, 6);

  return (
    <div>
      <section className="relative h-64 w-full sm:h-80">
        <Image src={event.image} alt={event.name} fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {event.group}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            {event.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/85">{event.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-rose text-white hover:bg-burgundy">
              <Link href={`/venues?eventType=${event.slug}`}>Explore Venues</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
              <Link href={`/services?eventType=${event.slug}`}>Find Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-14">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold text-charcoal">
              Venues for {event.name}
            </h2>
            <Link
              href={`/venues?eventType=${event.slug}`}
              className="text-sm font-semibold text-rose hover:text-burgundy"
            >
              View all
            </Link>
          </div>
          {matchingVenues.length === 0 ? (
            <EmptyState title="No venues found yet" description="Check back soon for venues suited to this event." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingVenues.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold text-charcoal">
              Services for {event.name}
            </h2>
            <Link
              href={`/services?eventType=${event.slug}`}
              className="text-sm font-semibold text-rose hover:text-burgundy"
            >
              View all
            </Link>
          </div>
          {matchingVendors.length === 0 ? (
            <EmptyState title="No vendors found yet" description="Check back soon for vendors suited to this event." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingVendors.map((v) => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
