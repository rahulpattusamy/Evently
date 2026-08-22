"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

/* ─── Icon image map (matches the evently_service_icons folder) ─── */
function getCategoryIconImage(slug: string): string {
  switch (slug) {
    case "wedding-planners":
      return "/evently_service_icons/wedding-planners.png";
    case "event-planners":
    case "cabs-vans-rental":
    case "event-equipment":
    case "anchors-hosts":
      return "/evently_service_icons/event-planners.png";
    case "decorators":
    case "stage-decorators":
    case "backdrop-designers":
    case "floral-decorators":
    case "stages":
    case "furniture-rentals":
    case "lighting":
      return "/evently_service_icons/decorators.png";
    case "caterers":
    case "chairs":
    case "tables":
    case "vessels-chairs-rental":
      return "/evently_service_icons/caterers.png";
    case "bakers":
      return "/evently_service_icons/bakers.png";
    case "specialty-food-vendors":
      return "/evently_service_icons/specialty-food-vendors.png";
    case "photographers":
    case "videographers":
    case "drone-photography":
    case "projectors":
    case "led-screens":
      return "/evently_service_icons/photographers.png";
    case "djs":
    case "sound-systems":
    case "singers":
    case "dance-groups":
      return "/evently_service_icons/djs.png";
    case "makeup-artists":
    case "hair-stylists":
      return "/evently_service_icons/makeup-artists.png";
    case "mehendi-artists":
      return "/evently_service_icons/mehendi-artists.png";
    case "bridal-wear":
      return "/evently_service_icons/bridal-wear.png";
    case "groom-wear":
      return "/evently_service_icons/groom-wear.png";
    case "gifts":
      return "/evently_service_icons/gifts-favors.png";
    case "banner-designers":
    case "banner-printing":
      return "/evently_service_icons/banner-designers.png";
    case "invitation-designers":
    case "presentation-designers":
    case "poster-designers":
    case "flyer-designers":
    case "stage-backdrop-designers":
    case "digital-creative-designers":
    case "social-media-creative-designers":
    case "invitation-printing":
    case "poster-printing":
    case "brochure-printing":
    case "standee-printing":
    case "certificate-printing":
      return "/evently_service_icons/invitation-designers.png";
    default:
      return "/evently_service_icons/wedding-planners.png";
  }
}

const PRICE_OPTIONS = [
  { label: "Any price", value: "any" },
  { label: "Under ₹10,000", value: "10000" },
  { label: "Under ₹25,000", value: "25000" },
  { label: "Under ₹50,000", value: "50000" },
  { label: "Under ₹1,00,000", value: "100000" },
];

const RATING_OPTIONS = [
  { label: "Any rating", value: "any" },
  { label: "4.5+ rating", value: "4.5" },
  { label: "4.0+ rating", value: "4.0" },
  { label: "3.5+ rating", value: "3.5" },
];

const SORT_OPTIONS = [
  { label: "Top rated", value: "rating" },
  { label: "Price: low → high", value: "price_asc" },
  { label: "Price: high → low", value: "price_desc" },
  { label: "Most reviewed", value: "reviews" },
];

interface CategoryStickyHeaderProps {
  categorySlug: string;
  categoryName: string;
  categoryGroup: string;
  categoryDescription: string;
  resultCount: number;
  verifiedCount: number;
  avgRating: number;
  avgPrice: number;
}

export function CategoryStickyHeader({
  categorySlug,
  categoryName,
  categoryGroup,
  categoryDescription,
  resultCount,
  verifiedCount,
  avgRating,
  avgPrice,
}: CategoryStickyHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const iconImage = getCategoryIconImage(categorySlug);

  function set(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function setSearch(q: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!q) {
      params.delete("q");
    } else {
      params.set("q", q);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const city = searchParams.get("city") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const minRating = searchParams.get("minRating") ?? "";
  const sort = searchParams.get("sort") ?? "rating";
  const verified = searchParams.get("verified") === "true";
  const q = searchParams.get("q") ?? "";

  const triggerClass =
    "rounded-full border border-border bg-white h-9 px-4 text-sm font-semibold text-charcoal hover:border-rose/50 shadow-sm focus:ring-0 focus-visible:ring-0 focus-visible:border-rose transition-colors";

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row: back + icon + title */}
        <div className="flex items-center gap-3 py-3">
          {/* Back arrow */}
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-charcoal transition-colors hover:border-rose/40 hover:text-rose shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Category icon image — 100px, no circle/border */}
          <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden">
            <Image
              src={iconImage}
              alt={categoryName}
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>

          {/* Title + meta */}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose">
              {categoryGroup}
            </span>
            <h1 className="font-heading text-xl font-extrabold leading-tight text-charcoal sm:text-2xl">
              {categoryName}
            </h1>
            {categoryDescription && (
              <p className="mt-0.5 text-xs text-charcoal/50 leading-relaxed line-clamp-1 hidden sm:block">
                {categoryDescription}
              </p>
            )}
          </div>

          {/* Stats — right side */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <div className="flex flex-col items-center">
              <span className="text-base font-extrabold text-charcoal leading-none">{resultCount}</span>
              <span className="text-[10px] text-charcoal/40 font-medium mt-0.5">Vendors</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-base font-extrabold text-emerald-600 leading-none">{verifiedCount}</span>
              <span className="text-[10px] text-charcoal/40 font-medium mt-0.5">Verified</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-base font-extrabold text-gold leading-none">{avgRating.toFixed(1)}★</span>
              <span className="text-[10px] text-charcoal/40 font-medium mt-0.5">Avg rating</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-base font-extrabold text-charcoal leading-none">₹{new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 0 }).format(avgPrice)}</span>
              <span className="text-[10px] text-charcoal/40 font-medium mt-0.5">Avg price</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 pb-3">
          {/* City */}
          <Select
            value={city || "any"}
            onValueChange={(v) => set("city", v === "any" ? "" : v)}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">All cities</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price */}
          <Select
            value={maxPrice || "any"}
            onValueChange={(v) => set("maxPrice", v)}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating */}
          <Select
            value={minRating || "any"}
            onValueChange={(v) => set("minRating", v)}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              {RATING_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Verified toggle */}
          <button
            onClick={() => set("verified", verified ? "" : "true")}
            className={cn(
              "h-9 cursor-pointer rounded-full border px-4 text-sm font-semibold transition-colors shadow-sm",
              verified
                ? "border-charcoal bg-charcoal text-white"
                : "border-border bg-white text-charcoal hover:border-rose/40"
            )}
          >
            Verified only
          </button>

          {/* Search — after Verified only */}
          <div className="relative flex items-center min-w-[220px] max-w-[280px] flex-1">
            <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
            <input
              type="text"
              value={q}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              className="h-9 w-full rounded-full border border-border bg-white pl-9 pr-4 text-sm text-charcoal placeholder:text-muted-foreground/60 shadow-sm outline-none focus:border-rose transition-colors"
            />
          </div>

          {/* Sort — pushed right */}
          <div className="ml-auto">
            <Select
              value={sort}
              onValueChange={(v) => set("sort", v)}
            >
              <SelectTrigger className={triggerClass}>
                <span className="text-muted-foreground font-normal mr-1">Sort:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Legacy exports so existing imports don't break ─── */
export function ServiceFiltersBar(_props: { hideCategory?: boolean }) {
  return null;
}
export function ServiceFiltersDesktop(_props: { hideCategory?: boolean }) {
  return null;
}
export function ServiceFiltersMobile(_props: { hideCategory?: boolean }) {
  return null;
}
