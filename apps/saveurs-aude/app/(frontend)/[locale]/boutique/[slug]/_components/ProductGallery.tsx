"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

export function ProductGallery({
  images,
  slug,
}: {
  images: Media[];
  slug: string;
}) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-secondary/30">
        <span className="font-heading text-6xl text-muted-foreground/30">
          S
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/30">
        {current?.url &&
          (selected === 0 ? (
            <ViewTransition name={`product-image-${slug}`}>
              <Image
                alt={current.alt || ""}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={current.url}
              />
            </ViewTransition>
          ) : (
            <Image
              alt={current.alt || ""}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              src={current.url}
            />
          ))}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                i === selected
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              key={img.id}
              onClick={() => setSelected(i)}
              type="button"
            >
              {img.url && (
                <Image
                  alt={img.alt || ""}
                  className="object-cover"
                  fill
                  sizes="64px"
                  src={img.url}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
