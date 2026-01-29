"use client";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCrawlCardContext } from "../../crawl-card-context";

export function ContactInfoSection() {
  const { crawl } = useCrawlCardContext();
  if (!crawl) return null;

  const hasPhones = crawl.contactPhones && crawl.contactPhones.length > 0;
  const hasEmails = crawl.contactEmails && crawl.contactEmails.length > 0;
  const hasAddresses =
    crawl.contactAddresses && crawl.contactAddresses.length > 0;

  return (
    <div className="space-y-2 border-border border-t pt-4">
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Coordonnées
      </h4>
      <div className="space-y-1">
        {/* 📞 Phones */}
        <div className="flex items-start gap-x-2 text-sm">
          <PhoneIcon className="mt-0.5 shrink-0" size={14} />
          {hasPhones ? (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactPhones?.map((phone) => (
                <Tooltip key={phone.number}>
                  <TooltipTrigger asChild>
                    <a
                      className="hover:underline"
                      href={`tel:${phone.number.replace(/[\s.-]/g, "")}`}
                    >
                      {phone.number}
                      {phone.type === "mobile" && (
                        <span className="ml-1 text-muted-foreground text-xs">
                          (mobile)
                        </span>
                      )}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    {getPhoneTypeLabel(phone.type)}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ) : (
            "—"
          )}
        </div>
        {/* 📧 Emails */}
        <div className="flex items-start gap-x-2 text-sm">
          <MailIcon className="mt-0.5 shrink-0" size={14} />
          {hasEmails ? (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactEmails?.map((email) => (
                <Tooltip key={email.email}>
                  <TooltipTrigger asChild>
                    <a
                      className="hover:underline"
                      href={`mailto:${email.email}`}
                    >
                      {email.email}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    {email.isGeneric ? "Email générique" : "Email"}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ) : (
            "—"
          )}
        </div>
        {/* 📍 Addresses */}
        <div className="flex items-start gap-x-2 text-sm">
          <MapPinIcon className="mt-0.5 shrink-0" size={14} />
          {hasAddresses ? (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {crawl.contactAddresses?.map((address) => (
                <span key={address.postalCode}>
                  {address.postalCode} {address.city}
                </span>
              ))}
            </div>
          ) : (
            "—"
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------
function getPhoneTypeLabel(
  type: "mobile" | "landline" | "fax" | "unknown" | undefined
): string {
  if (type === "mobile") return "Mobile";
  if (type === "landline") return "Fixe";
  if (type === "fax") return "Fax";
  return "Téléphone";
}
