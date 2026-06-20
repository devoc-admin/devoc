import { cn } from "@/lib/utils";
import { ChoisirAvance } from "../buttons";
import {
  PriceCard,
  PriceCardDescription,
  PriceCardDPrice,
  PriceCardSupTitle,
  PriceCardTitle,
  PriceGridBottom,
  PriceGridServices,
  PriceGridUpper,
} from "./price-card";

const services = [
  "Site internet conforme et accessible",
  "Bilan RGPD et DPO externalisé",
  "Couverture cybersécurité",
  "Outils numériques souverains",
];

export function PriceCardAdvanced() {
  return (
    <PriceCard
      className={cn(
        "border border-orange-red bg-orange-red/2",
        //↔️
        "translate-y-0",
        "xs:translate-y-0",
        "xl:-translate-y-5",
        "2xl:-translate-y-5"
      )}
    >
      {/* 1️⃣ */}
      <PriceGridUpper>
        <div>
          <PriceCardSupTitle>Protection totale</PriceCardSupTitle>
          <PriceCardTitle className="bg-linear-to-r from-orange-red to-50% to-primary-lighter bg-clip-text text-transparent">
            Avancé
          </PriceCardTitle>
        </div>
        <PriceCardDescription>
          Conformité, cybersécurité, et déploiement d'outils collaboratifs
          souverains. La couverture la plus demandée.
        </PriceCardDescription>
        <PriceCardDPrice
          className="mt-auto bg-linear-to-r from-orange-red to-80% to-primary-lighter bg-clip-text text-transparent"
          value={13_500}
        />
      </PriceGridUpper>

      {/* 2️⃣ */}
      <PriceGridBottom>
        <PriceGridServices services={services} />
        <div
          className={cn(
            "grid place-items-center",
            // ↔️
            "mt-12",
            "xs:mt-12",
            "xl:mt-auto",
            "2xl:mt-auto"
          )}
        >
          <ChoisirAvance />
        </div>
      </PriceGridBottom>
    </PriceCard>
  );
}
