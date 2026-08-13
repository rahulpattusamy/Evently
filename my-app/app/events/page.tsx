import Image from "next/image";
import { Users, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { eventTypes, getEventTypeBySlug } from "@/lib/data/event-types";
import { EventGroupNav } from "@/components/events/event-group-nav";
import { EventBentoGrid } from "@/components/events/event-bento-grid";

export const metadata = {
  title: "Explore Events | Evently",
};

const GROUPS = [
  {
    slug: "family-personal",
    label: "Family & Personal",
    group: "Family & Personal" as const,
    icon: Users,
    iconName: "Users",
    tagline: "The moments you gather for — from first birthdays to golden anniversaries.",
  },
  {
    slug: "corporate",
    label: "Corporate",
    group: "Corporate" as const,
    icon: Briefcase,
    iconName: "Briefcase",
    tagline: "From boardroom meetings to company-wide celebrations, handled end to end.",
  },
  {
    slug: "college-community",
    label: "College & Community",
    group: "College & Community" as const,
    icon: GraduationCap,
    iconName: "GraduationCap",
    tagline: "Campus fests, farewells and neighborhood programs that bring people together.",
  },
];

const HERO_IMAGES: Record<string, string | undefined> = {
  "family-personal": getEventTypeBySlug("weddings")?.image,
  corporate: getEventTypeBySlug("conferences")?.image,
  "college-community": getEventTypeBySlug("college-cultural-events")?.image,
};

export default function EventsPage() {
  const navGroups = GROUPS.map((g) => ({
    slug: g.slug,
    label: g.label,
    icon: g.iconName,
    count: eventTypes.filter((e) => e.group === g.group).length,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1 text-xs font-semibold text-burgundy">
            {eventTypes.length} occasions, one platform
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.05] text-charcoal sm:text-5xl">
            Every occasion
            <br />
            has a home here.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Weddings, board meetings, farewell parties, cultural fests —
            pick where your event lives and jump straight to venues and
            vendors built for it.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {GROUPS.map((g) => {
            const image = HERO_IMAGES[g.slug];
            const count = eventTypes.filter((e) => e.group === g.group).length;
            return (
              <a
                key={g.slug}
                href={`#${g.slug}`}
                className="group relative block h-64 overflow-hidden rounded-3xl sm:h-80"
              >
                {image && (
                  <Image
                    src={image}
                    alt={g.label}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                    <g.icon className="h-4 w-4 text-rose" />
                  </span>
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-charcoal">
                    {count} types
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="font-heading text-xl font-bold text-white">
                    {g.label}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs text-white/80">
                    {g.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <EventGroupNav groups={navGroups} />

      {/* Groups */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {GROUPS.map((g) => {
          const events = eventTypes.filter((e) => e.group === g.group);
          return (
            <section
              key={g.slug}
              id={g.slug}
              className="scroll-mt-32 border-b border-border py-12 last:border-b-0"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose">
                    <g.icon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {g.label}
                    </span>
                  </div>
                  <h2 className="mt-1 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                    {g.tagline}
                  </h2>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {events.length} event types
                </span>
              </div>

              <EventBentoGrid events={events} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
