import { cn } from "@/lib/utils";

export function CustomGradientText({ className, children }: { className?: string; children: React.ReactNode }) {
  return  <span
    className={cn(
      "bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent",
      className
    )}
  >
    {children}
  </span>
}
