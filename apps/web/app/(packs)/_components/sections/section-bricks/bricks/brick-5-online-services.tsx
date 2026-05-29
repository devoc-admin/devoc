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

export function Brick5OnlineServices() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <div className="col-span-5 space-y-12">
        <BrickNumber>5</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Démarches en ligne</BrickTitle>
          <BrickDescription>
            Mise en œuvre de la dématérialisation des demandes et procédures
            administratives pour en faciliter le traitement et le suivi.
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
              Mise en en place des formulaires en ligne intégrés à votre site
              pour les démarches dématérialisables (état civil, inscriptions
              scolaires et périscolaires, signalement voirie, demandes
              d'urbanisme, réservation de salles) avec suivi de l'avancement
              côté agent avec accusé de réception côté administré.
            </GuaranteeItem>
            <GuaranteeItem>
              Intégration avec France Connect pour l'authentification des
              usagers et la publication de vos données open data sur
              <i>data.gouv.fr</i> (délibérations, budgets, subventions) en
              conformité avec la loi République numérique. Un dispositif
              d'archivage numérique conforme (norme NF Z42-020) est mis en place
              pour garantir la conservation légale des documents générés.
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
      </div>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 2-3 mois (comprenant les délais d’habilitation de FranceConnect)
    </SmallCard>
  );
}

function CardPricing() {
  return (
    <SmallCard Icon={TagIcon} title="Tarif indicatif">
      Tarification progressive en fonction du nombre de démarches
      dématérialisées
    </SmallCard>
  );
}
function CardMaintenance() {
  return (
    <SmallCard Icon={RepeatIcon} title="Maintenance">
      ≈ 120-200€ HT/mois pour mise à jour des formulaires si changement de
      règles (urbanisme notamment), vérification mensuelle de l'archivage, mise
      à jour des jeux de données <i>open data</i> (délibérations nouvelles), et
      support agent de premier niveau.
    </SmallCard>
  );
}
