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

  // 🆎 ⏹️
  const { title, cta } = homepage.hero;

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
        <LesSaveursAuthentiques title={title} />
        <DecouvrezNotreSelection cta={cta} />
      </div>
      <HeroVideo />
    </div>
  );
}

// 🆎 =============================================
function LesSaveursAuthentiques({ title }: { title: string }) {
  return (
    <h2
      className={cn(
        "text-white",
        "font-fleur-de-leah",
        "text-balance",
        "text-center",
        "font-light",
        "leading-[0.75em]!",
        "xs:text-[4rem] sm:text-[4.9rem] md:text-8xl lg:text-9xl"
      )}
      style={{
        textShadow:
          "rgb(0 0 0) 0px 0px 25px, rgb(0 0 0) 0px 0px 25px, rgb(0 0 0) 0.015em 0.015em 0px",
      }}
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
        "flex items-center gap-x-3",
        "outline-secondary/70 outline-2 outline-offset-4",
        "mt-12",
        "mx-auto w-fit",
        "bg-secondary hover:bg-secondary/90 text-black",
        "px-5 py-3 sm:px-8 sm:py-4",
        "rounded-full",
        "font-extrabold",
        "sm:text-lg md:text-xl lg:text-xl",
        "cursor-pointer transition-colors duration-700"
      )}
      href={cta?.link ?? "/"}
    >
      <VineLeaf className="size-5 sm:size-6" />
      <div className="mr-1.5">{cta?.label ?? "Découvrez notre sélection"}</div>
    </Link>
  );
}

export default Hero;
