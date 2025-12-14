/** biome-ignore-all assist/source/useSortedKeys: exception */
import type { Easing } from "motion/react";

export const variantAccessibilityQuestion = {
  initial: {
    opacity: 0,
    y: -50,
  },
  appear: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut" as Easing,
    },
  },
};

export const variantsAccessibilityBigNumber = {
  initial: {
    opacity: 0,
    y: "100px",
    display: "hidden",
  },
  appear: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: {
      duration: 1,
      ease: "easeOut" as Easing,
    },
  },
};

export const variantsAccessibilityCard = {
  initial: {
    opacity: 0,
    y: "-100px",
    rotateY: 0,
    display: "hidden",
  },
  fadeAndMoveDown: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    rotateY: 0,
    display: "block",
    transition: {
      duration: 1,
      delay: custom.delay,
    },
  }),
  fadeAndMoveUp: (custom: { delay: number }) => ({
    opacity: 0,
    y: "-100px",
    rotateY: 0,
    display: "hidden",
    transition: {
      duration: 0.5,
      delay: custom.delay,
    },
    onAnimationComplete: () => {
      // Animation completion callback
    },
  }),
};

export const variantsAccessibilityInnerCard = {
  initial: {
    rotateY: 0,
  },
  rotateBackFace: (custom: { delay: number }) => ({
    rotateY: 180,
    transition: {
      duration: 0.7,
      ease: "linear" as Easing,
      delay: custom.delay,
    },
  }),
};

export const variantsLogoContainer = {
  initial: {
    top: "100%",
    left: "50%",
    opacity: 1,
    rotateX: 0,
    scale: 1,
    x: "-50%",
    y: "100%",
  },
  fadeAndMoveUp: {
    top: "100%",
    left: "50%",
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
    x: "-50%",
    y: "-50%",
  },
  upscaleBottomLeftRotate: {
    top: "100%",
    left: 0,
    opacity: 1,
    rotateX: 70,
    rotateY: 0,
    rotateZ: 0,
    scale: 6,
    transition: { duration: 2, ease: "easeOut" as Easing },
    x: "-0%",
    y: "-70%",
  },
  upscaleTopLeftRotate: {
    top: 0,
    left: 0,
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 4,
    transition: { duration: 2, ease: "easeOut" as Easing },
    x: "0%",
    y: "10%",
  },
  upscaleTopRightRotate: {
    top: 0,
    left: "100%",
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 4,
    transition: { duration: 2, ease: "easeOut" as Easing },
    x: "-80%",
    y: "10%",
  },
  upscaleBottomRightRotate: {
    top: "100%",
    left: "100%",
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 4,
    transition: { duration: 2, ease: "easeOut" as Easing },
    x: "-80%",
    y: "-100%",
  },
};

export const variantsLogoInside = {
  initial: {
    rotate: 0,
  },
  rotateSlowly: {
    rotate: 360,
    transition: {
      duration: 30,
      ease: "linear" as Easing,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

export const variantsDevOc = {
  initial: {
    bottom: 0,
    left: "50%",
    opacity: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" as Easing },
    x: "-50%",
    y: "100%",
  },
  fadeMoveUp: {
    bottom: 0,
    left: "50%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
    x: "-50%",
    y: "-25%",
  },
  centerScale: {
    bottom: "50%",
    left: "50%",
    opacity: 1,
    scale: 2,
    transition: { duration: 1, ease: "easeInOut" as Easing },
    x: "-50%",
    y: "50%",
  },
  disappear: {
    bottom: "50%",
    left: "50%",
    opacity: 0,
    scale: 2,
    transition: { duration: 1, ease: "easeInOut" as Easing },
    x: "-50%",
    y: "50%",
  },
};

export const variantsPillar = {
  initial: {
    opacity: 0,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    scale: 1,
    transition: { duration: 1, ease: "easeInOut" as Easing },
  },
  appear: {
    opacity: 1,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    scale: 1,
    transition: { duration: 1, ease: "easeOut" as Easing },
  },
};

export const steps: Step[] = [
  // 👁️ #1 - Accessibility
  // Initial
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  {
    accessibilityQuestion: "appear",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // Accessibility cards appear
  {
    accessibilityQuestion: "appear",
    accessiblityCard: "fadeAndMoveDown",
    accessiblityCardInner: "initial",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // Accessibility cards flip
  {
    accessibilityQuestion: "appear",
    accessiblityCard: "fadeAndMoveDown",
    accessiblityCardInner: "rotateBackFace",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // Accessibility cards leave
  {
    accessibilityQuestion: "appear",
    accessiblityCard: "fadeAndMoveUp",
    accessiblityCardInner: "rotateBackFace",
    accessibilityNumber: "initial",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // Number ticking
  {
    accessibilityQuestion: "appear",
    accessiblityCard: "fadeAndMoveUp",
    accessiblityCardInner: "rotateBackFace",
    accessibilityNumber: "appear",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // Remove accessibility
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "fadeAndMoveUp",
    devOc: "initial",
    logoContainer: "initial",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "init",
  },
  // 🔒 #2 - Sécurité
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "fadeMoveUp",
    logoContainer: "fadeAndMoveUp",
    logoInside: "initial",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "untitled",
  },
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "centerScale",
    logoContainer: "upscaleBottomLeftRotate",
    logoInside: "rotateSlowly",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "untitled",
  },
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "disappear",
    logoContainer: "upscaleBottomLeftRotate",
    logoInside: "rotateSlowly",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "untitled",
  },

  // 🪨 #3 - Pillars
  {
    // Accessibility
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "disappear",
    logoContainer: "upscaleTopLeftRotate",
    logoInside: "rotateSlowly",
    pillarAccessibility: "appear",
    pillarSecurity: "initial",
    pillarSovereignty: "initial",
    name: "pink",
  },
  {
    // Security
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "disappear",
    logoContainer: "upscaleTopRightRotate",
    logoInside: "rotateSlowly",
    pillarAccessibility: "initial",
    pillarSecurity: "appear",
    pillarSovereignty: "initial",
    name: "blue",
  },
  {
    accessibilityQuestion: "initial",
    accessiblityCard: "initial",
    accessiblityCardInner: "initial",
    accessibilityNumber: "initial",
    devOc: "disappear",
    logoContainer: "upscaleBottomRightRotate",
    logoInside: "rotateSlowly",
    pillarAccessibility: "initial",
    pillarSecurity: "initial",
    pillarSovereignty: "appear",
    name: "green",
  },
];

export type Step = {
  name: string;
  accessibilityQuestion?: string;
  accessiblityCard?: string;
  accessiblityCardInner?: string;
  accessibilityNumber?: string;
  logoContainer?: string;
  logoInside?: string;
  devOc?: string;
  pillarAccessibility?: string;
  pillarSecurity?: string;
  pillarSovereignty?: string;
};
