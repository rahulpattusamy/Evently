import { LucideIcon, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive?: boolean };
  accent?: "rose" | "gold" | "charcoal";
}

export function StatsCard({ label, value, icon: Icon, trend, accent = "rose" }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1.5 font-heading text-2xl font-bold text-charcoal">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            accent === "rose" && "bg-blush text-rose",
            accent === "gold" && "bg-gold/10 text-gold",
            accent === "charcoal" && "bg-muted text-charcoal"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div
          className={cn(
            "mt-3 flex items-center gap-1 text-xs font-medium",
            trend.positive === false ? "text-destructive" : "text-emerald-600"
          )}
        >
          {trend.positive === false ? (
            <ArrowDownRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowUpRight className="h-3.5 w-3.5" />
          )}
          {trend.value}
        </div>
      )}
    </div>
  );
}
