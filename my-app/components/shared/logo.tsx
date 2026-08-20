import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
  variant?: "default" | "glow";
}

const LOGO_SOURCES = {
  default: { src: "/logo.png?v=logo-update", width: 1672, height: 941 },
  glow: { src: "/logo2.png?v=logo-update", width: 1190, height: 925 },
} as const;

export function Logo({ className, priority, variant = "default" }: LogoProps) {
  const { src, width, height } = LOGO_SOURCES[variant];
  return (
    <img
      src={src}
      alt="Evently"
      width={width}
      height={height}
      className={cn("block h-10 w-auto object-contain", className)}
    />
  );
}
