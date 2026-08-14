"use client";

import Image from "next/image";
import { useState } from "react";
import { UploadCloud, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getVendorById } from "@/lib/data/vendors";
import { toast } from "sonner";

export default function VendorPortfolioPage() {
  const vendor = getVendorById("vendor-1")!;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Portfolio</h1>
        <button
          onClick={() => toast("Upload coming soon")}
          className="flex items-center gap-1.5 rounded-lg bg-rose px-4 py-2 text-sm font-medium text-white hover:bg-burgundy"
        >
          <UploadCloud className="h-4 w-4" /> Upload Images
        </button>
      </div>

      <button
        onClick={() => toast("Upload coming soon")}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-blush/10 py-10 text-sm text-muted-foreground hover:border-rose hover:text-rose"
      >
        <UploadCloud className="h-6 w-6" />
        Drag & drop images here, or click to upload
      </button>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {vendor.portfolio.map((img, i) => (
          <button
            key={img + i}
            className="relative aspect-square overflow-hidden rounded-xl"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image src={img} alt={`${vendor.businessName} portfolio ${i + 1}`} fill className="object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Portfolio image</DialogTitle>
          <div className="relative flex h-[70vh] items-center justify-center">
            <Image src={vendor.portfolio[index]} alt="Portfolio" fill sizes="90vw" className="object-contain" />
            <button onClick={() => setOpen(false)} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i - 1 + vendor.portfolio.length) % vendor.portfolio.length)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % vendor.portfolio.length)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
