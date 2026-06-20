import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../../../separator";
export function PriceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl",
        "border border-foreground-70",
        "grid",
        "row-span-2",
        "grid-rows-subgrid",
        // ↔️
        "gap-y-8 p-5",
        "xs:gap-y-8 xs:p-5",
        "xl:gap-y-12 xl:p-6",
        "2xl:gap-y-12 2xl:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PriceGridUpper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "row-span-1 flex flex-col",
        //↔️
        "gap-y-4",
        "xs:gap-y-4",
        "xl:gap-y-6",
        "2xl:gap-y-6"
      )}
    >
      {children}
    </div>
  );
}

export function PriceGridBottom({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "row-span-1 flex flex-col",
        //↔️
        "gap-y-7",
        "xs:gap-y-7",
        "xl:gap-y-10",
        "2xl:gap-y-10"
      )}
    >
      <Separator />
      {children}
    </div>
  );
}

export function PriceCardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "font-fraunces font-medium",
        //↔️
        "mt-0 text-4xl",
        "xs:mt-0 xs:text-4xl",
        "xl:mt-2 xl:text-5xl",
        "2xl:mt-2 2xl:text-5xl",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function PriceCardSupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "font-geist-mono font-medium text-foreground/50 uppercase tracking-widest",
        //↔️
        "hidden",
        "xs:hidden",
        "xl:block xl:text-[0.65rem]",
        "2xl:block 2xl:text-[0.65rem]"
      )}
    >
      {children}
    </div>
  );
}

export function PriceCardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-foreground/60 leading-tight",
        //↔️
        "text-[0.95rem]",
        "xs:text-[0.95rem]",
        "xl:text-base",
        "2xl:text-base"
      )}
    >
      {children}
    </p>
  );
}

export function PriceCardDPrice({
  value,
  className,
}: {
  value: number;
  className: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        //↔️
        "gap-y-1",
        "xs:gap-y-1",
        "xl:gap-y-2",
        "2xl:gap-y-2",
        className
      )}
    >
      <span
        className={cn(
          "text-foreground/60 uppercase tracking-widest",
          //↔️
          "text-[0.65rem]",
          "xs:text-[0.65rem]",
          "xl:text-[0.7rem]",
          "2xl:text-[0.7rem]"
        )}
      >
        À partir de
      </span>
      <span
        className={cn(
          "font-fraunces font-semibold",
          //↔️
          "text-4xl",
          "xs:text-4xl",
          "xl:text-5xl",
          "2xl:text-5xl"
        )}
      >
        {formatCurrency(value)} HT
      </span>
    </div>
  );
}

export function PriceGridServices({ services }: { services: string[] }) {
  return (
    <div
      className={cn(
        //↔️
        "space-y-4",
        "xs:space-y-4",
        "xl:space-y-6",
        "2xl:space-y-6"
      )}
    >
      <div className="font-geist-mono text-[0.7rem] text-foreground/60 uppercase tracking-widest">
        Inclus
      </div>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li
            className={cn(
              "flex gap-x-2",
              //↔️
              "items-start",
              "xs:items-start",
              "xl:items-center",
              "2xl:items-center"
            )}
            key={service}
          >
            {/* ✅ */}
            <div
              className={cn(
                "grid place-items-center rounded-full bg-orange-red p-1",
                // ↔️
                "mt-0.5",
                "xs:mt-0.5",
                "xl:mt-0",
                "2xl:mt-0"
              )}
            >
              <CheckIcon
                className={cn(
                  "text-white",
                  //↔️
                  "size-2",
                  "xs:size-2",
                  "xl:size-2.5",
                  "2xl:size-2.5"
                )}
                strokeWidth={3}
              />
            </div>
            {/* 🔢 */}
            <span
              className={cn(
                "font-geist-mono text-[0.8rem] text-foreground/60 tracking-widest",
                //↔️
                "hidden",
                "xs:hidden",
                "xl:inline",
                "2xl:inline"
              )}
            >
              {formatIndex(index)}
            </span>
            {/* 🔤 */}
            <span
              className={cn(
                "leading-tight!",
                //↔️
                "text-[0.95rem]",
                "xs:text-[0.95rem]",
                "xl:text-base",
                "2xl:text-base"
              )}
            >
              {service}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatIndex(index: number) {
  return (index + 1).toString().padStart(2, "0");
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(value);
}
