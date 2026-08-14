import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata = { title: "Wishlist | Evently" };

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">
        Your Wishlist
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Venues and vendors you&apos;ve saved for later.
      </p>
      <WishlistView />
    </div>
  );
}
