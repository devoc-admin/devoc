"use client";
import { type RefObject, useEffect, useRef } from "react";
import { useMatchMedia } from "@/hooks/use-match-media";
import { cn } from "@/lib/utils";
import s from "./style.module.css";

export function VariableFont({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const targetRef = useRef<HTMLSpanElement>(null);
  useDetection(targetRef);

  return (
    <span className={cn(s.word, className)} ref={targetRef}>
      {children}
    </span>
  );
}

const MAX_DIST = 1200;

function useDetection(target: RefObject<HTMLSpanElement | null>) {
  const shouldActivateDetectionEffect = useMatchMedia(
    "(width >= 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
  );

  useEffect(() => {
    if (!shouldActivateDetectionEffect) {
      return;
    }
    const controller = new AbortController();
    let frame = 0;
    let cursor = { x: 0, y: 0 };

    function update() {
      frame = 0;
      const element = target.current;
      if (!element) {
        return;
      }

      const { left, top, width, height } = element.getBoundingClientRect();
      const [centerX, centerY] = [left + width / 2, top + height / 2];
      const cursorDist = Math.min(
        computeDist(centerX, centerY, cursor.x, cursor.y),
        MAX_DIST
      );
      const proximity = 1 - cursorDist / MAX_DIST;
      element.style.setProperty("--dist", proximity.toFixed(3));
    }

    function eventHandler({ clientX, clientY }: PointerEvent | WheelEvent) {
      cursor = { x: clientX, y: clientY };
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    }

    document.addEventListener("pointermove", eventHandler, {
      signal: controller.signal,
    });
    document.addEventListener("wheel", eventHandler, {
      passive: true,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      target.current?.style.removeProperty("--dist");
    };
  }, [target, shouldActivateDetectionEffect]);
}

function computeDist(
  originX: number,
  originY: number,
  targetX: number,
  targetY: number
) {
  return Math.hypot(targetX - originX, targetY - originY);
}
