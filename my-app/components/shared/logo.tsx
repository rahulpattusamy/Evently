import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  variant?: "default" | "glow";
}

const LOGO_SOURCES = {
  default: { src: "/logo.png", width: 1672, height: 941 },
  glow: { src: "/logo2.png", width: 1190, height: 925 },
} as const;

/** Renders the full Evently brand mark (icon + wordmark + tagline), uncropped. */
export function Logo({ className, priority, variant = "default" }: LogoProps) {
  const { src, width, height } = LOGO_SOURCES[variant];
  return (
    <Image
      src={src}
      alt="Evently"
      width={width}
      height={height}
      priority={priority}
      className={cn("block h-10 w-auto object-contain", className)}
    />
  );
}
