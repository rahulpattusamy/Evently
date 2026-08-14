import { CheckCircle2, Circle, Users } from "lucide-react";
import { formatINR } from "@/components/shared/price-display";
import { EmptyState } from "@/components/shared/empty-state";
import { currentUser, getUserEvents } from "@/lib/data/users";
import { getCityBySlug } from "@/lib/data/cities";

export const metadata = {
  title: "My Events | Evently",
};

export default function DashboardEventsPage() {
  const events = getUserEvents(currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal">My Events</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track planning progress across every event you&apos;re organizing.
        </p>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="No events yet"
          description="Start planning your next event to see it here."
          actionLabel="Plan an Event"
          actionHref="/plan-event"
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event) => {
            const city = getCityBySlug(event.citySlug);
            return (
              <div key={event.id} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div
                  className="h-36 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.coverImage})` }}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-charcoal">{event.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {city?.name}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-blush px-3 py-1 text-xs font-bold text-burgundy">
                      {event.progress}%
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {event.guests} guests · Budget ₹{formatINR(event.budget)}
                  </p>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-rose" style={{ width: `${event.progress}%` }} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {event.requirements.map((req) => (
                      <div key={req.label} className="flex items-center gap-2 text-sm">
                        {req.done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-rose" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className={req.done ? "text-charcoal" : "text-muted-foreground"}>{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
