import { MessageSquareIcon } from "lucide-react";
import {
  StepCard,
  StepCardContent,
  StepCardDescription,
  StepCardIcon,
  StepCardNumber,
  StepCardTitle,
} from "./step-card";

export function StepCardMeet() {
  return (
    <StepCard>
      {/* 🔢🖼️ */}
      <div className="flex justify-between">
        <StepCardNumber value={1} />
        <StepCardIcon Icon={MessageSquareIcon} />
      </div>
      {/* 🔠 */}
      <StepCardContent>
        <StepCardTitle>Rencontre</StepCardTitle>
        <StepCardDescription>
          Une rencontre d'1h sur site ou en visio pour échanger sur la situation
          de votre commune, vos besoins et vos attentes - gratuit et sans
          engagement.
        </StepCardDescription>
      </StepCardContent>
    </StepCard>
  );
}
