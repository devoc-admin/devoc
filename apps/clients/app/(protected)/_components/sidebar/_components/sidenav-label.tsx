import { cn } from "cn";

export function SidenavLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-0.5 font-semibold text-sm leading-none", className)}>
      {children}
    </div>
  );
}
