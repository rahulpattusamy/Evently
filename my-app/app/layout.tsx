import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evently — Everything You Need for Your Perfect Event",
  description:
    "Discover venues, planners, caterers, photographers, decorators, entertainers and more — all in one place. Plan, compare and book every event, from birthdays to weddings to corporate conferences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col bg-warm-white">
        <SiteChrome>{children}</SiteChrome>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!bg-white !border-border !text-charcoal",
              actionButton: "!bg-rose",
            },
          }}
        />
      </body>
    </html>
  );
}
