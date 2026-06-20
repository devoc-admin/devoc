import { cn } from "@/lib/utils";
import { HeaderWrapper } from "../_components/header-wrapper";
import { InformationBar } from "../_components/information-bar";
import { LI } from "../_components/li";
import { ListItems } from "../_components/list-items";
import { PIntro } from "../_components/p-intro";
import { PageSubtitle } from "../_components/page-subtitle";
import { PageTitle } from "../_components/page-title";
export default function PolitiqueDeConfidentialitePage() {
  return (
    <>
      {/* 1️⃣ / 🔠 ... 🆎*/}
      <HeaderWrapper>
        {/*🔠*/}
        <PageSubtitle>RGPD & vie privée</PageSubtitle>
        {/*🆎*/}
        <PageTitle>
          Politique de{" "}
          <span
            className={cn(
              "bg-linear-to-r from-orange-red to-primary-lighter bg-clip-text text-transparent"
            )}
          >
            confidentialité
          </span>
          .
        </PageTitle>
      </HeaderWrapper>
      {/* 2️⃣ / 🔤 */}
      <InformationBar informationBarItems={informationBarItems} />
      {/* 3️⃣ */}
      <PIntro>
        Le respect de votre vie privée et de vos données personnelles fait
        partie intégrante de notre démarche d'ingénieur. Cette page décrit, en
        langage clair, ce que nous collectons, pourquoi, et comment vous gardez
        la main.
      </PIntro>
      {/* 4️⃣ */}
      <ListItems items={items} />
    </>
  );
}

const informationBarItems = [
  {
    id: "maj",
    type: "Mise à jour",
    value: "Mai 2026",
  },
  {
    id: "lecture",
    type: "Lecture",
    value: "6 min",
  },
  {
    id: " statut",
    type: "Statut",
    value: "En vigueur",
  },
];

const items = [
  {
    content: (
      <>
        <p>
          Le responsable du traitement des données personnelles collectées sur
          dev-oc.fr est le collectif{" "}
          <span className="text-foreground-dark/85">Dev'Oc</span>, basé à
          Carcassonne (Aude, France). Le site{" "}
          <a className="text-foreground-dark/85 underline" href="www.dev-oc.fr">
            dev-oc.fr
          </a>{" "}
          est édité par le collectif Dev'Oc, association de fait composée de
          Clément Dubos et Thibaut Izard.
        </p>
        <p>
          Pour toute question relative au traitement de vos données :{" "}
          <a
            className="text-foreground-dark/85 underline"
            href="mailto:contact@dev-oc.fr"
          >
            contact@dev-oc.fr
          </a>
        </p>
      </>
    ),
    id: "responsable-traitement",
    title: "Responsable du traitement",
  },
  {
    content: (
      <>
        <p>
          Nous appliquons le principe de{" "}
          <span className="text-foreground-dark/85">minimisation</span> : seules
          les données strictement nécessaires à la finalité poursuivie sont
          collectées.
        </p>
        <ul className="space-y-4">
          <LI label="Formulaire de contact">
            nom, prénom, adresse email, message — uniquement pour répondre à
            votre demande.
          </LI>
          <LI label="Mesure d'audience">
            données techniques anonymisées (type d'appareil, pays, pages
            visitées) via Vercel Analytics — sans cookie ni identifiant
            persistant.
          </LI>
          <LI label="Logs techniques">
            conservés temporairement par notre hébergeur pour la sécurité du
            service.
          </LI>
        </ul>
      </>
    ),
    id: "donnees-collectees",
    title: "Données que nous collectons",
  },
  {
    content: (
      <ul className="space-y-4">
        <LI>Répondre aux demandes de contact et établir des devis</LI>
        <LI>Gérer la relation contractuelle avec nos clients</LI>
        <LI>
          Analyser de manière agrégée la fréquentation du site pour l'améliorer
        </LI>
        <LI>Garantir la sécurité et la disponibilité du service</LI>
      </ul>
    ),
    id: "traitement",
    title: "Finalités du traitement",
  },
  {
    content: (
      <>
        <p>
          Conformément à l'article 6 du RGPD, les traitements reposent sur :
        </p>
        <ul className="space-y-4">
          <LI>
            <span className="text-foreground-dark/85">Votre consentement</span>{" "}
            pour les demandes spontanées via formulaire
          </LI>
          <LI>
            <span className="text-foreground-dark/85">
              L'exécution d'un contrat
            </span>{" "}
            ou de mesures précontractuelles pour la relation client
          </LI>
          <LI>
            <span className="text-foreground-dark/85">
              Notre intérêt légitime
            </span>{" "}
            à mesurer l'audience de manière respectueuse et à sécuriser nos
            services
          </LI>
        </ul>
      </>
    ),
    id: " bases-legales",
    title: "Bases légales",
  },
  {
    content: (
      <ul className="space-y-4">
        <LI label="Demandes de contact">
          3 ans à compter du dernier échange, puis suppression automatique
        </LI>
        <LI label="Données contractuelles">
          10 ans (obligations comptables et fiscales)
        </LI>
        <LI label="Données d'audience">
          agrégées dès la collecte, conservées 13 mois maximum
        </LI>
        <LI label="Logs techniques">12 mois maximum</LI>
      </ul>
    ),
    id: "duree-conservation",
    title: "Durée de conservation",
  },
  {
    content: (
      <>
        <p>
          Vos données ne sont jamais vendues. Elles sont accessibles uniquement
          aux co-fondateurs de Dev'Oc et, le cas échéant, aux sous-traitants
          techniques strictement nécessaires :
        </p>
        <ul className="space-y-4">
          <LI>
            <span className="text-foreground-dark/85">Vercel</span>{" "}
            (hébergement, États-Unis — cadre des clauses contractuelles types)
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Resend</span> (envoi
            d'emails transactionnels, Union européenne)
          </LI>
        </ul>
      </>
    ),
    id: "destinaires",
    title: "Destinataires",
  },
  {
    content: (
      <>
        <p>
          Conformément aux articles 15 à 22 du RGPD, vous disposez à tout moment
          des droits suivants :
        </p>
        <ul className="space-y-4">
          <LI>
            <span className="text-foreground-dark/85">Accès</span> à vos données
            personnelles
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Rectification</span> des
            données inexactes
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Effacement</span> (droit à
            l'oubli)
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Limitation</span> du
            traitement
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Portabilité</span> de vos
            données dans un format ouvert
          </LI>
          <LI>
            <span className="text-foreground-dark/85">Opposition</span> au
            traitement
          </LI>
          <LI>
            <span className="text-foreground-dark/85">
              Retrait du consentement
            </span>{" "}
            à tout moment
          </LI>
        </ul>
        <p>
          Pour exercer ces droits, écrivez-nous à{" "}
          <a
            className="text-foreground-dark/85 underline"
            href="mailto:contact@dev-oc.fr"
          >
            contact@dev-oc.fr
          </a>
          . Nous vous répondons sous 30 jours maximum.
        </p>
      </>
    ),
    id: "vos-droits",
    title: "Vos droits",
  },
  {
    content: (
      <>
        <p className="text-foreground-dark/60">
          Le site dev-oc.fr utilise un nombre minimal de cookies, classés par
          finalité :
        </p>
        <ul className="space-y-4">
          <LI label="Strictement nécessaire">
            sécurité, préférences d'affichage. Aucun consentement requis.
          </LI>
          <LI label="Mesure d'audience anonyme">
            via Vercel Analytics, sans dépôt de cookie ni d'identifiant
            persistant.
          </LI>
        </ul>
        <p className="text-foreground-dark/60">
          Aucun cookie publicitaire, aucun traceur tiers à des fins commerciales
          n'est déposé.
        </p>
      </>
    ),
    id: "cookies-traceurs",
    title: "Cookies & traceurs",
  },
  {
    content: (
      <p className="text-foreground-dark/60">
        Les présentes mentions légales sont régies par le droit français. En cas
        de litige, les juridictions françaises seront seules compétentes,
        conformément aux règles de compétence territoriale en vigueur.
      </p>
    ),
    id: "droit",
    title: "Droit applicable & juridiction",
  },
  {
    content: (
      <p>
        Nous mettons en œuvre les mesures techniques et organisationnelles
        appropriées pour protéger vos données : chiffrement TLS de bout en bout,
        sauvegardes régulières, accès restreint aux données, hébergement
        européen quand techniquement possible, et audits de sécurité
        périodiques.
      </p>
    ),
    id: "securite",
    title: "Sécurité",
  },
  {
    content: (
      <>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés, vous pouvez introduire une réclamation auprès de la{" "}
          <span className="text-foreground-dark/85">CNIL</span> :
        </p>
        <ul className="space-y-4">
          <LI>3 place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07</LI>
          <LI>
            <a
              className="text-foreground-dark underline"
              href="https://www.cnil.fr"
            >
              www.cnil.fr
            </a>
          </LI>
        </ul>
      </>
    ),
    id: "reclamation",
    title: "Réclamation",
  },
  {
    content: (
      <p>
        Cette politique peut être amenée à évoluer pour suivre les évolutions
        réglementaires et techniques. Toute modification substantielle vous sera
        signalée par tout moyen approprié, et la date de dernière mise à jour
        est mentionnée en tête de page.
      </p>
    ),
    id: "politique",
    title: "Évolution de cette politique",
  },
];
