import { motion } from "motion/react";
import type React from "react";
import { AuroraText } from "@/components/aurora-text";
import { cn } from "@/lib/utils";

export function DevOc() {
  return (
    <FadeMoveDown>
      <h1
        className={cn(
          "relative flex select-none items-center px-6",
          "text-8xl",
          "xs:text-9xl",
          "sm:text-[9rem]",
          "md:text-[10rem]",
          "lg:text-[11rem]",
          "xl:text-[12rem]"
        )}
      >
        {/*<DoodleTop/>*/}
        <div className={cn("font-style-script", "pt-4")}>Dev'</div>
        <AuroraText
          className="font-extrabold font-geist text-transparent tracking-tighter"
          colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
        >
          Oc
        </AuroraText>
      </h1>
    </FadeMoveDown>
  );
}

function FadeMoveDown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -50 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
