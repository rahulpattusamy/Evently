"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Star,
  Quote,
  MapPin,
  Building2,
  Lock,
  Users,
} from "lucide-react";

const COL_A = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80",
];

const COL_B = [
  "https://images.unsplash.com/photo-1549981832-2ba2ee913334?w=500&q=80",
  "https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=500&q=80",
  "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=500&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80",
];

const COL_C = [
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80",
  "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=500&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80",
  "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=500&q=80",
];

const QUOTES = [
  { text: "Booked our entire wedding — venue to photographer — in under a week.", author: "Anitha R.", city: "Chennai" },
  { text: "Found a corporate venue and caterer for 200 guests without a single phone call.", author: "Rahul Nair", city: "Bengaluru" },
  { text: "The quote comparisons alone saved us ₹40,000 on decor.", author: "Priyanka S.", city: "Hyderabad" },
];

const CHIPS = ["Weddings", "Corporate", "Birthdays", "College Fests"];

const STATS = [
  { icon: ShieldCheck, value: "10,000+", label: "Verified Vendors" },
  { icon: Building2, value: "5000+", label: "Venues" },
  { icon: MapPin, value: "Pan India", label: "Coverage" },
  { icon: Lock, value: "Secure", label: "Bookings" },
];

function MarqueeColumn({
  images,
  direction,
  className = "",
}: {
  images: string[];
  direction: "up" | "down";
  className?: string;
}) {
  const doubled = [...images, ...images];
  return (
    <div className={`relative h-full w-40 shrink-0 overflow-hidden xl:w-52 ${className}`}>
      <div
        className={`flex flex-col gap-4 ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        }`}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-56 w-full shrink-0 overflow-hidden rounded-[1.4rem] xl:h-64"
          >
            <Image src={src} alt="" fill sizes="220px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthShowcase() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((i) => (i + 1) % QUOTES.length), 4500);
    return () => clearInterval(id);
  }, []);

  const quote = QUOTES[quoteIndex];

  return (
    <div className="scrollbar-hide relative hidden h-full w-full flex-col overflow-y-auto bg-warm-white lg:flex">
      {/* running photo columns, behind everything */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]">
        <MarqueeColumn images={COL_A} direction="up" />
        <MarqueeColumn images={COL_B} direction="down" />
        <MarqueeColumn images={COL_C} direction="up" className="hidden xl:block" />
      </div>

      {/* light legibility scrim over the running images */}
      <div className="absolute inset-0 bg-warm-white/35" />

      {/* ambient wash */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,79,124,0.08),transparent_60%)]" />

      <div className="relative flex flex-1 flex-col p-10 xl:p-12">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose to-burgundy font-heading text-lg font-bold text-white">
                E
              </span>
              <span className="font-heading text-2xl font-bold text-charcoal">Evently</span>
            </Link>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-charcoal/70">
              <Sparkles className="h-3.5 w-3.5 text-rose" />
              India&apos;s all-in-one event marketplace
            </p>
          </div>
        </div>

        {/* headline */}
        <div className="mt-10 max-w-lg">
          <h2 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-charcoal xl:text-[2.65rem]">
            Plan. Compare. Book.
            <br />
            <span className="bg-gradient-to-r from-rose to-gold bg-clip-text text-transparent">
              Celebrate, beautifully.
            </span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/75">
            Weddings, birthdays, corporate events and everything in between —
            10,000+ verified venues and vendors across India, all in one place.
          </p>
        </div>

        {/* chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CHIPS.map((chip, i) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(i)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                i === activeChip
                  ? "border-rose bg-blush text-burgundy"
                  : "border-border bg-white text-charcoal hover:border-rose/40"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* testimonial + cities */}
        <div className="mt-8 flex flex-1 items-stretch gap-4">
          <div
            key={quoteIndex}
            className="animate-auth-fade-up relative flex-1 overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <Quote className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 text-rose/[0.08]" />
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="relative mt-2 text-sm leading-relaxed text-charcoal">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              {quote.author} · {quote.city}
            </p>
            <div className="mt-3 flex gap-1.5">
              {QUOTES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i === quoteIndex ? "w-5 bg-rose" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex w-36 shrink-0 flex-col items-start justify-center gap-1.5 rounded-2xl border border-border bg-white p-4 shadow-sm">
            <MapPin className="h-4 w-4 text-gold" />
            <p className="text-sm font-bold text-charcoal">10 cities</p>
            <p className="text-xs text-muted-foreground">across India</p>
          </div>
        </div>

        {/* bottom stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-start gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blush text-rose">
                <stat.icon className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-charcoal">{stat.value}</p>
                <p className="text-xs text-charcoal/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="relative mt-8 flex items-center gap-1.5 text-xs font-medium text-charcoal/70">
          <Users className="h-3.5 w-3.5 text-rose" />
          Trusted by 50,000+ hosts planning their next celebration on Evently
        </p>
      </div>
    </div>
  );
}
