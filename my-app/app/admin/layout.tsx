"use client";

import {
  LayoutDashboard,
  Users,
  Store,
  ShieldCheck,
  Building2,
  ListChecks,
  Ticket,
  CreditCard,
  Star,
  Tags,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  DashboardSidebar,
  DashboardMobileNav,
} from "@/components/dashboard/dashboard-sidebar";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/admin/users", icon: Users },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Vendor Verification", href: "/admin/verification", icon: ShieldCheck },
  { label: "Venues", href: "/admin/venues", icon: Building2 },
  { label: "Services", href: "/admin/services", icon: ListChecks },
  { label: "Bookings", href: "/admin/bookings", icon: Ticket },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardMobileNav items={ADMIN_NAV} />
      <div className="flex gap-6">
        <DashboardSidebar title="Admin" items={ADMIN_NAV} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
