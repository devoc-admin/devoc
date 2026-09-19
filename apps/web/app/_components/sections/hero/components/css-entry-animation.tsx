import { cn } from "@/lib/utils.ts";
import s from "./styles.module.css";

export function CSSEntryAnimation({
  children,
  className,
  position,
}: {
  children: React.ReactNode;
  className?: string;
  position: number;
}) {
  return (
    <div
      className={cn(s.heroEntry, className)}
      style={
        {
          "--position": position,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
