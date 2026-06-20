"use client";
import { SquareArrowOutUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BuildingIcon } from "../assets/building";
export function BadgePackCommunes({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "relative z-10",
        "flex items-center",
        "font-semibold text-primary backdrop-blur-2xl",
        "w-fit",
        "cursor-pointer",
        "rounded-full",
        "bg-primary/5",
        // ↔️
        "gap-x-2.5 px-3.5 py-2 text-sm",
        "xs:gap-x-2.5 xs:px-3.5 xs:py-2 xs:text-sm",
        "sm:gap-x-2.5 sm:px-3.5 sm:py-2 sm:text-sm",
        "md:gap-x-2.5 md:px-3.5 md:py-2 md:text-sm",
        "lg:gap-x-2.5 lg:px-3.5 lg:py-2 lg:text-sm",
        "xl:gap-x-3 xl:px-4 xl:py-2 xl:text-base",
        "2xl:gap-x-3 2xl:px-4 2xl:py-2 2xl:text-base",
        className
      )}
      href="/pack-communes"
    >
      <BuildingIcon
        className={cn(
          // ↔️
          "mb-1 size-4.5",
          "xs:mb-1 xs:size-4.5",
          "sm:mb-1 sm:size-4.5",
          "md:mb-1 md:size-4.5",
          "lg:mb-1 lg:size-4.5",
          "xl:mb-1 xl:size-4.5",
          "2xl:mb-1 2xl:size-5"
        )}
      />
      <span className="bg-linear-to-bl from-orange-red to-primary-lighter bg-clip-text text-transparent">
        Notre pack communes est disponible !
      </span>
      <SquareArrowOutUpRight
        className={cn(
          // ↔️
          "size-[0.8rem]",
          "xs:size-[0.8rem]",
          "sm:size-[0.8rem]",
          "md:size-[0.8rem]",
          "lg:size-[0.8rem]",
          "xl:size-[0.9rem]",
          "2xl:size-[0.9rem]"
        )}
        strokeWidth={2.75}
      />
    </a>
  );
}
