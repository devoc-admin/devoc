import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Mentions légales du site officiel de la commune de Lasbordes",
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          Commune de Lasbordes
          <br />
          Place de la Mairie
          <br />
          11400 Lasbordes
          <br />
          France
        </p>
        <p>
          Téléphone : 04 68 XX XX XX
          <br />
          Email : mairie@lasbordes11400.fr
        </p>

        <h2>Directeur de la publication</h2>
        <p>M. Jean DUPONT, Maire de Lasbordes</p>

        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par Vercel Inc.
          <br />
          440 N Barranca Ave #4133
          <br />
          Covina, CA 91723
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et
          internationale sur le droit d'auteur et la propriété intellectuelle.
          Tous les droits de reproduction sont réservés, y compris pour les
          documents téléchargeables et les représentations iconographiques et
          photographiques.
        </p>

        <h2>Protection des données personnelles</h2>
        <p>
          Conformément à la loi « Informatique et Libertés » du 6 janvier 1978
          modifiée et au Règlement Général sur la Protection des Données (RGPD),
          vous disposez d'un droit d'accès, de rectification et de suppression
          des données vous concernant. Vous pouvez exercer ce droit en vous
          adressant à : mairie@lasbordes11400.fr
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site n'utilise pas de cookies de suivi. Seuls des cookies
          techniques essentiels au fonctionnement du site peuvent être utilisés.
        </p>

        <p className="mt-8 text-muted-foreground text-sm">
          Source : Site officiel Lasbordes 11400 —
          https://www.lasbordes11400.fr/
        </p>
      </div>
    </div>
  );
}
