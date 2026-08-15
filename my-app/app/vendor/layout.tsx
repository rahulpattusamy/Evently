"use client";

import {
  LayoutDashboard,
  Building2,
  ListChecks,
  Images,
  Inbox,
  Ticket,
  CalendarDays,
  BarChart3,
  Star,
  Wallet,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  DashboardSidebar,
  DashboardMobileNav,
  SidebarNavItem,
} from "@/components/dashboard/dashboard-sidebar";

const VENDOR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Overview", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/vendor/profile", icon: Building2 },
  { label: "Services", href: "/vendor/services", icon: ListChecks },
  { label: "Portfolio", href: "/vendor/portfolio", icon: Images },
  { label: "Inquiries", href: "/vendor/inquiries", icon: Inbox },
  { label: "Bookings", href: "/vendor/bookings", icon: Ticket },
  { label: "Calendar", href: "/vendor/calendar", icon: CalendarDays },
  { label: "Reviews", href: "/vendor/reviews", icon: Star },
  { label: "Payments", href: "/vendor/payments", icon: Wallet },
  { label: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { label: "Grow Business", href: "/vendor/grow", icon: TrendingUp },
  { label: "Settings", href: "/vendor/settings", icon: Settings },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <DashboardMobileNav items={VENDOR_NAV_ITEMS} />
      <div className="flex gap-6">
        <DashboardSidebar title="Vendor Panel" items={VENDOR_NAV_ITEMS} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
