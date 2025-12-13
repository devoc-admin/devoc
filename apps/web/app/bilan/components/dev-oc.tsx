import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";

export function DevOc() {
  return (
    <div className="-mt-3 flex items-center text-[4rem]">
      <div className={cn("font-style-script", "pt-3")}>Dev'</div>
      <AuroraText
        className="font-extrabold font-geist text-transparent tracking-tighter"
        colors={["#FFC731", "#FF5709", "#FFC731", "#FF5709"]}
      >
        Oc
      </AuroraText>
    </div>
  );
}
