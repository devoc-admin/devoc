import { AuroraText } from "@/components/magicui/aurora-text.tsx";
import { cn } from "@/lib/utils.ts";
import { CSSEntryAnimation } from "./css-entry-animation.tsx";

export function DevOcHeroTitle() {
  return (
    <CSSEntryAnimation
      className={cn(
        // ↔️
        "mb-0",
        "xs:mb-0",
        "sm:mb-0",
        "md:mb-0",
        "lg:mb-2",
        "xl:mb-4",
        "2xl:mb-6"
      )}
      position={1}
    >
      <h1
        className={cn(
          "relative flex select-none items-center",
          // ↔️
          "text-[7rem]",
          "xs:text-[7rem]",
          "sm:text-[10rem]",
          "md:text-[11rem]",
          "lg:text-[12rem]",
          "xl:text-[16rem]",
          "2xl:text-[18rem]",
          // ↔️
          "-ml-4",
          "xs:-ml-4",
          "sm:-ml-6",
          "md:-ml-6",
          "lg:-ml-12",
          "xl:-ml-16",
          "2xl:-ml-22",
          // ↔️
          "justify-start",
          "xs:justify-center",
          "sm:justify-center",
          "md:justify-center",
          "lg:justify-start",
          "xl:justify-start"
        )}
      >
        <div
          className={cn(
            "font-style-script",
            // ↔️
            "pt-4",
            "xs:pt-4",
            "sm:pt-6",
            "md:pt-6",
            "lg:pt-6",
            "xl:pt-8",
            "2xl:pt-11"
          )}
        >
          Dev'
        </div>
        <AuroraText
          className="font-extrabold font-geist text-transparent tracking-tighter"
          colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
        >
          <span>O</span>
          <span>c</span>
        </AuroraText>
      </h1>
    </CSSEntryAnimation>
  );
}
