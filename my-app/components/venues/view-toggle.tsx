"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const VIEWS = [
  { value: "grid", label: "Grid", icon: LayoutGrid },
  { value: "list", label: "List", icon: List },
  { value: "map", label: "Map", icon: Map },
];

export function ViewToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "grid";

  function setView(v: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", v);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-white p-1">
      {VIEWS.map((v) => (
        <button
          key={v.value}
          onClick={() => setView(v.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            view === v.value
              ? "bg-rose text-white"
              : "text-muted-foreground hover:text-charcoal"
          )}
        >
          <v.icon className="h-3.5 w-3.5" />
          {v.label}
        </button>
      ))}
    </div>
  );
}
