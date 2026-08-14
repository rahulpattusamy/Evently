import Image from "next/image";
import Link from "next/link";
import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { vendors } from "@/lib/data/vendors";
import { cities } from "@/lib/data/cities";
import { Vendor } from "@/lib/types";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

const columns: DataTableColumn<Vendor>[] = [
  {
    key: "business",
    header: "Business",
    render: (v) => (
      <div className="flex items-center gap-3">
        <Image src={v.logoImage} alt={v.businessName} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className="font-medium text-charcoal">{v.businessName}</p>
          <p className="text-xs text-muted-foreground">{v.ownerName}</p>
        </div>
      </div>
    ),
  },
  { key: "category", header: "Category", render: (v) => <span className="capitalize text-muted-foreground">{v.categorySlug.replace(/-/g, " ")}</span> },
  { key: "city", header: "City", render: (v) => cityName(v.citySlug) },
  { key: "rating", header: "Rating", render: (v) => `${v.rating.toFixed(1)} ★ (${v.reviewCount})` },
  { key: "price", header: "Starting Price", render: (v) => `₹${formatINR(v.startingPrice)}` },
  { key: "verified", header: "Verified", render: (v) => <StatusBadge status={v.verified ? "verified" : "unverified"} /> },
  {
    key: "actions",
    header: "",
    render: (v) => (
      <Link href={`/vendors/${v.id}`} className="text-xs font-medium text-rose hover:text-burgundy">
        View →
      </Link>
    ),
  },
];

export default function AdminVendorsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Vendors</h1>
        <p className="text-sm text-muted-foreground">{vendors.length} vendors listed on Evently.</p>
      </div>
      <DataTable columns={columns} data={vendors} rowKey={(v) => v.id} emptyTitle="No vendors yet" />
    </div>
  );
}
