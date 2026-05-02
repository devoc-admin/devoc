import { AuroraText } from "@/components/magicui/aurora-text.tsx";
import { cn } from "@/lib/utils.ts";
export function DevOcHeroTitle() {
  return (
    <h1
      className={cn(
        "relative flex select-none items-center",
        "-ml-20",
        "text-8xl",
        "xs:text-9xl",
        "sm:text-[10rem]",
        "md:text-[11rem]",
        "lg:text-[12rem]",
        "xl:text-[18rem]"
      )}
    >
      <div className={cn("font-style-script", "pt-12")}>Dev'</div>
      <AuroraText
        className="font-extrabold font-geist text-transparent tracking-tighter"
        colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
      >
        <span className="font-italic">O</span>
        <span>c</span>
      </AuroraText>
    </h1>
  );
}
