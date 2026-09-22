import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { BorderGlow } from "@/components/react-bits/border-glow";
import { cn } from "@/lib/utils";
export function ServiceCard({
  title,
  subtitle,
  features,
  Icon,
}: {
  title: string;
  subtitle: string;
  features: string[];
  Icon: LucideIcon;
}) {
  return (
    <CustomBorderGlow>
      <Card>
        {/* 🆎 🖼️ */}
        <CardHeader>
          <Title Icon={Icon}>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </CardHeader>
        <CardContent>
          {/* 3️⃣ */}
          <CardSeparator />
          <FeaturesContainer>
            {features.map((feature) => (
              <Fragment key={feature}>
                <span>{feature}</span>
                <span className="text-foreground-dark/30 last-of-type:hidden">
                  •
                </span>
              </Fragment>
            ))}
          </FeaturesContainer>
          <EchangerSurCeService />
        </CardContent>
      </Card>
    </CustomBorderGlow>
  );
}

// 📦
function Card({ children }: { children: React.ReactNode }) {
  return (
    <a href="#contact">
      <article
        className={cn(
          "@container group flex h-full flex-col rounded-3xl bg-surface-dark",
          // ↔️
          "p-6 sm:p-8",
          "min-h-95 xs:min-h-80 sm:min-h-110 lg:min-h-100 xl:min-h-95 2xl:min-h-85"
        )}
      >
        {children}
      </article>
    </a>
  );
}

// 📦
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

// 🆎
function Title({
  children,
  Icon,
}: {
  children: React.ReactNode;
  Icon: LucideIcon;
}) {
  return (
    <div className="flex items-baseline justify-between gap-x-4">
      <h4
        className={cn(
          "font-fraunces",
          "transition-[text-shadow] duration-500 group-hover:text-shadow-[0px_0px_15px_rgb(255_255_255_/_50%)]",
          // ↔️
          "text-3xl sm:text-4xl"
        )}
      >
        {children}
      </h4>
      <CustomIcon Icon={Icon} />
    </div>
  );
}

// 🔠
function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground-dark/50 text-xl leading-tight">{children}</p>
  );
}

// 🖼️
function CustomIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className={cn(
        "hidden grid-cols-1 grid-rows-1 sm:top-8 sm:right-8 md:grid"
      )}
    >
      <Icon
        className={cn(
          "col-start-1 row-start-1",
          "size-7",
          "text-[#AEABA4] group-hover:text-white",
          "transition-colors duration-500"
        )}
      />
      {/* 😶‍🌫️ Blurred copy */}
      <Icon
        className={cn(
          "col-start-1 row-start-1",
          "size-7 blur-md",
          "opacity-0 group-hover:opacity-50",
          "text-[#AEABA4] group-hover:text-white",
          "transition-opacity duration-500"
        )}
      />
    </div>
  );
}

// 📦
function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto space-y-5">{children}</div>;
}

// ―
function CardSeparator() {
  return (
    <div className="h-px w-full bg-linear-to-r from-transparent via-foreground-dark/30 to-transparent" />
  );
}

// 📦
function FeaturesContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-2 text-nowrap font-geist-mono font-light text-foreground-dark/50 uppercase",
        // ↔️
        "text-[0.7rem] sm:text-[0.8rem]",
        "tracking-widest"
      )}
    >
      {children}
    </div>
  );
}

// 📨
function EchangerSurCeService() {
  return (
    <div className="relative w-fit">
      <div
        className={cn(
          "absolute inset-0 h-full w-full origin-bottom scale-x-105 bg-white",
          "transition-transform duration-500",
          "scale-y-0 group-hover:scale-y-110"
        )}
      />
      <div className="relative mt-5 flex items-center gap-x-1.5 text-foreground-dark/80 transition-colors duration-500 group-hover:text-foreground">
        <span>Échanger sur ce service</span>
        <ArrowUpRightIcon
          className="text-foreground-dark/80 transition-colors duration-500 group-hover:text-foreground"
          size={16}
        />
      </div>
    </div>
  );
}

//  🔲
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
