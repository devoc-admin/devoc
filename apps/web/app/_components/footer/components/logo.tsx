import Image from "next/image";
import Icon from "@/public/icon.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl">
      <Image alt="" aria-hidden="true" height={22} src={Icon} width={22} />
      <div>
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
