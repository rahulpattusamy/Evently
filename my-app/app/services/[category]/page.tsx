import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/data/categories";
import { filterVendors, VendorSort } from "@/lib/data/vendors";
import { CitySlug, EventTypeSlug } from "@/lib/types";
import { VendorCard } from "@/components/shared/vendor-card";
import { ServiceFiltersBar } from "@/components/services/service-filters";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";

const PAGE_SIZE = 9;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]">) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  return { title: cat ? `${cat.name} | Evently` : "Services | Evently" };
}

export default async function ServiceCategoryPage({
  params,
  searchParams,
}: PageProps<"/services/[category]">) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const sp = await searchParams;
  const get = (key: string) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key]);

  const results = filterVendors({
    categorySlug: cat.slug,
    city: get("city") as CitySlug | undefined,
    eventType: get("eventType") as EventTypeSlug | undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    minRating: get("minRating") ? Number(get("minRating")) : undefined,
    verifiedOnly: get("verified") === "true" || undefined,
    sort: (get("sort") as VendorSort) || "rating",
  });

  const page = Number(get("page") ?? "1");
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose">{cat.group}</span>
          <h1 className="mt-1 font-heading text-3xl font-extrabold text-charcoal">
            {cat.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
        </div>

        {/* Horizontal filter bar */}
        <div className="mb-8">
          <ServiceFiltersBar hideCategory />
        </div>

        {/* Grid */}
        {pageResults.length === 0 ? (
          <EmptyState
            title={`No ${cat.name.toLowerCase()} found`}
            description="Try adjusting your filters or explore other categories."
            actionLabel="Browse All Services"
            actionHref="/services"
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pageResults.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}

        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </div>
  );
}
