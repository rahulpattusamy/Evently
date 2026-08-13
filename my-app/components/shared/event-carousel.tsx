"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { EventCard } from "@/components/shared/event-card";
import { EventType } from "@/lib/types";

export function EventCarousel({ events }: { events: EventType[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 700, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      opts={{ align: "start", loop: true, duration: 8 }}
      plugins={[autoplay.current]}
      className="mt-6"
    >
      <CarouselContent className="-ml-6">
        {events.map((event) => (
          <CarouselItem
            key={event.slug}
            className="basis-[15rem] pl-6 sm:basis-1/3 lg:basis-1/5"
          >
            <EventCard event={event} className="w-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
