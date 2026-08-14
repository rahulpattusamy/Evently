import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { formatINR } from "@/components/shared/price-display";
import { currentUser } from "@/lib/data/users";
import { getBookingsByUser } from "@/lib/data/bookings";
import { Booking } from "@/lib/types";

export const metadata = {
  title: "Payments | Evently",
};

export default function DashboardPaymentsPage() {
  const bookings = getBookingsByUser(currentUser.id).filter((b) => b.amountPaid > 0);

  const columns: DataTableColumn<Booking>[] = [
    { key: "target", header: "Paid To", render: (b) => <span className="text-sm font-semibold text-charcoal">{b.targetName}</span> },
    {
      key: "date",
      header: "Payment Date",
      render: (b) => (
        <span className="text-sm">
          {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    { key: "amount", header: "Amount Paid", render: (b) => <span className="text-sm font-medium text-charcoal">₹{formatINR(b.amountPaid)}</span> },
    {
      key: "balance",
      header: "Balance Due",
      render: (b) => (
        <span className="text-sm text-muted-foreground">
          {b.amount - b.amountPaid > 0 ? `₹${formatINR(b.amount - b.amountPaid)}` : "Paid in full"}
        </span>
      ),
    },
  ];

  const totalPaid = bookings.reduce((sum, b) => sum + b.amountPaid, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Total paid across all bookings: <span className="font-semibold text-charcoal">₹{formatINR(totalPaid)}</span>
        </p>
      </div>
      <DataTable
        columns={columns}
        data={bookings}
        rowKey={(b) => b.id}
        emptyTitle="No payments yet"
        emptyDescription="Payments you make toward bookings will show up here."
      />
    </div>
  );
}
