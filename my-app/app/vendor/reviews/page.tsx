import { Rating } from "@/components/shared/rating";
import { ReviewCard } from "@/components/shared/review-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getVendorById } from "@/lib/data/vendors";
import { reviews } from "@/lib/data/reviews";

export default function VendorReviewsPage() {
  const vendor = getVendorById("vendor-1")!;
  const vendorReviews = reviews.filter((r) => r.targetType === "vendor" && r.targetId === vendor.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Reviews</h1>
        <Rating value={vendor.rating} reviewCount={vendor.reviewCount} size="md" />
      </div>
      {vendorReviews.length === 0 ? (
        <EmptyState title="No reviews yet" description="Reviews from customers will appear here after their event." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {vendorReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </div>
  );
}
