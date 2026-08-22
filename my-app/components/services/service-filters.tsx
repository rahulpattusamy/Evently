"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cities } from "@/lib/data/cities";

const PRICE_OPTIONS = [
  { label: "Any price", value: "" },
  { label: "Under ₹10,000", value: "10000" },
  { label: "Under ₹25,000", value: "25000" },
  { label: "Under ₹50,000", value: "50000" },
  { label: "Under ₹1,00,000", value: "100000" },
];

const RATING_OPTIONS = [
  { label: "Any rating", value: "" },
  { label: "4.5+ rating", value: "4.5" },
  { label: "4.0+ rating", value: "4.0" },
  { label: "3.5+ rating", value: "3.5" },
];

const SORT_OPTIONS = [
  { label: "Top rated", value: "rating" },
  { label: "Price: low to high", value: "price_asc" },
  { label: "Price: high to low", value: "price_desc" },
  { label: "Most reviewed", value: "reviews" },
];

interface FilterBarProps {
  hideCategory?: boolean;
}

export function ServiceFiltersBar({ hideCategory }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function set(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const city = searchParams.get("city") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const minRating = searchParams.get("minRating") ?? "";
  const sort = searchParams.get("sort") ?? "rating";
  const verified = searchParams.get("verified") === "true";

  const cityLabel = cities.find((c) => c.slug === city)?.name ?? "All cities";
  const priceLabel = PRICE_OPTIONS.find((o) => o.value === maxPrice)?.label ?? "Any price";
  const ratingLabel = RATING_OPTIONS.find((o) => o.value === minRating)?.label ?? "Any rating";
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Top rated";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* City */}
      <div className="relative">
        <select
          value={city}
          onChange={(e) => set("city", e.target.value)}
          className="appearance-none cursor-pointer rounded-full border border-border bg-white px-4 py-2 pr-8 text-sm font-semibold text-charcoal focus:outline-none focus:border-rose transition-colors hover:border-rose/40 shadow-sm"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">▾</span>
      </div>

      {/* Price */}
      <div className="relative">
        <select
          value={maxPrice}
          onChange={(e) => set("maxPrice", e.target.value)}
          className="appearance-none cursor-pointer rounded-full border border-border bg-white px-4 py-2 pr-8 text-sm font-semibold text-charcoal focus:outline-none focus:border-rose transition-colors hover:border-rose/40 shadow-sm"
        >
          {PRICE_OPTIONS.map((o) => (
            <option key={o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">▾</span>
      </div>

      {/* Rating */}
      <div className="relative">
        <select
          value={minRating}
          onChange={(e) => set("minRating", e.target.value)}
          className="appearance-none cursor-pointer rounded-full border border-border bg-white px-4 py-2 pr-8 text-sm font-semibold text-charcoal focus:outline-none focus:border-rose transition-colors hover:border-rose/40 shadow-sm"
        >
          {RATING_OPTIONS.map((o) => (
            <option key={o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">▾</span>
      </div>

      {/* Verified toggle */}
      <button
        onClick={() => set("verified", verified ? "" : "true")}
        className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
          verified
            ? "border-rose bg-rose text-white"
            : "border-white/20 bg-[#1a1a1a] text-white hover:border-white/40"
        }`}
      >
        Verified only
      </button>

      {/* Sort — pushed to the right */}
      <div className="relative ml-auto">
        <select
          value={sort}
          onChange={(e) => set("sort", e.target.value)}
          className="appearance-none cursor-pointer rounded-full border border-border bg-white px-4 py-2 pr-8 text-sm font-semibold text-charcoal focus:outline-none focus:border-rose transition-colors hover:border-rose/40 shadow-sm"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 text-xs">▾</span>
      </div>
    </div>
  );
}

// Keep legacy exports so existing import sites don't break — they now render nothing on desktop
// and are replaced by ServiceFiltersBar in the page layouts.
export function ServiceFiltersDesktop(_props: { hideCategory?: boolean }) {
  return null;
}

export function ServiceFiltersMobile(_props: { hideCategory?: boolean }) {
  return null;
}
