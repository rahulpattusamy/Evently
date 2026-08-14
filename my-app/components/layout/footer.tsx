import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  CreditCard,
  Headphones,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/shared/social-icons";
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

const SOCIAL_LINKS = [
  { label: "Instagram", href: "/#", icon: InstagramIcon },
  { label: "Facebook", href: "/#", icon: FacebookIcon },
  { label: "X", href: "/#", icon: XIcon },
  { label: "YouTube", href: "/#", icon: YoutubeIcon },
  { label: "LinkedIn", href: "/#", icon: LinkedinIcon },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Verified vendors" },
  { icon: CreditCard, label: "Secure payments" },
  { icon: Headphones, label: "24/7 support" },
  { icon: Globe, label: "Pan-India coverage" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-charcoal/80 transition-colors hover:text-rose"
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

      {/* Trust bar */}
      <div className="relative border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-charcoal/70">
              <b.icon className="h-4 w-4 text-rose" strokeWidth={1.75} />
              <span className="text-xs font-medium tracking-wide">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-border bg-white p-8 shadow-xl shadow-charcoal/[0.04] sm:p-10 md:flex-row md:items-center">
          <div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
              Stay in the loop
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Fresh venue drops, vendor offers and event planning tips —
              straight to your inbox, once a week.
            </p>
          </div>
          <form className="flex w-full max-w-sm shrink-0 items-center gap-2">
            <Input
              type="email"
              placeholder="you@email.com"
              className="h-12 rounded-full border-border bg-warm-white px-5 focus-visible:ring-rose"
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full bg-rose text-white hover:bg-burgundy"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Link grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Logo className="h-28" variant="glow" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Everything you need for your perfect event — discovered,
              compared and booked in one place.
            </p>

            <div className="mt-6 flex gap-2">
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

          <div className="md:col-span-1">
            <LinkColumn title="Company" links={COMPANY_LINKS} />
          </div>
          <div className="md:col-span-1">
            <LinkColumn title="Categories" links={CATEGORY_LINKS} />
          </div>
          <div className="md:col-span-1">
            <LinkColumn
              title="Top Cities"
              links={cities.slice(0, 5).map((c) => ({ label: c.name, href: `/venues?city=${c.slug}` }))}
            />
          </div>
          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-charcoal/80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.75} />
                hello@Evently.in
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
        </div>

        <div className="relative mt-14 flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Evently. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/#" className="hover:text-rose">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-rose">
              Terms of Service
            </Link>
            <Link href="/#" className="hover:text-rose">
              Sitemap
            </Link>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-charcoal/70 transition-colors hover:border-rose hover:text-rose"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
