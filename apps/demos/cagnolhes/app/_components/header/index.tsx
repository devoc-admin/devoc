import Image from "next/image";
import Link from "next/link";
import Bal from "@/app/_assets/bal.jpg";
import Vineyard from "@/app/_assets/vineyard.jpg";
import { cn } from "@/lib/utils";

const navlinks: ILink[] = [
  { href: "/actualites", id: "actualistes", text: "Actualités" },
  { href: "/demarches", id: "demarches", text: "Démarches" },
  { href: "/associations", id: "associations", text: "Associations" },
  { href: "/patrimoine", id: "patrimoine", text: "Patrimoine" },
];

export function Header() {
  return (
    <OuterContainer>
      {/* 🖼️ */}
      <div className="h-150">
        <VineyardImage />
        {/*<CentralImage />*/}
        <BalImage />
        <Badge />
      </div>

      {/* 🧭 */}
      <Navbar />
    </OuterContainer>
  );
}

// 📦 ============================================
function OuterContainer({ children }: { children: React.ReactNode }) {
  return <div className={cn("relative")}>{children}</div>;
}

// 🟡 ============================================
function Badge() {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/4",
        "grid place-items-center",
        "aspect-square rounded-full",
        "bg-linear-to-tl from-white/90 to-white"
      )}
    >
      <div className="absolute inset-0 size-full rounded-full border bg-white blur-sm" />
      <div className="relative px-18">
        <CagnolhesTitle />
        <LiberteEtAudace />
      </div>
    </div>
  );
}

function CagnolhesTitle() {
  return <h1 className="font-display text-8xl">Cagnolhes</h1>;
}

function LiberteEtAudace() {
  return <h2 className="text-right text-2xl italic">Liberté et audace</h2>;
}

// 🖼️ ============================================
function VineyardImage() {
  return (
    <Image
      alt=""
      className={cn("absolute", "h-full w-1/2", "object-cover")}
      height={600}
      src={Vineyard}
      // style={{
      //   clipPath: "polygon(100% 100%, 0 0, 0 100%)",
      // }}
      width={1000}
    />
  );
}

// function CentralImage() {
//   return (
//     <div
//       className={cn("absolute z-10 size-full")}
//       style={{
//         clipPath: "polygon(100% 0, 0 0, 50% 100%)",
//       }}
//     >
//       <Image
//         alt=""
//         className="h-full w-full object-cover"
//         height={600}
//         src={Cagnolhes}
//         width={1000}
//       />
//     </div>
//   );
// }

function BalImage() {
  return (
    <Image
      alt=""
      className={cn("absolute right-0", "h-full w-1/2", "object-cover")}
      height={600}
      src={Bal}
      // style={{
      //   clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
      // }}
      width={1000}
    />
  );
}

// 🧭 ============================================
const leftLinks = navlinks.slice(0, 2);
const rightLinks = navlinks.slice(2, 4);

function Navbar() {
  return (
    <OuterNavbar>
      <div
        className={cn(
          "flex flex-col gap-y-2",
          "bg-linear-to-r from-[#52c234] to-[#061700]",
          "text-lg",
          "opacity-90"
        )}
      >
        <SeparatorsTop />
        <div className="flex grow items-center justify-center gap-x-72 px-12 font-bold text-white">
          <Links links={leftLinks} />
          <Links links={rightLinks} />
        </div>
        <SeparatorsBottom />
      </div>
    </OuterNavbar>
  );
}

function SeparatorsTop() {
  return (
    <>
      <Separator size="md" />
      <Separator size="sm" />
    </>
  );
}
function SeparatorsBottom() {
  return (
    <>
      <Separator size="sm" />
      <Separator size="md" />
    </>
  );
}

function OuterNavbar({ children }: { children: React.ReactNode }) {
  return <div className={cn("bg-red-900 opacity-90")}>{children}</div>;
}

// ― ============================================
function Separator({ size = "sm" }: { size: "sm" | "md" }) {
  return (
    <div
      className={cn(
        size === "sm" && "h-[0.5px]",
        size === "md" && "h-0.75",
        "w-full bg-amber-300"
      )}
    />
  );
}

function Links({ links }: { links: ILink[] }) {
  return (
    <div className="flex gap-x-36 uppercase">
      {links.map(({ text, href, id }) => (
        <Link
          className="py-2 text-lg hover:underline hover:underline-offset-8"
          href={href}
          key={id}
          style={{
            textShadow: "0 0 20px rgba(0, 0, 0, 0.75)",
          }}
        >
          {text}
        </Link>
      ))}
    </div>
  );
}

interface ILink {
  href: string;
  id: string;
  text: string;
}
