import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SupNumber } from "./sup-number";

export function ServiceCard({
  title,
  subtitle,
  features,
  href,
  index,
  Icon,
}: {
  title: string;
  subtitle: string;
  features: string[];
  href: string;
  index: number;
  Icon: LucideIcon;
}) {
  return (
    <article
      className={cn(
        "flex flex-col",
        "h-full",
        "p-8",
        "bg-surface-dark",
        "rounded-3xl",
        "border border-foreground-dark/10"
      )}
    >
      {/* 1️⃣ */}
      <div className="flex items-start justify-between">
        <SupNumber className="text-foreground-dark/40">{index}</SupNumber>
        <div className="grid size-12 place-items-center rounded-full border border-foreground-dark/10 bg-foreground-dark/3">
          <Icon color="#AEABA4" size={18} />
        </div>
      </div>
      {/* 2️⃣ */}
      <div className="mt-8 space-y-3">
        <div className="font-fraunces text-4xl">{title}</div>
        <p className="text-foreground-dark/50 text-lg">{subtitle}</p>
      </div>
      <div className="mt-auto">
        {/* 3️⃣ */}
        <div className="mt-24 space-y-5">
          <div className="h-px w-full bg-linear-to-r from-transparent via-foreground-dark/30 to-transparent" />
          <div className="flex flex-wrap gap-x-2 text-nowrap font-geist-mono font-light text-[0.7rem] text-foreground-dark/50 uppercase tracking-[0.12rem]">
            {features.map((feature) => (
              <div key={feature}>
                <span>{feature}</span>
                <span className="text-foreground-dark/30">•</span>
              </div>
            ))}
          </div>
        </div>
        {/* 4️⃣ */}
        <Link
          className="mt-5 flex items-center gap-x-1.5 text-foreground-dark/80 text-sm"
          href={href}
        >
          <span>Échanger sur ce service</span>
          <ArrowUpRightIcon color="#AEABA4" size={16} />
        </Link>
      </div>
    </article>
  );
}
