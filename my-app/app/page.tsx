import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ScaleIcon,
  ClipboardCheck,
  CalendarCheck2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { EventCarousel } from "@/components/shared/event-carousel";
import { HeroCollage } from "@/components/shared/hero-collage";
import { VenueCarousel } from "@/components/shared/venue-carousel";
import { VenueSpotlight } from "@/components/shared/venue-spotlight";
import { ServiceCategoryCard } from "@/components/shared/service-category-card";
import { featuredEventTypes, getEventTypeBySlug } from "@/lib/data/event-types";
import { categories } from "@/lib/data/categories";
import { venues } from "@/lib/data/venues";

const FEATURED_VENUES = [...venues].sort((a, b) => b.rating - a.rating).slice(0, 7);
const SPOTLIGHT_VENUE = FEATURED_VENUES[0];
const STRIP_VENUES = FEATURED_VENUES.slice(1);

const FEATURED_CATEGORIES = categories.slice(0, 10);

const HERO_STACK = [
  getEventTypeBySlug("weddings"),
  getEventTypeBySlug("birthdays"),
  getEventTypeBySlug("conferences"),
].filter((e): e is NonNullable<typeof e> => !!e);

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse venues and vendors tailored to your event, city and budget.",
  },
  {
    icon: ScaleIcon,
    title: "Compare",
    description: "Compare pricing, ratings, packages and availability side by side.",
  },
  {
    icon: ClipboardCheck,
    title: "Plan",
    description: "Build your event plan with recommended venues and services.",
  },
  {
    icon: CalendarCheck2,
    title: "Book",
    description: "Request quotes, confirm bookings and pay securely — all in one place.",
  },
];

export default function Home() {
  return (
    <div className="bg-warm-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <video
          src="/Hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blush/50 via-warm-white/40 to-warm-white" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-warm-white via-warm-white/70 to-warm-white/40 lg:to-warm-white/30" />
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-blush px-3 py-1 text-xs font-medium text-burgundy">
                India&apos;s all-in-one event marketplace
              </span>
              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                Everything for your{" "}
                <span className="text-rose">perfect event</span>, in one place.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Discover venues, planners, caterers, photographers, decorators
                and entertainers — compare, plan and book without the
                back-and-forth.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Weddings", "Birthdays", "Corporate", "College"].map((tag) => (
                  <Link
                    key={tag}
                    href="/events"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-rose hover:text-rose"
                  >
                    {tag}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            <HeroCollage />
          </div>

          {/* Search card overlaps into the next section */}
          <div className="relative z-10 mx-auto mt-10 max-w-4xl pb-10 sm:pb-14">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              Popular Events
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              From weddings to workshops — find inspiration for every occasion.
            </p>
          </div>
          <Link
            href="/events"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-rose hover:text-burgundy sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <EventCarousel events={featuredEventTypes} />
      </section>

      {/* Venue discovery */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Find the Perfect Event Venue
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Top-rated marriage halls, banquet spaces, convention centers and more.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden shrink-0 border-rose text-rose hover:bg-blush hover:text-burgundy sm:inline-flex"
            >
              <Link href="/venues">Explore Venues</Link>
            </Button>
          </div>

          {SPOTLIGHT_VENUE && (
            <div className="mt-6">
              <VenueSpotlight venue={SPOTLIGHT_VENUE} />
            </div>
          )}

          <VenueCarousel venues={STRIP_VENUES} />

          <Button
            asChild
            className="mt-6 w-full bg-rose text-white hover:bg-burgundy sm:hidden"
          >
            <Link href="/venues">Explore Venues</Link>
          </Button>
        </div>
      </section>

      {/* Service discovery */}
      <section className="bg-blush/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Find Everything You Need
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Planners, decorators, caterers, photographers and every
                service in between — all verified and ready to quote.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rose hover:text-burgundy"
              >
                Browse all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {FEATURED_CATEGORIES.map((category) => (
                <ServiceCategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              How Evently Works
            </h2>
            <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
              Discover. Compare. Plan. Book. Your entire event journey, simplified.
            </p>
          </div>
          <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-6 left-0 right-0 hidden h-px bg-border lg:block" />
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-rose bg-white">
                  <step.icon className="h-5 w-5 text-rose" />
                </div>
                <span className="mt-3 text-xs font-semibold text-rose">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a vendor CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-burgundy">
          <div className="absolute inset-0">
            <Image
              src={HERO_STACK[2].image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy/95 to-burgundy/70" />
          </div>
          <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-10 text-center sm:flex-row sm:px-12 sm:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Grow your business with Evently
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/80">
                Join thousands of verified venues and vendors reaching customers
                planning weddings, birthdays, corporate events and more.
              </p>
            </div>
            <Button
              asChild
              className="shrink-0 bg-rose text-white hover:bg-white hover:text-burgundy"
              size="lg"
            >
              <Link href="/vendor/dashboard">Become a Vendor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
