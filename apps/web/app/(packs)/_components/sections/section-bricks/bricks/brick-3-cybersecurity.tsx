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

export function Brick3Cybersecurity() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <BrickLeft>
        <BrickNumber>3</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Couverture cybersécurité</BrickTitle>
          <BrickDescription>
            Identification et corrections de vos failles ou vulnérabilités avec
            formation à la prévention de cyberattaques et aux bonnes pratiques
            numériques.
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
              Audit de la sécurité de votre système d'information (postes,
              réseau, messagerie, accès distants) et mise en œuvre des mesures
              prioritaires : politique de mots de passe robuste, double
              authentification, segmentation du réseau Wi-Fi, mises à jour
              automatisées.
            </GuaranteeItem>
            <GuaranteeItem>
              Rédaction d'un plan de continuité et de reprise d'activité
              simplifié (PCA/PRA), une charte informatique pour vos agents et
              élus, et une fiche réflexe « j'ai un doute / j'ai cliqué » à
              afficher en mairie.
            </GuaranteeItem>
            <GuaranteeItem>
              Configuration de sauvegardes automatisées selon la règle 3-2-1
              avec hébergement sur un stockage souverain.
            </GuaranteeItem>
            <GuaranteeItem>
              Demi-journée de sensibilisation en présentiel : phishing,
              ransomware, bons réflexes.
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
          Nous ne nous contentons pas d'installer un antivirus. Nous
          construisons une posture de sécurité complète, adaptée à la directive
          européenne NIS2, avec des livrables concrets que vos agents peuvent
          appliquer au quotidien.
        </PlusDevOc>
      </BrickRight>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 9-11 jours
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      ≈ 2500-4500€ HT selon la complexité de votre système d’information
    </SmallCard>
  );
}
function CardMaintenance() {
  return (
    <SmallCard Icon={RepeatIcon} title="Maintenance">
      ≈ 40-120€ HT/mois ou sous forme d’interventions forfaitaires ponctuelles
    </SmallCard>
  );
}
