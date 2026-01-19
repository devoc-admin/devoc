"use client";
import { cn } from "@/lib/utils";
import SectionTitle from "./section-title";

export default function SectionUs() {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center bg-linear-to-br bg-zinc-950 px-6 py-24 text-white"
      )}
      id="collectif"
    >
      <SectionTitle description="L'ADN Dev'Oc" title="Qui sommes-nous ?" />
      <div className="mt-16 w-full max-w-4xl">
        <span>
          Le collectif Dev'Oc naît d'une volonté simple : remettre l'humain et
          la proximité au centre des projets technologiques. Lauréats du
          concours entrepreneurial de Carcassonne Agglo, nous avons choisi de
          mettre notre expertise au service du tissu économique local. Nous
          sommes persuadés que le meilleur moyen de développer un territoire est
          d'améliorer son empreinte numérique.
        </span>
        <h3 className="mt-6 mb-6 font-kanit text-3xl text-primary">L'Equipe</h3>
        <div className="grid grid-cols-2 justify-items-center">
          <div>
            <h4 className="mb-2 font-bold text-lg text-primary">Clément</h4>
            <span>
              Il s'occupe de la logique, des mécanismes d'interaction, il se
              charge également de l'automatisation.
            </span>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-lg text-primary">Thibaut</h4>
            <span>
              C'est le développeur orienté interface, c'est l'expert de
              l'esthétique et du rendu.
            </span>
          </div>
        </div>
        <br />
        <h3 className="mb-6 font-kanit text-3xl text-primary">Nos valeurs</h3>
        <ul className="space-y-8">
          <li>
            <h4 className="font-bold text-lg text-primary">
              1. La Proximité Géographique
            </h4>
            <p className="mt-2 text-base text-zinc-200">
              Nous croyons que les meilleurs logiciels se conçoivent en
              face-à-face. Nous nous déplaçons dans vos usines, vos domaines et
              vos bureaux à travers toute l'Occitanie pour comprendre vos flux
              de travail réels.
            </p>
          </li>
          <li>
            <h4 className="font-bold text-lg text-primary">
              2. La Souveraineté Numérique
            </h4>
            <p className="mt-2 text-base text-zinc-200">
              Vos données sont votre patrimoine. Nous privilégions les solutions
              <i> Open Source</i> et l'hébergement local pour vous favoriser
              votre indépendance.
            </p>
          </li>
          <li>
            <h4 className="font-bold text-lg text-primary">
              3. L'Ingénierie Rationnelle
            </h4>
            <p className="mt-2 text-base text-zinc-200">
              Notre objectif est de trouver les bonnes solutions, adaptées à vos
              besoins et à vos coûts. Issus du monde professionnel et des grands
              groupes, nous importons les méthodes et la rigueur des grandes
              entreprises pour les mettre au service des TPE et PME locales.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <h3 className="mb-6 font-kanit text-3xl text-primary">
          Pourquoi choisir Dev'Oc ?
        </h3>
        <ul className="space-y-6">
          <li>
            <h4 className="font-bold text-lg text-primary">
              Impact Territorial
            </h4>
            <p className="mt-2 text-base text-zinc-200">
              Travailler avec nous, c'est réinjecter de la valeur dans
              l'économie de notre région.
            </p>
          </li>
          <li>
            <h4 className="font-bold text-lg text-primary">
              Connaissance du Tissu
            </h4>
            <p className="mt-2 text-base text-zinc-200">
              Nous comprenons les enjeux spécifiques des PME et des institutions
              d'Occitanie.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
