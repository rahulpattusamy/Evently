import Link from "next/link";
import { Inbox, Clock, Ticket, Wallet, Eye, ArrowRight } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/components/shared/price-display";
import { getVendorById } from "@/lib/data/vendors";
import { getBookingsForVendor } from "@/lib/data/bookings";
import { getQuotesForVendor } from "@/lib/data/quote-requests";
import { RevenueTrendChart } from "@/components/vendor/revenue-trend-chart";

export default function VendorOverviewPage() {
  const vendor = getVendorById("vendor-1")!;
  const quotes = getQuotesForVendor(vendor.id);
  const vendorBookings = getBookingsForVendor(vendor.id);

  const pendingRequests = quotes.filter((q) => q.status === "pending").length;
  const upcomingBookings = vendorBookings.filter(
    (b) => (b.status === "confirmed" || b.status === "pending") && new Date(b.eventDate) > new Date("2026-08-14")
  ).length;
  const revenue = vendorBookings.reduce((sum, b) => sum + b.amountPaid, 0);

  const recentQuotes = [...quotes]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          Welcome back, {vendor.businessName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s how your business is performing this month.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatsCard label="Total Inquiries" value={String(quotes.length)} icon={Inbox} accent="rose" />
        <StatsCard label="Pending Requests" value={String(pendingRequests)} icon={Clock} accent="gold" trend={{ value: `${pendingRequests} awaiting reply` }} />
        <StatsCard label="Upcoming Bookings" value={String(upcomingBookings)} icon={Ticket} accent="rose" />
        <StatsCard label="Revenue" value={`₹${formatINR(revenue)}`} icon={Wallet} accent="charcoal" trend={{ value: "12% vs last month" }} />
        <StatsCard label="Profile Views" value="1,240" icon={Eye} accent="gold" trend={{ value: "8% vs last month" }} />
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <h2 className="font-heading text-base font-bold text-charcoal">Inquiries & Bookings Trend</h2>
        <p className="text-xs text-muted-foreground">Last 6 months</p>
        <div className="mt-4 h-64">
          <RevenueTrendChart />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-charcoal">Recent Inquiries</h2>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-rose hover:text-burgundy">
            <Link href="/vendor/inquiries">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="mt-3 divide-y divide-border">
          {recentQuotes.map((q) => (
            <div key={q.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-charcoal">{q.userName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {q.eventType.replace(/-/g, " ")} · {q.guests} guests · ₹{formatINR(q.budget)}
                </p>
              </div>
              <StatusBadge status={q.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
