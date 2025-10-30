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

type Step = {
  title: string;
  description: string;
  image: StaticImageData;
};

const steps: Step[] = [
  {
    description:
      "Après premier contact, nous nous rencontrons pour échanger sur vos besoins, vos délais et votre budget.",
    image: Meet,
    title: "Rencontre",
  },
  {
    description:
      "Nous élaborons une solution sur-mesure à partir d'un cahier des charges.",
    image: Plan,
    title: "Proposition",
  },
  {
    description:
      "Une fois le plan validé, nous lançons la réalisation de votre projet !",
    image: Handshake,
    title: "Validation",
  },
  {
    description:
      "Durant le développement, vous restez informé de l'avancement de votre projet et vous recevez vos livrables selon le calendrier défini.",
    image: Machine,
    title: "Production",
  },
  {
    description:
      "Nous vous formons pour vous approprier vos outils afin de devenir complètement autonomes.",
    image: LightBulb,
    title: "Formation",
  },
  {
    description:
      "Nous nous occupons de la maintenance pour que votre projet fonctionne sans interruption et en toute sécurité.",
    image: DeckChair,
    title: "Maintenance",
  },
];

const animationDuration = 10_000; // 10 seconds

function Processus() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startingPoint = useRef(0);
  const startingLeft = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slidesListRef = useRef<HTMLDivElement>(null);

  // ↔️ Change step
  function goStep(newStep: number): void {
    if (currentStep === newStep || !progressBarRef.current) {
      return;
    }

    resetProgressBar();
    setCurrentStep(newStep);
  }

  // 🔁 Reset progress bar
  function resetProgressBar() {
    if (progressBarRef.current) {
      progressBarRef.current.style.animation = "none"; // Remove the animation
      // biome-ignore lint/complexity/noVoid: exception
      void progressBarRef.current.offsetHeight; // Trigger a reflow
      progressBarRef.current.style.animation = ""; // Reapply the animation
    }
  }

  function goNextStep() {
    setCurrentStep((step) => {
      const initialStep = 0;
      if (step < steps.length - 1) {
        return step + 1;
      }
      return initialStep;
    });
  }

  // --------------------------------------
  function grabSlides(event: MouseEvent | TouchEvent) {
    if (!slidesListRef.current) return;
    setIsDragging(true);
    const { clientX: absoluteX } =
      "touches" in event ? event.touches[0] : event;
    startingPoint.current = absoluteX;
    startingLeft.current = slidesListRef.current.offsetLeft;
    slidesListRef.current.style.transitionDuration = "0ms";
    document.body.style.overflow = "hidden";
    if (progressBarRef.current) {
      progressBarRef.current.style.animationPlayState = "paused";
    }
  }

  function releaseSlide(event: MouseEvent | TouchEvent) {
    document.body.style.overflow = "auto";

    if (!slidesListRef.current?.firstElementChild) return;
    if (progressBarRef.current) {
      progressBarRef.current.style.animationPlayState = "running";
    }
    setIsDragging(false);
    const { clientX: absoluteX } =
      "touches" in event ? event.changedTouches[0] : event;
    const deltaX = startingPoint.current - absoluteX;
    const slideWidth = Number.parseInt(
      getComputedStyle(slidesListRef.current.firstElementChild).width,
      10
    );

    const additionalStepsByGrabbing = Math.round(deltaX / slideWidth);

    setCurrentStep((step) => {
      let newStep = step + additionalStepsByGrabbing;
      newStep = Math.max(newStep, 0);
      newStep = Math.min(newStep, steps.length - 1);
      if (step === newStep && slidesListRef.current) {
        slidesListRef.current.style.left = `${startingLeft.current}px`;
      }

      if (step !== newStep) {
        resetProgressBar();
      }
      return newStep;
    });

    slidesListRef.current.style.transitionDuration = "500ms";
  }

  // ✊ Grab
  // biome-ignore lint/correctness/useExhaustiveDependencies: exception
  useEffect(() => {
    // Sync changing step with progress bar animation
    progressBarRef.current?.addEventListener("animationiteration", goNextStep);
    // Remove default browser dragging behavior
    document.addEventListener("dragstart", stopBrowserDragging);

    slidesListRef.current?.addEventListener("mousedown", grabSlides);
    slidesListRef.current?.addEventListener("touchstart", grabSlides);

    // Release
    document.addEventListener("mouseup", releaseSlide);
    document.addEventListener("touchend", releaseSlide);

    // 🧹 Cleanup event listeners
    return () => {
      progressBarRef.current?.removeEventListener(
        "animationiteration",
        goNextStep
      );
      document.removeEventListener("dragstart", stopBrowserDragging);
      slidesListRef.current?.removeEventListener("mousedown", grabSlides);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", dragSlides);
    document.addEventListener("touchmove", dragSlides);

    // ------------------------------------------------
    function dragSlides(event: MouseEvent | TouchEvent) {
      if (!(slidesListRef.current && isDragging)) return;
      const { clientX: absoluteX } =
        "touches" in event ? event.touches[0] : event;
      const deltaX = absoluteX - startingPoint.current;
      slidesListRef.current.style.left = `${startingLeft.current + deltaX}px`;
    }
    return () => {
      document.removeEventListener("mousemove", dragSlides);
      document.removeEventListener("touchmove", dragSlides);
    };
  }, [isDragging]);

  const NavigationDots = (
    <div className="mt-4 flex gap-2">
      {steps.map(({ title }, index) => (
        <button
          className={cn(
            "size-3.5 cursor-pointer rounded-full bg-primary/20 transition-colors duration-500",
            currentStep === index && "bg-primary"
          )}
          key={title}
          onClick={() => goStep(index)}
          type="button"
        />
      ))}
    </div>
  );

  return (
    // ⚫ Black background
    <div
      className="flex min-h-screen flex-col bg-linear-to-b from-black to-zinc-950"
      id="processus"
    >
      {/* ⚪ White background */}
      <div
        className={cn(
          "flex flex-1 flex-col items-center bg-white",
          "rounded-t-[50px] py-26",
          "border-primary border-t-8",
          "sm:rounded-t-[100px] sm:py-26",
          "md:rounded-t-[100px] md:py-36"
        )}
      >
        {/* 🆎 Title */}
        <h2 className="mb-12 px-8 text-center font-kanit font-semibold text-6xl text-black sm:text-7xl md:text-8xl">
          Notre méthode
        </h2>
        {/* 🎴🎴🎴 Slides */}
        <div className="select-none">
          <div className="group relative flex w-[500px] max-w-[90vw] flex-1 flex-col items-center justify-center gap-3 overflow-hidden">
            <div
              className={cn(
                "relative flex cursor-grab self-start duration-500",
                isDragging && "cursor-grabbing"
              )}
              ref={slidesListRef}
              style={{
                left: `-${currentStep * 100}%`,
                width: `${steps.length * 100}%`,
              }}
            >
              {/* 🎴 Slide */}
              {steps.map((props, index) => (
                <Step key={props.title} {...props} index={index} />
              ))}
            </div>
            <ProgressBar className="mt-2 self-start" ref={progressBarRef} />
            {NavigationDots}
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
function Step({ title, description, image, index }: Step & { index: number }) {
  return (
    <div
      className="flex shrink-0 flex-col gap-y-3"
      key={title}
      style={{ width: `${100 / steps.length}%` }}
    >
      <Image alt={title} className="max-w-full" src={image} width={500} />
      <h3 className="mb-2 font-kanit font-semibold text-4xl xs:text-5xl md:text-6xl">
        {index + 1}. {title}
      </h3>
      <div className="max-w-md text-pretty font-kanit text-xl leading-tight">
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
          "group-hover:animation-pause h-full min-w-5 animate-progress-bar rounded-full bg-linear-to-br from-[#FF5709] to-[#FFC731]",
          !isInView && "animation-pause"
        )}
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ animationDuration: `${animationDuration}ms` }}
      />
    </div>
  );
}

export default Processus;

// ----------------------------------------------
function stopBrowserDragging(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
}
