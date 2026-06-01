import { PackageOpen as DeliveryIcon } from "lucide-react";
import {
  StepCard,
  StepCardContent,
  StepCardDescription,
  StepCardIcon,
  StepCardNumber,
  StepCardTitle,
} from "./step-card";

export function StepCardDelivery() {
  return (
    <StepCard>
      {/* 🔢🖼️ */}
      <div className="flex justify-between">
        <StepCardNumber value={4} />
        <StepCardIcon Icon={DeliveryIcon} />
      </div>
      {/* 🔠 */}
      <StepCardContent>
        <StepCardTitle>Livraison & suivi</StepCardTitle>
        <StepCardDescription>
          Livraison avec un temps de formation ainsi qu'un suivi
          pluri-hebdomadaire pour la correction de bugs et la prise en main par
          vos agents.
        </StepCardDescription>
      </StepCardContent>
    </StepCard>
  );
}
