import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { getVendorById } from "@/lib/data/vendors";
import { getBookingsForVendor } from "@/lib/data/bookings";
import { users } from "@/lib/data/users";
import { Booking } from "@/lib/types";

export default function VendorBookingsPage() {
  const vendor = getVendorById("vendor-1")!;
  const vendorBookings = getBookingsForVendor(vendor.id);

  const columns: DataTableColumn<Booking>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (b) => users.find((u) => u.id === b.userId)?.name ?? "Customer",
    },
    { key: "package", header: "Package", render: (b) => b.packageName },
    {
      key: "date",
      header: "Event Date",
      render: (b) => `${b.eventDate} · ${b.eventTime}`,
    },
    { key: "guests", header: "Guests", render: (b) => b.guests },
    {
      key: "amount",
      header: "Amount",
      render: (b) => `₹${formatINR(b.amountPaid)} / ₹${formatINR(b.amount)}`,
    },
    { key: "status", header: "Status", render: (b) => <StatusBadge status={b.status} /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Bookings</h1>
      <DataTable
        columns={columns}
        data={vendorBookings}
        rowKey={(b) => b.id}
        emptyTitle="No bookings yet"
        emptyDescription="Confirmed bookings from customers will appear here."
      />
    </div>
  );
}
