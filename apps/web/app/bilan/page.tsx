"use client";
import { ExternalLinkIcon, InfoIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import GlassSurface from "@/components/react-bits/glass-surface";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatedCircularProgressBar } from "./components/animated-circular-progress-bar";
import { AuroraBackground } from "./components/aurora-background";
import { MacbookScroll } from "./components/macbook-scroll";
import { OfferedBy } from "./components/offered-by";

const accessibilityScore = 21;
const performanceScore = 33;
const securityScore = 46;
const seoScore = 64;

export default function BilanPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="-z-1 fixed h-screen w-screen [background:radial-gradient(125%_125%_at_50%_90%,white_40%,var(--color-primary)_100%)]" />
      {/*<DividerTop />*/}
      <OfferedBy />
      <AuroraBackground className="mask-b-from-80% mask-b-to-100%">
        <div className="z-1 flex flex-col gap-y-24">
          <div>
            <motion.div
              animate={{ opacity: 1 }}
              className="mx-auto mb-10 w-[1000px] text-center font-sarina text-8xl"
              initial={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              Mon bilan numérique
            </motion.div>
            <GlassSurface
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
                href="https://www.lasbordes11400.fr/"
                rel="noopener"
                target="_blank"
              >
                https://www.lasbordes11400.fr/
                <ExternalLinkIcon size={18} strokeWidth={3} />
              </a>
            </GlassSurface>
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

function DividerTop() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: exception
    <svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary-strong)" />
          <stop offset="50%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary-lighter)" />
        </linearGradient>
      </defs>
      <path
        d="M0 0v80l227.5 18c12.1 1 22.5-8.6 22.5-20.7s10.4-21.8 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8s10.4-21.7 22.5-20.8l205 16.3c12.1 1 22.5-8.6 22.5-20.8S760.4 5 772.5 6L1000 24V0H0Z"
        fill="url(#gradient)"
      />
    </svg>
  );
}

// -----------------------------------------------------

function BackgroundSquare({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_80%)]" />
      {children}
    </div>
  );
}
