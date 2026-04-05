import { motion } from "motion/react";
import { useSlidesContext } from "../_context";

import { variantsLogoContainer, variantsLogoInside } from "../_step-animations";

const ORANGE_COLORS = [
  "#FFC731", // 0: Yellow-orange
  "#FF7711", // 1: Orange
  "#FF9718", // 2: Light orange
  "#FF5709", // 3: Dark orange-red
];

const PINK_COLORS = [
  "#f2709c", // 0: Light pink
  "#ff9472", // 1: Coral pink
  "#ff6b9d", // 2: Medium pink (blend for central gradient)
  "#e63946", // 3: Deep red-pink (darker accent)
];

const BLUE_COLORS = [
  "#4b6cb7", // 0: Steel blue
  "#182848", // 1: Dark navy
  "#3a5a9e", // 2: Medium blue (blend for central gradient)
  "#0d1b2a", // 3: Deep dark blue (darker accent)
];

const GREEN_COLORS = [
  "#52c234", // 0: Bright green
  "#061700", // 1: Very dark green
  "#3da929", // 2: Medium green (blend for central gradient)
  "#020a00", // 3: Almost black green (darker accent)
];

type DevOcLogoProps = {
  className?: string;
  colors?: string[];
};

export function DevOcLogo({
  className,
  colors = ORANGE_COLORS,
}: DevOcLogoProps) {
  const { animations } = useSlidesContext();
  const {
    logoContainer: logoContainerAnimation,
    logoInside: logoInsideAnimation,
    name: animationName,
  } = animations;

  let usedColors = colors;

  if (animationName === "pink") {
    usedColors = PINK_COLORS;
  }

  if (animationName === "blue") {
    usedColors = BLUE_COLORS;
  }

  if (animationName === "green") {
    usedColors = GREEN_COLORS;
  }

  return (
    <motion.div
      animate={logoContainerAnimation}
      className="fixed"
      initial={false}
      variants={variantsLogoContainer}
    >
      <motion.div
        animate={logoInsideAnimation}
        className="perspective-distant"
        variants={variantsLogoInside}
      >
        <svg
          className={className}
          fill="none"
          height="628"
          viewBox="0 0 659 628"
          width="659"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>DevOc Logo</title>
          <path
            d="M4.83044e-06 313.356C65 194.356 193.5 154.5 317.5 279.356L317.5 353.856C192.502 486.356 62.002 415.856 4.83044e-06 313.356Z"
            fill="url(#paint0_linear_816_36)"
          />
          <path
            d="M298.658 317.5C144.658 465.5 257.825 586.167 333.658 628C510.058 513.598 433.492 373.333 373.158 317.5C505.658 192.502 435.158 62.002 332.658 0C213.658 65 174.158 215 298.658 317.5Z"
            fill="url(#paint1_linear_816_36)"
          />
          <path
            d="M658.5 316.356C593.5 197.356 443.5 157.856 341 282.356L330 317.5C449 513 596.498 418.857 658.5 316.356Z"
            fill="url(#paint2_linear_816_36)"
          />
          <path
            d="M332.757 0C435.257 62.002 505.757 192.502 373.257 317.5H329.998C291 256.5 281.5 249 229 217C229.062 217.222 229.124 217.444 229.187 217.666C204.525 133.812 248.903 45.8029 332.757 0ZM257.497 274.271C272.463 294.65 289.007 309.444 299.498 317.5H298.757C282.154 303.831 268.468 289.316 257.497 274.271Z"
            fill="url(#paint3_linear_816_36)"
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_816_36"
              x1="116"
              x2="264.5"
              y1="283.5"
              y2="395.999"
            >
              <motion.stop
                animate={{ stopColor: usedColors[0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.stop
                animate={{ stopColor: usedColors[1] }}
                offset="1"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_816_36"
              x1="414"
              x2="296.5"
              y1="77"
              y2="554"
            >
              <motion.stop
                animate={{ stopColor: usedColors[2] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.stop
                animate={{ stopColor: usedColors[3] }}
                offset="0.475962"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.stop
                animate={{ stopColor: usedColors[2] }}
                offset="1"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint2_linear_816_36"
              x1="607"
              x2="383.5"
              y1="254.499"
              y2="361.5"
            >
              <motion.stop
                animate={{ stopColor: usedColors[0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.stop
                animate={{ stopColor: usedColors[1] }}
                offset="1"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint3_linear_816_36"
              x1="271.499"
              x2="415.999"
              y1="51.5"
              y2="264.5"
            >
              <motion.stop
                animate={{ stopColor: usedColors[0] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.stop
                animate={{ stopColor: usedColors[1] }}
                offset="1"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}
