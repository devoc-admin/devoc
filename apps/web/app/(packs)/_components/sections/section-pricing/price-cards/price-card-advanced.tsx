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
  "Outils et souveraineté numérique",
];

export function PriceCardAdvanced() {
  return (
    <PriceCard className="-translate-y-5 border border-primary-strong bg-primary-strong/2">
      {/* 1️⃣ */}
      <PriceGridUpper>
        <div>
          <PriceCardSupTitle>Protection totale</PriceCardSupTitle>
          <PriceCardTitle className="bg-linear-to-r from-primary-strong to-50% to-primary-lighter bg-clip-text text-transparent">
            Avancé
          </PriceCardTitle>
        </div>
        <PriceCardDescription>
          Conformité, cybersécurité, et déploiement d'outils collaboratifs
          souverains. La couverture la plus demandée.
        </PriceCardDescription>
        <PriceCardDPrice
          className="mt-auto bg-linear-to-r from-primary-strong to-80% to-primary-lighter bg-clip-text text-transparent"
          value={13_500}
        />
      </PriceGridUpper>

      {/* 2️⃣ */}
      <PriceGridBottom>
        <PriceGridServices services={services} />
        <div className="mt-auto grid place-items-center">
          <ChoisirAvance />
        </div>
      </PriceGridBottom>
    </PriceCard>
  );
}
