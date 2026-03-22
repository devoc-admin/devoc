import Image from "next/image";
import Link from "next/link";
import { getTypedLocale } from "@/i18n/routing";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";
import type { Homepage, Media } from "@/payload-types";
import FallbackHeroImage from "./hero.webp";
import { VineLeaf } from "./vine-leaf";

type HeroProps = {
  backgroundImage?: Partial<Media>;
  title: string;
};

async function Hero() {
  const locale = await getTypedLocale();
  const payload = await getPayloadClient();

  const homepage = await payload.findGlobal({
    locale,
    slug: "homepage",
  });

  const title = homepage.hero.title;
  const cta = homepage.hero.cta;
  const backgroundImage =
    typeof homepage.hero.backgroundImage === "object" &&
    homepage.hero.backgroundImage !== null
      ? homepage.hero.backgroundImage
      : undefined;

  return (
    <div
      className={cn(
        "relative",
        "h-[calc(100dvh-65px)]",
        // When navbar appears reduce hero height to fit the whole screen
        "lg:h-[calc(100dvh-105px)]",
        "min-h-100",
        "lg:max-h-175",
        "min-w-full",
        "overflow-hidden"
      )}
    >
      <div
        className={cn(
          "absolute top-[calc(50%-20px)] left-1/2 z-1",
          "-translate-x-1/2 -translate-y-1/2",
          "flex flex-col gap-y-6",
          "w-[90%]",
          "max-w-[100ch]",
          "text-center"
        )}
      >
        <LExcellenceDuTerroir title={title} />
        <DecouvrezNotreSelection cta={cta} />
      </div>
      <Landscape backgroundImage={backgroundImage} />
    </div>
  );
}

// ================
// 🆎
function LExcellenceDuTerroir({ title }: { title: string }) {
  return (
    <h2
      className={cn(
        "text-white",
        "font-fleur-de-leah!",
        "text-balance",
        "text-center",
        "text-shadow-lg",
        "font-light",
        "text-4xl xs:text-6xl sm:text-7xl lg:text-8xl"
      )}
    >
      {title}
    </h2>
  );
}

// ================
// 🖼️
function Landscape({
  backgroundImage,
}: {
  backgroundImage?: HeroProps["backgroundImage"];
}) {
  return (
    <Image
      alt={backgroundImage?.alt ?? ""}
      className={cn(
        "min-w-full",
        "max-w-none",
        "h-full",
        "object-cover",
        "brightness-60"
      )}
      height={2200}
      src={backgroundImage?.url ?? FallbackHeroImage}
      width={2200}
    />
  );
}

// ================
//🆕
function DecouvrezNotreSelection({ cta }: { cta: Homepage["hero"]["cta"] }) {
  return (
    <Link
      className={cn(
        "text-black",
        "flex items-center gap-2",
        "bg-secondary",
        "w-fit",
        "mx-auto",
        "px-4 py-2.5",
        "rounded-md",
        "font-extrabold",
        "text-sm",
        "cursor-pointer",
        "hover:bg-secondary/90",
        "transition-colors"
      )}
      href={cta?.link ?? "/"}
    >
      <VineLeaf className="size-4" />
      <div className="mr-1.5">{cta?.label ?? "Découvrez notre sélection"}</div>
    </Link>
  );
}

export default Hero;
