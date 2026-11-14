import { cn } from "cn";
import Image from "next/image";
import { Safari } from "@/components/ui/eldora-ui/safari-browser";
import CheckIcon from "./_assets/icons/check.png";
import CrownIcon from "./_assets/icons/crown.png";
import FlagIcon from "./_assets/icons/flag.png";
import KeyIcon from "./_assets/icons/key.png";
import PhoneIcon from "./_assets/icons/phone.png";
import ShieldIcon from "./_assets/icons/shield.png";
import Scribble1 from "./_assets/scribbles/scribble-1.svg";
import Scribble2 from "./_assets/scribbles/scribble-2.svg";
import s from "./style.module.css";
export default function TestCommunesSecurity() {
  return (
    <div className="h-screen">
      <OrangeDot />
      <ContentContainer>
        <div className="col-span-1 col-start-1 space-y-4">
          <TitleAndIcons />
          <Subtitle />
        </div>
        <div className="col-span-1 col-start-2 w-full">
          <Browser />
        </div>
        <div className="col-span-2 row-start-2 place-self-start">
          <Description />
        </div>
        <div className="col-span-2 row-start-3">
          <FaitesLeTest />
        </div>
      </ContentContainer>
    </div>
  );
}

// 🟠 ==============================================
function OrangeDot() {
  return (
    <div className="bg-orange-red absolute top-0 left-1/2 -z-1 size-300 -translate-x-1/2 -translate-y-1/2 content-center rounded-full opacity-15 blur-[200px]" />
  );
}

// 📦 ==============================================
function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 place-items-center content-center",
        "mx-auto h-full max-w-350",
        "gap-x-12 gap-y-22"
      )}
    >
      {children}
    </div>
  );
}

// 🆎 ==============================================
function TitleAndIcons() {
  return (
    <div className="text-orange-red font-anton relative w-fit text-8xl leading-[1.1] uppercase">
      <Icons />
      <Title />
    </div>
  );
}

function Title() {
  return (
    <h1 className="relative">
      <span>Sécurité</span>
      <br />
      <span>Accessibilité</span>
      <br />
      <span>Souveraineté</span>
    </h1>
  );
}

function Icons() {
  return (
    <>
      <Check />
      <Shield />
      <Flag />
      <Key />
      <Phone />
      <Crown />
    </>
  );
}

// ✅
function Check() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute size-33",
        "top-0 left-0 translate-x-[0.6em] -translate-y-[calc(100%+0.1em)]"
      )}
      height={400}
      src={CheckIcon.src}
      width={400}
    />
  );
}

// 🛡️
function Shield() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute w-28",
        "top-0 left-0 translate-x-[3.4em] translate-y-[-50%]"
      )}
      height={400}
      src={ShieldIcon.src}
      width={400}
    />
  );
}

// 🚩
function Flag() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute w-32",
        "top-0 left-0 translate-x-[4.70em] translate-y-[15%]"
      )}
      height={400}
      src={FlagIcon.src}
      width={400}
    />
  );
}

// 🔑
function Key() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute w-32",
        "top-0 left-0 translate-x-[-1em] translate-y-[15%]"
      )}
      height={400}
      src={KeyIcon.src}
      width={400}
    />
  );
}

// 📱
function Phone() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute w-20",
        "bottom-0 left-0 translate-x-[calc(-115%)] translate-y-[10%]"
      )}
      height={400}
      src={PhoneIcon.src}
      width={400}
    />
  );
}

//👑
function Crown() {
  return (
    <Image
      alt=""
      className={cn(
        "absolute w-24",
        "right-0 bottom-0 translate-x-[calc(115%)] translate-y-[10%]"
      )}
      height={400}
      src={CrownIcon.src}
      width={400}
    />
  );
}

// 🤖 ==============================================
function Browser() {
  return (
    <div className={cn("perspective-normal transform-3d", s.browser)}>
      <div className="rotate-y-[-5deg] rotate-z-0">
        <Safari height={451} url="cavignac.fr" width={721} />
      </div>
    </div>
  );
}

// 🔠 ==============================================
function Subtitle() {
  return (
    <h2 className="font-racing text-6xl text-gray-600">
      Votre commune est-elle en règle ?
    </h2>
  );
}
// 🔡 ==============================================
function Description() {
  return (
    <div className="font-fraunces flex gap-x-18 text-[1.7rem] leading-tight">
      <div className="relative flex-1">
        Face aux <Highlight position={0}>cyberattaques</Highlight> et aux
        pressions réglementaires, beaucoup de communes rencontrent des
        difficultés pour s'adapter.
      </div>
      <div className="flex-1">
        Conçu pour les <Highlight position={1}>communes d'Occitanie</Highlight>{" "}
        avec le soutien du Réseau des Maisons de l'Innovation, du Numérique et
        de l'Entrepreunariat de Carcassonne.
      </div>
    </div>
  );
}

function Highlight({
  children,
  position = 0,
}: {
  children: React.ReactNode;
  position?: number;
}) {
  return (
    <span
      className={cn(
        "before:bg-orange-red before:absolute before:inset-0 before:-z-1 before:inline-block before:w-[calc(100%+0.4ch)] before:translate-x-[-0.2ch] before:content-['']",
        "relative",
        s.highlightWord
      )}
      style={
        {
          "--position": position,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

// ⏺️ ==============================================
function FaitesLeTest() {
  return (
    <div className="group relative mt-16">
      <RightTopScribble />
      <GoToTestButton />
      <LeftBottomScribble />
    </div>
  );
}

function GoToTestButton() {
  return (
    <button
      className={cn(
        "bg-orange-red group-hover:bg-orange-red/90",
        "px-12 py-4",
        "transition-colors",
        "font-racing cursor-pointer rounded-full",
        "text-4xl text-white"
      )}
      type="button"
    >
      Faites le test
    </button>
  );
}

function RightTopScribble() {
  return (
    <Image
      alt=""
      aria-hidden
      className="pointer-events-none absolute top-1 right-10 w-16 translate-x-full -translate-y-full transition-opacity group-hover:opacity-90"
      src={Scribble1}
    />
  );
}

function LeftBottomScribble() {
  return (
    <Image
      alt=""
      aria-hidden
      className="pointer-events-none absolute bottom-3 left-3 w-16 -translate-x-full translate-y-full scale-70 rotate-[250deg] transition-opacity group-hover:opacity-90"
      src={Scribble2}
    />
  );
}
