"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  title: string;
  items: SidebarNavItem[];
}

export function DashboardSidebar({ title, items }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-20 rounded-2xl border border-border bg-white p-3">
        <p className="px-3 pt-2 pb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </p>
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const active =
              item.href === pathname ||
              (item.href !== "/dashboard" &&
                item.href !== "/vendor/dashboard" &&
                item.href !== "/admin" &&
                pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-blush text-burgundy"
                    : "text-charcoal hover:bg-blush/60"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export function DashboardMobileNav({ items }: { items: SidebarNavItem[] }) {
  const pathname = usePathname();
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:hidden">
      {items.map((item) => {
        const active = item.href === pathname;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              active
                ? "border-rose bg-rose text-white"
                : "border-border bg-white text-charcoal"
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
