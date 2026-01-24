import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export type ContactItem = {
  content: string | React.ReactNode;
  href: string;
  icon: React.ReactNode;
  title: string;
  id: string;
};

export const contactItems: ContactItem[] = [
  {
    content: "contact@dev-oc.fr",
    href: "mailto:contact@dev-oc.fr",
    icon: <MailIcon size={26} />,
    id: "email",
    title: "Email",
  },
  {
    content: (
      <div className="mt-2 flex flex-col">
        <span>+33 6 20 23 98 38</span>
        <span>+33 6 58 88 97 01</span>
      </div>
    ),
    href: "tel:+33620239838",
    icon: <PhoneIcon size={26} />,
    id: "phone1",
    title: "Téléphone",
  },
  {
    content: "Carcassonne, France",
    href: "https://maps.app.goo.gl/HSWRizckJvyuXuDP7",
    icon: <MapPinIcon size={26} />,
    id: "address",
    title: "Adresse",
  },
];
