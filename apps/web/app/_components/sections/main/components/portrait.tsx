import Image from "next/image";
import { cn } from "@/lib/utils";

export function Portrait2({
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
        "flex flex-col gap-y-2",
        "xs:flex xs:flex-col xs:gap-y-2",
        "sm:row-span-full sm:grid sm:grid-cols-subgrid sm:grid-rows-subgrid sm:gap-y-2",
        "md:row-span-full md:grid md:grid-cols-subgrid md:grid-rows-subgrid md:gap-y-2",
        "lg:row-span-full lg:grid lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-4",
        "xl:row-span-full xl:grid xl:grid-cols-subgrid xl:grid-rows-subgrid xl:gap-y-4",
        "2xl:row-span-full 2xl:grid 2xl:grid-cols-subgrid 2xl:grid-rows-subgrid 2xl:gap-y-4"
      )}
    >
      <PortraitImage alt={name} src={src} />
      <div
        className={cn(
          // ↔️
          "-space-y-1",
          "xs:space-y-0",
          "sm:space-y-0.5",
          "md:space-y-0.5",
          "lg:space-y-0.5",
          "xl:space-y-0.5",
          "2xl:space-y-0.5"
        )}
      >
        <PortraitName>{name}</PortraitName>
        <PortraitTitle>{title}</PortraitTitle>
      </div>
      <PortraitDescription>{description}</PortraitDescription>
    </div>
  );
}

function PortraitImage({ alt, src }: { alt: string; src: string }) {
  return (
    <div
      className={cn(
        // ↔️
        "relative col-span-full grow overflow-hidden",
        "h-[400px]",
        "xs:h-[400px]",
        "sm:h-[400px]",
        "md:h-[450px]",
        "lg:h-[650px]",
        "xl:h-[650px]",
        "2xl:h-[650px]"
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

function PortraitName({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "font-geist font-normal text-primary-strong tracking-tight",
        // ↔️
        "text-2xl",
        "xs:text-3xl",
        "sm:text-3xl",
        "md:text-3xl",
        "lg:text-4xl",
        "xl:text-[2.3rem]",
        "2xl:text-5xl"
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
        "font-geist-mono text-foreground-dark/70 leading-[1.1] tracking-tighter", // ↔️
        "text-[0.85rem]",
        "xs:text-[0.85rem]",
        "sm:text-[0.85rem]",
        "md:text-sm",
        "lg:text-sm",
        "xl:text-[0.9rem]",
        "2xl:text-base"
      )}
    >
      {children}
    </h5>
  );
}

function PortraitDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-foreground-dark",
        // ↔️
        "text-base leading-snug",
        "xs:text-base xs:leading-snug",
        "sm:text-base sm:leading-snug",
        "md:text-base md:leading-tight",
        "lg:text-lg lg:leading-tight",
        "xl:text-lg xl:leading-tight",
        "2xl:text-lg 2xl:leading-tight"
      )}
    >
      {children}
    </p>
  );
}
