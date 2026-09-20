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
// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex items-center",
        "font-geist",
        // ↔️
        "flex-col sm:flex-row",
        "gap-3 lg:gap-5 xl:gap-8"
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
        "items-center sm:items-end",
        "gap-y-0 xl:gap-y-0.5"
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
        "text-foreground/60",
        "select-none",
        "uppercase",
        "font-geist font-medium tracking-[0.2em]",
        // ↔️
        "text-[0.65rem] lg:text-xs"
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
        "text-base xs:text-lg lg:text-xl xl:text-2xl",
        "tracking-normal lg:tracking-tight"
      )}
    >
      <span>Clément</span>
      <span className="bg-linear-to-tr from-orange-red to-primary-lighter bg-clip-text text-transparent">
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
        "size-10 xs:size-11 lg:size-13 xl:size-16"
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
