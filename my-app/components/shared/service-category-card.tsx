import Link from "next/link";
import * as Icons from "lucide-react";
import { LucideProps, Sparkles } from "lucide-react";
import { ServiceCategory } from "@/lib/types";

type IconName = keyof typeof Icons;

function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
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
      className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center transition-all hover:-translate-y-0.5 hover:border-rose hover:shadow-md hover:shadow-charcoal/5"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush transition-colors group-hover:bg-rose">
        <CategoryIcon
          name={category.icon}
          className="h-5 w-5 text-rose transition-colors group-hover:text-white"
        />
      </div>
      <span className="text-sm font-medium text-charcoal">{category.name}</span>
    </Link>
  );
}
