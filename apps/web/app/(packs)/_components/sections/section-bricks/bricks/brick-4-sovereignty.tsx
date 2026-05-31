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

export function Brick4Sovereignty() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <BrickLeft>
        <BrickNumber>4</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Outils et souveraineté numérique</BrickTitle>
          <BrickDescription>
            Nous vous équipons avec La Suite territoriale, un ensemble d’outils
            collaboratifs développés par l’État pour ses administrations et ses
            collectivités comme alternative souveraine aux GAFAM.
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
              Déploiement de la <i>Suite Territoriale ANCT</i>, la suite
              numérique souveraine développée par l'État pour les communes de
              moins de 3 500 habitants.
            </GuaranteeItem>
            <GuaranteeItem>
              Nous assurons la migration depuis vos outils existants, le
              paramétrage des espaces partagés et des droits d'accès, et la
              formation en présentiel de vos équipes sur une journée complète
              avec support post-déploiement.
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
          Fini les outils inadaptés, les licences coûteuses ou les solutions
          américaines qui posent question en matière de souveraineté des
          données. <i>La Suite territoriale</i> est gratuite pour les
          collectivités, conforme au RGPD, et nous vous accompagnons jusqu'à sa
          prise en main effective.
        </PlusDevOc>
      </BrickRight>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 5-7 jours
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      ≈ 2000-3500€ HT selon la taille de vos équipes
    </SmallCard>
  );
}
function CardMaintenance() {
  return (
    <SmallCard Icon={RepeatIcon} title="Maintenance">
      ≈ 30-50€ HT/mois
    </SmallCard>
  );
}
