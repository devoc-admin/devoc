import { cn } from "cn";

export function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn("p-6", className)}>{children}</main>;
}
