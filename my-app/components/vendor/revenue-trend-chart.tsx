"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  { month: "Mar", inquiries: 6, bookings: 2 },
  { month: "Apr", inquiries: 9, bookings: 3 },
  { month: "May", inquiries: 7, bookings: 4 },
  { month: "Jun", inquiries: 11, bookings: 3 },
  { month: "Jul", inquiries: 14, bookings: 5 },
  { month: "Aug", inquiries: 12, bookings: 4 },
];

export function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={DATA} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="inquiriesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff3f6c" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#ff3f6c" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e1235b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#e1235b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaec" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94969f" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94969f" }} axisLine={false} tickLine={false} width={28} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #eaeaec", fontSize: 12 }}
        />
        <Area type="monotone" dataKey="inquiries" stroke="#ff3f6c" fill="url(#inquiriesFill)" strokeWidth={2} name="Inquiries" />
        <Area type="monotone" dataKey="bookings" stroke="#e1235b" fill="url(#bookingsFill)" strokeWidth={2} name="Bookings" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
