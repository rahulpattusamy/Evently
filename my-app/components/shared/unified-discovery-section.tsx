"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Sparkles, MapPin, Users } from "lucide-react";
import { Venue, Vendor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { VenueSpotlight } from "./venue-spotlight";
import { VenueCarousel } from "./venue-carousel";
import { VendorCard } from "./vendor-card";
import { Rating } from "./rating";
import { VerifiedBadge, PremiumBadge } from "./verified-badge";
import { PriceDisplay } from "./price-display";
import { getCityBySlug } from "@/lib/data/cities";
import { getCategoryBySlug } from "@/lib/data/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface UnifiedDiscoverySectionProps {
  venues: Venue[];
  vendors: Vendor[];
}

const CAROUSEL_OPTS = { align: "start" as const, loop: true };

export function UnifiedDiscoverySection({ venues, vendors }: UnifiedDiscoverySectionProps) {
  const [activeTab, setActiveTab] = useState<"venues" | "vendors">("venues");

  // Venues calculation
  const allFeaturedVenues = [...venues].sort((a, b) => b.rating - a.rating);
  const spotlightVenue = allFeaturedVenues.find(v => v.venueType === "Banquet Hall" || v.venueType === "Convention Center") || allFeaturedVenues[0];
  const stripVenues = allFeaturedVenues.filter(v => v.id !== spotlightVenue.id).slice(0, 6);

  // Vendors calculation
  const allFeaturedVendors = [...vendors].sort((a, b) => b.rating - a.rating);
  const spotlightVendor = allFeaturedVendors[0];
  const stripVendors = allFeaturedVendors.slice(1, 7);

  const city = spotlightVendor ? getCityBySlug(spotlightVendor.citySlug) : null;
  const category = spotlightVendor ? getCategoryBySlug(spotlightVendor.categorySlug) : null;

  return (
    <section className="border-y border-border bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Switcher */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Featured Venues & Services
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Browse top-rated banquet halls, convention centers, and verified event vendors side-by-side.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex rounded-full bg-blush/40 p-1 border border-rose/10 self-start md:self-end">
            <button
              onClick={() => setActiveTab("venues")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "venues"
                  ? "bg-rose text-white shadow-md shadow-rose/10"
                  : "text-charcoal hover:text-rose"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Venues
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "vendors"
                  ? "bg-rose text-white shadow-md shadow-rose/10"
                  : "text-charcoal hover:text-rose"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Services & Vendors
            </button>
          </div>
        </div>

        {activeTab === "venues" ? (
          <div className="mt-8 transition-all duration-500 animate-in fade-in duration-300">
            {spotlightVenue && <VenueSpotlight venue={spotlightVenue} />}
            <VenueCarousel venues={stripVenues} />
          </div>
        ) : (
          <div className="mt-8 transition-all duration-500 animate-in fade-in duration-300">
            {/* Vendor Spotlight */}
            {spotlightVendor && (
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-white sm:grid-cols-2">
                <div className="relative h-64 sm:h-full">
                  <Image
                    src={spotlightVendor.coverImage}
                    alt={spotlightVendor.businessName}
                    fill
                    sizes="(max-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {spotlightVendor.premium && (
                    <PremiumBadge className="absolute left-4 top-4 bg-white/90" />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                  <span className="w-fit rounded-full bg-blush px-3 py-1 text-xs font-semibold text-burgundy">
                    Featured vendor of the week
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shadow-sm">
                      <Image src={spotlightVendor.logoImage} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
                          {spotlightVendor.businessName}
                        </h3>
                        {spotlightVendor.verified && <VerifiedBadge />}
                      </div>
                      <p className="text-xs text-muted-foreground">{category?.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {spotlightVendor.address}, {city?.state}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    Premium professional {category?.name?.toLowerCase() || "event service"} providing best-in-class service for weddings, corporate meetings, and family functions.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <PriceDisplay amount={spotlightVendor.startingPrice} amountClassName="text-xl" />
                    <Rating value={spotlightVendor.rating} reviewCount={spotlightVendor.reviewCount} />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button asChild variant="outline" className="border-rose text-rose hover:bg-blush hover:text-burgundy">
                      <Link href={`/vendors/${spotlightVendor.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild className="bg-rose text-white hover:bg-burgundy">
                      <Link href={`/vendors/${spotlightVendor.id}?quote=1`}>Request Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Vendor Carousel */}
            <Carousel opts={CAROUSEL_OPTS} className="mt-6">
              <CarouselContent className="-ml-5">
                {stripVendors.map((vendor) => (
                  <CarouselItem
                    key={vendor.id}
                    className="basis-[19rem] pl-5 sm:basis-1/2 lg:basis-1/3"
                  >
                    <VendorCard vendor={vendor} className="w-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="border-rose text-rose hover:bg-blush hover:text-burgundy px-8"
          >
            <Link href={activeTab === "venues" ? "/venues" : "/services"}>
              {activeTab === "venues" ? "Explore All Venues" : "Explore All Services"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
