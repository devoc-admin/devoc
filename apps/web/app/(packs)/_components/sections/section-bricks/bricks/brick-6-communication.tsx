import { ClockIcon, TagIcon } from "lucide-react";
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

export function Brick6Communication() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <BrickLeft>
        <BrickNumber>6</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Communication et réseaux sociaux</BrickTitle>
          <BrickDescription>
            Nous ajustons votre stratégie de communication en ligne pour toucher
            tous les publics en respectant l’identité visuelle de la commune.
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
              Définition et mise en oeuvre d'une stratégie de communication
              numérique adaptée à votre commune : choix des canaux pertinents
              (Facebook, Instagram, ou autres selon la sociologie de votre
              commune), mise en place du <i>cross-posting</i> automatisé depuis
              votre site vers vos réseaux sociaux, création d'une{" "}
              <i>newsletter</i> aux couleurs de votre commune avec inscription
              depuis le site et activation d'un flux RSS pour les actualités.
            </GuaranteeItem>
            <GuaranteeItem>
              Confection d'un kit de gabarits de publications types (événement,
              alerte, délibération, vœux) et formation d'un référent en mairie
              pour la gestion autonome des publications. Un accompagnement
              éditorial de trois mois est inclus pour lancer la dynamique.
            </GuaranteeItem>
          </ul>
        </div>
        {/* 🕰️💰 */}
        <CardsContainer>
          <CardDuration />
          <CardPricing />
        </CardsContainer>
        {/* ➕ */}
        <PlusDevOc>
          Un site sans stratégie de diffusion est comme un panneau d'affichage
          dans une rue déserte. Nous faisons en sorte que chaque information
          publiée atteigne réellement vos administrés sur les réseaux qu'ils
          utilisent au quotidien.
        </PlusDevOc>
      </BrickRight>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 13-20 jours
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      3 500€ HT pour mise en place technique (cross-posting, newsletter, RSS){" "}
      <br /> <i>ou</i>
      <br />8 000€ HT avec l’ajout de kit de gabarits, formation et
      accompagnement éditorial 3 mois
    </SmallCard>
  );
}
