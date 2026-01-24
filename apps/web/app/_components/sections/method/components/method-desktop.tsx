import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type Step, steps } from "../method-type";
export function MethodDesktop() {
  return (
    <div className="relative w-full space-y-50 overflow-x-hidden py-36">
      {steps.map((props, index) => (
        <CardStep key={props.title} {...props} index={index} />
      ))}
    </div>
  );
}

// ------------------------------------------------
// 🃏 Card
function CardStep({
  title,
  description,
  image,
  index,
}: Step & { index: number }) {
  const fromLeft = index % 2 !== 0;

  return (
    <div className="relative">
      {/* 🖼️🔢 Image + Number */}
      <MoveRotateFromOutside fromLeft={fromLeft}>
        <div
          className={cn(
            "size-100",
            "rounded-xl",
            "border-6 border-primary",
            "p-4"
          )}
        >
          <Image
            alt={title}
            className="max-w-full"
            height={500}
            src={image}
            width={500}
          />
          <div
            className={cn(
              "flex items-center justify-center",
              "absolute",
              "bottom-0 left-1/2",
              "-translate-x-1/2 translate-y-1/2",
              "size-16",
              "p-3",
              "rounded-full",
              "bg-primary",
              "font-bold font-kanit text-4xl text-white"
            )}
          >
            {/* 🔢 Number */}
            <span>{index + 1}</span>
          </div>
        </div>
      </MoveRotateFromOutside>
      {/* 🔠 Text */}
      <FadeMoveFromOutside fromLeft={fromLeft}>
        <div className={cn("flex flex-col gap-y-2", "max-w-110", "p-4")}>
          <h3 className="font-bold font-kanit text-7xl">{title}</h3>
          <div className="text-xl leading-tight">{description}</div>
        </div>
      </FadeMoveFromOutside>
    </div>
  );
}

// --------------------------------
// 🤹 Animations
function MoveRotateFromOutside({
  children,
  fromLeft,
}: {
  children: React.ReactNode;
  fromLeft: boolean;
}) {
  const rotationIntensity = Math.round(window.innerWidth / 15);

  return (
    <motion.div
      className={cn("relative", "left-1/2", "w-fit")}
      initial={{
        opacity: 0,
        rotate: fromLeft ? rotationIntensity : -rotationIntensity,
        x: fromLeft ? "min(50vw, 1000px)" : "max(-50vw, -1000px)",
      }}
      transition={{
        bounce: 0,
        duration: 2.5,
        ease: "easeOut",
        type: "spring",
      }}
      viewport={{ margin: "-200px 0px 0px 0px", once: true }}
      whileInView={{
        opacity: 1,
        rotate: fromLeft ? 7 : -7,
        x: fromLeft ? "15%" : "-100%",
      }}
    >
      {children}
    </motion.div>
  );
}

function FadeMoveFromOutside({
  children,
  fromLeft,
}: {
  children: React.ReactNode;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      className={cn("absolute", "top-1/2 left-1/2 -translate-y-1/2", "w-fit")}
      initial={{
        opacity: 0,
        x: fromLeft ? "-25vw" : "25vw",
      }}
      transition={{
        bounce: 0,
        duration: 2.5,
        ease: "easeOut",
        type: "spring",
      }}
      viewport={{ margin: "-20px", once: true }}
      whileInView={{ opacity: 1, x: fromLeft ? "-110%" : "25%" }}
    >
      {children}
    </motion.div>
  );
}
