"use client";

import { useState } from "react";
import { Users, Briefcase, Sparkles, Search } from "lucide-react";
import { eventTypes } from "@/lib/data/event-types";
import { EventBentoGrid } from "@/components/events/event-bento-grid";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"Family & Personal" | "Corporate">("Family & Personal");
  const [searchQuery, setSearchQuery] = useState("");

  const familyEvents = eventTypes.filter((e) => e.group === "Family & Personal");
  const corporateEvents = eventTypes.filter((e) => e.group === "Corporate");

  const activeEvents = activeTab === "Family & Personal" ? familyEvents : corporateEvents;

  // Filter events based on search query
  const filteredEvents = activeEvents.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-warm-white/20 pb-20">
      {/* Hero Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose/5 px-4 py-1.5 text-xs font-semibold text-rose tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            Every Occasion Has a Home Here
          </span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl md:text-6xl leading-none">
            Choose Your Event Type
          </h1>
          <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Find the perfect setting and specialized vendors tailored specifically to your event category.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row max-w-2xl mx-auto">
          {/* Tab buttons */}
          <div className="flex rounded-xl bg-charcoal/5 p-1 w-full sm:w-auto shrink-0 border border-charcoal/[0.03]">
            <button
              onClick={() => {
                setActiveTab("Family & Personal");
                setSearchQuery("");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "Family & Personal"
                  ? "bg-white text-charcoal shadow-sm shadow-charcoal/5"
                  : "text-muted-foreground hover:text-charcoal"
              }`}
            >
              <Users className="h-4 w-4" />
              Family & Personal
              <span className="ml-1 rounded-full bg-rose/5 px-2 py-0.5 text-xs font-semibold text-rose">
                {familyEvents.length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("Corporate");
                setSearchQuery("");
              }}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "Corporate"
                  ? "bg-white text-charcoal shadow-sm shadow-charcoal/5"
                  : "text-muted-foreground hover:text-charcoal"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Corporate
              <span className="ml-1 rounded-full bg-rose/5 px-2 py-0.5 text-xs font-semibold text-rose">
                {corporateEvents.length}
              </span>
            </button>
          </div>

          {/* Search bar inside the page */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()} events...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border-border bg-white pl-10 pr-4 text-sm text-charcoal placeholder:text-muted-foreground/60 focus-visible:ring-rose"
            />
          </div>
        </div>
      </section>

      {/* Grid Container */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredEvents.length > 0 ? (
          <div className="transition-opacity duration-300">
            <EventBentoGrid events={filteredEvents} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-white py-16 text-center shadow-sm">
            <Search className="h-10 w-10 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-bold text-charcoal">No events found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              We couldn&apos;t find any events matching &ldquo;{searchQuery}&rdquo;. Try another search term.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
