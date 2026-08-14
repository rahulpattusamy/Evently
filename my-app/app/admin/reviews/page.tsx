import { DataTable, DataTableColumn } from "@/components/dashboard/data-table";
import { reviews } from "@/lib/data/reviews";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { Review } from "@/lib/types";

function targetName(review: Review) {
  if (review.targetType === "venue") {
    return venues.find((v) => v.id === review.targetId)?.name ?? review.targetId;
  }
  return vendors.find((v) => v.id === review.targetId)?.businessName ?? review.targetId;
}

const columns: DataTableColumn<Review>[] = [
  { key: "author", header: "Author", render: (r) => <span className="font-medium text-charcoal">{r.authorName}</span> },
  { key: "target", header: "Target", render: (r) => targetName(r) },
  { key: "rating", header: "Rating", render: (r) => `${r.rating.toFixed(1)} ★` },
  { key: "date", header: "Date", render: (r) => new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) },
  {
    key: "comment",
    header: "Comment",
    render: (r) => (
      <span className="line-clamp-1 max-w-xs text-muted-foreground">{r.comment}</span>
    ),
  },
];

export default function AdminReviewsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Reviews</h1>
        <p className="text-sm text-muted-foreground">{reviews.length} reviews submitted across venues and vendors.</p>
      </div>
      <DataTable columns={columns} data={reviews} rowKey={(r) => r.id} emptyTitle="No reviews yet" />
    </div>
  );
}
