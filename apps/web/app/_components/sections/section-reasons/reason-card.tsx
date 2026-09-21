import { cn } from "@/lib/utils";
export function ReasonCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const number = index + 1;

  return (
    <Article>
      {/* 🆎🔤 */}
      <div className="flex flex-col gap-y-5">
        {/* 🆎 */}
        <Title number={number}>{title}</Title>
        {/* 🔤 */}
        <Description>{description}</Description>
      </div>
    </Article>
  );
}

// 📦
function Article({ children }: { children: React.ReactNode }) {
  return (
    <article
      className={cn(
        "relative",
        "flex flex-col",
        "h-full",
        "bg-surface-dark",
        "rounded-3xl",
        "border border-foreground-dark/10",
        // ↔️
        "p-10"
      )}
    >
      {children}
    </article>
  );
}

// 🆎
function Title({
  children,
  number,
}: {
  children: React.ReactNode;
  number: number;
}) {
  return (
    <div
      className={cn(
        "flex font-fraunces",
        // ↔️
        "text-3xl",
        "flex-col items-center",
        "lg:flex-row lg:items-start lg:gap-x-3"
      )}
    >
      <span>#{number}</span>
      <span className="hidden lg:inline">|</span>
      <span
        className={cn(
          // ↔️
          "text-center",
          "lg:text-left"
        )}
      >
        {children}
      </span>
    </div>
  );
}

// 🔡
function Description({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-foreground-dark/50",
        "mt-auto",
        "leading-snug!",
        "text-xl",
        // ↔️
        "text-center lg:text-left"
      )}
    >
      {children}
    </p>
  );
}
