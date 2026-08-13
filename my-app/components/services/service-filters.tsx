"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { cities } from "@/lib/data/cities";
import { eventTypes } from "@/lib/data/event-types";
import { categories, categoryGroups } from "@/lib/data/categories";

const PRICE_OPTIONS = [
  { label: "Any Price", value: "" },
  { label: "Under ₹10,000", value: "10000" },
  { label: "Under ₹25,000", value: "25000" },
  { label: "Under ₹50,000", value: "50000" },
  { label: "Under ₹1,00,000", value: "100000" },
];

const RATING_OPTIONS = [
  { label: "Any Rating", value: "" },
  { label: "4.5 & above", value: "4.5" },
  { label: "4.0 & above", value: "4.0" },
  { label: "3.5 & above", value: "3.5" },
];

function FilterFields({ hideCategory }: { hideCategory?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function set(key: string, value: string | boolean) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const city = searchParams.get("city") ?? "";
  const eventType = searchParams.get("eventType") ?? "";
  const categorySlug = searchParams.get("category") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const minRating = searchParams.get("minRating") ?? "";
  const verified = searchParams.get("verified") === "true";
  const available = searchParams.get("available") === "true";

  return (
    <div className="space-y-5">
      {!hideCategory && (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-charcoal">Category</label>
          <Select value={categorySlug || "all"} onValueChange={(v) => set("category", v === "all" ? "" : v)}>
            <SelectTrigger className="w-full"><SelectValue placeholder="All Categories" /></SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="all">All Categories</SelectItem>
              {categoryGroups.map((group) => (
                <div key={group}>
                  {categories
                    .filter((c) => c.group === group)
                    .map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                    ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-charcoal">Event Type</label>
        <Select value={eventType || "all"} onValueChange={(v) => set("eventType", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue placeholder="All Events" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {eventTypes.map((e) => (
              <SelectItem key={e.slug} value={e.slug}>{e.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-charcoal">Location</label>
        <Select value={city || "all"} onValueChange={(v) => set("city", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue placeholder="All Cities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-charcoal">Price</label>
        <Select value={maxPrice || "any"} onValueChange={(v) => set("maxPrice", v === "any" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {PRICE_OPTIONS.map((o) => (
              <SelectItem key={o.label} value={o.value || "any"}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-charcoal">Rating</label>
        <Select value={minRating || "any"} onValueChange={(v) => set("minRating", v === "any" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {RATING_OPTIONS.map((o) => (
              <SelectItem key={o.label} value={o.value || "any"}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold text-charcoal">Availability</label>
        <div className="flex items-center gap-2">
          <Checkbox id="available" checked={available} onCheckedChange={(v) => set("available", !!v)} />
          <label htmlFor="available" className="text-sm text-charcoal">Available on selected date</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="verified" checked={verified} onCheckedChange={(v) => set("verified", !!v)} />
          <label htmlFor="verified" className="text-sm text-charcoal">Verified Vendors Only</label>
        </div>
      </div>
    </div>
  );
}

export function ServiceFiltersDesktop({ hideCategory }: { hideCategory?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 space-y-4 rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-heading text-sm font-bold text-charcoal">
            <Filter className="h-4 w-4" /> Filters
          </h3>
          {hasFilters && (
            <button
              onClick={() => router.push(pathname)}
              className="flex items-center gap-1 text-xs text-rose hover:text-burgundy"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
        <FilterFields hideCategory={hideCategory} />
      </div>
    </aside>
  );
}

export function ServiceFiltersMobile({ hideCategory }: { hideCategory?: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-1.5 lg:hidden">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          <FilterFields hideCategory={hideCategory} />
        </div>
        <SheetFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              router.push(pathname);
              setOpen(false);
            }}
          >
            Clear All
          </Button>
          <Button
            className="flex-1 bg-rose text-white hover:bg-burgundy"
            onClick={() => setOpen(false)}
          >
            Show Results
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
