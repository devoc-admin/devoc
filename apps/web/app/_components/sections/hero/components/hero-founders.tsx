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

export function HeroFounders() {
  return (
    <div
      className={cn(
        "flex items-center",
        "font-geist-mono",
        // ↔️
        "gap-x-3 self-center",
        "xs:gap-x-3 xs:self-center",
        "sm:gap-x-3 sm:self-center",
        "md:gap-x-3 md:self-center",
        "lg:gap-x-3 lg:self-start",
        "xl:gap-x-4 xl:self-start"
      )}
    >
      <div className="-space-x-2">
        <ClementAvatar />
        <ThibautAvatar />
      </div>
      <div
        className={cn(
          // ↔️
          "space-y-0.5",
          "xs:space-y-0.5",
          "sm:space-y-0.5",
          "md:space-y-0.5",
          "lg:space-y-0.5",
          "xl:-space-y-0.5"
        )}
      >
        <div
          className={cn(
            "text-zinc-600",
            "select-none",
            "uppercase",
            "font-geist-mono font-semibold",
            // ↔️
            "text-[0.7rem] tracking-[0.15rem]",
            "xs:text-[0.75rem] xs:tracking-[0.15rem]",
            "sm:text-[0.75rem] sm:tracking-[0.15rem]",
            "md:text-[0.75rem] md:tracking-[0.15rem]",
            "lg:text-[0.75rem] lg:tracking-[0.15rem]",
            "xl:text-[0.85rem] xl:tracking-[0.17rem]"
          )}
        >
          Fondateurs
        </div>
        <div
          className={cn(
            "flex gap-x-0.5 font-light",
            "text-zinc-950",
            // ↔️
            "text-xs tracking-tight",
            "xs:text-xs xs:tracking-tight",
            "sm:text-xs sm:tracking-tight",
            "md:text-xs md:tracking-tight",
            "lg:text-xs lg:tracking-tight",
            "xl:text-sm xl:tracking-tight"
          )}
        >
          <span>Clément</span>
          <span>•</span>
          <span>Thibaut</span>
        </div>
      </div>
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
        "ring-[2px] ring-white transition-transform hover:z-10 hover:scale-105",
        // ↔️
        "size-10",
        "xs:size-11",
        "sm:size-11",
        "md:size-11",
        "lg:size-11",
        "xl:size-12"
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
