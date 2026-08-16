"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import { cities } from "@/lib/data/cities";
import { Venue, Vendor, CitySlug, EventTypeSlug } from "@/lib/types";

const EXAMPLE_PROMPTS = [
  "I need a birthday party for 100 people in Chennai with a ₹75,000 budget.",
  "Planning a corporate conference for 200 people in Bengaluru, budget around ₹3,00,000.",
  "Looking for everything for a wedding in Coimbatore for 500 guests, budget ₹15,00,000.",
  "College farewell event in Madurai for 80 students, budget ₹40,000.",
];

const EVENT_KEYWORDS: { keyword: string; slug: EventTypeSlug; label: string }[] = [
  { keyword: "wedding", slug: "weddings", label: "Wedding" },
  { keyword: "birthday", slug: "birthdays", label: "Birthday" },
  { keyword: "engagement", slug: "engagements", label: "Engagement" },
  { keyword: "baby shower", slug: "baby-showers", label: "Baby Shower" },
  { keyword: "corporate", slug: "corporate-meetings", label: "Corporate Event" },
  { keyword: "conference", slug: "conferences", label: "Conference" },
  { keyword: "product launch", slug: "product-launches", label: "Product Launch" },
  { keyword: "team", slug: "team-events", label: "Team Event" },
];

interface Parsed {
  eventLabel?: string;
  eventSlug?: EventTypeSlug;
  citySlug?: CitySlug;
  cityName?: string;
  guests?: number;
  budget?: number;
}

function parsePrompt(text: string): Parsed {
  const lower = text.toLowerCase();
  const result: Parsed = {};

  const eventMatch = EVENT_KEYWORDS.find((e) => lower.includes(e.keyword));
  if (eventMatch) {
    result.eventSlug = eventMatch.slug;
    result.eventLabel = eventMatch.label;
  }

  const cityMatch = cities.find((c) => lower.includes(c.name.toLowerCase()));
  if (cityMatch) {
    result.citySlug = cityMatch.slug;
    result.cityName = cityMatch.name;
  }

  const guestsMatch = lower.match(/(\d[\d,]*)\s*(people|guests|pax)/);
  if (guestsMatch) {
    result.guests = Number(guestsMatch[1].replace(/,/g, ""));
  }

  const budgetMatch = lower.match(/₹\s*([\d,]+)|(?:budget[^\d₹]*)([\d,]+)/);
  if (budgetMatch) {
    const raw = (budgetMatch[1] || budgetMatch[2] || "").replace(/,/g, "");
    const value = Number(raw);
    if (!Number.isNaN(value) && value > 100) result.budget = value;
  }

  return result;
}

interface Recommendation<T> {
  item: T;
  reasons: string[];
}

function pickVenues(parsed: Parsed): Recommendation<Venue>[] {
  let pool = venues.filter((v) => {
    if (parsed.citySlug && v.citySlug !== parsed.citySlug) return false;
    if (parsed.eventSlug && !v.eventTypes.includes(parsed.eventSlug)) return false;
    if (parsed.budget && v.startingPrice > parsed.budget) return false;
    return true;
  });
  if (pool.length === 0) pool = [...venues].sort((a, b) => b.rating - a.rating);

  return pool
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((item) => {
      const reasons: string[] = [];
      if (parsed.budget && item.startingPrice <= parsed.budget) {
        reasons.push(`Within your ₹${parsed.budget.toLocaleString("en-IN")} budget`);
      }
      if (parsed.citySlug && item.citySlug === parsed.citySlug) {
        reasons.push(parsed.cityName!);
      }
      if (parsed.eventSlug && item.eventTypes.includes(parsed.eventSlug)) {
        reasons.push(`Popular for ${parsed.eventLabel?.toLowerCase()}s`);
      }
      if (reasons.length === 0) reasons.push(`Top rated · ${item.rating.toFixed(1)}★`);
      return { item, reasons };
    });
}

function pickVendorsByCategory(
  parsed: Parsed,
  categorySlugs: string[]
): Recommendation<Vendor>[] {
  let pool = vendors.filter((v) => {
    if (!categorySlugs.includes(v.categorySlug)) return false;
    if (parsed.citySlug && v.citySlug !== parsed.citySlug) return false;
    if (parsed.eventSlug && !v.eventTypes.includes(parsed.eventSlug)) return false;
    return true;
  });
  if (pool.length === 0) {
    pool = vendors
      .filter((v) => categorySlugs.includes(v.categorySlug))
      .sort((a, b) => b.rating - a.rating);
  }

  return pool
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 2)
    .map((item) => {
      const reasons: string[] = [];
      if (parsed.budget && item.startingPrice <= parsed.budget) {
        reasons.push(`Within budget`);
      }
      if (parsed.citySlug && item.citySlug === parsed.citySlug) {
        reasons.push(parsed.cityName!);
      }
      if (parsed.eventSlug && item.eventTypes.includes(parsed.eventSlug)) {
        reasons.push(`Popular for ${parsed.eventLabel?.toLowerCase()}s`);
      }
      if (reasons.length === 0) reasons.push(`Top rated · ${item.rating.toFixed(1)}★`);
      return { item, reasons };
    });
}

function ReasonCaption({ reasons }: { reasons: string[] }) {
  return (
    <p className="mt-2 flex items-center gap-1 text-xs text-burgundy">
      <Sparkles className="h-3 w-3 shrink-0" />
      Why this matches: {reasons.join(" · ")}
    </p>
  );
}

export default function RecommendationsPage() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<Parsed | null>(null);

  function handleSubmit() {
    setSubmitted(parsePrompt(text));
  }

  const recommendedVenues = submitted ? pickVenues(submitted) : [];
  const recommendedDecorators = submitted
    ? pickVendorsByCategory(submitted, ["decorators", "stage-decorators", "floral-decorators"])
    : [];
  const recommendedCaterers = submitted
    ? pickVendorsByCategory(submitted, ["caterers", "bakers", "specialty-food-vendors"])
    : [];
  const recommendedPhotographers = submitted
    ? pickVendorsByCategory(submitted, ["photographers", "videographers", "drone-photography"])
    : [];
  const recommendedEntertainment = submitted
    ? pickVendorsByCategory(submitted, ["djs", "live-music", "bands", "anchors-hosts", "performers"])
    : [];

  const chips: { label: string; value: string }[] = submitted
    ? (
        [
          submitted.eventLabel && { label: "Event", value: submitted.eventLabel },
          submitted.cityName && { label: "City", value: submitted.cityName },
          submitted.guests && { label: "Guests", value: submitted.guests.toLocaleString("en-IN") },
          submitted.budget && { label: "Budget", value: `₹${submitted.budget.toLocaleString("en-IN")}` },
        ] as ({ label: string; value: string } | undefined | false)[]
      ).filter((c): c is { label: string; value: string } => Boolean(c))
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-rose">
          <Wand2 className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-charcoal">
          AI Event Recommendations
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Describe your event in plain words and we&apos;ll put together a shortlist of
          venues and vendors that fit.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I need a birthday party for 100 people in Chennai with a ₹75,000 budget."
          rows={4}
          className="resize-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setText(p)}
              className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted-foreground hover:border-rose hover:text-rose"
            >
              {p}
            </button>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={text.trim().length < 5}
          className="mt-4 w-full bg-rose text-white hover:bg-burgundy sm:w-auto"
        >
          <Sparkles className="h-4 w-4" />
          Get Recommendations
        </Button>
      </div>

      {submitted && (
        <div className="mt-8 space-y-10">
          {chips.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Understood your event
              </p>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <Badge
                    key={chip.label}
                    variant="secondary"
                    className="border-0 bg-blush px-3 py-1 text-xs text-burgundy"
                  >
                    {chip.label}: {chip.value}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <RecommendationSection title="Recommended Venues">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedVenues.map(({ item, reasons }) => (
                <div key={item.id}>
                  <VenueCard venue={item} />
                  <ReasonCaption reasons={reasons} />
                </div>
              ))}
            </div>
          </RecommendationSection>

          <VendorSection title="Recommended Decorators" recs={recommendedDecorators} />
          <VendorSection title="Recommended Caterers" recs={recommendedCaterers} />
          <VendorSection title="Recommended Photographers" recs={recommendedPhotographers} />
          <VendorSection title="Recommended Entertainment" recs={recommendedEntertainment} />
        </div>
      )}
    </div>
  );
}

function RecommendationSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">{title}</h2>
      {children}
    </section>
  );
}

function VendorSection({
  title,
  recs,
}: {
  title: string;
  recs: Recommendation<Vendor>[];
}) {
  if (recs.length === 0) return null;
  return (
    <RecommendationSection title={title}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recs.map(({ item, reasons }) => (
          <div key={item.id}>
            <VendorCard vendor={item} />
            <ReasonCaption reasons={reasons} />
          </div>
        ))}
      </div>
    </RecommendationSection>
  );
}
