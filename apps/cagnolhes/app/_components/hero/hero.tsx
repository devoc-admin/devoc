import Image from "next/image";
import Link from "next/link";
import Bal from "@/app/_assets/bal.jpg";
import Cagnolhes from "@/app/_assets/cagnolhes.jpg";
import Vineyard from "@/app/_assets/vineyard.jpg";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="min-h-svh">
      <div className="relative">
        <div
          className={cn(
            "relative",
            "flex flex-col",
            "overflow-x-hidden",
            "h-200"
          )}
        >
          {/* 🖼️ */}
          <VineyardImage />
          <CentralImage />
          <BalImage />

          {/* 🧭 */}
          <Navbar />
        </div>
        <Badge />
      </div>
    </div>
  );
}

// 🟡
function Badge() {
  return (
    <div
      className={cn(
        "absolute",
        "bottom-0 left-1/2",
        "z-10",
        "grid place-items-center",
        "size-120",
        "-translate-x-1/2 -translate-y-1/4",
        "rounded-full",
        "bg-white",
        "font-birthstone-bounce text-2xl",
        "shadow-2xl"
      )}
    >
      <h1 className="text-8xl">Cagnolhes</h1>
    </div>
  );
}

// 🖼️
function VineyardImage() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute",
        "h-full w-1/2",
        "object-cover",
        "-translate-x-2.5"
      )}
      height={600}
      src={Vineyard}
      style={{
        clipPath: "polygon(100% 100%, 0 0, 0 100%)",
      }}
      width={1000}
    />
  );
}

function CentralImage() {
  return (
    <div
      className={cn("absolute", "z-10", "size-full")}
      style={{
        clipPath: "polygon(100% 0, 0 0, 50% 100%)",
      }}
    >
      <Image
        alt=""
        className="h-full w-full object-cover"
        height={600}
        src={Cagnolhes}
        width={1000}
      />
    </div>
  );
}

function BalImage() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute right-0",
        "h-full w-1/2",
        "object-cover",
        "translate-x-2.5"
      )}
      height={600}
      src={Bal}
      style={{
        clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
      }}
      width={1000}
    />
  );
}

// 🧭
const navlinks: Navlink[] = [
  { href: "/actualites", text: "Actualités" },
  { href: "/demarches", text: "Démarches" },
  { href: "/associations", text: "Associations" },
  { href: "/patrimoine", text: "Patrimoine" },
];

function Navbar() {
  return (
    <div
      className={cn(
        "relative",
        "mt-auto",
        "flex",
        "h-18 w-full",
        "bg-gradient-to-r from-[#52c234] to-[#061700]",
        "py-1.5",
        "text-lg",
        "opacity-90"
      )}
    >
      <div className="flex grow items-center justify-between border-amber-300 border-y px-12 font-bold text-white">
        <NavLinksSection navlinks={navlinks.slice(0, 2)} />
        <NavLinksSection navlinks={navlinks.slice(2, 4)} />
      </div>
    </div>
  );
}

interface Navlink {
  href: string;
  text: string;
}

function NavLinksSection({ navlinks }: { navlinks: Navlink[] }) {
  return (
    <div className="flex uppercase">
      {navlinks.map(({ text, href }) => (
        <Link className="px-8 py-6" href={href}>
          {text}
        </Link>
      ))}
    </div>
  );
}
