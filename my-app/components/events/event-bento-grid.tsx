import { EventType } from "@/lib/types";
import { EventCard } from "@/components/shared/event-card";
import { cn } from "@/lib/utils";

export function EventBentoGrid({ events }: { events: EventType[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 auto-rows-[130px] sm:grid-cols-4 sm:gap-4 sm:auto-rows-[150px]">
      {events.map((event, i) => {
        const isFeatured = i === 0;
        const isTall = !isFeatured && i % 5 === 2;

        return (
          <EventCard
            key={event.slug}
            event={event}
            className={cn(
              "h-full w-full",
              isFeatured && "col-span-2 row-span-2",
              isTall && "row-span-2"
            )}
          />
        );
      })}
    </div>
  );
}
