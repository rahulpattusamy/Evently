"use client";

import { useState } from "react";
import { ServiceCategory } from "@/lib/types";
import { ServiceCategoryCard } from "./service-category-card";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Calendar,
  Paintbrush,
  Utensils,
  Camera,
  Music,
  Heart,
} from "lucide-react";

interface ServiceDiscoverySectionProps {
  categories: ServiceCategory[];
  featuredCategories: ServiceCategory[];
}

const TABS = [
  { id: "all", label: "Featured", icon: Sparkles },
  { id: "Planning", label: "Planners", icon: Calendar },
  { id: "Decorators", label: "Decorators", icon: Paintbrush },
  { id: "Food", label: "Catering & Cakes", icon: Utensils },
  { id: "Photography", label: "Photography", icon: Camera },
  { id: "Entertainment", label: "Entertainment", icon: Music },
  { id: "Beauty", label: "Beauty", icon: Heart },
];

export function ServiceDiscoverySection({
  categories,
  featuredCategories,
}: ServiceDiscoverySectionProps) {
  const [activeTab, setActiveTab] = useState("all");

  const displayedCategories =
    activeTab === "all"
      ? featuredCategories
      : categories.filter((c) => c.group === activeTab);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose/[0.03] via-white to-white py-20 border-y border-border">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold text-rose">
            <Sparkles className="h-3.5 w-3.5" />
            All Services. Verified. Trusted.
          </div>

          {/* Title */}
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
            Find Everything <span className="text-rose">You</span> Need
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Planners, decorators, caterers, photographers and every
            service in between — all verified and ready to quote.
          </p>
        </div>

        {/* Explorer Area (Full Width) */}
        <div className="w-full">
          {/* Category Tabs */}
          <div className="mb-10 flex overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 justify-start md:justify-center border-b border-border">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer",
                    isActive
                      ? "bg-rose border-rose text-white shadow-md shadow-rose/10"
                      : "bg-white border-border text-charcoal hover:border-rose/30 hover:bg-rose/[0.02]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-rose")} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {displayedCategories.map((category) => (
              <ServiceCategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
