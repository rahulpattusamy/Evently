import { Map } from "lucide-react";
import { filterVenues } from "@/lib/data/venues";
import { CitySlug, EventTypeSlug, VenueType } from "@/lib/types";
import { VenueCard } from "@/components/shared/venue-card";
import { VenueListRow } from "@/components/venues/venue-list-row";
import { VenueFiltersDesktop, VenueFiltersMobile } from "@/components/venues/venue-filters";
import { ViewToggle } from "@/components/venues/view-toggle";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";

const PAGE_SIZE = 9;

export const metadata = {
  title: "Explore Event Venues | Evently",
};

export default async function VenuesPage({
  searchParams,
}: PageProps<"/venues">) {
  const sp = await searchParams;
  const get = (key: string) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key]);

  const results = filterVenues({
    city: get("city") as CitySlug | undefined,
    eventType: get("eventType") as EventTypeSlug | undefined,
    venueType: get("venueType") as VenueType | undefined,
    minCapacity: get("minCapacity") ? Number(get("minCapacity")) : undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    minRating: get("minRating") ? Number(get("minRating")) : undefined,
    ac: get("ac") === "true" || undefined,
    parking: get("parking") === "true" || undefined,
    cateringIncluded: get("catering") === "true" || undefined,
    verifiedOnly: get("verified") === "true" || undefined,
  });

  const view = get("view") ?? "grid";
  const page = Number(get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-extrabold text-charcoal">
          Find the Perfect Event Venue
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} venues available across India
        </p>
      </div>

      <div className="flex gap-8">
        <VenueFiltersDesktop />

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <VenueFiltersMobile />
            <div className="ml-auto">
              <ViewToggle />
            </div>
          </div>

          {pageResults.length === 0 ? (
            <EmptyState
              title="No venues match your filters"
              description="Try adjusting your filters or clearing them to see more results."
              actionLabel="Clear Filters"
              actionHref="/venues"
            />
          ) : view === "map" ? (
            <div className="flex h-96 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-blush/40 text-center">
              <Map className="h-10 w-10 text-rose" />
              <p className="font-medium text-charcoal">Map view coming soon</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                We&apos;re building an interactive map to help you explore
                venues by location. For now, browse using Grid or List view.
              </p>
            </div>
          ) : view === "list" ? (
            <div className="space-y-4">
              {pageResults.map((venue) => (
                <VenueListRow key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageResults.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}

          {view !== "map" && <Pagination totalPages={totalPages} currentPage={page} />}
        </div>
      </div>
    </div>
  );
}
