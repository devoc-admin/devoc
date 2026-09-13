import { ExternalLinkIcon } from "lucide-react";

export function NameCell({
  website,
  name,
}: {
  website?: string | null;
  name: string;
}) {
  if (!website) return <span>{name}</span>;
  return (
    <a
      className="flex items-center gap-x-1.5 text-blue-500 hover:underline"
      href={website}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="truncate">{name}</span>
      <ExternalLinkIcon className="shrink-0" size={14} />
    </a>
  );
}
