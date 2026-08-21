"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { categories } from "@/lib/data/categories";
import { CategoryIcon } from "@/components/shared/service-category-card";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/data/cities";
import { Menu, Search, Heart, ChevronDown, MapPin, User, Store, LogOut, HelpCircle, Headphones, Sparkles } from "lucide-react";
import { getBookingsByUser } from "@/lib/data/bookings";
import { getUserEvents } from "@/lib/data/users";
import { getQuotesByUser } from "@/lib/data/quote-requests";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStickySearch } from "@/components/layout/sticky-search-context";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { toast } from "sonner";



function getCategoryIconImage(slug: string): string {
  switch (slug) {
    case "wedding-planners":
      return "/evently_service_icons/wedding-planners.png";
    case "event-planners":
    case "cabs-vans-rental":
    case "event-equipment":
    case "anchors-hosts":
      return "/evently_service_icons/event-planners.png";
    case "decorators":
    case "stage-decorators":
    case "backdrop-designers":
    case "floral-decorators":
    case "stages":
    case "furniture-rentals":
    case "lighting":
      return "/evently_service_icons/decorators.png";
    case "caterers":
    case "chairs":
    case "tables":
    case "vessels-chairs-rental":
      return "/evently_service_icons/caterers.png";
    case "bakers":
      return "/evently_service_icons/bakers.png";
    case "specialty-food-vendors":
      return "/evently_service_icons/specialty-food-vendors.png";
    case "photographers":
    case "videographers":
    case "drone-photography":
    case "projectors":
    case "led-screens":
      return "/evently_service_icons/photographers.png";
    case "djs":
    case "sound-systems":
    case "singers":
    case "dance-groups":
      return "/evently_service_icons/djs.png";
    case "makeup-artists":
    case "hair-stylists":
      return "/evently_service_icons/makeup-artists.png";
    case "mehendi-artists":
      return "/evently_service_icons/mehendi-artists.png";
    case "bridal-wear":
      return "/evently_service_icons/bridal-wear.png";
    case "groom-wear":
      return "/evently_service_icons/groom-wear.png";
    case "gifts":
      return "/evently_service_icons/gifts-favors.png";
    case "banner-designers":
    case "banner-printing":
      return "/evently_service_icons/banner-designers.png";
    case "invitation-designers":
    case "presentation-designers":
    case "poster-designers":
    case "flyer-designers":
    case "stage-backdrop-designers":
    case "digital-creative-designers":
    case "social-media-creative-designers":
    case "invitation-printing":
    case "poster-printing":
    case "brochure-printing":
    case "standee-printing":
    case "certificate-printing":
      return "/evently_service_icons/invitation-designers.png";
    default:
      return "/evently_service_icons/wedding-planners.png";
  }
}

const NAV_LINKS = [
  { label: "Venues", href: "/venues" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isCompactSearchActive, setCompactSearchActive } = useStickySearch();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const router = useRouter();

  function handleSearchSubmit(value: string) {
    const params = new URLSearchParams();
    if (value) params.set("q", value);
    router.push(`/search?${params.toString()}`);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserRole(localStorage.getItem("userRole"));

    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    if (city) setSelectedCity(city);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setCompactSearchActive(false);
      return;
    }

    function handleScroll() {
      const element = document.getElementById("services-section");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setCompactSearchActive(rect.top <= 96);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setCompactSearchActive(false);
    };
  }, [pathname, setCompactSearchActive]);

  const bookingsCount = getBookingsByUser("user-1").length;
  const eventsCount = getUserEvents("user-1").length;
  const quotesCount = getQuotesByUser("user-1").length;
  const totalCount = bookingsCount + eventsCount + quotesCount;

  function handleLogOut() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    toast.success("Successfully logged out!");
    window.location.href = "/";
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-white transition-transform duration-300 ${isCompactSearchActive ? "-translate-y-24" : "translate-y-0"
        }`}
    >
      <div className="flex h-24 w-full items-center justify-between px-4 sm:px-6 lg:pl-4 lg:pr-10">
        {/* Left Side: Logo & Main Navigation Links (flex-1 to align center column) */}
        <div className="flex flex-1 items-center justify-start gap-8 shrink-0">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center">
              <Logo className="h-14" priority />
            </Link>
            <span className="text-[9px] text-charcoal/50 whitespace-nowrap mt-1 font-medium leading-none select-none">
              India's Premier Event Booking & Vendor Marketplace
            </span>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-charcoal/90 transition-colors hover:text-rose whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Search Input Bar & City Selector (Centered using three equal flex boxes) */}
        <div className="relative flex-initial w-full max-w-xl mx-4 hidden lg:flex items-center rounded-full border border-border bg-warm-white/50 px-1 py-0.5 focus-within:border-rose/60 focus-within:bg-white focus-within:ring-1 focus-within:ring-rose/20 transition-all duration-200 animate-in fade-in duration-300">
          {/* City Selector */}
          <div className="flex items-center gap-1.5 pl-3.5 pr-2 text-xs border-r border-border/60 shrink-0">
            <MapPin className="h-3.5 w-3.5 text-rose shrink-0" />
            <span className="font-semibold text-charcoal/60 hidden xl:inline">City:</span>
            <Select value={selectedCity} onValueChange={(city) => {
              setSelectedCity(city);
              if (city === "all") {
                window.location.href = "/services";
              } else {
                window.location.href = `/services?city=${city}`;
              }
            }}>
              <SelectTrigger className="h-auto border-0 p-0 pr-4 shadow-none bg-transparent font-bold text-charcoal hover:text-rose focus:ring-0 select-none w-auto min-w-[70px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Autocomplete Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 z-10" />
            <SearchAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearchSubmit}
              placeholder="Search venues, vendors, photographers..."
              inputClassName="w-full bg-transparent border-0 py-2.5 pl-9 pr-4 text-sm text-charcoal placeholder:text-muted-foreground/60 outline-none focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Right Side: Account Dropdown & Mobile Menu Toggle */}
        <div className="flex flex-1 items-center justify-end gap-4 shrink-0">

          {/* Desktop Account Dropdown */}
          <div className="hidden lg:block">
            <div className="relative group py-2">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-rose transition-colors cursor-pointer select-none">
                <User className={`h-4.5 w-4.5 ${isLoggedIn ? "text-rose" : "text-charcoal/80"}`} />
                <span className="capitalize">{isLoggedIn ? (userRole || "User") : "Login"}</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-250 group-hover:rotate-180 text-charcoal/70" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full z-50 mt-1.5 w-64 origin-top-right rounded-2xl border border-border bg-white p-3.5 shadow-xl shadow-charcoal/10 scale-95 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-250 ease-out">
                {isLoggedIn ? (
                  /* Logged In Header */
                  <div className="flex flex-col border-b border-border/60 pb-3 mb-2 px-1">
                    <span className="text-[11px] font-medium text-muted-foreground/80">Welcome back!</span>
                    <span className="text-sm font-bold text-charcoal capitalize">{userRole} Account</span>
                  </div>
                ) : (
                  /* Not Logged In Header */
                  <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-2 px-1">
                    <span className="text-xs text-muted-foreground">New customer?</span>
                    <Link href="/signup" className="text-xs font-bold text-rose hover:text-burgundy transition-colors">
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Dropdown Links List */}
                <div className="space-y-1">
                  <Link href="/dashboard" className="relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-charcoal/90 hover:bg-blush/40 hover:text-rose transition-all group/item">
                    <Sparkles className="h-4 w-4 text-muted-foreground group-hover/item:text-rose" />
                    <span className="font-medium">My Event Hub</span>
                    {totalCount > 0 && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-extrabold text-white">
                        {totalCount}
                      </span>
                    )}
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-charcoal/90 hover:bg-blush/40 hover:text-rose transition-all group/item">
                    <Heart className="h-4 w-4 text-muted-foreground group-hover/item:text-rose" />
                    <span className="font-medium">Wishlist</span>
                  </Link>
                  <Link href="/signup?role=vendor" className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-charcoal/90 hover:bg-blush/40 hover:text-rose transition-all group/item">
                    <Store className="h-4 w-4 text-muted-foreground group-hover/item:text-rose" />
                    <span className="font-medium">Become a Vendor</span>
                  </Link>
                  <Link href="/#how-it-works" className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-charcoal/90 hover:bg-blush/40 hover:text-rose transition-all group/item">
                    <HelpCircle className="h-4 w-4 text-muted-foreground group-hover/item:text-rose" />
                    <span className="font-medium">How It Works</span>
                  </Link>
                  <button onClick={() => toast.info("Support center is available 24/7 at support@evently.com")} className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-charcoal/90 hover:bg-blush/40 hover:text-rose transition-all text-left group/item cursor-pointer">
                    <Headphones className="h-4 w-4 text-muted-foreground group-hover/item:text-rose" />
                    <span className="font-medium">24x7 Support Care</span>
                  </button>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-semibold text-rose hover:bg-rose/5 transition-all text-left border-t border-border/40 mt-1 pt-2 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-rose" />
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <Link href="/login" className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-bold text-rose hover:bg-rose/5 transition-all border-t border-border/40 mt-1 pt-2 group/item">
                      <LogOut className="h-4 w-4 text-rose rotate-180" />
                      <span>Log In</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-6 w-6 text-charcoal" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo className="h-12" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose" />
                    <span>My Event Hub</span>
                  </span>
                  {totalCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white">
                      {totalCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
                >
                  Wishlist
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      href={userRole === "vendor" ? "/vendor/dashboard" : "/"}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-blush hover:text-burgundy"
                    >
                      {userRole === "vendor" ? "Vendor Dashboard" : "Home"}
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogOut();
                      }}
                      className="w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold text-rose hover:bg-rose/5"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
                    >
                      Sign Up
                    </Link>
                    <Button className="mt-3 bg-rose text-white hover:bg-burgundy" asChild>
                      <Link href="/signup?role=vendor" onClick={() => setOpen(false)}>
                        Become a Vendor
                      </Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sub-Header: Service Quick Links */}
      <div className="border-t border-border/60 bg-warm-white">
        <div className="w-full px-4 py-2 sm:py-3 sm:px-6 lg:pl-4 lg:pr-10">
          <div className={cn(
            "flex gap-4",
            isExpanded
              ? "flex-col sm:flex-row sm:items-start justify-between"
              : "flex-row items-center justify-between"
          )}>
            <div className={cn(
              "flex items-center gap-x-4 lg:gap-x-5 transition-all duration-300",
              isExpanded
                ? "flex-wrap gap-y-3"
                : "flex-1 overflow-x-auto pb-1.5 sm:pb-0 flex-nowrap gap-y-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            )}>
              <Link
                href="/services"
                className="group flex shrink-0 items-center py-1 text-xs font-bold text-charcoal/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-rose animate-in fade-in duration-200"
              >
                <span>All in One Place</span>
              </Link>

              <div className="h-4 w-px bg-border/80 shrink-0" />

              {[
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
              ].map((slug, index) => {
                const isExtra = index >= 7;
                const category = categories.find((c) => c.slug === slug);
                if (!category) return null;
                return (
                  <Link
                    key={category.slug}
                    href={`/services?category=${category.slug}`}
                    className={cn(
                      "group flex shrink-0 items-center gap-1.5 py-1 text-xs font-semibold text-charcoal/80 transition-all duration-300 hover:-translate-y-0.5 hover:text-rose animate-in fade-in duration-200",
                      isExtra && !isExpanded && "sm:hidden"
                    )}
                  >
                    <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
                      <img
                        src={getCategoryIconImage(category.slug)}
                        alt={category.name}
                        className="block h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "hidden sm:flex items-center gap-1 text-xs font-bold text-rose hover:text-burgundy shrink-0 transition-colors py-1 cursor-pointer select-none",
                isExpanded ? "self-end sm:self-start" : "self-center"
              )}
            >
              {isExpanded ? "Show Less" : "More Services"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
