"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { EmptyState } from "@/components/shared/empty-state";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { cities } from "@/lib/data/cities";
import { eventTypes } from "@/lib/data/event-types";
import { categories } from "@/lib/data/categories";
import { CitySlug, EventTypeSlug } from "@/lib/types";

const EXAMPLE_QUERIES = [
  "Wedding halls in Chennai",
  "Birthday decorators in Coimbatore",
  "Corporate event planners in Bengaluru",
  "Photographers under ₹50,000",
];

const RESULT_CAP = 12;

function parseQuery(q: string) {
  const text = q.toLowerCase();

  const city = cities.find((c) => text.includes(c.name.toLowerCase()))?.slug as
    | CitySlug
    | undefined;

  const eventType = eventTypes.find((e) =>
    text.includes(e.name.toLowerCase().replace(/s$/, ""))
  )?.slug as EventTypeSlug | undefined;

  const category = categories.find((c) =>
    text.includes(c.name.toLowerCase().replace(/s$/, ""))
  );

  const priceMatch = text.match(/(?:under|below|less than)?\s*₹?\s*([\d,]+)/);
  let maxPrice: number | undefined;
  if (/(under|below|less than)/.test(text) && priceMatch) {
    const raw = Number(priceMatch[1].replace(/,/g, ""));
    if (!Number.isNaN(raw) && raw > 100) maxPrice = raw;
  }

  return { city, eventType, category, maxPrice };
}

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const parsed = useMemo(() => parseQuery(q), [q]);

  const matchedVenues = useMemo(() => {
    return venues
      .filter((v) => {
        if (parsed.city && v.citySlug !== parsed.city) return false;
        if (parsed.eventType && !v.eventTypes.includes(parsed.eventType)) return false;
        if (parsed.maxPrice && v.startingPrice > parsed.maxPrice) return false;
        if (!parsed.city && !parsed.eventType && !parsed.maxPrice && q) {
          return v.name.toLowerCase().includes(q.toLowerCase());
        }
        return true;
      })
      .slice(0, RESULT_CAP);
  }, [parsed, q]);

  const matchedVendors = useMemo(() => {
    return vendors
      .filter((v) => {
        if (parsed.city && v.citySlug !== parsed.city) return false;
        if (parsed.eventType && !v.eventTypes.includes(parsed.eventType)) return false;
        if (parsed.category && v.categorySlug !== parsed.category.slug) return false;
        if (parsed.maxPrice && v.startingPrice > parsed.maxPrice) return false;
        if (
          !parsed.city &&
          !parsed.eventType &&
          !parsed.category &&
          !parsed.maxPrice &&
          q
        ) {
          return (
            v.businessName.toLowerCase().includes(q.toLowerCase()) ||
            v.services.some((s) => s.toLowerCase().includes(q.toLowerCase()))
          );
        }
        return true;
      })
      .slice(0, RESULT_CAP);
  }, [parsed, q]);

  function runQuery(value: string) {
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-2 flex items-center gap-2 text-charcoal">
        <Search className="h-5 w-5 text-rose" />
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">
          {q ? `Results for "${q}"` : "Search Evently"}
        </h1>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {matchedVenues.length + matchedVendors.length} matches found across venues and
        vendors
        {parsed.city && ` in ${cities.find((c) => c.slug === parsed.city)?.name}`}
        {parsed.maxPrice && ` under ₹${parsed.maxPrice.toLocaleString("en-IN")}`}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((eq) => (
          <button
            key={eq}
            onClick={() => runQuery(eq)}
            className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-charcoal hover:border-rose hover:text-rose"
          >
            {eq}
          </button>
        ))}
      </div>

      <Tabs defaultValue="venues">
        <TabsList>
          <TabsTrigger value="venues">Venues ({matchedVenues.length})</TabsTrigger>
          <TabsTrigger value="vendors">Vendors &amp; Services ({matchedVendors.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="venues" className="pt-6">
          {matchedVenues.length === 0 ? (
            <EmptyState
              title="No venues match this search"
              description="Try a different city, event type, or budget."
              actionLabel="Browse All Venues"
              actionHref="/venues"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {matchedVenues.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="vendors" className="pt-6">
          {matchedVendors.length === 0 ? (
            <EmptyState
              title="No vendors match this search"
              description="Try a different service category, city, or budget."
              actionLabel="Browse All Services"
              actionHref="/services"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {matchedVendors.map((v) => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <p className="mt-8 text-xs text-muted-foreground">
        Looking for something specific?{" "}
        <Link href="/recommendations" className="font-medium text-rose hover:text-burgundy">
          Try our AI recommendations
        </Link>{" "}
        instead.
      </p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
