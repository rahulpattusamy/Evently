import { Clock3, TrendingUp, Repeat } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { getVendorById } from "@/lib/data/vendors";
import {
  RevenueLineChart,
  InquiriesBarChart,
  BookingStatusPieChart,
} from "@/components/vendor/analytics-charts";

export default function VendorAnalyticsPage() {
  const vendor = getVendorById("vendor-1")!;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Analytics</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard label="Avg. Response Time" value={vendor.responseTime} icon={Clock3} accent="rose" />
        <StatsCard label="Conversion Rate" value="34%" icon={TrendingUp} accent="gold" trend={{ value: "4% vs last month" }} />
        <StatsCard label="Repeat Customers" value="18%" icon={Repeat} accent="charcoal" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="font-heading text-base font-bold text-charcoal">Revenue Trend</h2>
          <div className="mt-4 h-60"><RevenueLineChart /></div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5">
          <h2 className="font-heading text-base font-bold text-charcoal">Inquiries by Source</h2>
          <div className="mt-4 h-60"><InquiriesBarChart /></div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-2">
          <h2 className="font-heading text-base font-bold text-charcoal">Booking Status Breakdown</h2>
          <div className="mt-4 h-60"><BookingStatusPieChart /></div>
        </div>
      </div>
    </div>
  );
}
