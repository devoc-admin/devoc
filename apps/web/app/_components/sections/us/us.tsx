"use client";
import { SparklesText } from "@/components/magicui/sparkles-text";
import DitheredImage from "@/components/motion-core/dithered-image/dithered-image";
import GlowLine from "@/components/sera-ui/glow-line";
import { cn } from "@/lib/utils";
import Section from "../_components/section";
import SectionTitle from "../_components/section-title";

export default function SectionUs() {
  return (
    <Section className="overflow-hidden pb-0!" id="us" theme="dark">
      <GlowLine color="orange" orientation="horizontal" position="0px" />
      <SectionTitle title="Qui sommes-nous ?" />
      <div
        className={cn(
          //⬆️ Margin top
          "mt-0",
          "lg:mt-8",
          "xl:mt-12",
          "2xl:mt-16",
          // ↔️ Width
          "max-w-[60ch]",
          // ↕️ Spacing
          "space-y-12",
          "lg:space-y-14",
          "2xl:space-y-20"
        )}
      >
        <div className="space-y-4">
          <P className="font-medium text-xl">
            Le collectif Dev'Oc naît d'une volonté simple : remettre l'humain et
            la proximité au centre des projets technologiques.
          </P>
          <P className="font-medium text-xl">
            <a
              className="underline"
              href="https://www.carcassonne-agglo.fr/actualite/carcassonne-agglo-apporte-son-concours-2/#:~:text=prix%20revient%20%C3%A0%20Cl%C3%A9ment%20Dubos%20et%20Thibaut%20Izard%20pour%20%C2%AB%20Dev%E2%80%99Oc%20%C2%BB,%20un%20collectif%20de%20d%C3%A9veloppeurs%20informatique%20qui%20souhaitent%20proposer%20des%20services%20de%20mise%20en%20conformit%C3%A9%20de%20sites%20Internet%20aux%20collectivit%C3%A9s%20territoriales"
              rel="noopener"
              target="_blank"
            >
              Lauréat 2025 du concours entrepreneurial de Carcassonne Agglo
            </a>
            , nous avons choisi de mettre notre expertise au service du tissu
            économique local.
          </P>
          <P className="font-medium text-xl">
            Nous sommes persuadés que le meilleur moyen de développer un
            territoire est d'améliorer son empreinte numérique.
          </P>
        </div>
        <H3>L'Équipe</H3>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
          <div className="relative">
            <DeveloperName>Clément</DeveloperName>
            <P>
              Il s'occupe de la logique, des mécanismes d'interaction, il se
              charge également de l'automatisation.
            </P>{" "}
            <Portrait
              className="top-0 left-0 -translate-x-[calc(100%+40px)] scale-x-[1]"
              color="#F56E0F"
              src="./clement-portrait.webp"
            />
          </div>
          <div className="relative">
            <DeveloperName>Thibaut</DeveloperName>
            <P>
              C'est le développeur orienté interface, c'est l'expert de
              l'esthétique et du rendu.
            </P>{" "}
            <Portrait
              className="top-0 right-0 translate-x-full scale-x-[-1]"
              color="#FFC731"
              src="./thibaut-portrait.webp"
            />
          </div>
        </div>

        <H3>Nos valeurs</H3>

        <ul className="mb-36 space-y-14">
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
              Vos données sont votre patrimoine. Nous privilégions les solutions{" "}
              <i>open source</i> et un hébergement souverain pour assurer votre
              indépendance.
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

        <DitheredImage
          backgroundColor="#09090b"
          className={cn("left-1/2 h-50 w-screen -translate-x-1/2")}
          color="#F56E0F"
          ditherMap="voidAndCluster"
          pixelSize={1}
          src="./photo-groupe.webp"
          threshold={0.05}
        />

        <H3 className="mt-36">Pourquoi choisir Dev'Oc ?</H3>
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
    </Section>
  );
}

// ==============================
// 🔠 Typography

function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-200",
        "text-lg",
        "leading-snug",
        "font-medium",
        "empty:hidden",
        className
      )}
    >
      {children}
    </p>
  );
}

function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "w-fit",
        "bg-linear-to-br from-primary-strong via-primary to-primary-lighter bg-clip-text text-transparent",
        "my-6",
        "font-kanit font-semibold text-5xl",
        className
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
        "font-bold text-xl"
      )}
    >
      {children}
    </h4>
  );
}

function DeveloperName({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className={cn(
        "w-fit",
        "relative",
        "font-bold font-fira-code",
        "bg-linear-to-tr from-primary to-primary-lighter bg-clip-text text-transparent uppercase",
        "font-bold text-xl"
      )}
    >
      <SparklesText
        colors={{
          first: "var(--primary)",
          second: "var(--primary-lighter)",
        }}
        sparklesCount={7}
      >
        {children}
      </SparklesText>
    </h4>
  );
}

// ====================================
// 🖼️ Portrait
function Portrait({
  className,
  color,
  src,
}: {
  className: string;
  color: string;
  src: string;
}) {
  return (
    <DitheredImage
      backgroundColor="#09090b"
      className={cn("absolute size-100", "hidden", "lg:block", className)}
      color={color}
      ditherMap="bayer8x8"
      pixelSize={1}
      src={src}
      threshold={0.05}
    />
  );
}
