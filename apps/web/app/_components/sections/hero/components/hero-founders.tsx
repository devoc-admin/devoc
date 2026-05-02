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
        "flex items-center gap-x-3",
        "rounded-lg",
        "px-6 py-4",
        "font-fira-code"
      )}
    >
      <div className="-space-x-2">
        <ClementAvatar />
        <ThibautAvatar />
      </div>
      <div className="space-y-0.5">
        <div
          className={cn(
            "text-[0.7rem]",
            "text-zinc-600",
            "select-none",
            "uppercase",
            "font-geist-mono font-semibold",
            "tracking-[0.15rem]"
          )}
        >
          Fondateurs
        </div>
        <div className="flex gap-x-0.5 font-geist font-medium text-xs text-zinc-950 tracking-tight">
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
    <Avatar className="size-12 ring-[2px] ring-white transition-transform hover:z-10 hover:scale-105">
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
