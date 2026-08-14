import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { bookings } from "@/lib/data/bookings";
import { Booking } from "@/lib/types";

const columns: DataTableColumn<Booking>[] = [
  { key: "ref", header: "Booking Ref", render: (b) => <span className="font-mono text-xs text-muted-foreground">#{b.id.toUpperCase()}</span> },
  { key: "target", header: "Target", render: (b) => <span className="font-medium text-charcoal">{b.targetName}</span> },
  { key: "paid", header: "Amount Paid", render: (b) => `₹${formatINR(b.amountPaid)}` },
  { key: "due", header: "Amount Due", render: (b) => `₹${formatINR(b.amount - b.amountPaid)}` },
  {
    key: "status",
    header: "Payment Status",
    render: (b) => <StatusBadge status={b.amountPaid >= b.amount ? "completed" : "pending"} />,
  },
  { key: "date", header: "Date", render: (b) => new Date(b.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
];

export default function AdminPaymentsPage() {
  const totalCollected = bookings.reduce((sum, b) => sum + b.amountPaid, 0);
  const totalDue = bookings.reduce((sum, b) => sum + (b.amount - b.amountPaid), 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Payments</h1>
        <p className="text-sm text-muted-foreground">
          ₹{formatINR(totalCollected)} collected · ₹{formatINR(totalDue)} outstanding
        </p>
      </div>
      <DataTable columns={columns} data={bookings} rowKey={(b) => b.id} emptyTitle="No payments yet" />
    </div>
  );
}
