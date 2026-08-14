"use client";

import { Users, Store, ShieldCheck, Ticket, Wallet, ClipboardList } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { StatsCard } from "@/components/dashboard/stats-card";
import { currentAdminUser, users } from "@/lib/data/users";
import { vendors } from "@/lib/data/vendors";
import { bookings } from "@/lib/data/bookings";
import { formatINR } from "@/components/shared/price-display";

const ROSE = "#ff3f6c";
const BURGUNDY = "#e1235b";
const GOLD = "#ff905a";
const CHARCOAL = "#282c3f";

const REVENUE_TREND = [
  { month: "Mar", revenue: 420000 },
  { month: "Apr", revenue: 610000 },
  { month: "May", revenue: 540000 },
  { month: "Jun", revenue: 780000 },
  { month: "Jul", revenue: 690000 },
  { month: "Aug", revenue: 950000 },
];

export default function AdminOverviewPage() {
  const customers = users.filter((u) => u.role === "customer").length;
  const totalVendors = vendors.length;
  const verifiedVendors = vendors.filter((v) => v.verified).length;
  const pendingVerification = vendors.length - verifiedVendors;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amountPaid, 0);

  const statusCounts = ["pending", "confirmed", "completed", "cancelled"].map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: bookings.filter((b) => b.status === status).length,
  })).filter((s) => s.value > 0);

  const STATUS_COLORS = [ROSE, BURGUNDY, GOLD, CHARCOAL];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          Welcome back, {currentAdminUser.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening across Evently today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard label="Total Users" value={String(customers)} icon={Users} trend={{ value: "+12% this month" }} />
        <StatsCard label="Total Vendors" value={String(totalVendors)} icon={Store} trend={{ value: "+4 new" }} />
        <StatsCard label="Verified Vendors" value={String(verifiedVendors)} icon={ShieldCheck} accent="gold" />
        <StatsCard label="Bookings" value={String(bookings.length)} icon={Ticket} />
        <StatsCard label="Revenue" value={`₹${formatINR(totalRevenue)}`} icon={Wallet} trend={{ value: "+18% MoM" }} />
        <StatsCard label="Pending Verification" value={String(pendingVerification)} icon={ClipboardList} trend={{ value: "Needs review", positive: false }} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-3">
          <h3 className="font-heading text-sm font-bold text-charcoal">Platform Revenue</h3>
          <p className="mb-4 text-xs text-muted-foreground">Last 6 months, across venues &amp; vendors</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={REVENUE_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaec" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v) => [`₹${formatINR(Number(v))}`, "Revenue"]} />
              <Bar dataKey="revenue" fill={ROSE} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-2">
          <h3 className="font-heading text-sm font-bold text-charcoal">Booking Status</h3>
          <p className="mb-4 text-xs text-muted-foreground">Breakdown across all bookings</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {statusCounts.map((_, i) => (
                  <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={24} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
