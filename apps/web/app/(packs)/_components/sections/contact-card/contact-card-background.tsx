import { cn } from "@/lib/utils";
import s from "./style.module.css";
export function ContactCardBackground() {
  return (
    <div className={s.cardBackground}>
      {/* 🟠⬆️ */}
      <div
        className={cn(
          "absolute top-0 right-0",
          "aspect-square",
          "translate-x-1/4 -translate-y-1/4",
          "rounded-full",
          "bg-radial from-primary-strong to-80% to-transparent",
          "blur-2xl", // ↔️
          "h-[40%]",
          "xs:h-[40%]",
          "sm:h-[50%]",
          "md:h-[60%]",
          "lg:h-[80%]",
          "xl:h-[50%]",
          "2xl:h-[50%]"
        )}
      />
      {/* 🟠⬇️ */}
      <div
        className={cn(
          "absolute bottom-0 left-0",
          "rounded-full",
          "-translate-x-1/2 translate-y-1/2",
          "bg-radial from-primary-strong to-80% to-transparent",
          "blur-2xl",
          "aspect-square",
          // ↔️
          "h-[70%]",
          "xs:h-[70%]",
          "sm:h-[80%]",
          "md:h-[80%]",
          "lg:h-[80%]",
          "xl:h-[80%]",
          "2xl:h-[80%]"
        )}
      />
    </div>
  );
}
