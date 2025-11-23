"use client";
import { TrophyIcon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { achievements } from "./achievements";
import type { Achievement } from "./type";

export function AchievementsMobile() {
  return (
    <div
      className={cn(
        "w-full max-w-[1400px] gap-6",
        "flex flex-col",
        "sm:grid sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
      )}
    >
      {achievements.map((achievement) => (
        <CardAchievement key={achievement.slug} {...achievement} />
      ))}
    </div>
  );
}
function CardAchievement({
  showcase,
  title,
  description,
  accomplishments,
  companyLogo,
  companyLink,
}: Achievement) {
  return (
    <Card className="relative cursor-auto overflow-hidden pt-0">
      {/* 🖼️ Image */}
      <div className="relative h-[250px] overflow-hidden">
        <div className="group relative grid h-full w-full place-items-center">
          <Image
            alt="Realisation"
            className="h-full object-cover"
            height={1200}
            src={showcase}
            width={1200}
          />
          {/* 🥷 Shadow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* 🔡 Description */}
      <CardContent className="mb-4">
        <CardTitle className="mb-1 font-kanit font-semibold text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-tight">
          {description}
        </CardDescription>
        {/* 🏆 Accomplishments */}
        {accomplishments && accomplishments.length > 0 && (
          <div className="mt-4 flex flex-col gap-y-2">
            <div className="font-bold text-sm text-white/80">
              ✨ Les résultats
            </div>
            <div className="flex flex-wrap gap-2">
              {accomplishments.map((accomplishment) => (
                <Accomplishment key={accomplishment}>
                  {accomplishment}
                </Accomplishment>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* ⚙️ Technologies */}
      <CardFooter className="mt-auto mr-4 ml-auto flex items-center gap-3">
        <span className="text-sm italic">Réalisé pour</span>
        <a
          className="cursor-pointer"
          href={companyLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {companyLogo}
        </a>
      </CardFooter>
    </Card>
  );
}

function Accomplishment({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/30 px-3 py-1 text-primary">
      <TrophyIcon size={12} />
      <span className="text-xs">{children}</span>
    </div>
  );
}
