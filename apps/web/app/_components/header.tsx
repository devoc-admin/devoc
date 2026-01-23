"use client";

import { MenuIcon, SendIcon, XIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAnyWhere, useMediaQuery } from "usehooks-ts";
import { Glass } from "@/components/sera-ui/liquid-glass";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 970px)");
  const isDesktop = useMediaQuery("(min-width: 971px)");
  if (isMobile) return <MobileHeader />;
  if (isDesktop) return <DesktopHeader />;
}

// --------------------------------
function MobileHeader() {
  const { iconRef, isOpened } = useToogleNavbarLink();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    const scrollThreshold = 100;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isBelowThreshold = currentScrollY > scrollThreshold;

    setIsVisible(isScrollingUp && isBelowThreshold);
    setLastScrollY(currentScrollY);
  });

  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
      className="fixed top-3 left-1/2 z-5000 mx-auto mt-0 -translate-x-1/2"
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={cn(
          "flex w-[95vw] items-center justify-between",
          "px-4 py-2",
          "rounded-full backdrop-blur-sm transition-[background] duration-300",
          isOpened &&
            "rounded-tl-lg rounded-tr-lg rounded-br-none! rounded-bl-none!",
          "bg-white/50 text-secondary hover:text-secondary", // Light
          "[html[data-nav-theme='dark']_&]:bg-zinc-900/20" // Dark
        )}
      >
        <LogoButtonWithText />
        <div className="flex items-center">
          <button
            aria-expanded={isOpened}
            aria-label={
              isOpened
                ? "Fermer le menu de navigation"
                : "Ouvrir le menu de navigation"
            }
            className="px-4 py-1"
            ref={iconRef}
            type="button"
          >
            {isOpened ? (
              <XIcon
                aria-hidden="true"
                color="var(--primary)"
                strokeWidth={2.5}
              />
            ) : (
              <MenuIcon
                aria-hidden="true"
                color="var(--primary)"
                strokeWidth={3}
              />
            )}
          </button>
          <ContactButton />
        </div>
      </div>
      {isOpened && <LinksMobile />}
    </motion.div>
  );
}

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
function DesktopHeader() {
  return (
    <SlideFadeAnimation>
      <CollapseWhileScroll>
        <Glass
          borderRadius={1000}
          className={cn(
            "mx-auto flex items-center justify-between rounded-full px-8 py-3",
            "bg-white/80! text-secondary hover:text-secondary", // Light
            "[html[data-nav-theme='dark']_&]:bg-zinc-900/70!" // Dark
          )}
        >
          <div className="flex w-50 justify-start">
            <LogoButtonWithText />
          </div>
          <LinksDesktop />
          <div className="flex w-50 justify-end">
            <ContactButton>Contact</ContactButton>
          </div>
        </Glass>
      </CollapseWhileScroll>
    </SlideFadeAnimation>
  );
}

// --------------------------------
const baseDelay = 1;
const baseDuration = 0.5;

function SlideFadeAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ delay: baseDelay, duration: baseDuration }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------
function CollapseWhileScroll({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsScrolled(value > 50);
  });

  return (
    <motion.div
      animate={isScrolled ? "scrolled" : "unscrolled"}
      className={cn(
        "fixed left-1/2 z-5000 mx-auto mt-0 -translate-x-1/2 rounded-full transition-[background] duration-300"
      )}
      initial={false}
      variants={{
        scrolled: { maxWidth: "1200px", top: "25px", width: "80vw" },
        unscrolled: { maxWidth: "1600px", top: "10px", width: "100vw" },
      }}
    >
      {children}
    </motion.div>
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
  return (
    <button
      aria-label="Retour en haut de la page"
      className="flex cursor-pointer items-center gap-2 text-2xl"
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.scrollTo({ behavior: "smooth", top: 0 });
        }
      }}
      title="Retour en haut"
      type="button"
    >
      <Image
        alt=""
        aria-hidden="true"
        height={logoSize}
        src={Icon}
        width={logoSize}
      />
      {children}
    </button>
  );
}

function LogoButtonWithText() {
  const DevOc = (
    <>
      <span
        className={cn(
          "font-bold tracking-tighter transition-colors duration-300",
          "text-secondary", // Light
          "[html[data-nav-theme='dark']_&]:text-white" // Dark
        )}
      >
        Dev'
      </span>
      <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-black text-transparent tracking-tighter">
        Oc
      </span>
    </>
  );

  return (
    <LogoButton>
      <div className="relative">
        {/* Blurry copy */}
        <div className="absolute opacity-70 blur-sm [html[data-nav-theme='light']_&]:hidden">
          {DevOc}
        </div>
        {/* Real text */}
        <div>{DevOc}</div>
      </div>
    </LogoButton>
  );
}

// --------------------------------
// Links 🔗
const LINKS = [
  {
    href: "#services",
    id: "services",
    label: "Services",
  },
  {
    href: "#realisations",
    id: "realisations",
    label: "Réalisations",
  },
  {
    href: "#processus",
    id: "processus",
    label: "Notre méthode",
  },
  {
    href: "#us",
    id: "us",
    label: "Le collectif",
  },
  {
    href: "#contact",
    id: "contact",
    label: "Contact",
  },
];

// -----------------------------------------------------------
// Links 📱

function LinksMobile() {
  return (
    <div
      className={cn(
        "border-t-2 border-t-primary",
        "flex w-full flex-col gap-y-2",
        "absolute top-full left-1/2 -translate-x-1/2 rounded-br-lg rounded-bl-lg bg-white/70 py-2 pt-4 backdrop-blur-sm transition-colors duration-300",
        "[html[data-nav-theme='dark']_&]:text-secondary", // Light
        "[html[data-nav-theme='dark']_&]:bg-zinc-900/20 [html[data-nav-theme='dark']_&]:text-white" // Dark
      )}
    >
      {LINKS.map(({ href, label }) => (
        <Link
          className={cn(
            "px-4 py-2 text-left font-kira font-semibold uppercase"
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

function generateLinkClassName(id: string) {
  return `[html[data-section-name='${id}']_&]:border-b-primary [html[data-section-name='${id}']_&]:text-primary`;
}

function LinksDesktop() {
  return (
    <ul
      className={cn(
        "flex items-center gap-12 font-semibold",
        "text-secondary", // Light
        "[html[data-nav-theme='dark']_&]:text-white" // Dark
      )}
    >
      {LINKS.map(({ href, label, id }) => (
        <li
          className={cn(
            "whitespace-nowrap border-2 border-transparent text-center transition-colors duration-300",
            "hover:text-primary",
            generateLinkClassName(id)
          )}
          key={href}
        >
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

// ----------------------------------
function ContactButton({ children = null }: React.PropsWithChildren) {
  return (
    <Link href="#contact">
      <Button
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full font-bold text-primary-foreground transition-colors",
          children && "px-5!",
          "bg-linear-to-r from-primary to-primary-lighter",
          "hover:bg-linear-to-r hover:from-primary/90 hover:to-primary-lighter/90"
        )}
      >
        <SendIcon size={20} />
        {children && <span>{children}</span>}
      </Button>
    </Link>
  );
}
