"use client";
import { MenuIcon, SendIcon, XIcon } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type RefObject, useCallback, useRef, useState } from "react";
import { useClickAnyWhere } from "usehooks-ts";
import { Glass } from "@/components/sera-ui/liquid-glass";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";
import { CustomButton } from "@/components/ui/custom-button/custom-button";

export default function Header() {
  return (
    <>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </>
  );
}

// --------------------------------
// 📱
const mobileHeaderVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const scrollThreshold = 100;

function MobileHeader() {
  const { iconRef, isOpened } = useToogleNavbarLink();

  return (
    <RevealOnScroll>
      <div
        className={cn(
          "flex items-center justify-between",
          "w-[95vw]",
          "px-4 py-2",
          "backdrop-blur-sm",
          // ⭕ Rounded
          "rounded-full",
          isOpened &&
            "rounded-tl-lg rounded-tr-lg rounded-br-none! rounded-bl-none!",
          // 🖼️ Background
          "transition-[background] duration-300",
          "bg-white/50 text-secondary hover:text-secondary", // ☀️ Light
          "[html[data-nav-theme='dark']_&]:bg-zinc-900/20", // 🌙 Dark
        )}
      >
        {/* ♻️ Logo */}
        <DevOc />
        {/* 🆕📨 Buttons */}
        <div className="flex">
          {/* 🆕 Open/close */}
          <OpenCloseButton iconRef={iconRef} isOpened={isOpened} />
          {/* 📨 Contact */}
          <ContactButton />
        </div>
      </div>
      {isOpened && <LinksMobile />}
    </RevealOnScroll>
  );
}

// --------------------------------
function OpenCloseButton({
  isOpened,
  iconRef,
}: {
  isOpened: boolean;
  iconRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      aria-expanded={isOpened}
      aria-label={
        isOpened
          ? "Fermer le menu de navigation"
          : "Ouvrir le menu de navigation"
      }
      className="cursor-pointer px-4 py-1"
      ref={iconRef}
      type="button"
    >
      {isOpened ? <CloseIcon /> : <OpenIcon />}
    </button>
  );
}
function CloseIcon() {
  return <XIcon aria-hidden="true" color="var(--primary)" strokeWidth={2.5} />;
}
function OpenIcon() {
  return <MenuIcon aria-hidden="true" color="var(--primary)" strokeWidth={3} />;
}

// --------------------------------
function useToogleNavbarLink() {
  const [isOpened, setIsOpened] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  useClickAnyWhere((e) => {
    const hasClickedOnNavbarIcon =
      iconRef.current?.contains(e.target as Node) ?? false;
    if (hasClickedOnNavbarIcon) setIsOpened((v) => !v);
    if (!hasClickedOnNavbarIcon) setIsOpened(false);
  });

  return {
    iconRef,
    isOpened,
  };
}

// --------------------------------
function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // 👆⚙️ Determine whether the header should be visible or not depending on scroll direction and threshold
  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    const isScrollingUp =
      typeof scrollY.getPrevious() === "number" &&
      currentScrollY < (scrollY.getPrevious() ?? 0);
    const isBelowThreshold = currentScrollY > scrollThreshold;
    setIsVisible(isScrollingUp && isBelowThreshold);
  });

  return (
    <motion.div
      animate={isVisible ? "visible" : "hidden"}
      className={cn(
        "fixed top-3 left-1/2 z-5000",
        "mx-auto mt-0",
        "-translate-x-1/2",
        "will-change-transform",
      )}
      initial="hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      variants={mobileHeaderVariants}
    >
      {children}
    </motion.div>
  );
}

// --------------------------------
// 💻
function DesktopHeader() {
  return (
    <div className={cn("fixed z-5000", "top-0 left-1/2 -translate-x-1/2")}>
      <SlideFadeAnimation>
        <CollapseWhileScrolling>
          <CustomGlass>
            {/* ♻️ */}
            <div className="flex w-50 justify-start">
              <DevOc />
            </div>
            {/* 🔗 */}
            {/*<LinksDesktop />*/}
            {/* 📨 */}
            <div className="flex w-50 justify-end">
              <ContactButton>Contact</ContactButton>
            </div>
          </CustomGlass>
        </CollapseWhileScrolling>
      </SlideFadeAnimation>
    </div>
  );
}

// --------------------------------
const baseDelay = 1;
const baseDuration = 0.5;

function SlideFadeAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="will-change-transform"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ delay: baseDelay, duration: baseDuration }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------
const collapsedOffset = 25;
const expandedOffset = 10;

const collapsedWidth = 1200;
const expandedWidth = 1600;

const maxCollapsedWidth = "80vw";
const maxExpandedWidth = "95vw";

function CollapseWhileScrolling({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();

  const { y, maxWidth, width } = useTransform(scrollY, [0, 150], {
    maxWidth: [maxExpandedWidth, maxCollapsedWidth],
    width: [expandedWidth, collapsedWidth],
    y: [expandedOffset, collapsedOffset],
  });

  return (
    <motion.div
      className="will-change-transform"
      style={{ maxWidth, width, y }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------
//🧊 Custom glass

const sidebarClasses = cn(
  "flex items-center justify-between",
  "mx-auto",
  "px-8 py-3",
  "text-secondary hover:text-secondary",
);
function CustomGlass({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const isScrolling = current > 0;
    setIsScrolling(isScrolling);
  });

  if (!isScrolling) {
    return <div className={sidebarClasses}>{children}</div>;
  }

  return (
    <Glass
      borderRadius={1000}
      className={cn(
        sidebarClasses,
        "border",
        "bg-white/60!  border-zinc-50", // ☀️ Light
        "[html[data-nav-theme='dark']_&]:bg-zinc-900/70! [html[data-nav-theme='dark']_&]:border-zinc-800", // 🌙 Dark
      )}
    >
      {children}
    </Glass>
  );
}

// ---------------------------------
// 🆕 Logo button
function LogoButton({
  children,
  logoSize = 22,
}: {
  children?: React.ReactNode;
  logoSize?: number;
}) {
  const backToTop = useCallback(
    () => window.scrollTo({ behavior: "smooth", top: 0 }),
    [],
  );
  const enterBackToTop = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        backToTop();
      }
    },
    [backToTop],
  );
  return (
    <button
      aria-label="Retour en haut de la page"
      className={cn(
        "group",
        "flex items-center gap-2",
        "cursor-pointer",
        "text-2xl",
        "outline-offset-4",
      )}
      onClick={backToTop}
      onKeyDown={(e) => enterBackToTop(e)}
      title="Retour en haut"
      type="button"
    >
      <motion.div
        transition={{
          damping: 10,
          duration: 1,
          mass: 1,
          stiffness: 100,
          type: "spring",
        }}
        whileHover={{ rotate: 360 }}
      >
        <Image
          alt=""
          aria-hidden="true"
          height={logoSize}
          priority
          src={Icon}
          width={logoSize}
        />
      </motion.div>
      {children}
    </button>
  );
}

function DevOc() {
  const Text = (
    <Link href="/">
      <span
        className={cn(
          "font-bold tracking-tighter",
          "transition-colors duration-300",
          "text-secondary", // ☀️ Light
          "[html[data-nav-theme='dark']_&]:text-white", // 🌙 Dark
        )}
      >
        Dev'
      </span>
      <span
        className={cn(
          "bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text",
          "font-black text-transparent tracking-tighter",
        )}
      >
        Oc
      </span>
    </Link>
  );

  return (
    <LogoButton>
      <div className="relative">
        {/* 🌫️ Blurry copy */}
        <div
          className={cn(
            "absolute opacity-70",
            "blur-sm",
            "[html[data-nav-theme='light']_&]:hidden", // ☀️ Light
          )}
        >
          {Text}
        </div>
        {/* 🔠 Real text */}
        <div>{Text}</div>
      </div>
    </LogoButton>
  );
}

// --------------------------------
// Links 🔗
const LINKS = [
  {
    href: "/#us",
    id: "us",
    label: "Le collectif",
  },
  {
    href: "/#method",
    id: "method",
    label: "Notre méthode",
  },
  {
    href: "/#services",
    id: "services",
    label: "Services",
  },
  {
    href: "/#realisations",
    id: "realisations",
    label: "Réalisations",
  },
];

// -----------------------------------------------------------
// Links 📱
function LinksMobile() {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2",
        "flex flex-col gap-y-2",
        "w-full",
        "border-t-2 border-t-primary",
        "rounded-br-lg rounded-bl-lg",
        "bg-white/70",
        "py-2 pt-4",
        "backdrop-blur-sm",
        "transition-colors duration-300",
        "[html[data-nav-theme='dark']_&]:text-secondary", // ☀️ Light
        "[html[data-nav-theme='dark']_&]:bg-zinc-900/20 [html[data-nav-theme='dark']_&]:text-white", // 🌙 Dark
      )}
    >
      {LINKS.map(({ href, label }) => (
        <Link
          className={cn(
            "px-4 py-2",
            "text-left",
            "font-kira font-semibold uppercase",
          )}
          href={href}
          key={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

// -----------------------------------------------------------
// Links 💻
// function LinksDesktop() {
//   return (
//     <ul
//       className={cn(
//         "flex items-center gap-x-12",
//         "font-semibold",
//         "text-secondary", // ☀️ Light
//         "[html[data-nav-theme='dark']_&]:text-white", // 🌙 Dark
//       )}
//     >
//       {LINKS.map(({ href, label, id }) => (
//         <li
//           className={cn(
//             "whitespace-nowrap",
//             "text-center hover:text-primary",
//             "transition-colors duration-300",
//           )}
//           key={id}
//         >
//           <Link href={href}>{label}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// ----------------------------------
// 📨 Contact button
function ContactButton({ children = null }: React.PropsWithChildren) {
  return (
    <Link href="#contact">
      <CustomButton
        aria-label="Nous contacter"
        style={
          {
            "--accent": "var(--primary-lighter)",
            "--accent-secondary": "var(--primary-strong)",
          } as React.CSSProperties
        }
        className={cn(
          "flex items-center gap-2",
          "cursor-pointer",
          "rounded-full!",
          "font-bold text-primary-foreground",
          "transition-colors",
          children && "pl-5! pr-6!",
        )}
      >
        <SendIcon aria-hidden="true" size={18} />
        {children && <span>{children}</span>}
      </CustomButton>
    </Link>
  );
}
