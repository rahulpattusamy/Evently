import { BadgeCheck, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-rose/10 px-2 py-0.5 text-xs font-medium text-rose",
        className
      )}
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      Verified
    </span>
  );
}

export function PremiumBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold",
        className
      )}
    >
      <Crown className="h-3.5 w-3.5" />
      Premium
    </span>
  );
}
