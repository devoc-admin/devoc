import SpecularBandsBackground from "@/components/motion-core/specular-band/specular-band-background.tsx";
import { cn } from "@/lib/utils.ts";
import s from "./styles.module.css";

export function HeroBackground() {
  return (
    <div
      className={cn(
        s.backgroundEntry,
        "absolute z-0",
        "size-full",
        "bg-white",
        maskLeft
      )}
    >
      <div className={cn("size-full", maskBottom)}>
        <SpecularBandsBackground
          backgroundColor="#ffffff"
          className={cn(
            "size-full",
            // ↔️
            "opacity-20",
            "xs:opacity-20",
            "sm:opacity-20",
            "md:opacity-20",
            "lg:opacity-100"
          )}
          speed={0.5}
        />
      </div>
    </div>
  );
}

// ↔️
const maskLeft = cn(
  "",
  "",
  "sm:mask-linear-225 sm:mask-linear-from-50% sm:mask-linear-to-60%",
  "md:mask-linear-225 md:mask-linear-from-50% md:mask-linear-to-60%",
  "lg:mask-linear-225 lg:mask-linear-from-20% lg:mask-linear-to-40%",
  "xl:mask-linear-225 xl:mask-linear-from-50% xl:mask-linear-to-60%"
);
const maskBottom = "mask-b-from-50% mask-b-to-9-100%";
