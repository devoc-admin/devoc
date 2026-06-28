import { LinkIcon, MailIcon, PhoneIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ReferentCellProps = {
  name: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
};

export function ReferentCell({
  name,
  email,
  phone,
  linkedin,
}: ReferentCellProps) {
  if (!name?.trim()) {
    return (
      <span className="rounded-full bg-zinc-500/10 px-2.5 py-1 text-xs text-zinc-400">
        N.r.
      </span>
    );
  }

  const hasContactInfo = Boolean(
    email?.trim() || phone?.trim() || linkedin?.trim()
  );

  // 👤 Sans info de contact : simple texte
  if (!hasContactInfo) {
    return <span className="truncate">{name}</span>;
  }

  // 🔗 Avec info de contact : nom cliquable + infobulle récapitulative
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "cursor-default truncate text-blue-500",
            "underline decoration-dotted underline-offset-2"
          )}
        >
          {name}
        </span>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col gap-y-2 p-3">
        <span className="font-semibold">{name}</span>
        <div className="flex flex-col gap-y-1.5">
          {email?.trim() && (
            <ReferentLink href={`mailto:${email.trim()}`}>
              <MailIcon className="shrink-0" size={14} />
              <span className="truncate">{email.trim()}</span>
            </ReferentLink>
          )}
          {phone?.trim() && (
            <ReferentLink href={`tel:${phone.replace(/\s+/g, "")}`}>
              <PhoneIcon className="shrink-0" size={14} />
              <span className="truncate">{phone.trim()}</span>
            </ReferentLink>
          )}
          {linkedin?.trim() && (
            <ReferentLink href={linkedin.trim()}>
              <LinkIcon className="shrink-0" size={14} />
              <span className="truncate">LinkedIn</span>
            </ReferentLink>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function ReferentLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={cn(
        "flex items-center gap-x-1.5",
        "text-blue-300 hover:text-blue-200 hover:underline"
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
