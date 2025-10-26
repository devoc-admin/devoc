import Image, { type StaticImageData } from "next/image";
import AirbusLogo from "@/assets/companies/airbus.svg";
import BimpliLogo from "@/assets/companies/bimpli.svg";
import InseeLogo from "@/assets/companies/insee.svg";
import LoftOrbitalLogo from "@/assets/companies/loft-orbital.svg";
import OneparkLogo from "@/assets/companies/onepark.svg";
import { cn } from "@/lib/utils";
import WorkWithCompany from "./work-with-company";

const companies = [
  {
    link: "https://airbus.com",
    logo: <CompanyLogo logo={AirbusLogo} name="Airbus" />,
    name: "Airbus",
  },
  {
    link: "https://insee.fr",
    logo: (
      <CompanyLogo className="translate-y-2" logo={InseeLogo} name="Insee" />
    ),
    name: "Insee",
  },
  {
    link: "https://bimpli.com",
    logo: <CompanyLogo logo={BimpliLogo} name="Bimpli" />,
    name: "Bimpli",
  },
  {
    link: "https://onepark.com",
    logo: <CompanyLogo logo={OneparkLogo} name="Onepark" />,
    name: "Onepark",
  },
  {
    link: "https://loftorbital.com",
    logo: <CompanyLogo logo={LoftOrbitalLogo} name="Loft Orbital" />,
    name: "Loft Orbital",
  },
  {
    link: "https://frustrationmagazine.fr",
    logo: (
      <div className="z-10 flex flex-col text-center font-lobster transition-colors duration-500 group-hover:text-white">
        <span className="text-3xl">Frustration</span>
        <span className="-mt-2 text-xl">Magazine</span>
      </div>
    ),
    name: "Frustration",
  },
];

function WorkWith() {
  return (
    <div className="mb-22 w-full text-center text-2xl">
      <div className="mb-6 px-6 font-kanit font-regular text-3xl">
        Nos experts ont travaillé avec eux
      </div>
      <div className="flex w-full">
        <div className="grow border-border border-y" />
        <div
          className={cn(
            "grid max-w-[800px] grid-cols-3 grid-rows-2 border-b border-l",
            "grid-cols-1 grid-rows-auto",
            "xs:grid-cols-2 xs:grid-rows-auto",
            "sm:grid-cols-3 sm:grid-rows-2"
          )}
        >
          {companies.map(({ name, logo, link }) => (
            <WorkWithCompany key={name} link={link} logo={logo} />
          ))}
        </div>
        <div className="grow border-border border-y" />
      </div>
    </div>
  );
}

export default WorkWith;

// ------------------------------------------
function CompanyLogo({
  logo,
  name,
  className,
}: {
  logo: StaticImageData;
  name: string;
  className?: string;
}) {
  return (
    <Image
      alt={`Logo ${name}`}
      className={cn(
        "h-12 max-h-full w-auto transition-all duration-500",
        "brightness-100 grayscale-100 invert-0",
        "group-hover:brightness-0 group-hover:grayscale-0 group-hover:invert-100",
        className
      )}
      height={20}
      src={logo}
      width={20}
    />
  );
}
