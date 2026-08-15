"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin, PartyPopper, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/data/cities";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import { useStickySearch } from "@/components/layout/sticky-search-context";

const EVENT_OPTIONS = [
  { value: "weddings", label: "Wedding" },
  { value: "birthdays", label: "Birthday" },
  { value: "corporate-meetings", label: "Corporate Event" },
  { value: "college-cultural-events", label: "College Event" },
  { value: "family-functions", label: "Family Event" },
  { value: "private-parties", label: "Private Party" },
];

export function SearchBar() {
  const router = useRouter();
  const [eventType, setEventType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { isCompactSearchActive, setCompactSearchActive } = useStickySearch();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const card = cardRef.current;
      if (!card) return;
      setCompactSearchActive(card.getBoundingClientRect().bottom < 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      setCompactSearchActive(false);
    };
  }, [setCompactSearchActive]);

  function handleSearch() {
    const params = new URLSearchParams();
    if (eventType) params.set("eventType", eventType);
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    if (guests) params.set("guests", guests);
    router.push(`/services?${params.toString()}`);
  }

  function handleQuerySubmit(value: string) {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    router.push(`/search?${params.toString()}`);
  }

  const compactBar = (
    <div
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-white shadow-md transition-all duration-300 ${
        isCompactSearchActive
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex-1">
          <SearchAutocomplete
            value={query}
            onChange={setQuery}
            onSubmit={handleQuerySubmit}
            placeholder="Search venues, vendors or events..."
          />
        </div>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="hidden w-40 shrink-0 sm:flex">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="h-10 shrink-0 bg-rose text-white hover:bg-burgundy"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Find Services</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      {mounted && createPortal(compactBar, document.body)}

      <div
        ref={cardRef}
        className="w-full rounded-3xl border border-border/60 bg-white/90 p-2 shadow-2xl shadow-charcoal/10 backdrop-blur-sm sm:p-2.5"
      >
        <div className="mb-2 px-1.5 pt-1.5 sm:hidden">
          <SearchAutocomplete
            value={query}
            onChange={setQuery}
            onSubmit={handleQuerySubmit}
            placeholder='Try "wedding halls in Chennai"'
          />
        </div>

        <div className="flex flex-col divide-y divide-border/70 rounded-[1.35rem] bg-white sm:flex-row sm:items-stretch sm:divide-x sm:divide-y-0 sm:rounded-full sm:ring-1 sm:ring-border/70">
          <div className="group flex flex-1 flex-col justify-center gap-1 rounded-t-[1.35rem] px-5 py-2.5 transition-colors hover:bg-blush/40 sm:rounded-t-none sm:rounded-l-full">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
              Event
            </span>
            <div className="flex items-center gap-2">
              <PartyPopper className="h-4 w-4 shrink-0 text-rose" />
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="h-auto w-full justify-between border-0 bg-transparent p-0 text-sm font-medium text-charcoal shadow-none focus-visible:ring-0">
                  <SelectValue placeholder="Any event" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="group flex flex-1 flex-col justify-center gap-1 px-5 py-2.5 transition-colors hover:bg-blush/40">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
              Location
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-rose" />
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-auto w-full justify-between border-0 bg-transparent p-0 text-sm font-medium text-charcoal shadow-none focus-visible:ring-0">
                  <SelectValue placeholder="Any city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="group hidden flex-1 flex-col justify-center gap-1 px-5 py-2.5 transition-colors hover:bg-blush/40 lg:flex">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
              Date
            </span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 shrink-0 text-rose" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-charcoal outline-none [color-scheme:light]"
              />
            </div>
          </div>

          <div className="group flex flex-1 flex-col justify-center gap-1 px-5 py-2.5 transition-colors hover:bg-blush/40">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
              Guests
            </span>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-rose" />
              <input
                type="number"
                min={1}
                placeholder="e.g. 150"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-charcoal outline-none placeholder:text-muted-foreground placeholder:font-normal"
              />
            </div>
          </div>

          <div className="rounded-b-[1.35rem] p-1.5 sm:flex sm:items-center sm:rounded-b-none sm:rounded-r-full sm:p-2">
            <Button
              onClick={handleSearch}
              className="h-11 w-full rounded-full bg-gradient-to-r from-rose to-burgundy px-6 text-white shadow-lg shadow-rose/30 transition-transform hover:scale-[1.02] hover:from-rose hover:to-burgundy sm:w-auto"
            >
              <Search className="h-4 w-4" />
              <span className="sm:hidden lg:inline">Find Services</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
