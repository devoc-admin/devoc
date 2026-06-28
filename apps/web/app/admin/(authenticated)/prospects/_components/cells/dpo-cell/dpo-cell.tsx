import { CheckIcon, XIcon } from "lucide-react";

export function DPOCell({ value }: { value: boolean | null }) {
  if (value === true) {
    return <CheckIcon className="text-green-500" size={18} />;
  }
  if (value === false) {
    return <XIcon className="text-red-500" size={18} />;
  }
  return (
    <span className="rounded-full bg-zinc-500/10 px-2.5 py-1 text-xs text-zinc-400">
      N.r.
    </span>
  );
}
