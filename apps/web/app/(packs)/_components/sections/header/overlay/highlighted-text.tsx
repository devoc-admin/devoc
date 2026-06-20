"use client";
import { cn } from "@/lib/utils";
import s from "./style.module.css";

export function HighlightText({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative",
        "inline-block",
        "px-1.5",
        //🟠
        "before:absolute before:left-0 before:-z-1",
        "before:size-full",
        "before:skew-[1deg]",
        "before:scale-x-100",
        "before:origin-left",
        "before:bg-orange-red",
        s.highlighted
      )}
    >
      {children}
    </div>
  );
}
