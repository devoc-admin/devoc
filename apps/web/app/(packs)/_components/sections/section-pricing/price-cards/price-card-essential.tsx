import { ChoisirEssentiel } from "../buttons";
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
];

export function PriceCardEssential() {
  return (
    <PriceCard>
      {/* 1️⃣ */}
      <PriceGridUpper>
        <div>
          <PriceCardSupTitle>Mise en conformité</PriceCardSupTitle>
          <PriceCardTitle>Essentiel</PriceCardTitle>
        </div>
        <PriceCardDescription>
          Le socle réglementaire indispensable : un site conforme et la mise en
          règle RGPD avec DPO externalisé.
        </PriceCardDescription>
        <PriceCardDPrice className="mt-auto" value={5500} />
      </PriceGridUpper>
      {/* 2️⃣ */}
      <PriceGridBottom>
        <PriceGridServices services={services} />
        <div className="mt-auto grid place-items-center">
          <ChoisirEssentiel />
        </div>
      </PriceGridBottom>
    </PriceCard>
  );
}
