import Image from "next/image";
import DevOc from "@/public/logo.webp";

export function Logo() {
  return <Image alt="logo" height={130} src={DevOc.src} width={130} />;
}
