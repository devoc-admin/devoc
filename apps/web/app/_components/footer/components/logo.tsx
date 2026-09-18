import Image from "next/image";
import Icon from "@/public/icon.svg";

export function Logo() {
  return (
    <a
      className="group flex items-center gap-2.5"
      href="#main-content"
      rel="noopener noreferrer"
    >
      <Image
        alt=""
        aria-hidden="true"
        className="-mt-0.5 transition-transform duration-1000 ease-in-out group-hover:rotate-360"
        height={28}
        src={Icon}
        width={28}
      />
      <div className="text-[1.7rem]">
        <span className="font-black text-primary-foreground tracking-tighter">
          Dev'
        </span>
        <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-bold font-regular text-transparent tracking-tighter">
          Oc
        </span>
      </div>
    </a>
  );
}
