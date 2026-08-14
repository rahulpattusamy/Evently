import { EventCard } from "@/components/shared/event-card";
import { EventType } from "@/lib/types";

function splitRows(events: EventType[]) {
  const rowA: EventType[] = [];
  const rowB: EventType[] = [];
  events.forEach((event, i) => (i % 2 === 0 ? rowA : rowB).push(event));
  return [rowA, rowB];
}

function MarqueeRow({ events, direction }: { events: EventType[]; direction: "left" | "right" }) {
  if (events.length === 0) return null;

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`flex w-max gap-5 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {[events, events].map((set, setIndex) => (
          <div key={setIndex} className="flex gap-5" aria-hidden={setIndex === 1}>
            {set.map((event) => (
              <EventCard key={`${setIndex}-${event.slug}`} event={event} className="w-56 shrink-0 sm:w-64" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EventCarousel({ events }: { events: EventType[] }) {
  const [rowA, rowB] = splitRows(events);

  return (
    <div className="mt-6 flex flex-col gap-5">
      <MarqueeRow events={rowA} direction="left" />
      <MarqueeRow events={rowB} direction="right" />
    </div>
  );
}
