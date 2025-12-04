import { motion } from "motion/react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import { useSlidesContext } from "../_context";
import { variantsDevOc } from "../_step-animations";

export function DevOc() {
  const { animations } = useSlidesContext();
  const { devOc: devOcAnimations } = animations;

  return (
    <motion.h1
      animate={devOcAnimations}
      className={cn("fixed flex select-none items-center px-6", "text-[8rem]")}
      initial={false}
      variants={variantsDevOc}
    >
      <div className={cn("font-style-script", "pt-6")}>Dev'</div>
      <AuroraText
        className="font-extrabold font-geist text-transparent tracking-tighter"
        colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
      >
        Oc
      </AuroraText>
    </motion.h1>
  );
}
