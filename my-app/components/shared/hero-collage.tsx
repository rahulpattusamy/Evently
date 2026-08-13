"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FRAMES = [
  "absolute left-0 top-4 h-56 w-44 -rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
  "absolute right-0 top-0 h-52 w-40 rotate-3 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
  "absolute bottom-0 left-1/4 h-44 w-36 rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
];

export function HeroCollage({ pool }: { pool: string[] }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (pool.length <= FRAMES.length) return;
    const id = setInterval(() => {
      setOffset((o) => (o + 1) % pool.length);
    }, 1800);
    return () => clearInterval(id);
  }, [pool.length]);

  return (
    <div className="relative mx-auto hidden h-80 w-full max-w-sm lg:block">
      {FRAMES.map((frameClass, i) => (
        <div key={i} className={frameClass}>
          <Image
            key={(offset + i) % pool.length}
            src={pool[(offset + i) % pool.length]}
            alt="Event inspiration"
            fill
            sizes="176px"
            priority={i === 0 && offset === 0}
            className="animate-in fade-in object-cover duration-700"
          />
        </div>
      ))}
      <div className="absolute bottom-4 right-2 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <p className="font-heading text-2xl font-extrabold text-rose">10,000+</p>
        <p className="text-xs leading-tight text-muted-foreground">
          verified venues &amp; vendors
        </p>
      </div>
    </div>
  );
}
