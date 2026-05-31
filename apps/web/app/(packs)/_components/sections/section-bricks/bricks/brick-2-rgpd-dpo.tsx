import { ClockIcon, RepeatIcon, TagIcon } from "lucide-react";
import {
  Brick,
  BrickDescription,
  BrickLeft,
  BrickNumber,
  BrickRight,
  BrickTitle,
  CardsContainer,
  GuaranteeItem,
  GuaranteesTitle,
  PlusDevOc,
  SmallCard,
} from "./brick";

export function Brick2BilanRGPDetDPO() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <BrickLeft>
        <BrickNumber>2</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Bilan RGPD et DPO externalisé</BrickTitle>
          <BrickDescription>
            Un audit de vos activités de traitement des données pour respecter
            la RGPD et le service DPO obligatoire pour les communes.
          </BrickDescription>
        </div>
      </BrickLeft>
      {/* 📝 */}
      <BrickRight>
        {/* 🟠 */}
        <div className="space-y-5">
          <GuaranteesTitle />
          <ul className="space-y-3">
            <GuaranteeItem>
              Audit RGPD complet de votre collectivité : registre des
              traitements, revue des formulaires, analyse des sous-traitants et
              rédaction des documents obligatoires.
            </GuaranteeItem>
            <GuaranteeItem>
              Mission de Délégué à la Protection des Données externalisé (DPO) :
              point de contact CNIL, veille réglementaire, gestion des demandes
              d'exercice de droits, alerte en cas d'incident.
            </GuaranteeItem>
          </ul>
        </div>
        {/* 🕰️💰 */}
        <CardsContainer>
          <CardDuration />
          <CardPricing />
          <CardMaintenance />
        </CardsContainer>
        {/* ➕ */}
        <PlusDevOc>
          La désignation d'un DPO est obligatoire pour toute collectivité. 95%
          des petites communes n'en ont pas. Nous comblons cette lacune avec une
          mission indépendante, rigoureuse et adaptée à votre échelle. Cette
          mission est mutualisable entre plusieurs communes d'un même territoire
          afin d’optimiser les coûts.
        </PlusDevOc>
      </BrickRight>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 3-5 semaines
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      ≈ 2000-3500€ HT en fonction du nombre de services à auditer
    </SmallCard>
  );
}
function CardMaintenance() {
  return (
    <SmallCard Icon={RepeatIcon} title="Maintenance">
      ≈ 80-120€ HT/mois pour la mission de DPO
    </SmallCard>
  );
}
