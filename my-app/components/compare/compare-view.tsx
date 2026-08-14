"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/shared/empty-state";
import { VerifiedBadge } from "@/components/shared/verified-badge";
import { formatINR } from "@/components/shared/price-display";
import { getVenueById, venues } from "@/lib/data/venues";
import { getVendorById, vendors } from "@/lib/data/vendors";
import { getCityBySlug } from "@/lib/data/cities";
import type { Venue, Vendor } from "@/lib/types";

const MAX_ITEMS = 4;

type CompareItem =
  | { kind: "venue"; data: Venue }
  | { kind: "vendor"; data: Vendor };

function resolveId(id: string): CompareItem | null {
  if (id.startsWith("venue-")) {
    const v = getVenueById(id);
    return v ? { kind: "venue", data: v } : null;
  }
  if (id.startsWith("vendor-")) {
    const v = getVendorById(id);
    return v ? { kind: "vendor", data: v } : null;
  }
  return null;
}

export function CompareView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const items = ids.map(resolveId).filter((i): i is CompareItem => !!i).slice(0, MAX_ITEMS);

  if (items.length === 0) {
    return <Picker onCompare={(ids) => router.push(`/compare?ids=${ids.join(",")}`)} />;
  }

  function removeItem(id: string) {
    const next = ids.filter((x) => x !== id);
    router.push(next.length ? `/compare?ids=${next.join(",")}` : "/compare");
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="w-36" />
            {items.map((item) => {
              const id = item.data.id;
              const name = item.kind === "venue" ? item.data.name : item.data.businessName;
              const image = item.kind === "venue" ? item.data.images[0] : item.data.coverImage;
              return (
                <th key={id} className="min-w-[200px] px-3 pb-4 text-left align-bottom">
                  <div className="relative overflow-hidden rounded-xl border border-border">
                    <button
                      onClick={() => removeItem(id)}
                      aria-label="Remove"
                      className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
                    >
                      <X className="h-3.5 w-3.5 text-charcoal" />
                    </button>
                    <div className="relative h-28 w-full">
                      <Image src={image} alt={name} fill className="object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="line-clamp-1 font-heading text-sm font-bold text-charcoal">
                        {name}
                      </p>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <Row label="Price">
            {items.map((item) => (
              <Cell key={item.data.id}>
                ₹{formatINR(item.kind === "venue" ? item.data.startingPrice : item.data.startingPrice)}
              </Cell>
            ))}
          </Row>
          <Row label="Rating">
            {items.map((item) => (
              <Cell key={item.data.id}>
                ⭐ {item.data.rating.toFixed(1)}
              </Cell>
            ))}
          </Row>
          <Row label="Reviews">
            {items.map((item) => (
              <Cell key={item.data.id}>{item.data.reviewCount} reviews</Cell>
            ))}
          </Row>
          <Row label="Location">
            {items.map((item) => (
              <Cell key={item.data.id}>
                {getCityBySlug(item.data.citySlug)?.name}
              </Cell>
            ))}
          </Row>
          <Row label={items.some((i) => i.kind === "venue") ? "Capacity / Services" : "Services"}>
            {items.map((item) => (
              <Cell key={item.data.id}>
                {item.kind === "venue"
                  ? `${item.data.minGuests}–${item.data.maxGuests} guests`
                  : item.data.services.slice(0, 3).join(", ")}
              </Cell>
            ))}
          </Row>
          <Row label={items.some((i) => i.kind === "venue") ? "Amenities" : "Packages"}>
            {items.map((item) => (
              <Cell key={item.data.id}>
                {item.kind === "venue"
                  ? item.data.amenities.slice(0, 3).join(", ")
                  : item.data.packages.map((p) => p.name).join(", ")}
              </Cell>
            ))}
          </Row>
          <Row label="Verified">
            {items.map((item) => (
              <Cell key={item.data.id}>
                {item.data.verified ? <VerifiedBadge /> : <span className="text-muted-foreground">Not verified</span>}
              </Cell>
            ))}
          </Row>
          <Row label="">
            {items.map((item) => (
              <Cell key={item.data.id}>
                <Button asChild className="w-full bg-rose text-white hover:bg-burgundy">
                  <Link href={item.kind === "venue" ? `/venues/${item.data.id}` : `/vendors/${item.data.id}`}>
                    View Details
                  </Link>
                </Button>
              </Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th className="sticky left-0 bg-warm-white px-3 py-3 text-left text-xs font-semibold text-muted-foreground">
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-t border-border px-3 py-3 text-sm text-charcoal">{children}</td>
  );
}

function Picker({ onCompare }: { onCompare: (ids: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const pool = useMemo(
    () => [
      ...venues.slice(0, 6).map((v) => ({ id: v.id, name: v.name, image: v.images[0], type: "Venue" })),
      ...vendors.slice(0, 6).map((v) => ({ id: v.id, name: v.businessName, image: v.coverImage, type: "Vendor" })),
    ],
    []
  );

  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : s.length < MAX_ITEMS ? [...s, id] : s
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <EmptyState
        title="Nothing selected to compare yet"
        description="Pick up to 4 venues or vendors below and compare price, rating, capacity and more side by side."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {pool.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white p-3 text-sm"
          >
            <Checkbox
              checked={selected.includes(item.id)}
              onCheckedChange={() => toggle(item.id)}
            />
            <div className="min-w-0">
              <p className="line-clamp-1 font-medium text-charcoal">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.type}</p>
            </div>
          </label>
        ))}
      </div>
      <Button
        disabled={selected.length < 2}
        onClick={() => onCompare(selected)}
        className="bg-rose text-white hover:bg-burgundy"
      >
        Compare Selected ({selected.length})
      </Button>
    </div>
  );
}
