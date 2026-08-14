"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatINR } from "@/components/shared/price-display";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";

const ROSE = "#ff3f6c";
const GOLD = "#ff905a";

const SIGNUP_TREND = [
  { month: "Mar", users: 42 },
  { month: "Apr", users: 68 },
  { month: "May", users: 91 },
  { month: "Jun", users: 120 },
  { month: "Jul", users: 158 },
  { month: "Aug", users: 205 },
];

export default function AdminReportsPage() {
  const cityGroups = Array.from(
    venues.reduce((map, v) => map.set(v.citySlug, (map.get(v.citySlug) ?? 0) + 1), new Map<string, number>())
  ).map(([city, count]) => ({ city, count }));

  const avgVendorPrice = Math.round(vendors.reduce((sum, v) => sum + v.startingPrice, 0) / vendors.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Platform trends · Avg. vendor starting price ₹{formatINR(avgVendorPrice)}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="font-heading text-sm font-bold text-charcoal">User Growth</h3>
          <p className="mb-4 text-xs text-muted-foreground">New signups per month</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={SIGNUP_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaec" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke={ROSE} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="font-heading text-sm font-bold text-charcoal">Venues by City</h3>
          <p className="mb-4 text-xs text-muted-foreground">Listing distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cityGroups}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaec" />
              <XAxis dataKey="city" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill={GOLD} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
