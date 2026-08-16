import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ScaleIcon,
  ClipboardCheck,
  CalendarCheck2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Play,
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

const FEATURED_CATEGORIES = [
  "wedding-planners",
  "event-planners",
  "decorators",
  "caterers",
  "bakers",
  "specialty-food-vendors",
  "photographers",
  "makeup-artists",
  "mehendi-artists",
  "djs",
]
  .map((slug) => categories.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => !!c);

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

      {/* Service discovery */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose/[0.03] via-white to-white py-20 lg:py-24 border-y border-border">
        {/* Silhouette decoration overlay (bottom left) */}
        <div className="absolute bottom-0 left-0 w-full max-w-[450px] pointer-events-none select-none opacity-20 text-rose/30">
          <svg
            viewBox="0 0 400 150"
            className="w-full h-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tent on the left */}
            <path d="M 10,150 L 10,120 L 40,90 L 70,120 L 70,150 Z" opacity="0.6" />
            <path d="M 40,90 L 40,75 L 38,75 L 38,70 L 42,70 L 42,75 L 40,75 Z" opacity="0.8" />
            <polygon points="40,70 50,73 40,76" opacity="0.8" />
            <path d="M 25,150 L 25,130 C 25,125 35,120 40,120 C 45,120 55,125 55,130 L 55,150 Z" fill="white" opacity="0.4" />
            
            {/* String lights from tent flag (40, 70) to building edge (180, 50) */}
            <path d="M 40,75 Q 110,105 180,55" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
            {/* Small circle bulbs on string */}
            <circle cx="60" cy="83" r="2" opacity="0.9" />
            <circle cx="85" cy="89" r="2" opacity="0.9" />
            <circle cx="110" cy="91" r="2" opacity="0.9" />
            <circle cx="135" cy="85" r="2" opacity="0.9" />
            <circle cx="160" cy="73" r="2" opacity="0.9" />

            {/* String lights from building edge (180, 50) to right edge tree (300, 100) */}
            <path d="M 180,55 Q 240,95 300,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
            <circle cx="205" cy="69" r="2" opacity="0.9" />
            <circle cx="230" cy="79" r="2" opacity="0.9" />
            <circle cx="255" cy="86" r="2" opacity="0.9" />
            <circle cx="280" cy="93" r="2" opacity="0.9" />

            {/* Small secondary tent behind the main tent */}
            <path d="M 60,150 L 60,130 L 80,110 L 100,130 L 100,150 Z" opacity="0.4" />

            {/* Tree next to the tent */}
            <path d="M 120,150 L 120,110 L 122,110 L 122,150 Z" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <circle cx="121" cy="100" r="15" opacity="0.5" />
            <circle cx="111" cy="95" r="10" opacity="0.4" />
            <circle cx="131" cy="95" r="10" opacity="0.4" />

            {/* Building on the right */}
            <rect x="180" y="40" width="70" height="110" rx="4" opacity="0.5" />
            <rect x="250" y="70" width="40" height="80" rx="3" opacity="0.4" />
            
            {/* Building windows (lit up) */}
            <rect x="192" y="55" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="210" y="55" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="228" y="55" width="10" height="14" rx="1" fill="white" opacity="0.8" />

            <rect x="192" y="80" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="210" y="80" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="228" y="80" width="10" height="14" rx="1" fill="white" opacity="0.8" />

            <rect x="192" y="105" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="210" y="105" width="10" height="14" rx="1" fill="white" opacity="0.8" />
            <rect x="228" y="105" width="10" height="14" rx="1" fill="white" opacity="0.8" />

            {/* Tree on the very right */}
            <path d="M 320,150 L 320,120 L 322,120 L 322,150 Z" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <circle cx="321" cy="110" r="18" opacity="0.5" />
            <circle cx="308" cy="105" r="12" opacity="0.4" />
            <circle cx="334" cy="105" r="12" opacity="0.4" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
            {/* Left Content Area */}
            <div className="flex flex-col items-start lg:sticky lg:top-24">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold text-rose">
                <Sparkles className="h-3.5 w-3.5" />
                All Services. Verified. Trusted.
              </div>

              {/* Title */}
              <h2 className="mt-6 font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
                Find Everything <br />
                <span className="text-rose">You</span> Need
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Planners, decorators, caterers, photographers and every
                service in between — all verified and ready to quote.
              </p>

              {/* Trust highlights */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose">
                    <ShieldCheck className="h-5.5 w-5.5" />
                  </div>
                  <span className="text-xs font-bold leading-tight text-charcoal sm:text-sm">
                    Verified<br />Vendors
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  <span className="text-xs font-bold leading-tight text-charcoal sm:text-sm">
                    Trusted by<br />10K+ Users
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose">
                    <Zap className="h-5.5 w-5.5" />
                  </div>
                  <span className="text-xs font-bold leading-tight text-charcoal sm:text-sm">
                    Quick<br />Responses
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:bg-burgundy hover:shadow-rose/30 hover:-translate-y-0.5"
                >
                  Browse all services
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2.5 text-base font-semibold text-rose transition-colors hover:text-burgundy"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose transition-transform group-hover:scale-105">
                    <Play className="h-3.5 w-3.5 fill-rose text-rose ml-0.5" />
                  </div>
                  How it works
                </Link>
              </div>
            </div>

            {/* Right Card Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {FEATURED_CATEGORIES.map((category) => (
                <ServiceCategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
