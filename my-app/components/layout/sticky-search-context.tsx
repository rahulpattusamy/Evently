"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type StickySearchContextValue = {
  isCompactSearchActive: boolean;
  setCompactSearchActive: (active: boolean) => void;
};

const StickySearchContext = createContext<StickySearchContextValue | null>(null);

export function StickySearchProvider({ children }: { children: ReactNode }) {
  const [isCompactSearchActive, setCompactSearchActive] = useState(false);
  return (
    <StickySearchContext.Provider
      value={{ isCompactSearchActive, setCompactSearchActive }}
    >
      {children}
    </StickySearchContext.Provider>
  );
}

export function useStickySearch() {
  const ctx = useContext(StickySearchContext);
  if (!ctx) {
    return { isCompactSearchActive: false, setCompactSearchActive: () => {} };
  }
  return ctx;
}
