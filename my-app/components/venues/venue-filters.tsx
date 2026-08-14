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
import { venueTypes } from "@/lib/data/venues";

const PRICE_OPTIONS = [
  { label: "Any Price", value: "" },
  { label: "Under ₹50,000", value: "50000" },
  { label: "Under ₹1,00,000", value: "100000" },
  { label: "Under ₹2,00,000", value: "200000" },
  { label: "Under ₹3,00,000", value: "300000" },
];

const CAPACITY_OPTIONS = [
  { label: "Any Capacity", value: "" },
  { label: "50+ Guests", value: "50" },
  { label: "150+ Guests", value: "150" },
  { label: "300+ Guests", value: "300" },
  { label: "500+ Guests", value: "500" },
];

const RATING_OPTIONS = [
  { label: "Any Rating", value: "" },
  { label: "4.5 & above", value: "4.5" },
  { label: "4.0 & above", value: "4.0" },
  { label: "3.5 & above", value: "3.5" },
];

function FilterFields() {
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
  const venueType = searchParams.get("venueType") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const minCapacity = searchParams.get("minCapacity") ?? "";
  const minRating = searchParams.get("minRating") ?? "";
  const ac = searchParams.get("ac") === "true";
  const parking = searchParams.get("parking") === "true";
  const catering = searchParams.get("catering") === "true";
  const verified = searchParams.get("verified") === "true";

  return (
    <div className="space-y-5">
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
        <label className="text-xs font-semibold text-charcoal">Venue Type</label>
        <Select value={venueType || "all"} onValueChange={(v) => set("venueType", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {venueTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-charcoal">Capacity</label>
        <Select value={minCapacity || "any"} onValueChange={(v) => set("minCapacity", v === "any" ? "" : v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CAPACITY_OPTIONS.map((o) => (
              <SelectItem key={o.label} value={o.value || "any"}>{o.label}</SelectItem>
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
        <label className="text-xs font-semibold text-charcoal">Amenities</label>
        <div className="flex items-center gap-2">
          <Checkbox id="ac" checked={ac} onCheckedChange={(v) => set("ac", !!v)} />
          <label htmlFor="ac" className="text-sm text-charcoal">Air Conditioning</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="parking" checked={parking} onCheckedChange={(v) => set("parking", !!v)} />
          <label htmlFor="parking" className="text-sm text-charcoal">Parking Available</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="catering" checked={catering} onCheckedChange={(v) => set("catering", !!v)} />
          <label htmlFor="catering" className="text-sm text-charcoal">Catering Included</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="verified" checked={verified} onCheckedChange={(v) => set("verified", !!v)} />
          <label htmlFor="verified" className="text-sm text-charcoal">Verified Venues Only</label>
        </div>
      </div>
    </div>
  );
}

export function VenueFiltersDesktop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-32 space-y-4 rounded-2xl border border-border bg-white p-5">
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
        <FilterFields />
      </div>
    </aside>
  );
}

export function VenueFiltersMobile() {
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
          <FilterFields />
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
