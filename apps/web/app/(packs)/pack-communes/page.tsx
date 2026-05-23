import { CustomGradientText } from "@/components/ui/custom-gradient-text/custom-gradient-text";
import { cn } from "@/lib/utils";

export default function PackCommunesPage() {
  return (
    <div
      className={cn(
        // ↔️
        "space-y-12 py-24"
      )}
    >
      <PackTitle />
      <PackDescription />
    </div>
  );
}

function PackTitle() {
  return (
    <h1
      className={cn(
        "font-fraunces text-foreground-dark",
        "font-light leading-[0.9]!",
        // ↔️
        "text-[6.5rem]"
      )}
    >
      La transformation{" "}
      <span className="text-foreground-dark/60 italic">numérique</span> de votre
      commune, <CustomGradientText>clé en main</CustomGradientText>
    </h1>
  );
}

function PackDescription() {
  return (
    <p
      className={cn(
        "max-w-[50ch] font-fraunces text-foreground-dark",
        "leading-snug!",
        // ↔️
        "text-2xl"
      )}
    >
      Six briques modulaires, trois packs à tarifs encadrés — tous{" "}
      <CustomGradientText>sous le seuil MAPA</CustomGradientText> pour vous
      éviter la lourdeur d'un appel d'offres. Conçu pour les communes de l'Aude,
      en collaboration avec le Réseau des Maisons de l'Innovation.
    </p>
  );
}
