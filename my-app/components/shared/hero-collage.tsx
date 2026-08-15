import Image from "next/image";
import type { CSSProperties } from "react";

const FRAMES = [
  {
    className:
      "absolute left-0 top-4 h-72 w-56 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
    src: "https://i.pinimg.com/736x/bb/b0/cd/bbb0cdfdf1548eb0a5ee16dcd79f52c0.jpg",
    alt: "Wedding ceremony",
    rot: "-6deg",
    delay: "0s",
  },
  {
    className:
      "absolute right-0 top-0 h-64 w-52 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
    src: "https://i.pinimg.com/736x/f2/72/41/f2724122e0b52c33a3972024ce5b58ae.jpg",
    alt: "Birthday party",
    rot: "3deg",
    delay: "1.2s",
  },
  {
    className:
      "absolute bottom-0 left-1/4 h-56 w-48 overflow-hidden rounded-2xl border-4 border-white shadow-xl",
    src: "https://i.pinimg.com/736x/a4/88/7c/a4887cb3a2d3954843211e38c7fa3a0b.jpg",
    alt: "Office event",
    rot: "2deg",
    delay: "2.4s",
  },
];

export function HeroCollage() {
  return (
    <div className="relative mx-auto hidden h-[26rem] w-full max-w-md lg:block">
      {FRAMES.map((frame) => (
        <div
          key={frame.src}
          className={`${frame.className} animate-float-soft`}
          style={
            {
              "--float-rot": frame.rot,
              animationDelay: frame.delay,
            } as CSSProperties
          }
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes="176px"
            className="object-cover"
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
