import { categories, categoryGroups } from "@/lib/data/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Categories</h1>
        <p className="text-sm text-muted-foreground">{categories.length} service categories across {categoryGroups.length} groups.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map((group) => {
          const count = categories.filter((c) => c.group === group).length;
          return (
            <div key={group} className="rounded-2xl border border-border bg-white p-5">
              <p className="font-heading font-semibold text-charcoal">{group}</p>
              <p className="mt-1 text-sm text-muted-foreground">{count} categories</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {categories
                  .filter((c) => c.group === group)
                  .map((c) => (
                    <span key={c.slug} className="rounded-full bg-blush px-2.5 py-1 text-xs text-burgundy">
                      {c.name}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
