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
        "p-6",
        "grid",
        "row-span-2",
        "grid-rows-subgrid",
        "gap-y-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PriceGridUpper({ children }: { children: React.ReactNode }) {
  return <div className="row-span-1 flex flex-col gap-y-6">{children}</div>;
}

export function PriceGridBottom({ children }: { children: React.ReactNode }) {
  return (
    <div className="row-span-1 flex flex-col gap-y-10">
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
    <h4 className={cn("mt-2 font-fraunces font-medium text-5xl", className)}>
      {children}
    </h4>
  );
}

export function PriceCardSupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-geist-mono font-medium text-[0.65rem] text-foreground/50 uppercase tracking-widest">
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
    <p className="text-base text-foreground/60 leading-tight">{children}</p>
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
    <div className={cn("flex flex-col gap-y-2", className)}>
      <span className="text-[0.7rem] text-foreground/60 uppercase tracking-widest">
        À partir de
      </span>
      <span className="font-fraunces font-semibold text-5xl">
        {formatCurrency(value)} HT
      </span>
    </div>
  );
}

export function PriceGridServices({ services }: { services: string[] }) {
  return (
    <div className="space-y-6">
      <div className="font-geist-mono text-[0.7rem] text-foreground/60 uppercase tracking-widest">
        Inclus
      </div>
      <ul className="space-y-3">
        {services.map((service, index) => (
          <li className="flex items-center gap-x-2" key={service}>
            <div className="grid place-items-center rounded-full bg-primary-strong p-1">
              <CheckIcon className="text-white" size={10} strokeWidth={3} />
            </div>
            <span className="font-geist-mono text-[0.8rem] text-foreground/60 tracking-widest">
              {formatIndex(index)}
            </span>
            <span className="text-base leading-none">{service}</span>
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
