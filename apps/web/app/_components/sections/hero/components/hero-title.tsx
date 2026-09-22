import { AuroraText } from "@/components/magicui/aurora-text.tsx";
import { cn } from "@/lib/utils.ts";
import { CSSEntryAnimation } from "./css-entry-animation.tsx";

export function DevOc() {
  return (
    <CSSEntryAnimation position={1}>
      <H1>
        <Dev />
        <Oc />
      </H1>
    </CSSEntryAnimation>
  );
}

// ====================================

// 📦
function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "relative flex select-none items-center leading-none!",
        // ↔️
        "text-[5.15rem]",
        "xs:text-[6.7rem]",
        "sm:text-[10rem]",
        "md:text-[11rem]",
        "lg:text-[12rem]",
        "xl:text-[16rem]",
        "2xl:text-[18rem]",
        // ↔️
        "-ml-4",
        "sm:-ml-6",
        "lg:-ml-12",
        "xl:-ml-16",
        "2xl:-ml-22",
        // ↔️
        "justify-center",
        "lg:justify-start",
        "xl:justify-start"
      )}
    >
      {children}
    </h1>
  );
}

function Dev() {
  return (
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
  );
}

function Oc() {
  return (
    <AuroraText
      className="font-extrabold font-geist text-transparent tracking-tighter"
      colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
    >
      <span>O</span>
      <span>c</span>
    </AuroraText>
  );
}
