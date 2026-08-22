"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star, MapPin, Clock, BadgeCheck, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { Vendor } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getCityBySlug } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function VendorCard({
  vendor,
  className,
  isSponsored,
}: {
  vendor: Vendor;
  className?: string;
  isSponsored?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const category = getCategoryBySlug(vendor.categorySlug);
  const city = getCityBySlug(vendor.citySlug);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/8",
        isSponsored && "border-rose/30 ring-1 ring-rose/10",
        className
      )}
    >
      {/* ── Cover image ── */}
      <div className="relative h-44 w-full overflow-hidden bg-muted shrink-0">
        <img
          src={vendor.coverImage}
          alt={vendor.businessName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Sponsored / Premium badge */}
        {isSponsored ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-rose px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            <Zap className="h-2.5 w-2.5 fill-current animate-pulse" /> Sponsored
          </span>
        ) : vendor.premium ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
            Premium
          </span>
        ) : null}

        {/* Heart button */}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow transition-colors hover:bg-white"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              saved ? "fill-rose text-rose" : "text-charcoal/50"
            )}
          />
        </button>

        {/* Logo — overlaps cover + body */}
        <div className="absolute -bottom-5 left-4 h-11 w-11 overflow-hidden rounded-xl border-2 border-white bg-white shadow-md shrink-0">
          <Image
            src={vendor.logoImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-2 px-4 pt-7 pb-4">

        {/* Name row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-[15px] font-bold leading-snug text-charcoal line-clamp-1">
              {vendor.businessName}
            </h3>
            {/* Category · City */}
            <p className="mt-0.5 flex items-center gap-1 text-xs text-charcoal/50">
              <span>{category?.name}</span>
              {city && (
                <>
                  <span className="text-border">·</span>
                  <MapPin className="h-3 w-3 shrink-0 text-rose/70" />
                  <span className="text-rose/80 font-medium">{city.name}</span>
                </>
              )}
            </p>
          </div>
          {vendor.verified && (
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>

        {/* Tagline */}
        {vendor.tagline && (
          <p className="text-xs text-charcoal/60 leading-relaxed line-clamp-2">
            {vendor.tagline}
          </p>
        )}

        {/* Rating + meta row */}
        <div className="flex items-center gap-3 text-xs text-charcoal/50">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-bold text-charcoal">{vendor.rating.toFixed(1)}</span>
            <span>({vendor.reviewCount})</span>
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 shrink-0" />
            {vendor.responseTime}
          </span>
          <span className="h-3 w-px bg-border" />
          <span>{vendor.yearsInBusiness}yr exp</span>
        </div>

        {/* Service tags */}
        {vendor.services?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {vendor.services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-warm-white px-2.5 py-0.5 text-[10px] font-medium text-charcoal/70"
              >
                {s}
              </span>
            ))}
            {vendor.services.length > 3 && (
              <span className="rounded-full border border-border bg-warm-white px-2.5 py-0.5 text-[10px] font-medium text-charcoal/50">
                +{vendor.services.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-border/60 mt-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wide text-charcoal/40">
              Starting from
            </span>
            <span className="text-base font-extrabold text-charcoal">
              ₹{formatINR(vendor.startingPrice)}
            </span>
          </div>

          <Link
            href={`/vendors/${vendor.id}`}
            className="flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-rose shrink-0"
          >
            View Profile
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
