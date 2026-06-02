import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { cn } from "@/lib/utils.ts";
import { OpenCarcaWinner } from "./open-carca-winner";
export function HeroFounders() {
  return (
    <Container>
      {/* 🔠 */}
      <LeftPart />
      {/* 🖼️🖼️ */}
      <RightPart />
      {/* 🌿 */}
      <OpenCarcaWinner />
    </Container>
  );
}

// ===================================

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "items-center",
        "font-geist",
        // ↔️
        "hidden flex-col gap-3",
        "xs:flex xs:flex-col xs:gap-3",
        "sm:flex sm:flex-row sm:gap-3",
        "md:flex md:flex-row md:gap-3",
        "lg:flex lg:flex-row lg:gap-5",
        "xl:flex xl:flex-row xl:gap-8",
        "2xl:flex 2xl:flex-row 2xl:gap-8"
      )}
    >
      {children}
    </div>
  );
}

function LeftPart() {
  return (
    <div
      className={cn(
        "flex flex-col",
        // ↔️
        "items-center gap-y-0",
        "xs:items-center xs:gap-y-0",
        "sm:items-end sm:gap-y-0",
        "md:items-end md:gap-y-0",
        "lg:items-end lg:gap-y-0",
        "xl:items-end xl:gap-y-0.5",
        "2xl:items-end 2xl:gap-y-0.5"
      )}
    >
      <Founders />
      <ClementAndThibaut />
    </div>
  );
}

function RightPart() {
  return (
    <div className="-space-x-3">
      <ClementAvatar />
      <ThibautAvatar />
    </div>
  );
}

function Founders() {
  return (
    <div
      className={cn(
        "text-foreground/50",
        "select-none",
        "uppercase",
        "font-geist font-medium tracking-[0.2em]",
        // ↔️
        "text-[0.6rem]",
        "xs:text-[0.6rem",
        "sm:text-[0.6rem",
        "md:text-[0.6rem",
        "lg:text-xs",
        "xl:text-xs",
        "2xl:text-xs"
      )}
    >
      Fondateurs
    </div>
  );
}

function ClementAndThibaut() {
  return (
    <div
      className={cn(
        "flex gap-x-1.5",
        "text-foreground/80",
        "font-fraunces",
        "font-normal",
        // ↔️

        "lg:text-xl lg:tracking-tight",
        "xl:text-2xl xl:tracking-tight",
        "2xl:text-2xl 2xl:tracking-tight"
      )}
    >
      <span>Clément</span>
      <span className="bg-linear-to-tr from-primary-strong to-primary-lighter bg-clip-text text-transparent">
        •
      </span>
      <span>Thibaut</span>
    </div>
  );
}

function ClementAvatar() {
  return (
    <AvatarWithTooltip
      fallback="CB"
      name="Clément Dubos"
      url="https://www.linkedin.com/in/clement-dubos-707747a5/"
      urlImage="https://avatars.githubusercontent.com/u/52322202"
    />
  );
}

function ThibautAvatar() {
  return (
    <AvatarWithTooltip
      fallback="TI"
      name="Thibaut Izard"
      url="https://www.linkedin.com/in/thibaut-izard/"
      urlImage="https://avatars.githubusercontent.com/u/8688023"
    />
  );
}

function AvatarWithTooltip({
  name,
  fallback,
  url,
  urlImage,
}: {
  name: string;
  fallback: string;
  url: string;
  urlImage: string;
}) {
  return (
    <Avatar
      className={cn(
        "transition-transform hover:z-10 hover:scale-105",
        // ↔️
        "size-10",
        "xs:size-11",
        "sm:size-11",
        "md:size-11",
        "lg:size-13",
        "xl:size-16",
        "2xl:size-16"
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            aria-label={`Profil LinkedIn de ${name} (ouvre dans une nouvelle fenêtre)`}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            title={`Visiter le profil LinkedIn de ${name}`}
          >
            <AvatarImage
              alt={`Photo de profil de ${name}`}
              role="img"
              src={urlImage}
            />
            <AvatarFallback aria-label={`Initiales de ${name}`}>
              {fallback}
            </AvatarFallback>
          </a>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </Avatar>
  );
}
