import AirbusLogo from "@/assets/companies/airbus.svg";
import BimpliLogo from "@/assets/companies/bimpli.svg";
import EsaLogo from "@/assets/companies/esa.svg";
import InseeLogo from "@/assets/companies/insee.svg";
import LoftOrbitalLogo from "@/assets/companies/loft-orbital.svg";
import OneparkLogo from "@/assets/companies/onepark.svg";
import { CompanyLogo } from "./_components/company-logo";

export const companies = [
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
    link: "https://www.esa.int/",
    logo: <CompanyLogo logo={EsaLogo} name="Loft Orbital" />,
    name: "ESA",
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
];
