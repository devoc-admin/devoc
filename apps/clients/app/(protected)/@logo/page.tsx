import Image from "next/image";
import DevOcLogo from "@/public/logo.webp";

export default function HomeLogo() {
  return <Image alt="DevOc Logo" height={130} src={DevOcLogo} width={130} />;
}
