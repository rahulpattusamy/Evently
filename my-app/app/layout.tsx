import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "sonner";
import "./globals.css";

const bodyFont = Work_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const headingFont = Poppins({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Evently — Everything You Need for Your Perfect Event",
  description:
    "Discover venues, planners, caterers, photographers, decorators, entertainers and more — all in one place. Plan, compare and book every event, from birthdays to weddings to corporate conferences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full scroll-smooth antialiased`}
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
