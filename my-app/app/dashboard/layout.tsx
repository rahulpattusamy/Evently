"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  FileText,
  Heart,
  MessageSquare,
  CreditCard,
  User,
  Settings,
} from "lucide-react";
import {
  DashboardSidebar,
  DashboardMobileNav,
  SidebarNavItem,
} from "@/components/dashboard/dashboard-sidebar";

const NAV_ITEMS: SidebarNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Events", href: "/dashboard/events", icon: CalendarDays },
  { label: "Bookings", href: "/dashboard/bookings", icon: Ticket },
  { label: "Quote Requests", href: "/dashboard/quotes", icon: FileText },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardMobileNav items={NAV_ITEMS} />
      <div className="flex gap-8">
        <DashboardSidebar title="My Account" items={NAV_ITEMS} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
