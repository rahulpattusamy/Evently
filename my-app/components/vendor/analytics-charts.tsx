"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const REVENUE = [
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 62000 },
  { month: "May", revenue: 58000 },
  { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 89000 },
  { month: "Aug", revenue: 76000 },
];

const INQUIRY_SOURCE = [
  { source: "Search", inquiries: 18 },
  { source: "Category Page", inquiries: 12 },
  { source: "Recommendations", inquiries: 7 },
  { source: "Direct Profile", inquiries: 9 },
];

const BOOKING_STATUS = [
  { name: "Confirmed", value: 2, color: "#ff3f6c" },
  { name: "Pending", value: 1, color: "#ff905a" },
  { name: "Completed", value: 1, color: "#282c3f" },
];

export function RevenueLineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={REVENUE} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaec" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94969f" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94969f" }} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eaeaec", fontSize: 12 }} />
        <Line type="monotone" dataKey="revenue" stroke="#ff3f6c" strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InquiriesBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={INQUIRY_SOURCE} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaec" vertical={false} />
        <XAxis dataKey="source" tick={{ fontSize: 11, fill: "#94969f" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#94969f" }} axisLine={false} tickLine={false} width={28} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eaeaec", fontSize: 12 }} />
        <Bar dataKey="inquiries" fill="#e1235b" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BookingStatusPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={BOOKING_STATUS} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={3}>
          {BOOKING_STATUS.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eaeaec", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
