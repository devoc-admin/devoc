import {
  SmartphoneIcon as AppelerMaintenantIcon,
  CalendarCheckIcon as ReserverRendezVousIcon,
} from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button/custom-button";
import { CAL_COMMUNES_LINK, TEL_THIBAUT } from "@/constants";
import { cn } from "@/lib/utils";

const sharedClasses = cn(
  "group",
  "shadow-sm",
  "relative",
  "self-start",
  "rounded-full!",
  "justify-between!",
  "font-semibold!"
);

const responsiveClasses = cn(
  // ↔️
  "w-fit gap-x-4! px-1! py-1! text-base",
  "xs:gap-x-4! xs:px-1! xs:py-1! xs:text-base",
  "sm:gap-x-4! sm:px-1! sm:py-1! sm:text-base",
  "md:gap-x-4! md:px-1! md:py-1! md:text-base",
  "lg:gap-x-4! lg:px-1! lg:py-1! lg:text-base",
  "xl:gap-x-6! xl:px-3! xl:py-2! xl:text-base"
);

export function ReserverUnRendezVous() {
  return (
    <CustomButton
      className={cn(sharedClasses, responsiveClasses)}
      href={CAL_COMMUNES_LINK}
      style={
        {
          "--accent": "var(--color-zinc-600)",
          "--accent-secondary": "var(--color-zinc-900)",
          "--degree": "110deg",
        } as React.CSSProperties
      }
      target="_blank"
    >
      <span className="ml-4 text-white">Réserver rendez-vous</span>
      <div className="rounded-full bg-white p-3 text-zinc-700">
        <ReserverRendezVousIcon strokeWidth={2} />
      </div>
    </CustomButton>
  );
}

export function AppelerMaintenant() {
  return (
    <CustomButton
      className={cn(sharedClasses, responsiveClasses)}
      href={`tel:${TEL_THIBAUT}`}
      style={
        {
          "--accent": "var(--color-primary-strong)",
          "--accent-secondary": "var(--color-primary-lighter)",
          "--degree": "190deg",
        } as React.CSSProperties
      }
    >
      <span className="ml-4 text-white">Appeler maintenant</span>
      <div className="rounded-full bg-white p-3 text-primary">
        <AppelerMaintenantIcon strokeWidth={2.1} />
      </div>
    </CustomButton>
  );
}
