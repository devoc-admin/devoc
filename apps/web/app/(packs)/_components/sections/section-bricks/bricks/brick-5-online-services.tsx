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

export function Brick5OnlineServices() {
  return (
    <Brick variant="light">
      {/* 🔤 */}
      <BrickLeft>
        <BrickNumber>5</BrickNumber>
        <div className="space-y-4">
          <BrickTitle>Démarches en ligne</BrickTitle>
          <BrickDescription>
            Mise en œuvre de la dématérialisation des demandes et procédures
            administratives pour en faciliter le traitement et le suivi.
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
              Mise en en place des formulaires en ligne intégrés à votre site
              pour les démarches dématérialisables (état civil, inscriptions
              scolaires et périscolaires, signalement voirie, demandes
              d'urbanisme, réservation de salles) avec suivi de l'avancement
              côté agent et accusé de réception côté administré.
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
          américaines qui posent de plus en plus question en matière de
          souveraineté des données.{" "}
          <a
            className="offset-de italic underline decoration-2 decoration-orange-red/70 underline-offset-2"
            href="https://suiteterritoriale.anct.gouv.fr/services#socle"
            rel="noopener"
            target="_blank"
          >
            La Suite territoriale
          </a>{" "}
          est gratuite pour les collectivités, conforme au RGPD, et nous vous
          accompagnons jusqu'à sa prise en main effective avec l'appui de votre
          opérateur public de services numériques (OPSN).
        </PlusDevOc>
      </BrickRight>
    </Brick>
  );
}

function CardDuration() {
  return (
    <SmallCard Icon={ClockIcon} title="Durée de réalisation">
      ≈ 2-3 mois (comprenant les délais d’habilitation de{" "}
      <a
        className="offset-de italic underline decoration-2 decoration-orange-red/70 underline-offset-2"
        href="https://www.franceconnect.gouv.fr/"
        rel="noopener"
        target="_blank"
      >
        FranceConnect
      </a>
      )
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
