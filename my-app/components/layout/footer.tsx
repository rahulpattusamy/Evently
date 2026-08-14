import Link from "next/link";
import {  AtSign, MessageCircle, Globe } from "lucide-react";
import { cities } from "@/lib/data/cities";

const CATEGORY_LINKS = [
  { label: "Venues", href: "/venues" },
  { label: "Photographers", href: "/services/photographers" },
  { label: "Decorators", href: "/services/decorators" },
  { label: "Caterers", href: "/services/caterers" },
  { label: "Wedding Planners", href: "/services/wedding-planners" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/#" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Become a Vendor", href: "/vendor/dashboard" },
  { label: "Plan an Event", href: "/plan-event" },
  { label: "Compare", href: "/compare" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-rose">
                Evently
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Discover. Compare. Plan. Book. Everything you need for your
              perfect event.
            </p>
            <div className="mt-4 flex gap-3">
              <AtSign className="h-5 w-5 text-muted-foreground hover:text-rose" />
              <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-rose" />
              <Globe className="h-5 w-5 text-muted-foreground hover:text-rose" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-charcoal">Company</h4>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-rose"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-charcoal">Categories</h4>
            <ul className="mt-3 space-y-2">
              {CATEGORY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-rose"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-charcoal">Top Cities</h4>
            <ul className="mt-3 space-y-2">
              {cities.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/venues?city=${c.slug}`}
                    className="text-sm text-muted-foreground hover:text-rose"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Evently. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/#" className="hover:text-rose">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-rose">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
