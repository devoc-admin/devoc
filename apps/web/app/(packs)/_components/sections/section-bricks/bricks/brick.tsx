import { ArrowUpRightIcon, CheckIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brick({
  variant,
  children,
}: {
  variant: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-t group-last-of-type:border-b",
        "transition-colors",
        // ↔️
        "space-y-8 px-2 py-12",
        "xs:px-2 xs:py-12",
        "md:px-6 md:py-12",
        "xl:grid xl:grid-cols-12 xl:gap-x-24 xl:px-6 xl:py-12",
        "2xl:grid 2xl:grid-cols-12 2xl:gap-x-24 2xl:px-6 2xl:py-12",
        // 🌙☀️
        variant === "dark" && "hover:via-foreground-dark/5",
        variant === "light" && "hover:via-foreground/2"
      )}
      style={{
        borderImage:
          variant === "dark"
            ? // 🌙
              "linear-gradient(to right, transparent, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 20%, oklch(from var(--color-foreground-dark) calc(l - 0.60) c h) 80%, transparent) 1"
            : // ☀️
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 10%, transparent) 20%,  color-mix(in oklab, var(--foreground) 10%, transparent) 80%, transparent) 1",
      }}
    >
      {children}
    </div>
  );
}

export function BrickNumber({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-full border-2 border-primary-strong bg-primary-strong/5 font-fraunces font-semibold text-primary-strong",
        //↔️
        "size-10 text-xl",
        "xl:size-12 xl:text-2xl",
        "2xl:size-12 2xl:text-2xl"
      )}
    >
      {children}
    </div>
  );
}
export function BrickDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-geist text-foreground/50 leading-snug",
        // ↔️
        "text-base",
        "xs:text-base",
        "xl:text-lg",
        "2xl:text-lg"
      )}
    >
      {children}
    </p>
  );
}

export function BrickTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={cn(
        "font-fraunces font-semibold text-foreground leading-none!",
        //↔️
        "text-[2.1rem]",
        "xs:text-[2.1rem]",
        "xl:text-5xl",
        "2xl:text-5xl"
      )}
    >
      {children}
    </h3>
  );
}

export function BrickLeft({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "space-y-6",
        "xs:space-y-6",
        "xl:col-span-5 xl:space-y-12",
        "2xl:col-span-5 2xl:space-y-12"
      )}
    >
      {children}
    </div>
  );
}

export function BrickRight({ children }: { children: React.ReactNode }) {
  return <div className="col-span-7 space-y-8">{children}</div>;
}

export function GuaranteesTitle() {
  return (
    <h4 className="font-geist-mono font-semibold text-foreground/40 text-xs uppercase tracking-[0.15rem]">
      Vos garanties
    </h4>
  );
}

export function GuaranteeItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      className={cn(
        "flex items-start",
        //↔️
        "gap-x-3",
        "xs:gap-x-3",
        "xl:gap-x-4",
        "2xl:gap-x-4"
      )}
    >
      {/* ✅ */}
      <div
        className={cn(
          "mt-[3px] grid place-items-center rounded-full p-1",
          "bg-primary-strong"
        )}
      >
        <CheckIcon
          className={cn(
            "text-white",
            //↔️
            "size-2",
            "xl:size-3",
            "2xl:size-3"
          )}
          strokeWidth={3}
        />
      </div>
      {/* 🔤 */}
      <span
        className={cn(
          //↔️
          "text-sm",
          "xs:text-sm",
          "xl:text-base",
          "2xl:text-base"
        )}
      >
        {children}
      </span>
    </li>
  );
}

export function SmallCard({
  children,
  title,
  Icon,
}: {
  children: React.ReactNode;
  title: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="group space-y-2 rounded-lg border border-foreground/10 p-3 transition hover:border-primary-strong/80">
      {/* 🖼️🅰️ */}
      <div className="flex items-center gap-x-2">
        {/* 🖼️ */}
        <Icon className="size-3 shrink-0 text-foreground/40 transition group-hover:text-primary-strong" />
        {/* 🅰️ */}
        <span className="font-geist-mono text-[0.68rem] text-foreground/60 uppercase tracking-widest transition group-hover:text-primary-strong">
          {title}
        </span>
      </div>
      {/* 🔠 */}
      <p className="text-sm tracking-tight">{children}</p>
    </div>
  );
}

export function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3"
      )}
    >
      {children}
    </div>
  );
}

export function PlusDevOc({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        "border border-primary-strong/50",
        "bg-linear-to-tr from-bg-primary-strong/4 to-primary-strong/7",
        "flex flex-col",
        // ↔️
        "gap-y-1 p-4.5",
        "xs:gap-y-1 xs:p-4.5",
        "xl:gap-y-2 xl:p-6",
        "2xl:gap-y-2 2xl:p-6"
      )}
    >
      {/* 🔠🖼️ */}
      <div className="flex items-center justify-between space-y-1">
        {/* 🔠 */}
        <h4
          className={cn(
            "mb-0",
            "font-geist-mono font-semibold",
            "text-[0.83rem] text-primary-strong uppercase tracking-widest"
          )}
        >
          <span>Le + Dev'Oc</span>
        </h4>
        {/* 🖼️ */}
        <div className="text-primary-strong">
          <ArrowUpRightIcon
            className={cn(
              //↔️
              "w-5",
              "xs:w-5",
              "xl:w-5.5",
              "2xl:w-5.5"
            )}
          />
        </div>
      </div>
      {/* 🔤 */}
      <p
        className={cn(
          "font-foreground",
          //↔️
          "text-sm",
          "xl:text-[0.93rem]",
          "2xl:text-[0.93rem]"
        )}
      >
        {children}
      </p>
    </div>
  );
}
