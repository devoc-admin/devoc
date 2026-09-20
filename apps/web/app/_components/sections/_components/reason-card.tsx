import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export function ReasonCard({
  title,
  description,
  index,
  Icon,
}: {
  title: string;
  description: string;
  index: number;
  Icon: LucideIcon;
}) {
  const number = index + 1;

  return (
    <Article>
      {/* 🖼️ */}
      <CircleIcon Icon={Icon} />
      {/* 🆎🔤 */}
      <div className="mt-10 mb-4 flex flex-col gap-y-5">
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
        "p-8",
        "2xl:p-8"
      )}
    >
      {children}
    </article>
  );
}

// ⚫
function CircleIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "grid place-items-center",
        "rounded-full",
        "border border-foreground-dark/10 bg-foreground-dark/3",
        "size-11",
        // ↔️
        "absolute top-4 right-4",
        "lg:static"
      )}
    >
      <Icon color="#AEABA4" size={18} />
    </div>
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
        "text-2xl",
        "flex-col items-center",
        "lg:flex-row lg:items-start lg:gap-x-3"
      )}
    >
      <span>#{number}</span>
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
        "text-lg",
        // ↔️
        "text-center",
        "lg:text-left"
      )}
    >
      {children}
    </p>
  );
}
