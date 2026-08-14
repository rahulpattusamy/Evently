"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AuthModeTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="relative grid grid-cols-2 rounded-full bg-blush/60 p-1">
      <span
        className={cn(
          "absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out",
          isLogin ? "translate-x-0" : "translate-x-[calc(100%+8px)]"
        )}
      />
      <Link
        href="/login"
        className={cn(
          "relative z-10 rounded-full py-2 text-center text-sm font-semibold transition-colors",
          isLogin ? "text-burgundy" : "text-muted-foreground"
        )}
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className={cn(
          "relative z-10 rounded-full py-2 text-center text-sm font-semibold transition-colors",
          !isLogin ? "text-burgundy" : "text-muted-foreground"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}
