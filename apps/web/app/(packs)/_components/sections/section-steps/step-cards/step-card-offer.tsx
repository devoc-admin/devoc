import { HandshakeIcon as OfferIcon } from "lucide-react";
import {
  StepCard,
  StepCardContent,
  StepCardDescription,
  StepCardIcon,
  StepCardNumber,
  StepCardTitle,
} from "./step-card";

export function StepCardOffer() {
  return (
    <StepCard>
      {/* 🔢🖼️ */}
      <div className="flex justify-between">
        <StepCardNumber value={2} />
        <StepCardIcon Icon={OfferIcon} />
      </div>
      {/* 🔠 */}
      <StepCardContent>
        <StepCardTitle>Offre</StepCardTitle>
        <StepCardDescription>
          Présentation et accord autour d'un devis pour franchir un nouveau cap
          dans votre transformation numérique.
        </StepCardDescription>
      </StepCardContent>
    </StepCard>
  );
}
