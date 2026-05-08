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
          className={cn("size-full", "")}
          speed={0.5}
        />
      </div>
    </div>
  );
}

const maskLeft = "mask-linear-225 mask-linear-from-50% mask-linear-to-60%";
const maskBottom = "mask-b-from-50% mask-b-to-9-100%";
