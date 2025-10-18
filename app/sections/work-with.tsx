import Image, { type StaticImageData } from "next/image";
import AirbusLogo from "@/assets/companies/airbus.svg";
import BimpliLogo from "@/assets/companies/bimpli.svg";
import InseeLogo from "@/assets/companies/insee.svg";
import LoftOrbitalLogo from "@/assets/companies/loft-orbital.svg";
import OneparkLogo from "@/assets/companies/onepark.svg";
import { cn } from "@/lib/utils";

const companies = [
  {
    name: "Airbus",
    logo: <CompanyLogo logo={AirbusLogo} name="Airbus" />,
    link: "https://airbus.com",
  },
  {
    name: "Insee",
    logo: (
      <CompanyLogo className="translate-y-2" logo={InseeLogo} name="Insee" />
    ),
    link: "https://insee.fr",
  },
  {
    name: "Bimpli",
    logo: <CompanyLogo logo={BimpliLogo} name="Bimpli" />,
    link: "https://bimpli.com",
  },
  {
    name: "Onepark",
    logo: <CompanyLogo logo={OneparkLogo} name="Onepark" />,
    link: "https://onepark.com",
  },
  {
    name: "Loft Orbital",
    logo: <CompanyLogo logo={LoftOrbitalLogo} name="Loft Orbital" />,
    link: "https://loftorbital.com",
  },
  {
    name: "Frustration",
    logo: (
      <div className="flex flex-col text-center font-lobster">
        <span className="text-3xl">Frustration</span>
        <span className="-mt-2 text-xl">Magazine</span>
      </div>
    ),
    link: "https://frustrationmagazine.fr",
  },
];

function WorkWith() {
  return (
    <div className="mb-22 w-full text-center text-2xl">
      <div className="mb-6 px-6 font-kanit font-regular text-3xl">
        Nos experts ont aussi travaillé avec
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
            <a
              className="flex h-24 items-center justify-center border-border border-t border-r px-12 py-2"
              href={link}
              key={name}
              rel="noopener noreferrer"
              target="_blank"
            >
              {logo}
            </a>
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
      className={cn("h-12 max-h-full w-auto grayscale-100", className)}
      height={20}
      src={logo}
      width={20}
    />
  );
}
