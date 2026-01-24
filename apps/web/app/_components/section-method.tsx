/** biome-ignore-all lint/style/noMagicNumbers: exception */
"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import { cn } from "@/lib/utils";
import { MethodDesktop } from "./method/method-desktop";
import { MethodMobile } from "./method/method-mobile";
import SectionTitle from "./section-title";

function Method() {
  const [hasMounted, setHasMounted] = useState(false);
  const { ref: sectionRef } = useNavTheme({
    sectionName: "method",
    theme: "light",
  });

  const { width = 0 } = useWindowSize();
  const isLargeEnough = width >= 1200;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    /* ⚫ Black background  */
    <div
      className="flex min-h-screen flex-col bg-linear-to-b from-black to-zinc-950"
      id="method"
    >
      {/* ⚪ White background  */}
      <div
        className={cn(
          "flex flex-1 flex-col items-center bg-white",
          "border-t-6 border-t-orange-600",
          "rounded-t-[50px] py-16",
          "sm:rounded-t-[100px] sm:py-22",
          "md:rounded-t-[100px] md:py-36"
        )}
        ref={sectionRef}
      >
        {hasMounted && (
          <>
            {/* 🆎 Title */}
            <SectionTitle
              className={cn("mb-10", "sm:mb-22", "text-zinc-950")}
              title="Notre méthode"
            />
            {isLargeEnough ? <MethodDesktop /> : <MethodMobile />}
          </>
        )}
      </div>
    </div>
  );
}

export default Method;
