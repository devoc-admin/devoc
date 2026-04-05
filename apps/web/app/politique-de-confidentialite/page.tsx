import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/footer";
import Header from "@/app/header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  description: "Politique de confidentialité du site Dev'Oc",
  title: "Politique de confidentialité | Dev'Oc",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <>
      <Header />
      <div
        className={cn(
          "mx-auto max-w-200",
          "px-6 py-24",
          "text-muted-foreground text-sm leading-relaxed",
          "md:py-32"
        )}
      >
        <h1 className="mb-12 font-kanit text-4xl text-foreground">
          Politique de confidentialité
        </h1>

        <Section title="Responsable du traitement">
          <p>Raison sociale : Dev'Oc (association de fait)</p>
          <p>
            Email :{" "}
            <a
              className="text-primary underline"
              href="mailto:contact@dev-oc.fr"
            >
              contact@dev-oc.fr
            </a>
          </p>
          <p>Téléphone : +33 6 20 23 98 38</p>
        </Section>

        <Section title="Données personnelles collectées">
          <p>
            Dans le cadre de l'utilisation de notre site, nous sommes
            susceptibles de collecter les données personnelles suivantes :
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Données de navigation (cookies, adresse IP)</li>
          </ul>
        </Section>

        <Section title="Finalités du traitement">
          <p>Les données collectées sont utilisées pour :</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Répondre à vos demandes de contact</li>
            <li>Vous fournir les services demandés</li>
            <li>Améliorer notre site et nos services</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </Section>

        <Section title="Base légale du traitement">
          <p>Le traitement de vos données repose sur :</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Votre consentement (article 6.1.a du RGPD) pour les cookies</li>
            <li>
              L'exécution d'un contrat (article 6.1.b du RGPD) pour la
              fourniture de nos services
            </li>
            <li>
              L'intérêt légitime (article 6.1.f du RGPD) pour l'amélioration de
              nos services
            </li>
          </ul>
        </Section>

        <Section title="Durée de conservation">
          <p>
            Vos données personnelles sont conservées pendant une durée de 3 ans
            à compter de votre dernière interaction avec nous, sauf obligation
            légale de conservation plus longue.
          </p>
        </Section>

        <Section title="Destinataires des données">
          <p>
            Vos données peuvent être transmises aux destinataires suivants :
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Les membres de l'équipe Dev'Oc</li>
            <li>Nos sous-traitants techniques (hébergement, analytics)</li>
          </ul>
          <p className="mt-2">
            Certaines données peuvent être transférées aux États-Unis
            (hébergement Vercel, analytics). Ces transferts sont encadrés par
            les clauses contractuelles types de la Commission européenne.
          </p>
        </Section>

        <Section title="Vos droits">
          <p>
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            disposez des droits suivants :
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              <strong className="text-foreground">Droit d'accès</strong> :
              obtenir la confirmation que vos données sont traitées et en
              demander une copie
            </li>
            <li>
              <strong className="text-foreground">
                Droit de rectification
              </strong>{" "}
              : corriger vos données inexactes ou incomplètes
            </li>
            <li>
              <strong className="text-foreground">Droit à l'effacement</strong>{" "}
              : demander la suppression de vos données
            </li>
            <li>
              <strong className="text-foreground">
                Droit à la limitation du traitement
              </strong>{" "}
              : restreindre le traitement de vos données
            </li>
            <li>
              <strong className="text-foreground">
                Droit à la portabilité
              </strong>{" "}
              : recevoir vos données dans un format structuré
            </li>
            <li>
              <strong className="text-foreground">Droit d'opposition</strong> :
              vous opposer au traitement de vos données
            </li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à{" "}
            <a
              className="text-primary underline"
              href="mailto:contact@dev-oc.fr"
            >
              contact@dev-oc.fr
            </a>
            .
          </p>
          <p className="mt-2">
            Vous pouvez également introduire une réclamation auprès de la CNIL
            (Commission Nationale de l'Informatique et des Libertés) :{" "}
            <a
              className="text-primary underline"
              href="https://www.cnil.fr"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Ce site utilise des cookies pour améliorer votre expérience de
            navigation et réaliser des statistiques de visites.
          </p>
          <p className="mt-2">Types de cookies utilisés :</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              <strong className="text-foreground">Cookies essentiels</strong> :
              nécessaires au fonctionnement du site
            </li>
            <li>
              <strong className="text-foreground">Cookies analytiques</strong> :
              mesure d'audience (Vercel Analytics)
            </li>
          </ul>
          <p className="mt-2">
            Vous pouvez gérer vos préférences de cookies à tout moment via les
            paramètres de votre navigateur.
          </p>
        </Section>

        <Section title="Modification de la politique">
          <p>
            Nous nous réservons le droit de modifier la présente politique de
            confidentialité à tout moment. La version en vigueur est celle
            accessible sur cette page.
          </p>
          <p className="mt-2">Dernière mise à jour : 5 avril 2026</p>
        </Section>

        <div className="mt-12 border-border border-t pt-8">
          <Link
            className="text-primary underline transition-colors hover:text-primary/80"
            href="/mentions-legales"
          >
            Voir nos mentions légales
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ------------------------------------------------------------------------------------------------
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-kanit text-foreground text-xl">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
