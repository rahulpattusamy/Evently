"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronRight, ChevronLeft, Calendar, Tag, ShieldCheck, Flower, PartyPopper, Gift } from "lucide-react";
import { EventType } from "@/lib/types";

const EVENT_EXTRA_INFO: Record<
  string,
  { popularity: string; budget: string; services: string[]; planningTip: string; statsText: string }
> = {
  weddings: {
    popularity: "98% (Peak Demand)",
    budget: "Premium & Custom",
    services: ["Verified Banquet Halls & Lawns", "Luxury Floral Decorators", "Multi-cuisine catering"],
    planningTip: "Book wedding venues at least 6–8 months in advance during peak season.",
    statsText: "140+ premium venues and 80+ decorators ready to book.",
  },
  engagements: {
    popularity: "92% (Popular)",
    budget: "Flexible Options",
    services: ["Intimate Banquets & Resorts", "Premium Ring Setup", "Professional Photography"],
    planningTip: "Ensure the catering menu has plenty of finger foods and custom cocktails for socializing.",
    statsText: "90+ cozy spaces and 40+ professional photographers available.",
  },
  birthdays: {
    popularity: "95% (Year-Round)",
    budget: "Budget-Friendly",
    services: ["Fun Balloon & Theme Decor", "Sound & DJ setups", "Cake & Sweet catering"],
    planningTip: "Add interactive entertainment stations (like photo booths) to keep guests engaged.",
    statsText: "110+ child-friendly halls and custom planners on call.",
  },
  "baby-showers": {
    popularity: "89% (Trending)",
    budget: "Affordable Luxury",
    services: ["Pastel Floral Decor Themes", "Cozy banquet halls", "Special Mocktail stations"],
    planningTip: "Pastel themes and soft lighting create the perfect photo backdrops.",
    statsText: "65+ warm intimate spaces and customized thematic decor packs.",
  },
  "private-parties": {
    popularity: "91% (Weekend Peak)",
    budget: "Custom packages",
    services: ["Private dining & villa rentals", "DJ & Singer booking", "Cocktail bar setups"],
    planningTip: "DJs or solo singers set a warm, inviting tone for private gatherings.",
    statsText: "85+ high-end party lounges and verified bartenders ready.",
  },
};

export function EventCarousel({ events }: { events: EventType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeEvent = events[activeIndex] || events[0];
  const extraInfo = EVENT_EXTRA_INFO[activeEvent.slug] || {
    popularity: "Popular",
    budget: "Flexible",
    services: ["Verified Venues", "Decor & Catering"],
    planningTip: "Plan ahead to ensure availability of preferred services.",
    statsText: "Multiple local services and venues available.",
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isHovered, events.length]);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch justify-between px-6 md:px-12 py-10 md:py-16 rounded-[40px] border border-border bg-gradient-to-br from-white via-white to-blush/30 shadow-xl shadow-rose/5 overflow-hidden">
      
      {/* Left Column: Title Section + Active Event Details */}
      <div className="flex-1 w-full flex flex-col justify-between items-start text-left lg:pr-8 relative z-10">
        
        {/* Section Header */}
        <div className="w-full border-b border-border pb-6 mb-8">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-charcoal tracking-tight">
            Occasions to Celebrate
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            Explore hand-picked venues, expert planners, and custom packages tailored for your milestones.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-rose hover:text-burgundy mt-4 transition-colors"
          >
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Active Occasion Details */}
        <div className="w-full flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider text-rose uppercase bg-blush/35 rounded-full mb-4">
            <Sparkles className="h-3 w-3 text-rose animate-pulse" />
            Active Category
          </span>

          <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-charcoal tracking-tight transition-all duration-300">
            {activeEvent.name}
          </h3>

          {/* New availability alert */}
          <p className="text-[11px] font-bold text-rose/85 uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose animate-pulse shrink-0" />
            {extraInfo.statsText}
          </p>

          <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-md transition-all duration-300">
            {activeEvent.description}
          </p>

          {/* Stats Row */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1 bg-white border border-border px-3 py-1.5 rounded-lg shadow-sm">
              <Calendar className="h-3.5 w-3.5 text-rose" />
              {extraInfo.popularity}
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-border px-3 py-1.5 rounded-lg shadow-sm">
              <Tag className="h-3.5 w-3.5 text-rose" />
              {extraInfo.budget}
            </span>
          </div>

          {/* Checklist */}
          <div className="mt-6 flex flex-col gap-2 text-left w-full max-w-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">
              What We Help You Plan & Book
            </span>
            {extraInfo.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2 text-xs md:text-sm text-charcoal/85">
                <ShieldCheck className="h-4 w-4 text-rose shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>

          {/* Expert Planning Tip Box */}
          <div className="mt-6 p-4 rounded-2xl bg-blush/25 border border-rose/10 text-xs md:text-sm text-burgundy flex gap-2 items-start max-w-md">
            <span className="text-base shrink-0">💡</span>
            <p className="italic leading-relaxed font-medium">
              <strong className="not-italic font-bold">Planning Tip: </strong>
              {extraInfo.planningTip}
            </p>
          </div>

          {/* Trust and benefit details */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-muted-foreground/70 border-t border-border/60 pt-5 w-full max-w-md">
            <span className="flex items-center gap-1.5">🛡️ Verified Vendors</span>
            <span className="flex items-center gap-1.5">⚡ Instant Quotes</span>
            <span className="flex items-center gap-1.5">🤝 100% Secure Payments</span>
          </div>

          {/* Integrated App Booking Journey flow */}
          <div className="mt-6 w-full max-w-md border border-border bg-warm-white/40 p-4 rounded-2xl">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-charcoal mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-rose" />
              Your Evently Journey
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="h-6 w-6 rounded-full bg-rose/10 text-rose font-black text-xs flex items-center justify-center">1</span>
                <span className="text-[10px] font-bold text-charcoal mt-1">Select Venue</span>
                <span className="text-[9px] text-muted-foreground leading-tight">Banquet halls, lawns or villas</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="h-6 w-6 rounded-full bg-rose/10 text-rose font-black text-xs flex items-center justify-center">2</span>
                <span className="text-[10px] font-bold text-charcoal mt-1">Pick Vendors</span>
                <span className="text-[9px] text-muted-foreground leading-tight">Theme decorators & caterers</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="h-6 w-6 rounded-full bg-rose/10 text-rose font-black text-xs flex items-center justify-center">3</span>
                <span className="text-[10px] font-bold text-charcoal mt-1">Book Event</span>
                <span className="text-[9px] text-muted-foreground leading-tight">Instant secured payment booking</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/events/${activeEvent.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose/25 hover:bg-burgundy transition-all duration-300"
            >
              Explore {activeEvent.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Stacked Card Deck */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-[280px] sm:w-[320px] h-[360px] md:h-[420px] flex items-center justify-center cursor-pointer select-none lg:pl-8 self-center mt-8 lg:mt-0"
      >
        {events.map((event, index) => {
          const count = events.length;
          let offset = index - activeIndex;
          if (offset < 0) offset += count; // Keep values positive 0 to 4

          const isActive = offset === 0;

          // Only render top 3 cards in the stacked deck
          if (offset > 2) return null;

          // Calculate offset transform values for card depth effect
          const scale = 1 - offset * 0.06;
          const translateY = offset * 16;
          const rotate = offset === 0 ? 0 : offset === 1 ? 4 : -4;
          const zIndex = 30 - offset;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.9 : 0.75;

          return (
            <div
              key={event.slug}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-border bg-white transition-all duration-500 ease-out origin-bottom"
              style={{
                transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex,
                opacity,
              }}
            >
              {/* Image */}
              <Image
                src={event.image}
                alt={event.name}
                fill
                sizes="(min-width: 768px) 360px, 320px"
                className="object-cover pointer-events-none transition-transform duration-750 group-hover:scale-105"
              />

              {/* Overlay: passive cards have a dimming overlay; active card has details overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
                  isActive
                    ? "bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent"
                    : "bg-black/35 hover:bg-black/25"
                }`}
              />

              {/* Card Label */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col pointer-events-none">
                <h3 className="font-heading text-lg md:text-xl font-extrabold leading-tight">
                  {event.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (Floating Bottom-Right for Deck) */}
      <div className="absolute bottom-4 right-4 md:right-12 hidden lg:flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-charcoal hover:bg-rose hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-mono font-bold text-muted-foreground/60">
          {String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
        </span>
        <button
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-charcoal hover:bg-rose hover:text-white transition-all shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </div>
  );
}
