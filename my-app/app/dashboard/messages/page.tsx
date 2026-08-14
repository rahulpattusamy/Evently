import { EmptyState } from "@/components/shared/empty-state";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Messages | Evently",
};

export default function DashboardMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conversations with venues and vendors.</p>
      </div>
      <EmptyState
        icon={MessageSquare}
        title="No messages yet"
        description="When a vendor responds to your quote request, your conversation will appear here."
      />
    </div>
  );
}
