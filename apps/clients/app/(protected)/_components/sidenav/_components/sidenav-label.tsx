import { cn } from "cn";

export function SidenavLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("font-normal text-sm leading-none", className)}>
      {children}
    </div>
  );
}
