import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/shared/social-icons";

const EXPLORE_LINKS = [
  { label: "Venues", href: "/venues" },
  { label: "Photographers", href: "/services/photographers" },
  { label: "Decorators", href: "/services/decorators" },
  { label: "Caterers", href: "/services/caterers" },
  { label: "Wedding Planners", href: "/services/wedding-planners" },
  { label: "All Categories", href: "/services" },
];

const VENDOR_LINKS = [
  { label: "Become a Vendor", href: "/vendor/dashboard" },
  { label: "List Your Services", href: "/vendor/dashboard" },
  { label: "Vendor Login", href: "/login" },
  { label: "Vendor Resources", href: "/#" },
  { label: "Success Stories", href: "/#" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/#" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Plan an Event", href: "/plan-event" },
  { label: "Blog", href: "/#" },
  { label: "Contact Us", href: "/#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "/#", icon: InstagramIcon },
  { label: "Facebook", href: "/#", icon: FacebookIcon },
  { label: "X", href: "/#", icon: XIcon },
  { label: "LinkedIn", href: "/#", icon: LinkedinIcon },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-rose"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-white">
      <div className="pointer-events-none absolute -top-48 right-[-10%] h-[28rem] w-[28rem] animate-blob-a rounded-full bg-blush/70 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-rose/5 bg-rose/[0.01] p-8 shadow-sm sm:p-10 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose">
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
                Plan Better. <span className="text-rose">Celebrate Better.</span>
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Get fresh venue drops, vendor offers and event planning tips straight to your inbox, once a week.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-sm shrink-0">
            <form className="relative flex w-full items-center rounded-full border border-border bg-white p-1 focus-within:border-rose focus-within:ring-1 focus-within:ring-rose">
              <div className="pointer-events-none pl-4 text-muted-foreground flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground/60" />
              </div>
              <input
                type="email"
                placeholder="you@email.com"
                required
                className="w-full bg-transparent px-3 py-2 text-sm text-charcoal outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-rose px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-burgundy shrink-0 cursor-pointer"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="flex items-center gap-1.5 pl-3 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-rose" />
              No spam. Unsubscribe anytime.
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5">
          {/* Link columns (ordered first on mobile) */}
          <div className="order-1 md:order-2 md:col-span-1">
            <LinkColumn title="Explore" links={EXPLORE_LINKS} />
          </div>
          <div className="order-2 md:order-3 md:col-span-1">
            <LinkColumn title="For Vendors" links={VENDOR_LINKS} />
          </div>
          <div className="order-3 md:order-4 md:col-span-1">
            <LinkColumn title="Company" links={COMPANY_LINKS} />
          </div>
          
          <div className="order-4 md:order-5 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-charcoal/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.75} />
                <Link href="mailto:hello@evently.in" className="hover:text-rose transition-colors">
                  hello@Evently.in
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.75} />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.75} />
                Chennai, India
              </li>
            </ul>
          </div>

          {/* Logo & description (placed last on mobile, first on desktop) */}
          <div className="col-span-2 order-5 md:order-1 md:col-span-1 mt-6 md:mt-0 border-t border-border/40 pt-8 md:border-none md:pt-0 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-flex items-center md:-ml-2 md:-mt-4">
              <Logo className="h-12 md:h-16" variant="default" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground mx-auto md:mx-0">
              Everything you need for your perfect event — discovered, compared and booked in one place.
            </p>

            <div className="mt-6 flex gap-2 justify-center md:justify-start">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-blush hover:text-rose"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & policies */}
        <div className="relative mt-14 flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Evently. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link href="/#" className="hover:text-rose transition-colors">
              Privacy Policy
            </Link>
            <span className="text-border/60">|</span>
            <Link href="/#" className="hover:text-rose transition-colors">
              Terms of Service
            </Link>
            <span className="text-border/60">|</span>
            <Link href="/#" className="hover:text-rose transition-colors">
              Sitemap
            </Link>
            
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-4 inline-flex items-center gap-1 rounded-full border border-rose/25 bg-white px-4 py-2 text-xs font-semibold text-rose transition-all hover:bg-rose hover:text-white"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
