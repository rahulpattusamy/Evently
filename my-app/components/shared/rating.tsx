import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, reviewCount, size = "sm", className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star
        className={cn(
          "fill-gold text-gold",
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
        )}
      />
      <span
        className={cn(
          "font-semibold text-charcoal",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {value.toFixed(1)}
      </span>
      {typeof reviewCount === "number" && (
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
}
