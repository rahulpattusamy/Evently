"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { VenueCard } from "@/components/shared/venue-card";
import { Venue } from "@/lib/types";

const CAROUSEL_OPTS = { align: "start" as const, loop: true };

export function VenueCarousel({ venues }: { venues: Venue[] }) {
  return (
    <Carousel opts={CAROUSEL_OPTS} className="mt-6">
      <CarouselContent className="-ml-5">
        {venues.map((venue) => (
          <CarouselItem
            key={venue.id}
            className="basis-[19rem] pl-5 sm:basis-1/2 lg:basis-1/3"
          >
            <VenueCard venue={venue} className="w-full" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
