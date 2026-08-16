import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideProps, Sparkles } from "lucide-react";
import { ServiceCategory } from "@/lib/types";

type IconName = keyof typeof Icons;

function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  if (name === "Dress") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2a2 2 0 0 0-2 2v1" />
        <path d="M6 7h12l-1 5 3 8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1l3-8z" />
        <path d="M10 7a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  const Icon = (Icons as unknown as Record<IconName, React.ComponentType<LucideProps>>)[
    name as IconName
  ];
  if (!Icon) return <Sparkles {...props} />;
  return <Icon {...props} />;
}

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={`/services/${category.slug}`}
      className="group flex flex-col items-center rounded-[2rem] border border-border bg-white px-5 py-9 text-center transition-all duration-300 hover:-translate-y-1 hover:border-rose/20 hover:shadow-xl hover:shadow-rose/5"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose/5 transition-colors group-hover:bg-rose/10">
        <CategoryIcon
          name={category.icon}
          className="h-7 w-7 text-rose transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-6 text-[17px] font-bold tracking-tight text-charcoal leading-snug">
        {category.name}
      </h3>
      <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-[130px]">
        {category.description}
      </p>
    </Link>
  );
}
