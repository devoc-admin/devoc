import Image from "next/image";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { cn } from "@/lib/utils";
import PhotoGroupe from "./assets/photo-groupe.webp";

export function SectionPortraitGroupe() {
  return (
    <div className="space-y-8">
      <Photo />
      <Legend />
    </div>
  );
}

// 📸
function Photo() {
  return (
    <FadeUp amount={0.3} className="w-full" disableOnMobile>
      <div
        className={cn(
          "relative",
          "aspect-16/7 w-full",
          "rounded-3xl",
          "overflow-hidden",
          "after:absolute after:inset-0 after:size-full after:bg-linear-to-b after:from-transparent after:via-transparent after:to-black/50 after:content-['']",
          // ↔️
          "hidden sm:block"
        )}
      >
        <Image
          alt="Photo de groupe du collectif Dev'Oc travaillant devant un ordinateur"
          className="size-full object-cover"
          height="788"
          src={PhotoGroupe.src}
          width="1206"
        />{" "}
      </div>
    </FadeUp>
  );
}

// 🔠
function Legend() {
  return (
    <div
      className={cn(
        "max-w-[34ch]",
        "font-fraunces font-light leading-snug",
        "space-y-8",
        // ↔️
        "text-3xl 2xl:text-4xl"
      )}
    >
      <FadeUp className="w-full" dir="down" disableOnMobile>
        <p className="italic">
          Un binôme complémentaire : là où l'un construit la mécanique, l'autre
          soigne l'expérience.
        </p>
      </FadeUp>
      <FadeUp className="w-full" dir="up" disableOnMobile>
        <p className="text-right italic">Deux regards, une même exigence.</p>
      </FadeUp>
    </div>
  );
}
