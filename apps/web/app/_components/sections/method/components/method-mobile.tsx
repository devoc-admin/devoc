/** biome-ignore-all lint/style/noMagicNumbers: exception */
"use client";
import { useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { type Step, steps } from "../method-type";

const animationDuration = 8000; // 8 seconds

export function MethodMobile() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startingPoint = useRef(0);
  const startingLeft = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slidesListRef = useRef<HTMLDivElement>(null);

  // ↔️ Change step
  function goStep(newStep: number): void {
    if (currentStep === newStep) {
      return;
    }
    setCurrentStep(newStep);
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
  //
  // ✊ Grab slides
  function grabSlides(event: MouseEvent | TouchEvent) {
    if (!slidesListRef.current) return;
    setIsDragging(true);
    const absoluteX = getAbsolutePosition(event);
    startingPoint.current = absoluteX;
    startingLeft.current = slidesListRef.current.offsetLeft;
    slidesListRef.current.style.transitionDuration = "0ms";

    if (progressBarRef.current) {
      progressBarRef.current.style.animationPlayState = "paused";
    }
  }

  // 👋 Move slides
  useEffect(() => {
    let rafId: number | null = null;

    function moveSlides(event: MouseEvent | TouchEvent) {
      if (!(slidesListRef.current && isDragging)) return;

      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (!slidesListRef.current) return;
        const absoluteX = getAbsolutePosition(event);
        const deltaX = absoluteX - startingPoint.current;
        slidesListRef.current.style.left = `${+startingLeft.current + deltaX}px`;
        rafId = null;
      });
    }

    document.addEventListener("mousemove", moveSlides);
    document.addEventListener("touchmove", moveSlides);

    return () => {
      document.removeEventListener("mousemove", moveSlides);
      document.removeEventListener("touchmove", moveSlides);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDragging]);

  // 🤚 Release
  function releaseSlide(event: MouseEvent | TouchEvent) {
    if (!slidesListRef.current?.firstElementChild) return;
    setIsDragging(false);
    const slideWidth = Number.parseInt(
      getComputedStyle(slidesListRef?.current?.firstElementChild).width,
      10
    );

    const absoluteX = getAbsolutePosition(event);
    const deltaX = startingPoint.current - absoluteX;

    const isTouch = event instanceof TouchEvent;
    const slidingCoeff = isTouch ? 3 : 1;

    const additionalStepsByGrabbing = Math.round(
      deltaX / (slideWidth / slidingCoeff)
    );

    setCurrentStep((step) => {
      let newStep = step + additionalStepsByGrabbing;
      newStep = Math.max(newStep, 0);
      newStep = Math.min(newStep, steps.length - 1);
      if (slidesListRef.current) {
        slidesListRef.current.style.left = `-${newStep * 100}%`;
      }
      return newStep;
    });

    slidesListRef.current.style.transitionDuration = "500ms";

    // Reinit progress bar animation
    if (progressBarRef.current) {
      progressBarRef.current.style.animationPlayState = "running";
      progressBarRef.current.classList.remove("animate-progress-bar");
      // biome-ignore lint/complexity/noVoid: exception
      void progressBarRef.current.offsetWidth;
      progressBarRef.current.classList.add("animate-progress-bar");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: exception
  useEffect(() => {
    progressBarRef.current?.addEventListener("animationiteration", goNextStep);
    document.addEventListener("dragstart", stopBrowserDragging);
    slidesListRef.current?.addEventListener("mousedown", grabSlides);
    slidesListRef.current?.addEventListener("touchstart", grabSlides);
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
    <div className="select-none">
      <div className="group relative flex w-125 max-w-[90vw] flex-1 flex-col items-center justify-center gap-3 overflow-hidden">
        <div
          className={cn(
            "relative flex cursor-grab touch-pan-x self-start duration-500",
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
            <SlideStep key={props.title} {...props} index={index} />
          ))}
        </div>
        <ProgressBar className="mt-2 self-start" ref={progressBarRef} />
        {NavigationDots}
      </div>
    </div>
  );
}

// -----------------------------
function SlideStep({
  title,
  description,
  image,
  index,
}: Step & { index: number }) {
  return (
    <div
      className="flex shrink-0 flex-col gap-y-3"
      key={title}
      style={{ width: `${100 / steps.length}%` }}
    >
      <Image
        alt={title}
        className="max-w-full"
        height={500}
        src={image}
        width={500}
      />
      {/* 🆎 Title */}
      <h3
        className={cn(
          "mb-2 font-kanit font-semibold",
          "text-3xl",
          "xs:text-4xl",
          "sm:text-5xl",
          "md:text-6xl"
        )}
      >
        {index + 1}. {title}
      </h3>
      {/* 🔤 Description */}
      <div
        className={cn(
          "max-w-md text-pretty font-kanit",
          "text-lg",
          "sm:text-xl",
          "md:text-2xl",
          "leading-tight"
        )}
      >
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

// ----------------------------------------------
function stopBrowserDragging(event: DragEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

// -----------------------------------------------
//
function getAbsolutePosition(event: MouseEvent | TouchEvent) {
  let referenceEvent = { clientX: 0 };

  if ("touches" in event) {
    if (event?.touches?.[0]) referenceEvent = event.touches[0];
    if (event?.changedTouches?.[0]) referenceEvent = event.changedTouches[0];
  } else {
    referenceEvent = event;
  }
  const { clientX: absoluteX } = referenceEvent;
  return absoluteX;
}
