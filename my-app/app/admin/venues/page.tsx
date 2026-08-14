import Image from "next/image";
import Link from "next/link";
import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { venues } from "@/lib/data/venues";
import { cities } from "@/lib/data/cities";
import { Venue } from "@/lib/types";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

const columns: DataTableColumn<Venue>[] = [
  {
    key: "venue",
    header: "Venue",
    render: (v) => (
      <div className="flex items-center gap-3">
        <Image src={v.images[0]} alt={v.name} width={44} height={36} className="h-9 w-11 rounded-lg object-cover" />
        <span className="font-medium text-charcoal">{v.name}</span>
      </div>
    ),
  },
  { key: "type", header: "Type", render: (v) => v.venueType },
  { key: "city", header: "City", render: (v) => cityName(v.citySlug) },
  { key: "capacity", header: "Capacity", render: (v) => `${v.minGuests}–${v.maxGuests}` },
  { key: "price", header: "Starting Price", render: (v) => `₹${formatINR(v.startingPrice)}` },
  { key: "rating", header: "Rating", render: (v) => `${v.rating.toFixed(1)} ★` },
  { key: "verified", header: "Verified", render: (v) => <StatusBadge status={v.verified ? "verified" : "unverified"} /> },
  {
    key: "actions",
    header: "",
    render: (v) => (
      <Link href={`/venues/${v.id}`} className="text-xs font-medium text-rose hover:text-burgundy">
        View →
      </Link>
    ),
  },
];

export default function AdminVenuesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Venues</h1>
        <p className="text-sm text-muted-foreground">{venues.length} venues listed on Evently.</p>
      </div>
      <DataTable columns={columns} data={venues} rowKey={(v) => v.id} emptyTitle="No venues yet" />
    </div>
  );
}
