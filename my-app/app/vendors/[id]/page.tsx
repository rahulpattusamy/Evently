import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, BriefcaseBusiness } from "lucide-react";
import { getVendorById, vendors, getVendorsByCategory } from "@/lib/data/vendors";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getCityBySlug } from "@/lib/data/cities";
import { getReviewsFor } from "@/lib/data/reviews";
import { getEventTypeBySlug } from "@/lib/data/event-types";
import { VerifiedBadge, PremiumBadge } from "@/components/shared/verified-badge";
import { Rating } from "@/components/shared/rating";
import { formatINR } from "@/components/shared/price-display";
import { ImageGallery } from "@/components/shared/image-gallery";
import { ReviewCard } from "@/components/shared/review-card";
import { VendorDetailActions } from "@/components/vendors/vendor-detail-actions";
import { VendorAvailability } from "@/components/vendors/vendor-availability";
import { VendorCard } from "@/components/shared/vendor-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return vendors.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps<"/vendors/[id]">) {
  const { id } = await params;
  const vendor = getVendorById(id);
  return { title: vendor ? `${vendor.businessName} | Evently` : "Vendor | Evently" };
}

export default async function VendorProfilePage({
  params,
  searchParams,
}: PageProps<"/vendors/[id]">) {
  const { id } = await params;
  const vendor = getVendorById(id);
  if (!vendor) notFound();

  const sp = await searchParams;
  const openQuote = sp.quote === "1";

  const category = getCategoryBySlug(vendor.categorySlug);
  const city = getCityBySlug(vendor.citySlug);
  const reviews = getReviewsFor("vendor", vendor.id);
  const similarVendors = getVendorsByCategory(vendor.categorySlug).filter((v) => v.id !== vendor.id).slice(0, 3);

  return (
    <div>
      <div className="relative h-56 w-full sm:h-72">
        <Image src={vendor.coverImage} alt={vendor.businessName} fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
            <Image src={vendor.logoImage} alt="" fill sizes="112px" className="object-cover" />
          </div>
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
                {vendor.businessName}
              </h1>
              {vendor.verified && <VerifiedBadge />}
              {vendor.premium && <PremiumBadge />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{vendor.tagline}</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {vendor.address}, {city?.state}
              </span>
              <span className="flex items-center gap-1">
                <BriefcaseBusiness className="h-4 w-4" /> {category?.name}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Responds {vendor.responseTime}
              </span>
              <Rating value={vendor.rating} reviewCount={vendor.reviewCount} />
            </div>
          </div>
          <div className="pb-1">
            <VendorDetailActions vendorName={vendor.businessName} openInitially={openQuote} />
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-8 pb-14">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-blush/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {vendor.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border p-4 text-center">
                <p className="text-xl font-bold text-charcoal">{vendor.yearsInBusiness}+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <p className="text-xl font-bold text-charcoal">{vendor.reviewCount}</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <p className="text-xl font-bold text-charcoal">{vendor.rating.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div className="rounded-xl border border-border p-4 text-center">
                <p className="text-xl font-bold text-charcoal">₹{formatINR(vendor.startingPrice)}</p>
                <p className="text-xs text-muted-foreground">Starting Price</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">Suitable For</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {vendor.eventTypes.map((slug) => {
                  const et = getEventTypeBySlug(slug);
                  return et ? (
                    <span key={slug} className="rounded-full border border-border px-3 py-1 text-sm text-charcoal">
                      {et.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {vendor.services.map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-xl border border-border p-4">
                  <Check className="h-4 w-4 shrink-0 text-rose" />
                  <span className="text-sm text-charcoal">{s}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <ImageGallery images={vendor.portfolio} alt={vendor.businessName} />
          </TabsContent>

          <TabsContent value="packages" className="mt-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {vendor.packages.map((pkg, i) => (
                <div
                  key={pkg.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    i === 1 ? "border-rose shadow-lg shadow-rose/10" : "border-border"
                  }`}
                >
                  {i === 1 && (
                    <span className="mb-2 w-fit rounded-full bg-rose px-2.5 py-0.5 text-xs font-medium text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-lg font-bold text-charcoal">{pkg.name}</h3>
                  <p className="mt-1 text-2xl font-extrabold text-charcoal">
                    ₹{formatINR(pkg.price)}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-5 ${i === 1 ? "bg-rose text-white hover:bg-burgundy" : ""}`}
                    variant={i === 1 ? "default" : "outline"}
                  >
                    Choose {pkg.name}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <VendorAvailability />
          </TabsContent>
        </Tabs>

        {similarVendors.length > 0 && (
          <section className="pb-14">
            <h2 className="font-heading text-2xl font-bold text-charcoal">
              More {category?.name}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarVendors.map((v) => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
