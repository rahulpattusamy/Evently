import { Review } from "@/lib/types";
import { Rating } from "@/components/shared/rating";

export function ReviewCard({ review }: { review: Review }) {
  const initials = review.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-semibold text-burgundy">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-charcoal">{review.authorName}</span>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
          <Rating value={review.rating} size="sm" />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
    </div>
  );
}
