import Image from "next/image";
import Link from "next/link";
import { EventType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function EventCard({ event, className }: { event: EventType; className?: string }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        "group relative block h-64 shrink-0 overflow-hidden rounded-2xl",
        !className && "w-56 sm:w-64",
        className
      )}
    >
      <Image
        src={event.image}
        alt={event.name}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 256px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading text-lg font-bold text-white">
          {event.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-white/80">
          {event.description}
        </p>
      </div>
    </Link>
  );
}
