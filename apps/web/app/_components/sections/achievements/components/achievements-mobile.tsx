"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { achievements } from "../achievements-data";
import type { Achievement } from "../achievements-type";

export function AchievementsMobile() {
  return (
    <div
      className={cn(
        "w-full max-w-350 gap-6",
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

// --------------------------
// 🃏 Card
function CardAchievement({
  showcase,
  title,
  description,
  companyLogo,
  companyLink,
}: Achievement) {
  return (
    <Card className="container relative cursor-auto overflow-hidden bg-zinc-900 pt-0">
      {/* 🖼️ Image */}
      <div className="relative h-62.5 overflow-hidden">
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
      <CardContent className={cn("mb-4 space-y-6!", "px-4", "@sm:px-6")}>
        {/* 🆎 Title */}
        <CardTitle className="mb-1 font-kanit font-semibold text-2xl leading-none">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-tight">
          {description}
        </CardDescription>
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
