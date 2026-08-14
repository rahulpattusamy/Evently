"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Explore", href: "/events" },
  { label: "Venues", href: "/venues" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "How It Works", href: "/#how-it-works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-rose">
            Evently
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-rose"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" aria-label="Search" asChild>
            <Link href="/services">
              <Search className="h-5 w-5 text-charcoal" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5 text-charcoal" />
            </Link>
          </Button>
          <Button variant="ghost" className="text-charcoal" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button variant="outline" className="border-rose text-rose hover:bg-blush hover:text-burgundy" asChild>
            <Link href="/dashboard">Sign Up</Link>
          </Button>
          <Button className="bg-rose text-white hover:bg-burgundy" asChild>
            <Link href="/vendor/dashboard">Become a Vendor</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
              <Menu className="h-6 w-6 text-charcoal" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left font-heading text-rose">
                Evently
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
              <div className="my-2 border-t border-border" />
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
              >
                Wishlist
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy"
              >
                Login
              </Link>
              <Button className="mt-3 bg-rose text-white hover:bg-burgundy" asChild>
                <Link href="/vendor/dashboard" onClick={() => setOpen(false)}>
                  Become a Vendor
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
