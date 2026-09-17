import Image from "next/image";
import Icon from "@/public/icon.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image alt="" aria-hidden="true" height={28} src={Icon} width={28} />
      <div className="text-[1.7rem]">
        <span className="font-black text-primary-foreground tracking-tighter">
          Dev'
        </span>
        <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-bold font-regular text-transparent tracking-tighter">
          Oc
        </span>
      </div>
    </div>
  );
}
