import Image from "next/image";
import { cn } from "@/lib/utils";

export function Portrait({
  name,
  title,
  description,
  src,
}: {
  name: string;
  title: string;
  description: string;
  src: string;
}) {
  return (
    <div
      className={cn(
        // ↔️
        "flex flex-col sm:row-span-full sm:grid sm:grid-cols-subgrid sm:grid-rows-subgrid",
        "gap-y-3 lg:gap-y-4"
      )}
    >
      <PortraitImage alt={name} src={src} />
      <div className="space-y-0.5">
        <PortraitName>{name}</PortraitName>
        <PortraitTitle>{title}</PortraitTitle>
      </div>
      <PortraitDescription>{description}</PortraitDescription>
    </div>
  );
}

// 📸
function PortraitImage({ alt, src }: { alt: string; src: string }) {
  return (
    <div
      className={cn(
        "relative col-span-full grow overflow-hidden",
        // ↔️
        "h-100 md:h-112.5 lg:h-162.5"
      )}
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        src={src}
      />
    </div>
  );
}

// 🆎
function PortraitName({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "font-geist font-medium text-orange-red tracking-tight",
        // ↔️
        "text-4xl xl:text-[2.3rem] 2xl:text-5xl"
      )}
    >
      {children}
    </h4>
  );
}

function PortraitTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5
      className={cn(
        "font-geist-mono text-base text-foreground-dark/70 leading-[1.1]! tracking-tighter"
      )}
    >
      {children}
    </h5>
  );
}

function PortraitDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className={cn("text-foreground-dark text-lg leading-snug")}>
      {children}
    </p>
  );
}
