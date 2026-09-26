import { cn } from "@/lib/utils";
export function ReasonCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Article>
      {/* 🆎🔤 */}
      <div className="flex flex-col gap-y-5">
        {/* 🆎 */}
        <Title>{title}</Title>
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
        "bg-neutral-950",
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
function Title({ children }: { children: React.ReactNode }) {
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
