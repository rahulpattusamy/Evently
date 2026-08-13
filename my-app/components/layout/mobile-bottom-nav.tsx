"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, CalendarCheck, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/events", icon: Compass },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Profile", href: "/dashboard", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-border bg-white md:hidden">
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs",
              active ? "text-rose" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
