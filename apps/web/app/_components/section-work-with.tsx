"use client";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import AirbusLogo from "@/assets/companies/airbus.svg";
import BimpliLogo from "@/assets/companies/bimpli.svg";
import InseeLogo from "@/assets/companies/insee.svg";
import LoftOrbitalLogo from "@/assets/companies/loft-orbital.svg";
import OneparkLogo from "@/assets/companies/onepark.svg";
import NoiseTexture from "@/assets/noise-texture.png";
import { cn } from "@/lib/utils";

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
        Nous avons travaillé avec eux
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

// ------------------------------------------
type WorkWithProps = {
  link: string;
  logo: React.ReactNode;
};

const DEGREES = 180;
const DEGREES_TO_RADIANS = DEGREES / Math.PI;

type WorkWithCompanyProps = WorkWithProps & {
  name: string;
};

function WorkWithCompany({ link, logo, name }: WorkWithCompanyProps) {
  const [size, setSize] = useState({ diagonal: 0, rotationInDegrees: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        const computedStyle = window.getComputedStyle(target);

        // get paddings
        const paddingLeft = Number.parseFloat(computedStyle.paddingLeft);
        const paddingRight = Number.parseFloat(computedStyle.paddingRight);
        const paddingTop = Number.parseFloat(computedStyle.paddingTop);
        const paddingBottom = Number.parseFloat(computedStyle.paddingBottom);

        const borderWidth = 2;

        // contentRect excludes padding, so add them
        const widthWithPadding =
          entry.contentRect.width + paddingLeft + paddingRight + borderWidth;
        const heightWithPadding =
          entry.contentRect.height + paddingTop + paddingBottom + borderWidth;

        const diagonal = Math.hypot(widthWithPadding, heightWithPadding);
        const rotationInRadians = Math.asin(heightWithPadding / diagonal);

        setSize({
          diagonal,
          rotationInDegrees: rotationInRadians * DEGREES_TO_RADIANS,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
        resizeObserver.disconnect();
      }
    };
  }, []);
  return (
    <a
      aria-label={`Visiter le site de ${name} (ouvre dans une nouvelle fenêtre)`}
      className="group relative flex h-24 items-center justify-center overflow-hidden border-border border-t border-r px-12 py-2"
      href={link}
      ref={ref}
      rel="noopener noreferrer"
      target="_blank"
      title={`Visiter ${name}`}
    >
      <div
        className={cn(
          "absolute top-0 left-0 h-full origin-bottom-left not-group-hover:-rotate-90! overflow-hidden bg-linear-to-b from-[#FF5709] to-[#FFC731] transition-transform duration-300 ease-linear"
        )}
        style={{
          rotate: `-${size.rotationInDegrees - 1}deg`,
          width: size.diagonal,
        }}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="w-full"
          height={100}
          src={NoiseTexture}
          width={100}
        />
      </div>
      <div
        className={cn(
          "absolute top-0 right-0 h-full origin-top-right not-group-hover:-rotate-90! overflow-hidden bg-linear-to-t from-[#FF5709] to-[#FFC731] transition-transform duration-300 ease-linear"
        )}
        style={{
          rotate: `-${size.rotationInDegrees - 1}deg`,
          width: size.diagonal,
        }}
      >
        <Image
          alt=""
          aria-hidden="true"
          className="w-full"
          height={100}
          src={NoiseTexture}
          width={100}
        />
      </div>
      {logo}
    </a>
  );
}
