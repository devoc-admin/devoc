"use client";
import useNavTheme from "@/app/_hooks/use-nav-theme";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
import SectionTitle from "../_components/section-title";
export default function SectionUs() {
  const { ref } = useNavTheme({ sectionName: "services", theme: "dark" });

  return (
    <section
      className={cn(
        "flex flex-col items-center",
        "relative overflow-hidden",
        "px-6 py-24",
        "w-full",
        "bg-linear-to-br bg-zinc-950",
        "text-white"
      )}
      id="us"
      ref={ref}
    >
      <GlowLine color="orange" orientation="horizontal" position="0px" />
      <SectionTitle title="Qui sommes-nous ?" />
      <div className="mt-16 max-w-[60ch] space-y-12">
        <div className="space-y-4">
          <p>
            Le collectif Dev'Oc naît d'une volonté simple : remettre l'humain et
            la proximité au centre des projets technologiques.
          </p>
          <p>
            <a
              className="underline"
              href="https://www.carcassonne-agglo.fr/actualite/carcassonne-agglo-apporte-son-concours-2/#:~:text=prix%20revient%20%C3%A0%20Cl%C3%A9ment%20Dubos%20et%20Thibaut%20Izard%20pour%20%C2%AB%20Dev%E2%80%99Oc%20%C2%BB,%20un%20collectif%20de%20d%C3%A9veloppeurs%20informatique%20qui%20souhaitent%20proposer%20des%20services%20de%20mise%20en%20conformit%C3%A9%20de%20sites%20Internet%20aux%20collectivit%C3%A9s%20territoriales"
            >
              Lauréats 2025 du concours entrepreneurial de Carcassonne Agglo
            </a>
            , nous avons choisi de mettre notre expertise au service du tissu
            économique local.
          </p>
          <p>
            Nous sommes persuadés que le meilleur moyen de développer un
            territoire est d'améliorer son empreinte numérique.
          </p>
        </div>
        <H3>L'Équipe</H3>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
          <div>
            <DeveloperName>Clément</DeveloperName>
            <span>
              Il s'occupe de la logique, des mécanismes d'interaction, il se
              charge également de l'automatisation.
            </span>
          </div>
          <div>
            <DeveloperName>Thibaut</DeveloperName>
            <span>
              C'est le développeur orienté interface, c'est l'expert de
              l'esthétique et du rendu.
            </span>
          </div>
        </div>

        <H3>Nos valeurs</H3>

        <ul className="space-y-8">
          <li>
            <H4>#1 La Proximité Géographique</H4>
            <P>
              Nous croyons que les meilleurs logiciels se conçoivent en
              face-à-face. Nous nous déplaçons dans vos usines, vos domaines et
              vos bureaux à travers toute l'Occitanie pour comprendre vos flux
              de travail réels.
            </P>
          </li>
          <li>
            <H4>#2 La Souveraineté Numérique</H4>
            <P>
              Vos données sont votre patrimoine. Nous privilégions les solutions
              <i> Open Source</i> et l'hébergement local pour vous favoriser
              votre indépendance.
            </P>
          </li>
          <li>
            <H4>#3 L'Ingénierie Rationnelle</H4>
            <P>
              Notre objectif est de trouver les bonnes solutions, adaptées à vos
              besoins et à vos coûts. Issus du monde professionnel et des grands
              groupes, nous importons les méthodes et la rigueur des grandes
              entreprises pour les mettre au service des TPE et PME locales.
            </P>
          </li>
        </ul>

        <H3>Pourquoi choisir Dev'Oc ?</H3>
        <ul className="space-y-6">
          <li>
            <H4>Impact Territorial</H4>
            <P>
              Travailler avec nous, c'est réinjecter de la valeur dans
              l'économie de notre région.
            </P>
          </li>
          <li>
            <H4>Connaissance du Tissu</H4>
            <P>
              Nous comprenons les enjeux spécifiques des PME et des institutions
              d'Occitanie.
            </P>
          </li>
        </ul>
      </div>
    </section>
  );
}

// ==============================
// 🔠 Typography

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className={cn("mt-2 text-base text-zinc-200", "empty:hidden")}>
      {children}
    </p>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={cn(
        "w-fit",
        "bg-linear-to-br from-primary-strong via-primary to-primary-lighter bg-clip-text text-transparent",
        "my-6",
        "font-kanit font-semibold text-4xl"
      )}
    >
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "w-fit",
        "bg-linear-to-tl from-primary to-primary-lighter bg-clip-text text-transparent",
        "font-bold text-lg"
      )}
    >
      {children}
    </h4>
  );
}

function DeveloperName({ children }: { children: React.ReactNode }) {
  return (
    <h5
      className={cn(
        "w-fit",
        "bg-linear-to-tr from-primary to-primary-lighter bg-clip-text text-transparent uppercase",
        "font-bold text-base"
      )}
    >
      {children}
    </h5>
  );
}
