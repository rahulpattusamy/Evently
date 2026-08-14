"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Store, Sparkles, MapPin, PartyPopper } from "lucide-react";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { cities } from "@/lib/data/cities";
import { eventTypes } from "@/lib/data/event-types";
import { categories } from "@/lib/data/categories";

interface Group {
  key: string;
  label: string;
  icon: typeof Building2;
  items: { id: string; label: string; sublabel?: string; href: string }[];
}

function buildGroups(query: string): Group[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const matchedVenues = venues
    .filter((v) => v.name.toLowerCase().includes(q))
    .slice(0, 3)
    .map((v) => ({ id: v.id, label: v.name, sublabel: v.venueType, href: `/venues/${v.id}` }));

  const matchedVendors = vendors
    .filter((v) => v.businessName.toLowerCase().includes(q))
    .slice(0, 3)
    .map((v) => ({ id: v.id, label: v.businessName, sublabel: v.tagline, href: `/vendors/${v.id}` }));

  const matchedServices = categories
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 3)
    .map((c) => ({ id: c.slug, label: c.name, sublabel: c.group, href: `/services/${c.slug}` }));

  const matchedCities = cities
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 3)
    .map((c) => ({ id: c.slug, label: c.name, sublabel: c.state, href: `/venues?city=${c.slug}` }));

  const matchedEvents = eventTypes
    .filter((e) => e.name.toLowerCase().includes(q))
    .slice(0, 3)
    .map((e) => ({ id: e.slug, label: e.name, sublabel: e.group, href: `/events/${e.slug}` }));

  const groups: Group[] = [
    { key: "venues", label: "Venues", icon: Building2, items: matchedVenues },
    { key: "vendors", label: "Vendors", icon: Store, items: matchedVendors },
    { key: "services", label: "Services", icon: Sparkles, items: matchedServices },
    { key: "cities", label: "Cities", icon: MapPin, items: matchedCities },
    { key: "events", label: "Events", icon: PartyPopper, items: matchedEvents },
  ];

  return groups.filter((g) => g.items.length > 0);
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function SearchAutocomplete({
  value,
  onChange,
  onSubmit,
  placeholder = "Search venues, vendors, services, cities...",
  className,
  inputClassName,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const groups = useMemo(() => buildGroups(value), [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={containerRef} className={className ?? "relative w-full"}>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setOpen(false);
            onSubmit(value);
          }
        }}
        placeholder={placeholder}
        className={
          inputClassName ??
          "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted-foreground focus:border-rose focus:outline-none"
        }
      />
      {open && groups.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          {groups.map((group) => (
            <div key={group.key} className="border-b border-border p-2 last:border-0">
              <p className="px-2 pb-1 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                {group.label}
              </p>
              {group.items.map((item) => (
                <button
                  key={`${group.key}-${item.id}`}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-blush/50"
                >
                  <group.icon className="h-4 w-4 shrink-0 text-rose" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-charcoal">
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.sublabel}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
