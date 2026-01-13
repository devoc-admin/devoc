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
        <h2>
          Le collectif Dev'Oc naît d'une volonté simple : remettre l'humain et
          la proximité au centre des projets technologiques. Lauréats du
          concours entrepreneurial de Carcassonne Agglo, nous avons choisi de
          mettre notre expertise au service du tissu économique local. Nous
          sommes persuadés que le meilleur moyen de développer un territoire est
          d'améliorer son empreinte numérique.
        </h2>
        <br />
        <h3 className="mb-6 font-kanit text-3xl text-primary">Nos valeurs</h3>
        <ul className="space-y-8">
          <li>
            <span className="font-bold text-lg text-primary">
              1. La Proximité Géographique
            </span>
            <p className="mt-2 text-base text-zinc-200">
              Nous croyons que les meilleurs logiciels se conçoivent en face à
              face. Nous nous déplaçons dans vos usines, vos domaines et vos
              bureaux à travers toute l'Occitanie pour comprendre vos flux de
              travail réels.
            </p>
          </li>
          <li>
            <span className="font-bold text-lg text-primary">
              2. La Souveraineté Numérique
            </span>
            <p className="mt-2 text-base text-zinc-200">
              Vos données sont votre patrimoine. Nous privilégions les solutions
              Open-Source et l'hébergement local pour vous favoriser votre
              indépendance.
            </p>
          </li>
          <li>
            <span className="font-bold text-lg text-primary">
              3. L'Ingénierie Rationnelle
            </span>
            <p className="mt-2 text-base text-zinc-200">
              Notre objectif est de trouver les bonnes solutions, adaptées à vos
              besoins et à vos coûts. Issus du monde professionnel et des grands
              groupes, nous importons les méthodes et la rigueur des grandes
              entreprises pour les mettre au service des TPE et PME locales.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-16 w-full max-w-4xl">
        <h3 className="mb-6 font-kanit text-3xl text-primary">
          Pourquoi choisir Dev'Oc ?
        </h3>
        <ul className="space-y-6">
          <li>
            <span className="font-bold text-lg text-primary">
              Impact Territorial
            </span>
            <p className="mt-2 text-base text-zinc-200">
              Travailler avec nous, c'est réinjecter de la valeur dans
              l'économie de notre département.
            </p>
          </li>
          <li>
            <span className="font-bold text-lg text-primary">
              Connaissance du Tissu
            </span>
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
