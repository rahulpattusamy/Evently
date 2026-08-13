import { cn } from "@/lib/utils";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN").format(amount);
}

interface PriceDisplayProps {
  amount: number;
  unit?: string;
  prefix?: string;
  className?: string;
  amountClassName?: string;
}

export function PriceDisplay({
  amount,
  unit,
  prefix = "Starting from",
  className,
  amountClassName,
}: PriceDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
      <span className={cn("text-lg font-bold text-charcoal", amountClassName)}>
        ₹{formatINR(amount)}
        {unit && <span className="text-sm font-normal text-muted-foreground"> {unit}</span>}
      </span>
    </div>
  );
}

export { formatINR };
