"use client";

import { User, Store } from "lucide-react";
import { cn } from "@/lib/utils";

export type AuthRole = "customer" | "vendor";

interface RoleToggleProps {
  value: AuthRole;
  onChange: (role: AuthRole) => void;
}

const OPTIONS: { role: AuthRole; label: string; icon: typeof User }[] = [
  { role: "customer", label: "I'm planning an event", icon: User },
  { role: "vendor", label: "I run a business", icon: Store },
];

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.role;
        return (
          <button
            key={opt.role}
            type="button"
            onClick={() => onChange(opt.role)}
            className={cn(
              "flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all",
              active
                ? "border-rose bg-blush/60 ring-1 ring-rose"
                : "border-border bg-white hover:border-rose/40"
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "text-rose" : "text-muted-foreground")} />
            <span className={cn("text-xs font-medium leading-snug", active ? "text-burgundy" : "text-charcoal")}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
