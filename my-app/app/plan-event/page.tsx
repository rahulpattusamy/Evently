import { PlanEventWizard } from "@/components/plan-event/plan-event-wizard";

export const metadata = { title: "Plan Your Event | Evently" };

export default function PlanEventPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-charcoal sm:text-4xl">
          Plan Your Event
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Answer a few quick questions and we&apos;ll put together a starting
          plan with venues and vendors matched to your event.
        </p>
      </div>
      <PlanEventWizard />
    </div>
  );
}
