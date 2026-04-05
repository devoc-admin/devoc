import { motion } from "motion/react";
import Image from "next/image";
import { useSlidesContext } from "../_context";
import { variantsPillar } from "../_step-animations";
import CrownIcon from "../images/crown.png";
import FlagIcon from "../images/flag.png";
import LinkIcon from "../images/link.png";
import LockIcon from "../images/lock.png";
import ShieldIcon from "../images/shield.png";

export function Pillar({
  children,
  gradient,
}: {
  children: string;
  gradient: string[];
}) {
  return (
    <h2
      className="bg-clip-text font-bold font-kanit text-[150px] text-transparent uppercase"
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradient.join(", ")})`,
      }}
    >
      {children}
    </h2>
  );
}

// -------------------------------------------------------
export function PillarAccessibility() {
  const { animations } = useSlidesContext();
  const { pillarAccessibility: pillarAccessibilityAnimations } = animations;
  return (
    <motion.div
      animate={pillarAccessibilityAnimations}
      className="fixed"
      initial={false}
      variants={variantsPillar}
    >
      <Pillar gradient={["#f2709c ", "#ff9472"]}>Accessibilité</Pillar>
    </motion.div>
  );
}

export function PillarSecurity() {
  const { animations } = useSlidesContext();
  const { pillarSecurity: pillarSecurityAnimations } = animations;
  return (
    <motion.div
      animate={pillarSecurityAnimations}
      className="fixed"
      initial={false}
      variants={variantsPillar}
    >
      <Pillar gradient={["#4b6cb7 ", "#182848"]}>Sécurité</Pillar>
      <div className="mx-auto flex justify-center gap-x-2">
        <Image
          alt="Lock Icon"
          className="hue-rotate-180"
          height={150}
          src={LockIcon}
          width={150}
        />
        <Image
          alt="Flag Icon"
          className="hue-rotate-180"
          height={150}
          src={LinkIcon}
          width={150}
        />
        <Image
          alt="Shield Icon"
          className="hue-rotate-180"
          height={150}
          src={ShieldIcon}
          width={150}
        />
      </div>
    </motion.div>
  );
}

export function PillarSovereignty() {
  const { animations } = useSlidesContext();
  const { pillarSovereignty: pillarSovereigntyAnimations } = animations;
  return (
    <motion.div
      animate={pillarSovereigntyAnimations}
      className="fixed"
      initial={false}
      variants={variantsPillar}
    >
      <Pillar gradient={["#52c234 ", "#061700"]}>Souveraineté</Pillar>
      <div className="mx-auto flex justify-center gap-x-2">
        <Image
          alt="Crown Icon"
          className="hue-rotate-60"
          height={150}
          src={CrownIcon}
          width={150}
        />
        <Image
          alt="Flag Icon"
          className="hue-rotate-60"
          height={150}
          src={FlagIcon}
          width={150}
        />
        <Image
          alt="Shield Icon"
          className="hue-rotate-60"
          height={150}
          src={ShieldIcon}
          width={150}
        />
      </div>
    </motion.div>
  );
}
