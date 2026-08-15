"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBookingsByUser } from "@/lib/data/bookings";
import { getUserEvents } from "@/lib/data/users";
import { getQuotesByUser } from "@/lib/data/quote-requests";

export function EventHubDropdown() {
  // Fetch mock data size to show active notifications on the badge
  const bookingsCount = getBookingsByUser("user-1").length;
  const eventsCount = getUserEvents("user-1").length;
  const quotesCount = getQuotesByUser("user-1").length;
  const totalCount = bookingsCount + eventsCount + quotesCount;

  return (
    <Button
      asChild
      variant="outline"
      className="relative border-rose/30 bg-rose/5 px-4 h-10 rounded-full text-xs font-bold text-rose hover:bg-blush hover:text-burgundy flex items-center gap-1.5 transition-all shadow-sm"
    >
      <Link href="/dashboard">
        <Sparkles className="h-3.5 w-3.5 fill-current animate-pulse text-rose" />
        My Event Hub
        {totalCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white ring-2 ring-white">
            {totalCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
