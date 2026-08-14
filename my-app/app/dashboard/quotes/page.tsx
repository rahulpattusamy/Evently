import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { currentUser } from "@/lib/data/users";
import { getQuotesByUser } from "@/lib/data/quote-requests";
import { QuoteRequest } from "@/lib/types";

export const metadata = {
  title: "Quote Requests | Evently",
};

export default function DashboardQuotesPage() {
  const quotes = getQuotesByUser(currentUser.id);

  const columns: DataTableColumn<QuoteRequest>[] = [
    { key: "target", header: "Vendor", render: (q) => <span className="text-sm font-semibold text-charcoal">{q.targetName}</span> },
    { key: "eventType", header: "Event Type", render: (q) => <span className="text-sm capitalize">{q.eventType.replace(/-/g, " ")}</span> },
    {
      key: "date",
      header: "Event Date",
      render: (q) => (
        <span className="text-sm">
          {new Date(q.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    { key: "budget", header: "Budget", render: (q) => <span className="text-sm">₹{formatINR(q.budget)}</span> },
    {
      key: "quoted",
      header: "Quoted Amount",
      render: (q) => (
        <span className="text-sm font-medium text-charcoal">
          {q.quotedAmount ? `₹${formatINR(q.quotedAmount)}` : "—"}
        </span>
      ),
    },
    { key: "status", header: "Status", render: (q) => <StatusBadge status={q.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Quote Requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track responses from vendors you&apos;ve contacted.</p>
      </div>
      <DataTable
        columns={columns}
        data={quotes}
        rowKey={(q) => q.id}
        emptyTitle="No quote requests yet"
        emptyDescription="Request a quote from any vendor profile to see it here."
      />
    </div>
  );
}
