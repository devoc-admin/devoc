import { SendIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

const LINKS = [
  {
    href: "/",
    label: "Accueil",
  },

  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#realisations",
    label: "Réalisations",
  },
  {
    href: "#processus",
    label: "Notre méthode",
  },
  // {
  //   href: "/about",
  //   label: "L'équipe",
  // },
  {
    href: "#contact",
    label: "Contact",
  },
];

export default function Header() {
  return (
    <header className="-translate-x-1/2 absolute top-3 left-1/2 z-10 hidden h-16 w-full max-w-[1600px] items-center justify-center rounded-full bg-white/20 px-6 backdrop-blur-sm lg:flex">
      <nav className="flex w-full items-center justify-between">
        {/* 1️⃣ Left part */}
        <div className="flex w-[200px] justify-start">
          {/* 🐲 Logo */}
          <Logo />
        </div>

        {/* 2️⃣ Center part */}
        {/* 🔗 Internal links */}
        <ul className="flex items-center gap-12 font-semibold text-secondary">
          {LINKS.map(({ href, label }) => (
            <li className="transition-colors hover:text-primary" key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* 3️⃣ Right part */}
        {/* 🆕 Devis gratuit */}
        <div className="flex w-[200px] justify-end">
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
        </div>
      </nav>
    </header>
  );
}

// ---------------------------------
function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl">
      <Image alt="Dev'Oc" height={22} src={Icon} width={22} />
      <div>
        <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-black text-transparent tracking-tighter">
          Dev'
        </span>
        <span className="font-bold font-regular text-secondary tracking-tighter">
          Oc
        </span>
      </div>
    </div>
  );
}
