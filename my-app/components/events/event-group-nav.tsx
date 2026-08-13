"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { LucideProps, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupNavItem {
  slug: string;
  label: string;
  icon: string;
  count: number;
}

type IconName = keyof typeof Icons;

function NavIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (Icons as unknown as Record<IconName, React.ComponentType<LucideProps>>)[
    name as IconName
  ];
  if (!Icon) return <Sparkles {...props} />;
  return <Icon {...props} />;
}

export function EventGroupNav({ groups }: { groups: GroupNavItem[] }) {
  const [active, setActive] = useState(groups[0]?.slug ?? "");

  useEffect(() => {
    const sections = groups
      .map((g) => document.getElementById(g.slug))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-warm-white/95 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3">
        {groups.map((g) => (
          <a
            key={g.slug}
            href={`#${g.slug}`}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === g.slug
                ? "border-rose bg-rose text-white"
                : "border-border bg-white text-charcoal hover:border-rose/50 hover:text-rose"
            )}
          >
            <NavIcon name={g.icon} className="h-4 w-4" />
            {g.label}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs",
                active === g.slug ? "bg-white/20" : "bg-blush text-burgundy"
              )}
            >
              {g.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
