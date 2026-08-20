import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ScaleIcon,
  ClipboardCheck,
  CalendarCheck2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";
import { HeroCollage } from "@/components/shared/hero-collage";
import { ServiceDiscoverySection } from "@/components/shared/service-discovery-section";
import { UnifiedDiscoverySection } from "@/components/shared/unified-discovery-section";
import { getEventTypeBySlug } from "@/lib/data/event-types";
import { categories } from "@/lib/data/categories";
import { venues } from "@/lib/data/venues";
import { vendors } from "@/lib/data/vendors";

const FEATURED_CATEGORIES = [
  "invitation-designers",
  "banner-designers",
  "caterers",
  "event-planners",
  "wedding-planners",
  "photographers",
  "decorators",
  "bakers",
  "specialty-food-vendors",
  "makeup-artists",
  "mehendi-artists",
  "djs",
  "bridal-wear",
  "groom-wear",
  "gifts",
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
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-blush px-3 py-1 text-xs font-medium text-burgundy">
                India&apos;s all-in-one event marketplace
              </span>
              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.2] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
                Everything for your{" "}
                <span className="text-rose">perfect event</span>, in one place.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Discover venues, planners, caterers, photographers, decorators
                and entertainers — compare, plan and book without the
                back-and-forth.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Family Functions", "Weddings", "Birthdays", "Corporate Events"].map((tag) => (
                  <Link
                    key={tag}
                    href="/events"
                    className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-rose hover:text-rose"
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
      <ServiceDiscoverySection
        categories={categories}
        featuredCategories={FEATURED_CATEGORIES}
      />

      {/* Unified Discovery (Venues & Services) */}
      <UnifiedDiscoverySection venues={venues} vendors={vendors} />

      {/* How it works */}
      <section id="how-it-works" className="relative isolate overflow-hidden bg-gradient-to-b from-white to-warm-white py-20 sm:py-28">
        {/* Animated premium aura background glows */}
        <div className="absolute -top-40 -left-40 -z-10 h-[35rem] w-[35rem] rounded-full bg-gold/10 blur-[130px] animate-blob-a pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 -z-10 h-[35rem] w-[35rem] rounded-full bg-rose/8 blur-[130px] animate-blob-b pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
              How Evently Works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Discover. Compare. Plan. Book. Your entire event journey, simplified.
            </p>
          </div>
          <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-6 left-0 right-0 hidden h-[2px] bg-gradient-to-r from-rose/10 via-rose/40 to-rose/10 lg:block" />
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.title}
                className="group relative flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-rose bg-white text-rose transition-all duration-300 group-hover:scale-110 group-hover:bg-rose group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose/30 group-hover:border-rose">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="mt-4 text-[10px] font-extrabold uppercase tracking-wider text-rose/85 transition-colors duration-300 group-hover:text-rose">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-extrabold text-charcoal transition-colors duration-300 group-hover:text-rose">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a vendor CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-border shadow-lg shadow-charcoal/5">
          <div className="absolute inset-0">
            <Image
              src={HERO_STACK[2].image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90" />
          </div>
          <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-10 text-center sm:flex-row sm:px-12 sm:text-left">
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Grow your business with Evently
              </h2>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Join thousands of verified venues and vendors reaching customers
                planning weddings, birthdays, corporate events and more.
              </p>
            </div>
            <Button
              asChild
              className="shrink-0 bg-rose text-white hover:bg-charcoal hover:text-white"
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
