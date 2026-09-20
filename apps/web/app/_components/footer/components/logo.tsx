import Image from "next/image";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";
export function Logo() {
  return (
    <a
      className={cn(
        "group flex items-center gap-2.5",
        // ↔️
        "text-[1.7rem]"
      )}
      href="#main-content"
      rel="noopener noreferrer"
    >
      <Flower />
      <div className="flex items-baseline gap-x-0.5">
        <Dev />
        <Oc />
      </div>
    </a>
  );
}

// 🌼
function Flower() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className="-mt-0.5 transition-transform duration-1000 ease-in-out group-hover:rotate-360"
      height={28}
      src={Icon}
      width={28}
    />
  );
}

function Dev() {
  return (
    <span className="font-black text-primary-foreground tracking-tighter">
      Dev'
    </span>
  );
}

function Oc() {
  return (
    <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-black font-regular text-transparent tracking-tighter">
      Oc
    </span>
  );
}
