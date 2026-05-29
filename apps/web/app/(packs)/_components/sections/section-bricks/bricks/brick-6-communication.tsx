import { ClockIcon, TagIcon } from "lucide-react";
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

export function Brick6Communication() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <div className="col-span-5 space-y-12">
        <BrickNumber>6</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Communication et réseaux sociaux</BrickTitle>
          <BrickDescription>
            Nous ajustons votre stratégie de communication en ligne pour toucher
            tous les publics en respectant l’identité visuelle de la commune.
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
              Définition et mise en oeuvre d'une stratégie de communication
              numérique adaptée à votre commune : choix des canaux pertinents
              (Facebook, Instagram, ou autres selon votre public), mise en place
              du <i>cross-posting</i> automatisé depuis votre site vers vos
              réseaux sociaux, création d'une newsletter aux couleurs de votre
              commune avec inscription depuis le site et activation d'un flux
              RSS pour les actualités.
            </GuaranteeItem>
            <GuaranteeItem>
              Confection d'un kit de gabarits de publications types (événement,
              alerte, délibération, vœux) et formons un référent en mairie à la
              gestion autonome des publications. Un accompagnement éditorial de
              trois mois est inclus pour lancer la dynamique.
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
          publiée atteigne réellement vos administrés, sur les canaux qu'ils
          utilisent au quotidien.
        </PlusDevOc>
      </div>
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
