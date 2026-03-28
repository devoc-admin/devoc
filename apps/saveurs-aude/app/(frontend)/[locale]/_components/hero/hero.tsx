import Link from "next/link";
import { getTypedLocale } from "@/i18n/routing";
import { getPayloadClient } from "@/lib/payload";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/payload-types";
import { HeroVideo } from "./hero-video";
import { VineLeaf } from "./vine-leaf";

async function Hero() {
  const locale = await getTypedLocale();
  const payload = await getPayloadClient();

  const homepage = await payload.findGlobal({
    locale,
    slug: "homepage",
  });

  // 🆎
  const title = homepage.hero.title;

  // ⏹️
  const cta = homepage.hero.cta;

  return (
    <div
      className={cn(
        "relative",
        "h-[calc(100lvh-75px)]",
        // When navbar appears reduce hero height to fit the whole screen
        "lg:h-[calc(100lvh-105px)]",
        "min-h-100",
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
      <HeroVideo />
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
        "text-5xl xs:text-6xl sm:text-7xl lg:text-8xl"
      )}
    >
      {title}
    </h2>
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
