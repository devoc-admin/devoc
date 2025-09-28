import { CodeXmlIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        {/* 3️⃣ Right part */}
        {/* 🆕 Devis gratuit */}
        <div className="flex w-[200px] justify-end">
          <Button className="rounded-full bg-gradient-to-r from-primary to-primary/60 font-bold text-primary-foreground">
            Devis gratuit
          </Button>
        </div>
      </nav>
    </header>
  );
}

// ---------------------------------
var Logo = (
  <div className="flex items-center gap-2 text-2xl">
    <div className="rounded-lg bg-primary/10 p-2">
      <CodeXmlIcon className="text-primary" size={16} />
    </div>
    <div>
      <span className="font-black text-primary tracking-tighter">Sud</span>
      <span className="font-regular font-semibold text-secondary tracking-tighter">
        Web
      </span>
    </div>
  </div>
);
