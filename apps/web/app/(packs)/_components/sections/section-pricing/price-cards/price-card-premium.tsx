import { ChoisirPremium } from "../buttons";
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
  "Démarches en ligne",
  "Communication et réseaux sociaux",
];

export function PriceCardPremium() {
  return (
    <PriceCard>
      {/* 1️⃣ */}
      <PriceGridUpper>
        <div>
          <PriceCardSupTitle>Commune connectée</PriceCardSupTitle>
          <PriceCardTitle>Premium</PriceCardTitle>
        </div>
        <PriceCardDescription>
          Tout l'arsenal: conformité, sécurité, outils, démarches en ligne et
          stratégie de communication. Une commune pleinement connectée.
        </PriceCardDescription>
        <PriceCardDPrice className="mt-auto" value={25_500} />
      </PriceGridUpper>
      {/* 2️⃣ */}
      <PriceGridBottom>
        <PriceGridServices services={services} />
        <div className="mt-auto grid place-items-center">
          <ChoisirPremium />
        </div>
      </PriceGridBottom>
    </PriceCard>
  );
}
