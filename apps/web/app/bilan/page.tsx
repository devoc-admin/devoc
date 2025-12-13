"use client";
import { ExternalLinkIcon, InfoIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Fade } from "./components/animations/fade";
import { FadeDown } from "./components/animations/fade-down";
import GlassSurface from "@/components/react-bits/glass-surface";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { AuroraBackground } from "./components/aurora-background";
import { MacbookScroll } from "./components/macbook-scroll";
import { OfferedBy } from "./components/offered-by";
import { Pricing } from "./components/price-grid";
import { TimelineProjections } from "./components/timeline-projections";

const accessibilityScore = 21;
const performanceScore = 33;
const securityScore = 46;
const seoScore = 64;

export default function BilanPage() {
  return (
    <div className="flex flex-col items-center pb-96">
      <div className="fixed h-screen w-screen -z-10 [background:radial-gradient(125%_125%_at_50%_90%,white_60%,var(--color-primary)_100%)]" />
      <OfferedBy />
      <AuroraBackground className="mask-b-from-80% mask-b-to-100%">
        <div className="z-10 flex flex-col gap-y-24">
          <div>
            <Fade>
              <div className="mx-auto mb-10 w-[1000px] text-center font-sarina text-8xl">
                Mon bilan numérique
              </div>
            </Fade>
            <LinkGlass link="https://www.lasbordes11400.fr/"/>
          </div>
          <div className="flex items-baseline justify-center gap-x-28">
            <Accessibility />
            <Performance />
            <Security />
            <Seo />
          </div>
        </div>
      </AuroraBackground>
      <MacbookScroll />

      <div className="mt-48 mb-48">
        <FadeDown>
          Nos projections
        </FadeDown>
        <TimelineProjections/>
      </div>
    </div>
  );
}

// -----------------------------------
function Accessibility() {
  return (
    <Kpi
      delay={0}
      missingItems={[
        { link: "https://accessibilite.numerique.gouv.fr/", name: "RGAA 4.1" },
      ]}
      targetValue={accessibilityScore}
      text="Accessibilité"
    />
  );
}

function Performance() {
  return (
    <Kpi
      delay={0.2}
      missingItems={[]}
      targetValue={performanceScore}
      text="Performance"
    />
  );
}

function Security() {
  return (
    <Kpi
      delay={0.4}
      missingItems={[
        {
          link: "https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/assurer-sa-cybersecurite-et-la-protection-de-ses/le",
          name: "RGPD",
        },
        { link: "https://cyber.gouv.fr/la-directive-nis-2", name: "NIS 2" },
      ]}
      targetValue={securityScore}
      text="Sécurité"
    />
  );
}


function Seo() {
  return (
    <Kpi delay={0.6} missingItems={[]} targetValue={seoScore} text="SEO" />
  );
}

function Kpi({
  targetValue,
  text,
  missingItems,
  delay = 0,
}: {
  targetValue: number;
  delay: number;
  text: string;
  missingItems: { name: string; link?: string }[];
}) {
  const [value, setValue] = useState(0);

  let color = "rgb(79 70 229)";
  let colorSecondary = "rgba(0, 0, 0, 0.1)";
  if (value < 25) {
    color = "var(--color-red-600)";
    colorSecondary = "var(--color-red-100)";
  } else if (value < 50) {
    color = "var(--color-orange-500)";
    colorSecondary = "var(--color-orange-100)";
  } else if (value < 75) {
    color = "var(--color-amber-500)";
    colorSecondary = "var(--color-amber-100)";
  } else {
    color = "var(--color-green-600)";
    colorSecondary = "var(--color-green-100)";
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-y-5 font-bold text-xl"
      initial={{ opacity: 0, y: -50 }}
      onAnimationStart={() => {
        setValue(targetValue);
      }}
      transition={{ delay, duration: 1.2 }}
    >
      <AnimatedCircularProgressBar
        gaugePrimaryColor={color}
        gaugeSecondaryColor={colorSecondary}
        value={value}
      />
      <div className="font-kanit text-3xl">{text}</div>
      <div className="flex flex-col gap-y-2">
        {missingItems.map(({ name, link }) => (
          <MissingItem key={name} link={link} name={name} />
        ))}
      </div>
    </motion.div>
  );
}

function MissingItem({
  name,
  link,
}: {
  name: string;
  link: string | undefined;
}) {
  return (
    <div className="flex flex-col items-center gap-y-0.5">
      <XIcon color="var(--color-red-600" size={16} strokeWidth={5} />
      <a
        className="relative flex cursor-pointer items-center gap-x-1"
        href={link}
        target="_blank"
      >
        <div className="text-base text-gray-700">{name}</div>
        <Tooltip>
          <TooltipTrigger className="-right-1.5 absolute translate-x-full">
            <InfoIcon className="text-gray-500" size={14} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </a>
    </div>
  );
}

// -----------------------------------

function LinkGlass({
  link
}: {
  link: string;
}) {
  return <GlassSurface
    blueOffset={25}
    brightness={60}
    className="mx-auto"
    displace={15}
    distortionScale={-150}
    greenOffset={15}
    height={40}
    mixBlendMode="screen"
    opacity={1}
    redOffset={5}
    width="fit-content"
  >
    <a
      className="flex items-center gap-x-2 px-6 font-bold text-orange-950 underline"
      href={link}
      rel="noopener"
      target="_blank"
    >
      {link}
      <ExternalLinkIcon size={18} strokeWidth={3} />
    </a>
  </GlassSurface>
}
