import { SendIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icon from "@/public/images/icon-96.png";

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
          {Logo}
        </div>

        {/* 2️⃣ Center part */}
        {/* 🔗 Internal links */}
        <ul className="flex items-center gap-12 font-semibold text-secondary">
          {LINKS.map(({ href, label }) => (
            <li className="hover:text-primary" key={href}>
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
                "!px-5 flex cursor-pointer items-center gap-2 rounded-full font-bold text-primary-foreground",
                "bg-gradient-to-r from-primary to-primary/60",
                "hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary/50"
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
var Logo = (
  <div className="flex items-center gap-1 text-2xl">
    <Image alt="Dev'Oc" height={32} src={Icon} width={32} />
    <div>
      <span className="bg-gradient-to-b from-primary/20 to-primary bg-clip-text font-black text-transparent tracking-tighter">
        Dev'
      </span>
      <span className="font-bold font-regular text-secondary tracking-tighter">
        Oc
      </span>
    </div>
  </div>
);
