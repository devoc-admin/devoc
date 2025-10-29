import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Politique de confidentialité du site officiel de la commune de Lasbordes",
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1>Politique de confidentialité</h1>

        <h2>Collecte des données personnelles</h2>
        <p>
          La commune de Lasbordes s'engage à protéger la vie privée des
          utilisateurs de son site internet. Nous collectons uniquement les
          données nécessaires au bon fonctionnement des services proposés.
        </p>

        <h2>Données collectées</h2>
        <p>
          Les données personnelles collectées via le formulaire de contact sont
          :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Message</li>
        </ul>

        <h2>Utilisation des données</h2>
        <p>
          Ces données sont utilisées uniquement pour répondre à vos demandes et
          ne sont jamais communiquées à des tiers sans votre consentement
          explicite.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification et de suppression de vos données personnelles. Pour
          exercer ces droits, contactez-nous à : mairie@lasbordes11400.fr
        </p>

        <h2>Conservation des données</h2>
        <p>
          Les données personnelles sont conservées pendant la durée nécessaire à
          la finalité de leur traitement, puis archivées conformément aux
          obligations légales.
        </p>
      </div>
    </div>
  );
}
