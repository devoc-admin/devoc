import { ClockIcon, RepeatIcon, TagIcon } from "lucide-react";
import {
  Brick,
  BrickDescription,
  BrickNumber,
  BrickTitle,
  CardsContainer,
  GuaranteeItem,
  GuaranteesTitle,
  PlusDevOc,
  SmallCard,
} from "./brick";

export function Brick1Website() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <div className="col-span-5 space-y-12">
        <BrickNumber>1</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Site internet conforme et accessible</BrickTitle>
          <BrickDescription>
            Pour remplir votre mission d'accessibilité en vous conformant au
            RGAA, avec une interface d'administration adaptée à vos agents.
          </BrickDescription>
        </div>
      </div>
      {/* 📝 */}
      <div className="col-span-7 space-y-8">
        {/* 🟠 */}
        <div className="space-y-5">
          <GuaranteesTitle />
          <ul className="space-y-3">
            <GuaranteeItem>
              Conformité RGAA (accessibilité niveau AAA), RGPD et RGESN intégrée
              dès la conception.
            </GuaranteeItem>
            <GuaranteeItem>
              Hébergement sur cloud souverain français, nom de domaine en .fr.
            </GuaranteeItem>
            <GuaranteeItem>
              Formation des agents à la gestion autonome des contenus, sans
              dépendance prestataire.
            </GuaranteeItem>
            <GuaranteeItem>
              Technologies ouvertes et non-propriétaires : vous restez
              propriétaire du site et des données.
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
          Là où un « vendeur de site » livre un thème générique sur WordPress
          avec des plugins mal sécurisés, nous livrons un site audité sur trois
          référentiels réglementaires, hébergé en cloud souverain, et accompagné
          d'un vrai transfert de compétences à vos agents.
        </PlusDevOc>
      </div>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 1 mois (maquettage, implémentation, recette)
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      = 3500 - 5 000 € HT selon le volume de pages
    </SmallCard>
  );
}
function CardMaintenance() {
  return (
    <SmallCard Icon={RepeatIcon} title="Maintenance">
      = 50 - 80 € HT / mois - hébergement, sécurité, mises à niveau
    </SmallCard>
  );
}
