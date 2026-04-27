import {
  ArrowRight01FreeIcons,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
export function Demarches() {
  return (
    <div
      className={cn(
        "mt-20",
        "flex flex-col items-center justify-center gap-y-12",
        "w-full",
        "bg-[#FCF9F4]",
        "py-20"
      )}
    >
      <TitleWithDescription />
      <Searchbar />
    </div>
  );
}

function TitleWithDescription() {
  return (
    <div className="max-w-[60ch] space-y-2 text-center">
      <h2 className="text-balance font-bold font-montserrat text-5xl text-emerald-800">
        Démarches en ligne
      </h2>
      <p className="mx-auto text-pretty text-neutral-500">
        Simplifiez vos démarches en ligne ! Trouvez rapidement l'information ou
        le service dont vous avez besoin auprès de la mairie de Cagnolhes.
      </p>
    </div>
  );
}

function Searchbar() {
  return (
    <div className="relative grow">
      <Input
        className={cn(
          "h-[55px] w-[800px]",
          "rounded-full",
          "text-emerald-950",
          "border! border-emerald-900!",
          "pl-13",
          "font-medium text-xl!",
          "focus:ring-4! focus:ring-emerald-900/10!"
        )}
      />
      <HugeiconsIcon
        className="absolute top-1/2 left-4 -translate-y-1/2 text-emerald-900"
        icon={Search01Icon}
        size={26}
        strokeWidth={1.5}
      />
    </div>
  );
}

function _ServiceCard() {
  return (
    <div className="border border-neutral-100">
      <h3>Demander un passesport</h3>
      <p>
        La démarche pour obtenir un passeport biométrique pour une personne
        majeure. Prenez rendez-vous en ligne et préparez vos documents avant de
        vous rendre en mairie.
      </p>
      <Link href="/">
        <span>Voir les détails</span>
        <HugeiconsIcon icon={ArrowRight01FreeIcons} />
      </Link>
    </div>
  );
}
