import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { getVendorById } from "@/lib/data/vendors";
import { getBookingsForVendor } from "@/lib/data/bookings";
import { Booking } from "@/lib/types";

export default function VendorPaymentsPage() {
  const vendor = getVendorById("vendor-1")!;
  const vendorBookings = getBookingsForVendor(vendor.id);
  const totalPaid = vendorBookings.reduce((s, b) => s + b.amountPaid, 0);

  const columns: DataTableColumn<Booking>[] = [
    { key: "id", header: "Booking", render: (b) => b.id },
    { key: "date", header: "Event Date", render: (b) => b.eventDate },
    { key: "amount", header: "Total Value", render: (b) => `₹${formatINR(b.amount)}` },
    { key: "paid", header: "Paid Out", render: (b) => `₹${formatINR(b.amountPaid)}` },
    { key: "status", header: "Status", render: (b) => <StatusBadge status={b.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Payments</h1>
        <div className="rounded-xl bg-blush px-4 py-2 text-sm font-semibold text-burgundy">
          Total Received: ₹{formatINR(totalPaid)}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={vendorBookings}
        rowKey={(b) => b.id}
        emptyTitle="No payments yet"
        emptyDescription="Payouts from confirmed bookings will appear here."
      />
    </div>
  );
}
