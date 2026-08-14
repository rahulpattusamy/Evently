import Link from "next/link";
import { CalendarDays, Ticket, FileText, Heart, ArrowRight, Users } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatINR } from "@/components/shared/price-display";
import { currentUser, getUserEvents } from "@/lib/data/users";
import { getBookingsByUser } from "@/lib/data/bookings";
import { getQuotesByUser } from "@/lib/data/quote-requests";
import { getWishlistByUser } from "@/lib/data/wishlist";
import { getCityBySlug } from "@/lib/data/cities";

export const metadata = {
  title: "My Dashboard | Evently",
};

export default function DashboardOverviewPage() {
  const events = getUserEvents(currentUser.id);
  const bookings = getBookingsByUser(currentUser.id);
  const quotes = getQuotesByUser(currentUser.id);
  const wishlist = getWishlistByUser(currentUser.id);

  const today = new Date("2026-08-14");
  const upcomingEvents = events.filter((e) => new Date(e.date) >= today);
  const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending");
  const pendingQuotes = quotes.filter((q) => q.status === "pending");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-charcoal sm:text-3xl">
          Welcome back, {currentUser.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening across your events.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Upcoming Events" value={String(upcomingEvents.length)} icon={CalendarDays} accent="rose" />
        <StatsCard label="Active Bookings" value={String(activeBookings.length)} icon={Ticket} accent="gold" />
        <StatsCard label="Pending Quotes" value={String(pendingQuotes.length)} icon={FileText} accent="charcoal" />
        <StatsCard label="Saved Vendors" value={String(wishlist.length)} icon={Heart} accent="rose" />
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-charcoal">Upcoming Events</h2>
          <Link href="/dashboard/events" className="flex items-center gap-1 text-sm font-medium text-rose hover:text-burgundy">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingEvents.slice(0, 2).map((event) => {
            const city = getCityBySlug(event.citySlug);
            return (
              <Link
                key={event.id}
                href="/dashboard/events"
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md"
              >
                <div
                  className="h-32 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.coverImage})` }}
                />
                <div className="p-4">
                  <h3 className="font-heading font-bold text-charcoal">{event.title}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> {event.guests} guests · {city?.name} · ₹{formatINR(event.budget)}
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-rose" style={{ width: `${event.progress}%` }} />
                  </div>
                  <p className="mt-1 text-right text-xs font-medium text-muted-foreground">{event.progress}% planned</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-charcoal">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="flex items-center gap-1 text-sm font-medium text-rose hover:text-burgundy">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-white">
          {bookings.slice(0, 3).map((b) => (
            <div key={b.id} className="flex items-center gap-3 p-4">
              <div
                className="h-12 w-12 shrink-0 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${b.targetImage})` }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-charcoal">{b.targetName}</p>
                <p className="text-xs text-muted-foreground">{b.packageName} · {new Date(b.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
