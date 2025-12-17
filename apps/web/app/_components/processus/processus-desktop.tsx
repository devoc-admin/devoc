import { motion } from "motion/react";
import Image from "next/image";
import { type Step, steps } from "./processus-type";

export function ProcessusDesktop() {
  return (
    <div className="relative w-full space-y-[200px] overflow-x-hidden py-36">
      {steps.map((props, index) => (
        <CardStep key={props.title} {...props} index={index} />
      ))}
    </div>
  );
}

// ------------------------------------------------

function CardStep({
  title,
  description,
  image,
  index,
}: Step & { index: number }) {
  const fromLeft = index % 2 === 0;
  return (
    <div className="relative">
      <MoveRotateFromOutside fromLeft={fromLeft}>
        <div className="size-100 rounded-xl border-6 border-primary p-4">
          <Image alt="meet" className="max-w-full" src={image} width={500} />
          <div className="absolute bottom-0 left-1/2 flex size-16 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-primary p-3 font-bold font-kanit text-4xl text-white">
            {index + 1}
          </div>
        </div>
      </MoveRotateFromOutside>
      <FadeMoveFromOutside fromLeft={fromLeft}>
        <div className="flex max-w-100 flex-col gap-y-2 p-4 font-kanit">
          <h3 className="font-bold text-7xl">{title}</h3>
          <div className="text-xl leading-tight">{description}</div>
        </div>
      </FadeMoveFromOutside>
    </div>
  );
}

function FadeMoveFromOutside({
  children,
  fromLeft,
}: {
  children: React.ReactNode;
  fromLeft: boolean;
}) {
  if (fromLeft) {
    return (
      <motion.div
        className="absolute top-1/2 w-fit translate-x-[25%] -translate-y-1/2"
        initial={{
          left: "80%",
          opacity: 0,
        }}
        transition={{
          bounce: 0,
          duration: 2.5,
          ease: "easeOut",
          type: "spring",
        }}
        viewport={{ margin: "-20px", once: true }}
        whileInView={{ left: "50%", opacity: 1 }}
      >
        {children}
      </motion.div>
    );
  }

  if (!fromLeft) {
    return (
      <motion.div
        className="absolute top-1/2 w-fit translate-x-[25%] -translate-y-1/2"
        initial={{
          left: "0%",
          opacity: 0,
        }}
        transition={{
          bounce: 0,
          duration: 2.5,
          ease: "easeOut",
          type: "spring",
        }}
        viewport={{ margin: "-20px", once: true }}
        whileInView={{ left: "10%", opacity: 1 }}
      >
        {children}
      </motion.div>
    );
  }
}

function MoveRotateFromOutside({
  children,
  fromLeft,
}: {
  children: React.ReactNode;
  fromLeft: boolean;
}) {
  if (fromLeft) {
    return (
      <motion.div
        className="relative w-fit -translate-x-[125%]"
        initial={{
          left: 70,
          opacity: 1,
          rotate: 200,
          y: 150,
        }}
        transition={{
          bounce: 0,
          duration: 2.5,
          ease: "easeOut",
          type: "spring",
        }}
        viewport={{ margin: "0px 0px 0px 0px", once: true }}
        whileInView={{ left: "50%", opacity: 1, rotate: -10, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }

  if (!fromLeft) {
    return (
      <motion.div
        className="relative w-fit translate-x-[25%]"
        initial={{
          left: "calc(100% - 70px)",
          opacity: 0,
          rotate: 200,
          y: -150,
        }}
        transition={{
          bounce: 0,
          duration: 2.5,
          ease: "easeOut",
          type: "spring",
        }}
        viewport={{ margin: "-20px", once: true }}
        whileInView={{ left: "50%", opacity: 1, rotate: 10, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }
}
