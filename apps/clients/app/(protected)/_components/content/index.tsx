import { cn } from "cn";

export function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "grow rounded-xl bg-main-background p-6 shadow-xl",
        className
      )}
    >
      {children}
    </main>
  );
}
