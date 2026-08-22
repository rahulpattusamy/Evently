"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Vendor } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getCityBySlug } from "@/lib/data/cities";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function VendorCard({
  vendor,
  className,
}: {
  vendor: Vendor;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  const category = getCategoryBySlug(vendor.categorySlug);
  const city = getCityBySlug(vendor.citySlug);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-charcoal/10",
        className
      )}
    >
      {/* Top row: Verified badge + Heart */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        {vendor.verified ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save to wishlist"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5 transition-colors hover:bg-charcoal/10 cursor-pointer"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              saved ? "fill-rose text-rose" : "text-charcoal/40"
            )}
          />
        </button>
      </div>

      {/* Cover image area (tall, no rounded corners since card has overflow-hidden) */}
      <div className="relative mx-4 h-36 overflow-hidden rounded-xl bg-muted">
        <img
          src={vendor.coverImage}
          alt={vendor.businessName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 px-4 pt-4 pb-5">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-charcoal">{vendor.rating.toFixed(1)}</span>
          <span className="text-xs text-charcoal/40">({vendor.reviewCount})</span>
        </div>

        {/* Business name */}
        <h3 className="font-heading text-base font-bold text-charcoal leading-snug line-clamp-1">
          {vendor.businessName}
        </h3>

        {/* Category · City */}
        <p className="text-xs text-charcoal/50">
          {category?.name}
          {city && (
            <>
              {" · "}
              <span className="text-rose/80">{city.name}</span>
            </>
          )}
        </p>

        {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-charcoal/40 uppercase tracking-wide">From</span>
            <span className="text-lg font-bold text-charcoal">
              ₹{formatINR(vendor.startingPrice)}
            </span>
          </div>

          <Link
            href={`/vendors/${vendor.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal transition-all duration-200 hover:bg-rose hover:text-white shrink-0"
            aria-label={`View ${vendor.businessName}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
