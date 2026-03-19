"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, ViewTransition } from "react";
import { cn } from "@/lib/utils";
import type { Media } from "@/payload-types";

export function ProductGallery({ images }: { images: Media[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  // 🙅
  if (images.length === 0) {
    return <NoImage />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 🖼️ */}
      <MainImage alt={current?.alt} url={current?.url} />

      {/* 🖼️🖼️ */}
      {images.length > 1 && (
        <ThumbnailList
          images={images}
          onSelect={setSelected}
          selected={selected}
        />
      )}
    </div>
  );
}

// ==============================================
// 🖼️
function MainImage({ alt, url }: { alt?: string; url?: string | null }) {
  const { slug } = useParams();
  return (
    <div
      className={cn(
        "relative",
        "aspect-square",
        "overflow-hidden rounded-lg",
        "bg-secondary/30"
      )}
    >
      {url && (
        <ViewTransition name={`product-image-${slug}`}>
          <Image
            alt={alt || ""}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            src={url}
          />
        </ViewTransition>
      )}
    </div>
  );
}

// ==============================================
// 🖼️🖼️
function ThumbnailList({
  images,
  onSelect,
  selected,
}: {
  images: Media[];
  onSelect: (index: number) => void;
  selected: number;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {images.map((img, i) => (
        <button
          className={cn(
            "relative",
            "size-16 shrink-0",
            "overflow-hidden rounded-md",
            "border-2 transition-colors",
            "border-transparent opacity-70 hover:opacity-100",
            i === selected && "border-primary opacity-100"
          )}
          key={img.id}
          onClick={() => onSelect(i)}
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
  );
}

// ==============================================
// 🙅
function NoImage() {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "aspect-square",
        "rounded-lg",
        "bg-secondary/30"
      )}
    >
      <span className="font-heading text-6xl text-muted-foreground/30">S</span>
    </div>
  );
}
