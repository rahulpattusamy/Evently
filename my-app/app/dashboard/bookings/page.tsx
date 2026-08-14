import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/data/users";
import { getBookingsByUser } from "@/lib/data/bookings";
import { Booking } from "@/lib/types";

export const metadata = {
  title: "My Bookings | Evently",
};

export default function DashboardBookingsPage() {
  const bookings = getBookingsByUser(currentUser.id);

  const columns: DataTableColumn<Booking>[] = [
    {
      key: "target",
      header: "Booking",
      render: (b) => (
        <div className="flex items-center gap-3">
          <div
            className="h-11 w-11 shrink-0 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${b.targetImage})` }}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-charcoal">{b.targetName}</p>
            <Badge variant="outline" className="mt-0.5 capitalize">{b.targetType}</Badge>
          </div>
        </div>
      ),
    },
    { key: "package", header: "Package", render: (b) => <span className="text-sm">{b.packageName}</span> },
    {
      key: "date",
      header: "Event Date",
      render: (b) => (
        <span className="text-sm">
          {new Date(b.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    { key: "guests", header: "Guests", render: (b) => <span className="text-sm">{b.guests}</span> },
    {
      key: "amount",
      header: "Amount",
      render: (b) => (
        <span className="text-sm font-medium text-charcoal">
          ₹{formatINR(b.amountPaid)} <span className="text-muted-foreground">/ ₹{formatINR(b.amount)}</span>
        </span>
      ),
    },
    { key: "status", header: "Status", render: (b) => <StatusBadge status={b.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">My Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">All your confirmed and in-progress bookings.</p>
      </div>
      <DataTable
        columns={columns}
        data={bookings}
        rowKey={(b) => b.id}
        emptyTitle="No bookings yet"
        emptyDescription="Once you book a venue or vendor, it will show up here."
      />
    </div>
  );
}
