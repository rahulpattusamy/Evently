import { Suspense } from "react";
import { CompareView } from "@/components/compare/compare-view";

export const metadata = { title: "Compare | Evently" };

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-extrabold text-charcoal">
        Compare
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Compare venues and vendors side by side to make the right choice.
      </p>
      <Suspense fallback={null}>
        <CompareView />
      </Suspense>
    </div>
  );
}
