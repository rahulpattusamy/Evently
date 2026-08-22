import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Clock, BriefcaseBusiness, Star, BadgeCheck,
  Crown, ArrowLeft, Check, CalendarDays,
  ShieldCheck, Zap, Users,
} from "lucide-react";
import { getVendorById, vendors, getVendorsByCategory } from "@/lib/data/vendors";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getCityBySlug } from "@/lib/data/cities";
import { getReviewsFor } from "@/lib/data/reviews";
import { getEventTypeBySlug } from "@/lib/data/event-types";
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
  const similarVendors = getVendorsByCategory(vendor.categorySlug)
    .filter((v) => v.id !== vendor.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* ══ CLEAN HEADER ══ */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4">
            {/* Back */}
            <Link
              href={`/services/${vendor.categorySlug}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-charcoal hover:border-rose/40 hover:text-rose transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            {/* Logo */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm">
              <Image src={vendor.logoImage} alt="" fill sizes="64px" className="object-cover" />
            </div>

            {/* Name + badges + tagline */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
                  {vendor.businessName}
                </h1>
                {vendor.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
                {vendor.premium && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    <Crown className="h-3 w-3" /> Premium
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-charcoal/55 line-clamp-1">{vendor.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ META STRIP ══ */}
      <div className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-charcoal/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-rose" />
                {vendor.address}, {city?.name}, {city?.state}
              </span>
              <span className="hidden h-3.5 w-px bg-border sm:block" />
              <span className="flex items-center gap-1.5">
                <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-rose" />
                {category?.name}
              </span>
              <span className="hidden h-3.5 w-px bg-border sm:block" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-rose" />
                Responds {vendor.responseTime}
              </span>
              <span className="hidden h-3.5 w-px bg-border sm:block" />
              <span className="flex items-center gap-1.5 font-semibold text-charcoal">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {vendor.rating.toFixed(1)}
                <span className="font-normal text-charcoal/50">({vendor.reviewCount} reviews)</span>
              </span>
            </div>
            {/* Desktop-only actions in meta strip */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <VendorDetailActions vendorName={vendor.businessName} openInitially={openQuote} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ BODY: two-column layout ══ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">

          {/* ── MAIN CONTENT (left) ── */}
          <div className="min-w-0 flex-1">

            {/* Quick stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
              {[
                { icon: Zap, label: "Years Exp.", value: `${vendor.yearsInBusiness}+`, color: "text-rose", bg: "bg-rose/8" },
                { icon: Users, label: "Reviews", value: `${vendor.reviewCount}`, color: "text-charcoal", bg: "bg-charcoal/5" },
                { icon: Star, label: "Avg Rating", value: `${vendor.rating.toFixed(1)}★`, color: "text-amber-500", bg: "bg-amber-50" },
                { icon: ShieldCheck, label: "Starting", value: `₹${formatINR(vendor.startingPrice)}`, color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col rounded-2xl border border-border bg-white px-4 py-4 shadow-sm">
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${s.bg}`}>
                    <s.icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <span className={`text-xl font-extrabold leading-none ${s.color}`}>{s.value}</span>
                  <span className="mt-1 text-[11px] font-medium text-charcoal/45">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="pb-14">
              <div className="sticky top-0 z-30 -mx-1 bg-[#f8f8f8] pt-1 pb-2">
                <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-xl border border-border bg-white p-1 shadow-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="packages">Packages</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                  <TabsTrigger value="availability" className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" /> Availability
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview */}
              <TabsContent value="overview" className="mt-4 space-y-6">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-lg font-bold text-charcoal">About</h2>
                  <p className="mt-3 text-sm leading-7 text-charcoal/65">{vendor.description}</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-lg font-bold text-charcoal mb-3">Suitable For</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.eventTypes.map((slug) => {
                      const et = getEventTypeBySlug(slug);
                      return et ? (
                        <span key={slug} className="rounded-full border border-rose/20 bg-blush/30 px-3 py-1 text-xs font-medium text-rose">
                          {et.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Services */}
              <TabsContent value="services" className="mt-4">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-lg font-bold text-charcoal mb-4">What We Offer</h2>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {vendor.services.map((s) => (
                      <div key={s} className="flex items-center gap-3 rounded-xl border border-border bg-warm-white px-4 py-3 transition hover:border-rose/30">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose/10">
                          <Check className="h-3.5 w-3.5 text-rose" />
                        </span>
                        <span className="text-sm font-medium text-charcoal">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Portfolio */}
              <TabsContent value="portfolio" className="mt-4">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <ImageGallery images={vendor.portfolio} alt={vendor.businessName} />
                </div>
              </TabsContent>

              {/* Packages */}
              <TabsContent value="packages" className="mt-4">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {vendor.packages.map((pkg, i) => (
                    <div
                      key={pkg.name}
                      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                        i === 1 ? "border-rose shadow-rose/10" : "border-border"
                      }`}
                    >
                      {i === 1 && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-rose px-3 py-1 text-[11px] font-bold text-white shadow">
                          Most Popular
                        </span>
                      )}
                      <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/40">{pkg.name}</p>
                      <p className="mt-1 text-3xl font-extrabold text-charcoal">₹{formatINR(pkg.price)}</p>
                      <div className="my-4 h-px bg-border" />
                      <ul className="flex-1 space-y-2.5">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-charcoal/70">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`mt-6 w-full ${i === 1 ? "bg-rose text-white hover:bg-burgundy" : ""}`}
                        variant={i === 1 ? "default" : "outline"}
                      >
                        Choose {pkg.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="mt-4 space-y-4">
                {reviews.length === 0
                  ? <p className="text-sm text-muted-foreground">No reviews yet.</p>
                  : reviews.map((r) => <ReviewCard key={r.id} review={r} />)
                }
              </TabsContent>

              {/* Availability */}
              <TabsContent value="availability" className="mt-4">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <VendorAvailability />
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar vendors */}
            {similarVendors.length > 0 && (
              <section className="pb-14">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-heading text-xl font-bold text-charcoal">More {category?.name}</h2>
                  <Link href={`/services/${vendor.categorySlug}`} className="text-sm font-semibold text-rose hover:text-burgundy transition-colors">
                    See all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {similarVendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
                </div>
              </section>
            )}
          </div>

          {/* ── STICKY SIDEBAR (right) ── */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-6 space-y-4">
              {/* Booking card */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/40">Starting from</p>
                <p className="mt-1 text-3xl font-extrabold text-charcoal">
                  ₹{formatINR(vendor.startingPrice)}
                </p>
                <div className="my-4 h-px bg-border" />
                <div className="space-y-2.5 text-sm text-charcoal/70">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-gold shrink-0" />
                    <span><b className="text-charcoal">{vendor.rating.toFixed(1)}</b> · {vendor.reviewCount} reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rose shrink-0" />
                    <span>Responds {vendor.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-rose shrink-0" />
                    <span>{vendor.yearsInBusiness}+ years in business</span>
                  </div>
                  {vendor.verified && (
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-emerald-600 font-medium">Verified vendor</span>
                    </div>
                  )}
                </div>
                <div className="mt-5 space-y-2">
                  <VendorDetailActions vendorName={vendor.businessName} openInitially={openQuote} />
                </div>
              </div>

              {/* Quick info card */}
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm space-y-3">
                <h3 className="font-heading text-sm font-bold text-charcoal">Quick Info</h3>
                <div className="space-y-2 text-xs text-charcoal/60">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-rose mt-0.5" />
                    <span>{vendor.address}, {city?.name}, {city?.state}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0 text-rose mt-0.5" />
                    <span>{category?.name}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {vendor.eventTypes.slice(0, 4).map((slug) => {
                    const et = getEventTypeBySlug(slug);
                    return et ? (
                      <span key={slug} className="rounded-full border border-rose/20 bg-blush/30 px-2.5 py-0.5 text-[10px] font-medium text-rose">
                        {et.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white px-4 py-3 lg:hidden">
        <VendorDetailActions vendorName={vendor.businessName} openInitially={openQuote} />
      </div>

    </div>
  );
}
