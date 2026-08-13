import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
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
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
