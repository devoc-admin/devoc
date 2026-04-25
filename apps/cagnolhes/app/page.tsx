import Image from "next/image";
import { cn } from "@/lib/utils";
import Bal from "./_assets/bal.jpg";
import Cagnolhes from "./_assets/cagnolhes.jpg";
import Vineyard from "./_assets/vineyard.jpg";
export default function Home() {
  return (
    <div className="min-h-svh">
      <div className="relative">
        <div
          className={cn(
            "relative flex flex-col",
            "overflow-x-hidden",
            "h-[800px]"
          )}
        >
          <VineyardImage />
          <CentralImage />
          <BalImage />

          <Navbar />
        </div>
        <Badge />
      </div>
    </div>
  );
}

// 🧭
function Navbar() {
  return (
    <div className="relative mt-auto flex h-18 w-full bg-gradient-to-r from-[#52c234] to-[#061700] py-1.5 text-lg opacity-90">
      <div className="flex grow items-center justify-between border-amber-300 border-y px-12 font-bold text-white">
        <div className="flex gap-x-8 uppercase">
          <span className="cursor-pointer">Actualités</span>
          <span className="cursor-pointer">Démarches</span>
        </div>
        <div className="flex gap-x-8 uppercase">
          <span className="cursor-pointer">Actualités</span>
          <span className="cursor-pointer">Démarches</span>
        </div>
      </div>
    </div>
  );
}

//🟡
function Badge() {
  return (
    <div className="absolute bottom-0 left-1/2 z-10 grid size-120 -translate-x-1/2 -translate-y-1/4 place-items-center rounded-full bg-white font-birthstone-bounce text-2xl shadow-2xl">
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
        "absolute h-full w-1/2 object-cover",
        "-translate-x-[10px]"
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
      className="absolute z-10 size-full"
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
        "absolute right-0 h-full w-1/2 object-cover",
        "translate-x-[10px]"
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
