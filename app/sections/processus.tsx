/** biome-ignore-all lint/style/noMagicNumbers: exception */
"use client";
import { useInView } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import DeckChair from "@/assets/processus/deck_chair.avif";
import Handshake from "@/assets/processus/handshake.avif";
import LightBulb from "@/assets/processus/light_bulb.avif";
import Machine from "@/assets/processus/machine.avif";
import Meet from "@/assets/processus/meet.avif";
import Plan from "@/assets/processus/plan.avif";
import { cn } from "@/lib/utils";

type Slide = {
  title: string;
  description: string;
  image: StaticImageData;
};
const slides: Slide[] = [
  {
    title: "Rencontre",
    description:
      "Nous nous rencontrons pour échanger sur vos besoins, vos délais et votre budget.",
    image: Meet,
  },
  {
    title: "Proposition",
    description:
      "Nous élaborons une solution sur-mesure à partir d'un cahier des charges.",
    image: Plan,
  },
  {
    title: "Accord",
    description:
      "Une fois le plan validé, nous lançons la réalisation de votre projet !",
    image: Handshake,
  },
  {
    title: "Production",
    description:
      "Durant le développement, vous restez informé de l'avancement de votre projet et recevez les livrables selon le calendrier défini.",
    image: Machine,
  },
  {
    title: "Formation",
    description:
      "Nous vous formons pour vous approprier vos outils et devenir complètement autonomes dessus.",
    image: LightBulb,
  },
  {
    title: "Maintenance",
    description:
      "Nous nous occupons de la maintenance et des mises à jour pour que votre projet fonctionne sans interruption et en toute sécurité.",
    image: DeckChair,
  },
];

const animationDuration = 8000; // 8 seconds

function Processus() {
  const [step, setStep] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  function goStep(index: number) {
    if (step === index) {
      return;
    }
    setStep(index);
  }

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.animationDuration = `${animationDuration}ms`;
      progressBarRef.current.addEventListener("animationiteration", goNextStep);
    }

    function goNextStep() {
      setStep((currentStep) => {
        const initialStep = 0;
        if (currentStep < slides.length - 1) {
          return currentStep + 1;
        }
        return initialStep;
      });
    }

    return () => {
      progressBarRef.current?.removeEventListener(
        "animationiteration",
        goNextStep
      );
    };
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col bg-linear-to-b from-black to-zinc-950"
      id="processus"
    >
      <div className="flex flex-1 flex-col items-center rounded-t-[50px] bg-white px-8 py-26 sm:rounded-t-[100px] md:py-42">
        {/* 🆎 Title */}
        <h2 className="mb-12 text-center font-bold text-6xl text-black sm:text-7xl md:text-8xl">
          Notre méthode
        </h2>
        {/* Content container */}
        <div className="group flex w-[500px] max-w-full flex-1 flex-col items-center justify-center gap-3">
          {/* Slides container */}
          <div className="flex w-full overflow-hidden">
            {/* 🖼️ Slide */}
            {slides.map(({ title, description, image }, index) => (
              <Slide
                description={description}
                image={image}
                index={index}
                key={title}
                step={step}
                title={title}
              />
            ))}
          </div>
          {/* ― Progress bar */}
          <ProgressBar className="mt-2 self-start" ref={progressBarRef} />
          {/* 🟠🟠🟠 Dots */}
          <div className="mt-4 flex gap-2">
            {slides.map(({ title }, index) => (
              <button
                className={cn(
                  "size-3.5 cursor-pointer rounded-full bg-primary/20 transition-colors duration-500",
                  step === index && "bg-primary"
                )}
                key={title}
                onClick={() => goStep(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
      {/* <h1>Processus</h1> */}
    </div>
  );
}

// -----------------------------
function Slide({
  title,
  description,
  image,
  index,
  step,
}: Slide & { index: number; step: number }) {
  return (
    <div
      className="flex w-full shrink-0 flex-col gap-y-3 transition-transform duration-500"
      key={title}
      style={{
        transform: `translateX(-${step * 100}%)`,
      }}
    >
      <Image alt={title} className="max-w-full" src={image} width={500} />
      <h3 className="mb-4 font-bold text-4xl xs:text-5xl md:text-6xl">
        {index + 1}. {title}
      </h3>
      <div className="max-w-md text-pretty text-xl leading-tight">
        {description}
      </div>
    </div>
  );
}

// -----------------------------
function ProgressBar({
  className,
  ref,
}: {
  className: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const isInView = useInView(ref);

  return (
    <div className={cn("h-5 w-[50%] rounded-full bg-transparent", className)}>
      <div
        className={cn(
          "group-hover:animation-pause h-full animate-progress-bar rounded-full bg-gradient-to-br from-[#FF5709] to-[#FFC731]",
          !isInView && "animation-pause"
        )}
        ref={ref}
        style={{ animationDuration: `${animationDuration}ms` }}
      />
    </div>
  );
}

export default Processus;
