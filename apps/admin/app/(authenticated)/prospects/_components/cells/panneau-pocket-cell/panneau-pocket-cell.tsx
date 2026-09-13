import { CheckIcon, XIcon } from "lucide-react";

export function PanneauPocketCell({ value }: { value: boolean | null }) {
  if (value === true) {
    return <CheckIcon className="text-green-500" size={18} />;
  }
  if (value === false) {
    return <XIcon className="text-red-500" size={18} />;
  }
  return <span className="text-muted-foreground">—</span>;
}
