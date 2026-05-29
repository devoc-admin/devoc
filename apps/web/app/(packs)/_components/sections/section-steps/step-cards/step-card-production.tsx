import { LayersIcon as ProductionIcon } from "lucide-react";
import {
  StepCard,
  StepCardContent,
  StepCardDescription,
  StepCardIcon,
  StepCardNumber,
  StepCardTitle,
} from "./step-card";

export function StepCardProduction() {
  return (
    <StepCard>
      {/* 🔢🖼️ */}
      <div className="flex justify-between">
        <StepCardNumber value={3} />
        <StepCardIcon Icon={ProductionIcon} />
      </div>
      {/* 🔠 */}
      <StepCardContent>
        <StepCardTitle>Production</StepCardTitle>
        <StepCardDescription>
          Mise en route du projet selon le calendrier défini. Accès direct à
          notre équipe pour suivre l'avancement.
        </StepCardDescription>
      </StepCardContent>
    </StepCard>
  );
}
