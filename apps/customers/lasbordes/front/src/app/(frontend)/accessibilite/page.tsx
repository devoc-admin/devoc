import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Déclaration d'accessibilité du site officiel de la commune de Lasbordes",
  title: "Accessibilité",
};

export default function AccessibilitePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1>Déclaration d'accessibilité</h1>

        <p>
          La commune de Lasbordes s'engage à rendre son site internet accessible
          conformément au Référentiel Général d'Amélioration de l'Accessibilité
          (RGAA).
        </p>

        <h2>État de conformité</h2>
        <p>
          Ce site est en cours d'optimisation pour l'accessibilité. Nous
          travaillons continuellement à améliorer l'accès à tous nos contenus.
        </p>

        <h2>Contenus accessibles</h2>
        <ul>
          <li>Navigation au clavier</li>
          <li>Liens d'évitement</li>
          <li>Textes alternatifs pour les images</li>
          <li>Contrastes de couleurs conformes</li>
          <li>Titres et structure sémantique</li>
          <li>Formulaires avec labels</li>
        </ul>

        <h2>Technologies utilisées</h2>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript</li>
          <li>ARIA (Accessible Rich Internet Applications)</li>
        </ul>

        <h2>Retour d'information et contact</h2>
        <p>
          Si vous rencontrez un problème d'accessibilité sur ce site, merci de
          nous le signaler à l'adresse : mairie@lasbordes11400.fr
        </p>

        <p>
          Nous nous efforcerons de vous apporter une réponse dans les meilleurs
          délais et de corriger les problèmes identifiés.
        </p>

        <h2>Voies de recours</h2>
        <p>
          Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à
          un contenu ou une fonctionnalité du site, que vous nous le signalez et
          que vous ne parvenez pas à obtenir une réponse rapide de notre part,
          vous êtes en droit de faire parvenir vos doléances au Défenseur des
          droits.
        </p>
      </div>
    </div>
  );
}
