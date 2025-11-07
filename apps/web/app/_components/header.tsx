"use client";

import { SendIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsScrolled(value > 50);
  });

  return (
    <motion.div
      animate={isScrolled ? "scrolled" : "unscrolled"}
      className={cn(
        "hidden",
        "xl:flex",
        "-translate-x-1/2 fixed left-1/2 z-5000 mx-auto mt-0 items-center justify-between rounded-full px-8 py-4 backdrop-blur-sm transition-[background] duration-300",
        "bg-white/10 text-secondary hover:text-secondary", // light
        "[html[data-nav-theme='dark']_&]:bg-zinc-900/20" // Dark
      )}
      initial={false}
      variants={{
        scrolled: { maxWidth: "1200px", top: "25px", width: "80vw" },
        unscrolled: { maxWidth: "1600px", top: "10px", width: "100vw" },
      }}
    >
      <div className="flex w-[200px] justify-start">
        <Logo />
      </div>
      <Links />
      <div className="flex w-[200px] justify-end">
        <ContactButton />
      </div>
    </motion.div>
  );
}

// ---------------------------------
function Logo() {
  return (
    <button
      className="flex cursor-pointer items-center gap-2 text-2xl"
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      onKeyDown={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      type="button"
    >
      <Image alt="Dev'Oc" height={22} src={Icon} width={22} />
      <div>
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
      </div>
    </button>
  );
}

// --------------------------------
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
  // {
  //   href: "/about",
  //   label: "L'équipe",
  // },
  {
    href: "#contact",
    id: "contact",
    label: "Contact",
  },
];

function Links() {
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
            id === "services" &&
              `[html[data-section-name='services']_&]:border-b-primary [html[data-section-name='services']_&]:text-primary`,
            id === "realisations" &&
              `[html[data-section-name='realisations']_&]:border-b-primary [html[data-section-name='realisations']_&]:text-primary`,
            id === "processus" &&
              `[html[data-section-name='processus']_&]:border-b-primary [html[data-section-name='processus']_&]:text-primary`,
            id === "contact" &&
              `[html[data-section-name='contact']_&]:border-b-primary [html[data-section-name='contact']_&]:text-primary`
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
function ContactButton() {
  return (
    <Link href="#contact">
      <Button
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full px-5! font-bold text-primary-foreground transition-colors",
          "bg-linear-to-r from-primary to-primary-lighter",
          "hover:bg-linear-to-r hover:from-primary/90 hover:to-primary-lighter/90"
        )}
      >
        <SendIcon size={20} />
        <span>Devis gratuit</span>
      </Button>
    </Link>
  );
}
