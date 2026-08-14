import Image from "next/image";
import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { bookings } from "@/lib/data/bookings";
import { cities } from "@/lib/data/cities";
import { Booking } from "@/lib/types";

function cityName(slug: string) {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}

const columns: DataTableColumn<Booking>[] = [
  {
    key: "target",
    header: "Target",
    render: (b) => (
      <div className="flex items-center gap-3">
        <Image src={b.targetImage} alt={b.targetName} width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
        <div>
          <p className="font-medium text-charcoal">{b.targetName}</p>
          <p className="text-xs text-muted-foreground capitalize">{b.targetType}</p>
        </div>
      </div>
    ),
  },
  { key: "package", header: "Package", render: (b) => b.packageName },
  { key: "date", header: "Event Date", render: (b) => new Date(b.eventDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
  { key: "guests", header: "Guests", render: (b) => b.guests },
  { key: "amount", header: "Amount", render: (b) => `₹${formatINR(b.amountPaid)} / ₹${formatINR(b.amount)}` },
  { key: "city", header: "City", render: (b) => cityName(b.citySlug) },
  { key: "status", header: "Status", render: (b) => <StatusBadge status={b.status} /> },
];

export default function AdminBookingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Bookings</h1>
        <p className="text-sm text-muted-foreground">{bookings.length} bookings placed across the platform.</p>
      </div>
      <DataTable columns={columns} data={bookings} rowKey={(b) => b.id} emptyTitle="No bookings yet" />
    </div>
  );
}
