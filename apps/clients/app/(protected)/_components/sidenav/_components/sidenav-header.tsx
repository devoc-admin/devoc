import Image from "next/image";
import LogoBlack from "../_assets/logo_black.svg";
export function SidenavHeader() {
  return (
    <a
      className="mb-5 flex items-center gap-x-1.5"
      href="https://dev-oc.fr"
      rel="noopener"
      target="_blank"
    >
      <Image alt="Dev'Oc" className="w-5" src={LogoBlack} />
      <span className="text-xl font-bold tracking-tight">Dev'Oc</span>
    </a>
  );
}
