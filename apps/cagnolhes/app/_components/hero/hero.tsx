import Image from "next/image";
import Link from "next/link";
import Bal from "@/app/_assets/bal.jpg";
import Cagnolhes from "@/app/_assets/cagnolhes.jpg";
import Vineyard from "@/app/_assets/vineyard.jpg";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div>
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
        "shadow-2xl"
      )}
    >
      <div className="text-center">
        <h1 className="font-birthstone-bounce text-8xl">Cagnolhes</h1>
        <div className="inline-block translate-x-15 bg-white font-montserrat text-2xl">
          Liberté et audace
        </div>
      </div>
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
  { href: "/actualites", id: "actualistes", text: "Actualités" },
  { href: "/demarches", id: "demarches", text: "Démarches" },
  { href: "/associations", id: "associations", text: "Associations" },
  { href: "/patrimoine", id: "patrimoine", text: "Patrimoine" },
];

function Navbar() {
  return (
    <div
      className={cn(
        "relative",
        "mt-auto",
        "flex flex-col gap-y-2",
        "h-22 w-full",
        "bg-gradient-to-r from-[#52c234] to-[#061700]",
        "py-1.5",
        "text-lg",
        "opacity-90"
      )}
    >
      <Separator size="md" />
      <Separator size="sm" />
      <div className="flex grow items-center justify-between px-12 font-bold text-white">
        <NavLinksSection navlinks={navlinks.slice(0, 2)} />
        <NavLinksSection navlinks={navlinks.slice(2, 4)} />
      </div>
      <Separator size="sm" />
      <Separator size="md" />
    </div>
  );
}

function Separator({ size = "sm" }: { size: "sm" | "md" }) {
  return (
    <div
      className={cn(
        size === "sm" && "h-[0.5px]",
        size === "md" && "h-[3px]",
        "w-full bg-amber-300"
      )}
    />
  );
}

interface Navlink {
  href: string;
  id: string;
  text: string;
}

function NavLinksSection({ navlinks }: { navlinks: Navlink[] }) {
  return (
    <div className="flex uppercase">
      {navlinks.map(({ text, href, id }) => (
        <Link className="px-8 py-1" href={href} key={id}>
          {text}
        </Link>
      ))}
    </div>
  );
}
