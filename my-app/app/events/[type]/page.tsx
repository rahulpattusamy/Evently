"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventTypeBySlug } from "@/lib/data/event-types";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Sparkles, Building2, Users, Palette, UtensilsCrossed, Camera, Shirt, MailOpen, Gift, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function EventTypePage({ params }: PageProps) {
  const { type } = use(params);
  const event = getEventTypeBySlug(type);
  if (!event) notFound();

  // Define tabs dynamically based on event type
  const tabs = [
    { id: "venues", label: "Venues", icon: Building2 },
    { id: "planners", label: "Planners", icon: Users, categorySlugs: ["wedding-planners", "event-planners"] },
    { id: "decorators", label: "Decorators", icon: Palette, categorySlugs: ["decorators"] },
    { id: "caterers", label: "Caterers", icon: UtensilsCrossed, categorySlugs: ["caterers"] },
    { id: "photographers", label: "Photographers", icon: Camera, categorySlugs: ["photographers"] },
    ...(type === "weddings" || type === "engagements"
      ? [{ id: "wear", label: "Bridal & Groom Wear", icon: Shirt, categorySlugs: ["bridal-wear", "groom-wear"] }]
      : []),
    { id: "invitations", label: "Invitations", icon: MailOpen, categorySlugs: ["invitation-designers"] },
    { id: "gifts", label: "Gifts & Favors", icon: Gift, categorySlugs: ["gifts"] },
  ];

  const [activeTab, setActiveTab] = useState("venues");

  // Get matching data
  const currentTabInfo = tabs.find((t) => t.id === activeTab);

  const matchedVenues = venues.filter((v) => v.eventTypes.includes(event.slug));
  const matchedVendors = currentTabInfo?.categorySlugs
    ? vendors.filter((v) => v.eventTypes.includes(event.slug) && currentTabInfo.categorySlugs?.includes(v.categorySlug))
    : [];

  return (
    <div className="min-h-screen bg-warm-white/10 pb-20">
      {/* Event Header Banner */}
      <section className="relative h-72 w-full sm:h-96">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 pt-12 sm:pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose/10 border border-rose/20 px-3.5 py-1.5 text-xs font-semibold text-rose backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Specialized Planning Guide
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
            {event.name} <span className="text-rose">Planning</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 leading-relaxed">
            {event.description}. Discover top-rated venues and premium verified vendors tailored specifically for your special day.
          </p>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <div className="sticky top-0 z-50 border-b border-border bg-white shadow-md shadow-charcoal/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-none gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-rose text-white shadow-md shadow-rose/25 scale-[1.02]"
                      : "bg-charcoal/5 text-muted-foreground hover:bg-charcoal/10 hover:text-charcoal"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              {currentTabInfo?.label}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeTab === "venues"
                ? `Found ${matchedVenues.length} spaces matching ${event.name}`
                : `Found ${matchedVendors.length} professionals for ${event.name}`}
            </p>
          </div>
        </div>

        {activeTab === "venues" ? (
          matchedVenues.length === 0 ? (
            <EmptyState
              title="No venues found"
              description={`Check back soon for venues suited for ${event.name}.`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchedVenues.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )
        ) : matchedVendors.length === 0 ? (
          <EmptyState
            title="No vendors found"
            description={`Check back soon for ${currentTabInfo?.label.toLowerCase()} suited for ${event.name}.`}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedVendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
