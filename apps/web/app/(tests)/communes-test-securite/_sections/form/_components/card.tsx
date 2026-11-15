import { cn } from "cn";
import { IconGearKeyhole } from "nucleo-glass";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Card() {
  return (
    <Container>
      <Header>
        <Title />
        <Subtitle />
      </Header>

      <Body>
        <Radios />
      </Body>

      <Footer>
        <Previous />
        <Next />
      </Footer>
    </Container>
  );
}

// 📦 =======================
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-175 space-y-12",
        "border-t-orange-red border-t-4",
        "overflow-hidden",
        "rounded-2xl",
        "px-14 pt-14 pb-8",
        "relative"
      )}
      style={{
        boxShadow: "2px 4px 22px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/*<div className="bg-orange-red absolute top-0 left-1/2 h-1 w-[99%] -translate-x-1/2" />*/}
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className={cn("")}>{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className={cn("mt-24 flex justify-between")}>{children}</div>;
}

// 🤯 =======================

function Header({ children }: { children: React.ReactNode }) {
  return <div className="space-y-8">{children}</div>;
}

// 🆎 ========================
function Title() {
  return (
    <h2 className="font-racing flex items-center gap-x-5 text-5xl text-neutral-700">
      <IconGearKeyhole size={43} />
      <span>Bonnes pratiques</span>
    </h2>
  );
}

// 🔠 ========================
function Subtitle() {
  return (
    <p className="font-racing text-2xl leading-[110%] text-neutral-700">
      Comment stockez-vous les identifiants de connexion à vos postes de travail
      et autres outils en ligne ?
    </p>
  );
}

// 🔘🔘🔘 ========================
function Radios() {
  return (
    <RadioGroup
      className="font-raleway w-fit space-y-6 font-semibold text-neutral-700"
      defaultValue="comfortable"
    >
      <div className="flex items-start gap-3">
        <RadioGroupItem className="mt-1" id="r1" value="default" />
        <Label className="cursor-pointer text-lg leading-[130%]" htmlFor="r1">
          Chaque agent les définit et les gère à sa manière
        </Label>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem className="mt-1" id="r2" value="comfortable" />
        <Label className="cursor-pointer text-lg leading-[130%]" htmlFor="r2">
          Vous utilisez un gestionnaire de mots de passe
        </Label>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem className="mt-1" id="r3" value="compact" />
        <Label className="cursor-pointer text-lg leading-[130%]" htmlFor="r3">
          Vous avez une politique globale : diversification et rotation
          régulière des mots de passe, authentification à multiples facteurs,
          liste de rôles et privilèges, comptes d'équipe etc.
        </Label>
      </div>
    </RadioGroup>
  );
}

// ⏹️⬅️ ==================================
function Previous() {
  return (
    <button
      className="font-racing cursor-pointer text-2xl text-neutral-500"
      type="button"
    >
      Précédent
    </button>
  );
}

// ⏹️➡️ ==================================
function Next() {
  return (
    <button
      className={cn(
        "cursor-pointer",
        "font-racing bg-orange-red relative right-0 translate-x-[72px] px-12 py-3 text-2xl text-white"
      )}
      type="button"
    >
      <div
        className="bg-orange-red absolute top-0 right-0 size-4 -translate-y-[calc(100%-0.5px)]"
        style={{
          clipPath: "polygon(0% 0%, 50% 50%, 100% 100%, 0% 100%)",
        }}
      />
      <span className="relative">Suivant</span>
    </button>
  );
}
