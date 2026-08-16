"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { VenueCard } from "@/components/shared/venue-card";
import { VendorCard } from "@/components/shared/vendor-card";
import { EmptyState } from "@/components/shared/empty-state";
import { formatINR } from "@/components/shared/price-display";
import { cn } from "@/lib/utils";
import { eventTypes } from "@/lib/data/event-types";
import { cities } from "@/lib/data/cities";
import { categories } from "@/lib/data/categories";
import { filterVenues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";
import type { CitySlug, EventTypeSlug, ServiceCategoryGroup } from "@/lib/types";

const STEPS = [
  "Event Type",
  "Location",
  "Date",
  "Guests",
  "Budget",
  "Services",
];

interface ServiceOption {
  label: string;
  group: ServiceCategoryGroup | "Venue";
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { label: "Venue", group: "Venue" },
  { label: "Planner", group: "Planning" },
  { label: "Decoration", group: "Decorators" },
  { label: "Catering", group: "Food" },
  { label: "Photography", group: "Photography" },
  { label: "Music", group: "Entertainment" },
  { label: "Makeup", group: "Beauty" },
  { label: "Mehendi", group: "Beauty" },
  { label: "Invitations", group: "Design" },
  { label: "Presentation Design", group: "Design" },
  { label: "Banner Design", group: "Design" },
  { label: "Entertainment", group: "Entertainment" },
  { label: "Equipment", group: "Equipment & Rental" },
  { label: "Printing", group: "Printing" },
];

interface WizardState {
  eventType: EventTypeSlug | "";
  city: CitySlug | "";
  date: string;
  guests: string;
  budget: number;
  services: string[];
}

export function PlanEventWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    eventType: "",
    city: "",
    date: "",
    guests: "",
    budget: 200000,
    services: [],
  });
  const [done, setDone] = useState(false);

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggleService(label: string) {
    setState((s) => ({
      ...s,
      services: s.services.includes(label)
        ? s.services.filter((x) => x !== label)
        : [...s.services, label],
    }));
  }

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return !!state.eventType;
      case 1:
        return !!state.city;
      case 2:
        return !!state.date;
      case 3:
        return !!state.guests && Number(state.guests) > 0;
      case 4:
        return state.budget > 0;
      case 5:
        return state.services.length > 0;
      default:
        return true;
    }
  }, [step, state]);

  if (done) {
    return <PlanResults state={state} onRestart={() => { setDone(false); setStep(0); }} />;
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-8">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-1.5 sm:gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                i < step
                  ? "bg-rose text-white"
                  : i === step
                    ? "border-2 border-rose text-rose"
                    : "border border-border text-muted-foreground"
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">
              {label}
            </span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <StepBlock title="What type of event are you planning?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {eventTypes.map((e) => (
              <button
                key={e.slug}
                onClick={() => update("eventType", e.slug)}
                className={cn(
                  "rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                  state.eventType === e.slug
                    ? "border-rose bg-blush text-burgundy"
                    : "border-border text-charcoal hover:border-rose/50"
                )}
              >
                {e.name}
              </button>
            ))}
          </div>
        </StepBlock>
      )}

      {step === 1 && (
        <StepBlock title="Where is it happening?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cities.map((c) => (
              <button
                key={c.slug}
                onClick={() => update("city", c.slug)}
                className={cn(
                  "rounded-xl border p-3 text-center text-sm font-medium transition-colors",
                  state.city === c.slug
                    ? "border-rose bg-blush text-burgundy"
                    : "border-border text-charcoal hover:border-rose/50"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </StepBlock>
      )}

      {step === 2 && (
        <StepBlock title="When is your event?">
          <Input
            type="date"
            value={state.date}
            onChange={(e) => update("date", e.target.value)}
            className="max-w-xs"
          />
        </StepBlock>
      )}

      {step === 3 && (
        <StepBlock title="How many guests are you expecting?">
          <Input
            type="number"
            placeholder="e.g. 150"
            value={state.guests}
            onChange={(e) => update("guests", e.target.value)}
            className="max-w-xs"
          />
        </StepBlock>
      )}

      {step === 4 && (
        <StepBlock title="What's your budget?">
          <div className="max-w-md space-y-4">
            <p className="font-heading text-2xl font-bold text-rose">
              ₹{formatINR(state.budget)}
            </p>
            <Slider
              value={[state.budget]}
              min={20000}
              max={2500000}
              step={10000}
              onValueChange={(v) => update("budget", v[0])}
            />
          </div>
        </StepBlock>
      )}

      {step === 5 && (
        <StepBlock title="What services do you need?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICE_OPTIONS.map((s) => (
              <label
                key={s.label}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors",
                  state.services.includes(s.label)
                    ? "border-rose bg-blush text-burgundy"
                    : "border-border text-charcoal hover:border-rose/50"
                )}
              >
                <Checkbox
                  checked={state.services.includes(s.label)}
                  onCheckedChange={() => toggleService(s.label)}
                />
                {s.label}
              </label>
            ))}
          </div>
        </StepBlock>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          disabled={!canProceed}
          onClick={() => (step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1))}
          className="gap-1 bg-rose text-white hover:bg-burgundy"
        >
          {step === STEPS.length - 1 ? (
            <>
              <PartyPopper className="h-4 w-4" /> Create My Plan
            </>
          ) : (
            <>
              Next <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function StepBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-bold text-charcoal">{title}</h2>
      {children}
    </div>
  );
}

function PlanResults({ state, onRestart }: { state: WizardState; onRestart: () => void }) {
  const recommendedVenues = state.services.includes("Venue")
    ? filterVenues({
        city: state.city || undefined,
        eventType: state.eventType || undefined,
        minCapacity: state.guests ? Number(state.guests) : undefined,
        maxPrice: state.budget,
      }).slice(0, 3)
    : [];

  const selectedGroups = state.services
    .map((label) => SERVICE_OPTIONS.find((s) => s.label === label)?.group)
    .filter((g): g is ServiceCategoryGroup => !!g && g !== "Venue");

  const groupSlugs = new Set(
    categories.filter((c) => selectedGroups.includes(c.group)).map((c) => c.slug)
  );

  const recommendedVendors = vendors
    .filter((v) => groupSlugs.has(v.categorySlug))
    .filter((v) => (state.city ? v.citySlug === state.city : true))
    .filter((v) => (state.eventType ? v.eventTypes.includes(state.eventType) : true))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const eventTypeName = eventTypes.find((e) => e.slug === state.eventType)?.name;
  const cityName = cities.find((c) => c.slug === state.city)?.name;

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-rose/30 bg-blush/50 p-6 text-center">
        <PartyPopper className="mx-auto h-8 w-8 text-rose" />
        <h2 className="mt-2 font-heading text-2xl font-extrabold text-charcoal">
          Your Event Plan
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {eventTypeName} in {cityName} for {state.guests} guests · Budget ₹
          {formatINR(state.budget)}
        </p>
        <Button variant="outline" className="mt-4" onClick={onRestart}>
          Start Over
        </Button>
      </div>

      {recommendedVenues.length > 0 && (
        <section>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Recommended Venues
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Matched to your city, guest count and budget.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedVenues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </section>
      )}

      {recommendedVendors.length > 0 ? (
        <section>
          <h3 className="font-heading text-xl font-bold text-charcoal">
            Recommended Vendors
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Matched to the services you selected: {state.services.filter((s) => s !== "Venue").join(", ")}.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedVendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        </section>
      ) : (
        recommendedVenues.length === 0 && (
          <EmptyState
            title="No matches yet"
            description="Try widening your budget or picking a different city to see more recommendations."
            actionLabel="Browse All Vendors"
            actionHref="/services"
          />
        )
      )}
    </div>
  );
}
