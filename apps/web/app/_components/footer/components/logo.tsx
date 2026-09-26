import Image from "next/image";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";
export function Logo() {
  return (
    <a
      className={cn(
        "group flex select-none items-center gap-3",
        // ↔️
        "text-[2rem]"
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
    <div className="-mt-0.5 grid transition-transform duration-1000 ease-in-out group-hover:rotate-360">
      <Image
        alt=""
        aria-hidden="true"
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          "opacity-40 blur-sm"
        )}
        height={32}
        src={Icon}
        width={32}
      />
      <Image
        alt=""
        aria-hidden="true"
        className={cn("col-start-1 col-end-1 row-start-1 row-end-1")}
        height={32}
        src={Icon}
        width={32}
      />
    </div>
  );
}

function Dev() {
  return (
    <span
      className="font-black text-primary-foreground tracking-tighter"
      style={{
        textShadow: `0px 0px 12px color-mix(
        in srgb,
        var(--primary-foreground) 35%,
        transparent
        )`,
      }}
    >
      Dev'
    </span>
  );
}

function Oc() {
  return (
    <span
      className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-black font-regular text-transparent tracking-tighter"
      style={{
        textShadow: `0px 0px 12px color-mix(
      in srgb,
      #FFC731 30%,
      transparent
      )`,
      }}
    >
      Oc
    </span>
  );
}
