import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { SupNumber } from "@/components/dev-oc/sup-number";
import { BorderGlow } from "@/components/react-bits/border-glow";
import { cn } from "@/lib/utils";
export function ServiceCard({
  title,
  subtitle,
  features,
  index,
  Icon,
}: {
  title: string;
  subtitle: string;
  features: string[];
  index: number;
  Icon: LucideIcon;
}) {
  return (
    <CustomBorderGlow>
      <article
        className={cn("@container", "h-full", "bg-surface-dark", "rounded-3xl")}
      >
        <div
          className={cn(
            "flex flex-col",
            "h-full",
            // ↔️
            "p-6",
            "@sm:p-8"
          )}
        >
          {/* 1️⃣ */}
          <div className="flex items-start justify-between">
            <SupNumber
              className={cn(
                "text-foreground-dark/40", // ↔️
                "text-[0.6rem]",
                "@sm:text-[0.7rem]"
              )}
            >
              {index}
            </SupNumber>

            <Icon
              className={cn(
                // ↔️
                "size-6",
                "@sm:size-6"
              )}
              color="#AEABA4"
            />
          </div>
          {/* 2️⃣ */}
          <div className="mt-8 space-y-3">
            <div
              className={cn(
                "font-fraunces",
                // ↔️
                "text-3xl",
                "@sm:text-4xl"
              )}
            >
              {title}
            </div>
            <p
              className={cn(
                "text-foreground-dark/50",
                // ↔️
                "text-lg leading-snug"
              )}
            >
              {subtitle}
            </p>
          </div>
          <div className="mt-auto">
            {/* 3️⃣ */}
            <div
              className={cn(
                "space-y-5",
                // ↔️
                "mt-16",
                "xs:mt-16",
                "sm:mt-16",
                "md:mt-20",
                "lg:mt-18",
                "xl:mt-24",
                "2xl:mt-24"
              )}
            >
              <div className="h-px w-full bg-linear-to-r from-transparent via-foreground-dark/30 to-transparent" />
              <div
                className={cn(
                  "flex flex-wrap gap-x-2 text-nowrap font-geist-mono font-light text-foreground-dark/50 uppercase",
                  // ↔️
                  "@sm:text-[0.7rem] text-[0.65rem]",
                  "@md:tracking-[0.12rem] tracking-[0.10rem]"
                )}
              >
                {features.map((feature) => (
                  <div key={feature}>
                    <span>{feature}</span>
                    <span className="text-foreground-dark/30">•</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 4️⃣ */}
            <a
              className="mt-5 flex items-center gap-x-1.5 text-foreground-dark/80"
              href="#contact"
            >
              <span>Échanger sur ce service</span>
              <ArrowUpRightIcon color="#AEABA4" size={16} />
            </a>
          </div>
        </div>
      </article>
    </CustomBorderGlow>
  );
}

//
function CustomBorderGlow({ children }: { children: ReactNode }) {
  return (
    <BorderGlow
      backgroundColor="#302E2D" // foreground-dark/20
      borderRadius={24}
      className="h-full"
      colors={["#FF5709", "#F48C06", "#FFC731"]}
      coneSpread={25}
      edgeSensitivity={10}
      glowColor="0 0 99"
      glowIntensity={0.7}
      glowRadius={40}
    >
      {children}
    </BorderGlow>
  );
}
