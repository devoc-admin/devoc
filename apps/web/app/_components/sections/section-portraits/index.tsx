import { motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { FadeUp } from "@/components/dev-oc/animations/fade-up";
import { cn } from "@/lib/utils";
import { Portrait } from "./_components/portrait";
import ClementPortrait from "./assets/clement-portrait-orange.jpeg";
import ThibautPortrait from "./assets/thibaut-portrait-orange.jpeg";

export function SectionPortraits() {
  return (
    <Container>
      {/* 🔠 */}
      <Quotes />
      {/* 🙈🙈 */}
      <PortraitsContainer>
        <PortraitClement />
        <PortraitThibaut />
      </PortraitsContainer>
    </Container>
  );
}

// 📦
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        // ↔️
        "flex flex-col xl:grid xl:grid-cols-2",
        "my-16 sm:my-24 md:my-36 lg:my-56 xl:my-72",
        "gap-y-16 md:gap-y-24 lg:gap-y-32 xl:gap-12 2xl:gap-18"
      )}
    >
      {children}
    </div>
  );
}

// 📦
function PortraitsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        // ↔️
        "flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-[repeat(4,auto)]",
        "gap-16 sm:gap-8 md:gap-6 lg:gap-10"
      )}
    >
      {children}
    </div>
  );
}

// 🔡
function Quotes() {
  return (
    <div className={cn("space-y-16", "hidden md:block")}>
      <FadeUp className={cn("sm:grid sm:place-items-center")} duration={2.5}>
        <p
          className={cn(
            "font-fraunces font-light",
            // ↔️
            "sm:text-4xl lg:text-5xl 2xl:text-6xl"
          )}
        >
          Notre mission : Façonner l'avenir numérique de l'Occitanie par
          l'excellence technique, l'humain et l'autonomie locale.
        </p>
      </FadeUp>
      <FadeUp
        className={cn("sm:grid sm:place-items-center")}
        dir="down"
        duration={2.5}
      >
        <p
          className={cn(
            "text-right font-fraunces font-light",
            // ↔️
            "sm:text-4xl lg:text-5xl 2xl:text-6xl"
          )}
        >
          Nous croyons en un digital souverain, accessible et durable pour
          chaque entreprise et collectivité, de la conception à l'hébergement.
        </p>
      </FadeUp>
    </div>
  );
}

function PortraitClement() {
  return (
    <FadeMovePortrait dir="up">
      <Portrait
        description="L'architecte de l'invisible. Il conçoit les fondations sur lesquelles reposent vos outils numériques. Avec toujours comme maîtres mots l'efficacité et la résilience."
        key="clement"
        name="Clément"
        src={ClementPortrait.src}
        title="Infrastructure et services"
      />
    </FadeMovePortrait>
  );
}

function PortraitThibaut() {
  return (
    <FadeMovePortrait dir="down">
      <Portrait
        description="L'interface entre vous et vos utilisateurs. Expert en développement web, conformité RGPD et accessibilité, il s'assure que vos interfaces restent modernes, conformes et durables."
        key="thibaut"
        name="Thibaut"
        src={ThibautPortrait.src}
        title="Design & accessibilité"
      />
    </FadeMovePortrait>
  );
}

function FadeMovePortrait({
  children,
  className,
  dir,
}: {
  children: React.ReactNode;
  className?: string;
  dir: "up" | "down";
}) {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false,
  });
  const isTabletOrSmallLaptop = useMediaQuery("(max-width: 1280px)", {
    initializeWithValue: false,
  });

  const sharedClasses = cn(
    "col-span-1 row-span-full grid grid-cols-subgrid grid-rows-subgrid",
    // ↔️
    "translate-y-0 2xl:translate-y-12"
  );

  if (isMobile) return children;
  if (isTabletOrSmallLaptop)
    return <FadeUp className={sharedClasses}>{children}</FadeUp>;

  return (
    <motion.div
      className={cn(sharedClasses, className)}
      initial={{
        opacity: 0,
        y: dir === "up" ? -100 : 100,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{
        amount: 0.5,
        once: true,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
    >
      {children}
    </motion.div>
  );
}
