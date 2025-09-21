import { CodeXmlIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LINKS = [
  {
    href: "/",
    label: "Accueil",
  },

  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/showcase",
    label: "Réalisations",
  },
  {
    href: "/about",
    label: "L'équipe",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function Header() {
  return (
    <header className="max-w-[1600px] absolute rounded-full z-10 top-0 left-1/2 -translate-x-1/2 w-full px-6 h-16 bg-white/50 backdrop-blur-sm hidden lg:flex items-center justify-center">
      <nav className="flex items-center justify-between w-full">
        <div className="w-[200px] flex justify-start">
          <div className="text-2xl flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CodeXmlIcon className="text-purple-600" size={16} />
            </div>
            <div>
              <span className="text-purple-600 font-black">Sud</span>
              <span className="text-black font-regular">Web</span>
            </div>
          </div>
        </div>
        <ul className="flex text-gray-800 items-center gap-12 font-semibold">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="w-[200px] flex justify-end">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-400 font-bold text-white rounded-full">
            Devis gratuit
          </Button>
        </div>
      </nav>
    </header>
  );
}
