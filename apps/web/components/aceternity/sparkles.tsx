"use client";
import { cn } from "@/lib/utils";

type SparklesCoreProps = {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
};

export function SparklesCore({
  background = "transparent",
  className,
}: SparklesCoreProps) {
  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ background }}
    />
  );
}
