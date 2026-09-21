export function ContactLink({ href, icon, label, newPage }: ContactLinkType) {
  return (
    <div className="flex items-center gap-2.5 transition-colors hover:text-orange-red">
      {icon}
      <a
        aria-label={
          newPage ? `${label} (ouvre dans une nouvelle fenêtre)` : label
        }
        className="cursor-pointer transition-colors"
        href={href}
        rel={newPage ? "noopener noreferrer" : undefined}
        target={newPage ? "_blank" : "_self"}
        title={
          newPage ? `Ouvrir ${label} dans une nouvelle fenêtre` : undefined
        }
      >
        {label}
      </a>
    </div>
  );
}

export interface ContactLinkType {
  href: string;
  icon: React.ReactNode;
  id: string;
  label: string;
  newPage?: boolean;
}
