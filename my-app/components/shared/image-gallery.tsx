"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        <button
          className="relative col-span-4 row-span-2 h-64 sm:col-span-2 sm:row-span-2 sm:h-full"
          onClick={() => openAt(0)}
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button key={img + i} className="relative hidden h-full min-h-32 sm:block" onClick={() => openAt(i + 1)}>
            <Image src={img} alt={alt} fill sizes="25vw" className="object-cover" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{alt} gallery</DialogTitle>
          <div className="relative flex h-[70vh] items-center justify-center">
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-center gap-1.5 pb-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  i === index ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
