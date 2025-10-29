import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  // In production, these would come from CMS
  const contact = {
    address: "Place de la Mairie, 11400 Lasbordes",
    email: "mairie@lasbordes11400.fr",
    phone: "04 68 XX XX XX",
  };

  return (
    <div className="bg-primary text-primary-foreground text-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link
              className="flex items-center gap-2 rounded-sm hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
              href={`mailto:${contact.email}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              <span>{contact.email}</span>
            </Link>
            <Link
              className="flex items-center gap-2 rounded-sm hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              <span>{contact.phone}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-4 w-4" />
            <span>{contact.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
