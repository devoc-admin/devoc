import { cn } from "cn";

export function SidenavLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-sm leading-none font-normal", className)}>
      {children}
    </div>
  );
}
