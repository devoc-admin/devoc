import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "L'histoire de la commune de Lasbordes",
  title: "Histoire",
};

export default function HistoirePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-4xl">
        <h1>Histoire de Lasbordes</h1>
        <p className="lead">
          Découvrez l'histoire riche et fascinante de notre commune, des
          origines à nos jours.
        </p>

        <h2>Les origines</h2>
        <p>
          Lasbordes trouve ses origines au Moyen Âge. Le village s'est développé
          autour de son église, témoin de plusieurs siècles d'histoire locale.
        </p>

        <h2>L'évolution du village</h2>
        <p>
          Au fil des siècles, Lasbordes a connu de nombreuses transformations,
          tout en préservant son caractère authentique et son patrimoine
          architectural.
        </p>

        <h2>Aujourd'hui</h2>
        <p>
          Aujourd'hui, Lasbordes est une commune dynamique qui allie tradition
          et modernité, offrant à ses 600 habitants un cadre de vie agréable au
          cœur de l'Aude.
        </p>

        <p className="mt-8 text-muted-foreground text-sm">
          Source : Site officiel Lasbordes 11400 —
          https://www.lasbordes11400.fr/
        </p>
      </div>
    </div>
  );
}
