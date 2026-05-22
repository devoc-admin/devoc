import { cn } from "@/lib/utils";
import { HeaderWrapper } from "../_components/header-wrapper";
import { InformationBar } from "../_components/information-bar";
import { LI } from "../_components/li";
import { ListItems } from "../_components/list-items";
import { PIntro } from "../_components/p-intro";
import { PageSubtitle } from "../_components/page-subtitle";
import { PageTitle } from "../_components/page-title";
export default function MentionsLegalesPage() {
  return (
    <>
      {/* 1️⃣ / 🔠 ... 🆎*/}
      <HeaderWrapper>
        {/*🔠*/}
        <PageSubtitle>Informations légales</PageSubtitle>
        {/*🆎*/}
        <PageTitle>
          Mentions{" "}
          <span
            className={cn(
              "bg-linear-to-r from-primary-strong to-primary-lighter bg-clip-text text-transparent"
            )}
          >
            légales
          </span>
          .
        </PageTitle>
      </HeaderWrapper>
      {/* 2️⃣ / 🔤 */}
      <InformationBar informationBarItems={informationBarItems} />
      {/* 3️⃣ */}
      <PIntro>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l'économie numérique, vous trouverez ici l'ensemble des informations
        relatives à l'éditeur, à l'hébergeur et aux conditions d'utilisation du
        présent site.
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
    value: "3 min",
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
        <p className="text-foreground-dark/60">
          Le site{" "}
          <a className="text-foreground-dark/85 underline" href="www.dev-oc.fr">
            dev-oc.fr
          </a>{" "}
          est édité par le collectif Dev'Oc, association de fait composée de
          Clément Dubos et Thibaut Izard.
        </p>
        <ul className="space-y-4">
          <LI label="Adresse">Carcassonne, Aude (11) France</LI>
          <LI label="Email">
            <a
              className="text-foreground-dark/85 underline"
              href="mailto:contact@dev-oc.fr"
            >
              contact@dev-oc.fr
            </a>
          </LI>
          <LI label="Téléphones">
            <div className="flex flex-wrap gap-x-2">
              <a
                className="text-foreground-dark/85 underline"
                href="tel:+33620239838"
              >
                +33 6 20 23 98 38
              </a>
              <a
                className="text-foreground-dark/85 underline"
                href="tel:+33658889701"
              >
                +33 6 58 88 97 01
              </a>
            </div>
          </LI>
          <LI label="Directeurs de publication">
            Clément Dubos & Thibaut Izard
          </LI>
        </ul>
      </>
    ),
    id: "editeur",
    title: "Éditeur du site",
  },
  {
    content: (
      <>
        <p>
          Le site est hébergé par{" "}
          <span className="text-foreground-dark/85">Vercel Inc.</span>, dont le
          siège social est situé au 340 S Lemon Ave #4133, Walnut, CA 91789,
          États-Unis.
        </p>
        <span>
          Site web :{" "}
          <a
            className="text-foreground-dark/85"
            href="https://www.vercel.com"
            rel="noopener"
            target="_blank"
          >
            vercel.com
          </a>
        </span>
      </>
    ),
    id: "hebergement",
    title: "Hébergement",
  },
  {
    content: (
      <>
        <p>
          L'ensemble des éléments présents sur ce site (textes, images, vidéos,
          marques, logos, identité visuelle, code source, mises en page) est la
          propriété exclusive du collectif Dev'Oc, sauf mention contraire
          explicite.
        </p>
        <p>
          Toute reproduction, représentation, adaptation, traduction ou
          transformation, totale ou partielle, sans l'autorisation écrite
          préalable du collectif est interdite et constitue un délit de
          contrefaçon sanctionné par le Code de la propriété intellectuelle.
        </p>
      </>
    ),
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
  },
  {
    content: (
      <p className="text-foreground-dark/60">
        Le traitement des données personnelles collectées sur ce site est décrit
        dans notre{" "}
        <a
          className="text-foreground-dark/85 underline"
          href="/politique-de-confidentialite"
        >
          politique de confidentialité
        </a>
        , conforme au Règlement Général sur la Protection des Données (RGPD) et
        à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
      </p>
    ),
    id: "donnnees-personnelles",
    title: "Données personnelles",
  },
  {
    content: (
      <p className="text-foreground-dark/60">
        Le site{" "}
        <a className="text-foreground-dark/85 underline" href="www.dev-oc.fr">
          dev-oc.fr
        </a>{" "}
        utilise des cookies strictement nécessaires à son fonctionnement ainsi
        que des outils de mesure d'audience respectueux de la vie privée. Aucun
        cookie publicitaire ni de tracking tiers n'est déposé sans votre
        consentement explicite.
      </p>
    ),
    id: "cookies",
    title: "Cookies & traceurs",
  },
  {
    content: (
      <>
        <p className="text-foreground-dark/60">
          Le collectif Dev'Oc s'efforce de fournir des informations aussi
          précises que possible sur ce site. Toutefois, il ne saurait être tenu
          responsable des omissions, des inexactitudes et des carences dans la
          mise à jour du contenu, qu'elles soient de son fait ou du fait des
          tiers partenaires qui lui fournissent ces informations.
        </p>
        <p className="text-foreground-dark/60">
          L'utilisateur reconnaît utiliser les informations et outils mis à sa
          disposition sous sa responsabilité exclusive.
        </p>
      </>
    ),
    id: "responsabilite",
    title: "Responsabilité",
  },
  {
    content: (
      <p className="text-foreground-dark/60">
        Le site peut contenir des liens vers des sites tiers. Le collectif
        Dev'Oc n'exerce aucun contrôle sur le contenu de ces sites externes et
        décline toute responsabilité quant à leur contenu, leur politique de
        confidentialité ou leurs pratiques.
      </p>
    ),
    id: "liens-hypertexte",
    title: "Liens hypertexte",
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
      <p className="text-foreground-dark/60">
        Pour toute question relative aux présentes mentions légales, vous pouvez
        nous écrire à{" "}
        <a
          className="text-foreground-dark/85 underline"
          href="mailto:contact@dev-oc.fr"
        >
          contact@dev-oc.fr
        </a>
        .
      </p>
    ),
    id: "contact",
    title: "Contact",
  },
];
