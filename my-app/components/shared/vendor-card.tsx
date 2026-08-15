"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { Vendor } from "@/lib/types";
import { Rating } from "@/components/shared/rating";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getCityBySlug } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

import { Zap } from "lucide-react";

export function VendorCard({ vendor, className, isSponsored }: { vendor: Vendor; className?: string; isSponsored?: boolean }) {
  const [saved, setSaved] = useState(false);
  const category = getCategoryBySlug(vendor.categorySlug);
  const city = getCityBySlug(vendor.citySlug);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-charcoal/5",
        isSponsored && "border-rose/50 ring-1 ring-rose/10 shadow-md",
        className
      )}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={vendor.coverImage}
          alt={vendor.businessName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
        >
          <Heart className={cn("h-4 w-4", saved ? "fill-rose text-rose" : "text-charcoal")} />
        </button>
        {isSponsored ? (
          <span className="absolute left-3 top-3 z-10 rounded bg-rose px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wide flex items-center gap-1 shadow-sm">
            <Zap className="h-2 w-2 fill-current animate-pulse" /> Sponsored
          </span>
        ) : vendor.premium ? (
          <PremiumBadge className="absolute left-3 top-3 bg-white/90" />
        ) : null}
      </div>

      <div className="space-y-2.5 p-4">
        <div className="flex items-start gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
            <Image src={vendor.logoImage} alt="" fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 font-heading text-base font-bold text-charcoal">
                {vendor.businessName}
              </h3>
              {vendor.verified && <VerifiedBadge className="shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground">{category?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {vendor.address}, {city?.state}
          </span>
        </div>

        <div className="flex items-end justify-between pt-1">
          <PriceDisplay amount={vendor.startingPrice} />
          <Rating value={vendor.rating} reviewCount={vendor.reviewCount} />
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-rose text-rose hover:bg-blush hover:text-burgundy"
          >
            <Link href={`/vendors/${vendor.id}`}>View Profile</Link>
          </Button>
          <Button asChild className="flex-1 bg-rose text-white hover:bg-burgundy">
            <Link href={`/vendors/${vendor.id}?quote=1`}>Request Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
