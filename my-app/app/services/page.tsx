import { filterVendors } from "@/lib/data/vendors";
import { CitySlug, EventTypeSlug } from "@/lib/types";
import { VendorCard } from "@/components/shared/vendor-card";
import { ServiceFiltersDesktop, ServiceFiltersMobile } from "@/components/services/service-filters";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";

const PAGE_SIZE = 9;

export const metadata = {
  title: "Find Event Services & Vendors | Evently",
};

export default async function ServicesPage({
  searchParams,
}: PageProps<"/services">) {
  const sp = await searchParams;
  const get = (key: string) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key]);

  const results = filterVendors({
    city: get("city") as CitySlug | undefined,
    eventType: get("eventType") as EventTypeSlug | undefined,
    categorySlug: get("category") || undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    minRating: get("minRating") ? Number(get("minRating")) : undefined,
    verifiedOnly: get("verified") === "true" || undefined,
  });

  const page = Number(get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-extrabold text-charcoal">
          Find Everything You Need
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} vendors available across India
        </p>
      </div>

      <div className="flex gap-8">
        <ServiceFiltersDesktop />

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <ServiceFiltersMobile />
          </div>

          {pageResults.length === 0 ? (
            <EmptyState
              title="No vendors match your filters"
              description="Try adjusting your filters or clearing them to see more results."
              actionLabel="Clear Filters"
              actionHref="/services"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageResults.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}

          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
}
