import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import PurpleCircle from "@/assets/purple-circle.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Icon from "@/public/images/icon-64.png";

type GroupLink = {
  id: string;
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const groupLinks: GroupLink[] = [
  {
    id: "services",
    title: "Services",
    links: [
      {
        name: "Développement Web",
        href: "/services/developpement-web",
      },
      {
        name: "Applications Mobiles",
        href: "/services/applications-mobiles",
      },
      {
        name: "Référencement SEO",
        href: "/services/referencement-seo",
      },
      {
        name: "Design UX/UI",
        href: "/services/design-ux-ui",
      },
      {
        name: "E-commerce",
        href: "/services/e-commerce",
      },
      {
        name: "Automatisations IA",
        href: "/services/developpement-backend",
      },
    ],
  },
  {
    id: "entreprises",
    title: "Entreprises",
    links: [
      {
        name: "À propos",
        href: "/about",
      },
      {
        name: "Notre équipe",
        href: "/team",
      },
      {
        name: "Nos valeurs",
        href: "/values",
      },
      {
        name: "Carrières",
        href: "/careers",
      },
      {
        name: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    links: [
      {
        name: "Centre d'aide",
        href: "/support",
      },
      {
        name: "Contact",
        href: "/contact",
      },
      {
        name: "Documentation",
        href: "/documentation",
      },
      {
        name: "Statuts",
        href: "/status",
      },
      {
        name: "Politique de confidentialité",
        href: "/privacy",
      },
      {
        name: "Conditions d'utilisation",
        href: "/terms",
      },
    ],
  },
];

type ContactLink = {
  href: string;
  icon: React.ReactNode;
  label: string;
  id: string;
};

const contactLinks: ContactLink[] = [
  {
    href: "mailto:sudweb@contact.fr",
    icon: <MailIcon size={16} />,
    label: "sudweb@contact.fr",
    id: "email",
  },
  {
    href: "tel:+33620239838",
    icon: <PhoneIcon size={16} />,
    label: "+33 6 20 23 98 38",
    id: "phone",
  },
  {
    href: "https://maps.app.goo.gl/1234567890",
    icon: <MapPinIcon size={16} />,
    label: "Carcassonne, France",
    id: "address",
  },
];

type LegalLink = {
  href: string;
  name: string;
};

const legalLinks: LegalLink[] = [
  {
    href: "/mentions-legales",
    name: "Mentions légales",
  },
  {
    href: "/politique-de-confidentialite",
    name: "Politique de confidentialité",
  },
  {
    href: "/cookies",
    name: "Cookies",
  },
];

function Footer() {
  return (
    <div className="border-t border-t-zinc-600/10 bg-gradient-to-br bg-zinc-950 from-primary/5 via-transparent to-primary/5 px-6 py-12">
      <div className="relative mx-auto max-w-[1300px] space-y-8">
        {/* 🔮 Purple Circle */}
        <Image
          alt="Purple Circle"
          className="-mask-linear-70 mask-linear-from-0 mask-linear-to-80% absolute right-0 bottom-0 z-0 translate-x-[80%] opacity-40"
          height={300}
          src={PurpleCircle}
          width={300}
        />
        {/* 1️⃣ Row */}
        <div
          className={cn(
            "relative space-y-8",
            "lg:mx-auto lg:grid lg:grid-cols-5"
          )}
        >
          {/* 🐲 Logo and contact */}
          <div className="col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2 font-black text-2xl">
              <Image alt="Sud Web" height={32} src={Icon} width={32} />
              <div>
                <span className="bg-gradient-to-b from-[#db75f9] to-[#5d2cf0] bg-clip-text font-black text-transparent tracking-tighter">
                  Sud
                </span>
                <span className="text-primary-foreground tracking-tighter">
                  Web
                </span>
              </div>
            </div>
            <div className="max-w-[700px] text-muted-foreground text-sm">
              Agence spécialisée dans le développement web moderne. Nous créons
              des solutions digitales sur mesure pour propulser votre
              entreprise.
            </div>
            {/* 📞 Contact links */}
            <div className="flex flex-col gap-2 font-regular text-muted-foreground">
              {contactLinks.map((link) => (
                <ContactLink key={link.id} {...link} />
              ))}
            </div>
          </div>

          {/* 🔗 Internal links */}
          <div
            className={cn(
              "flex flex-col gap-8",
              "xs:grid xs:grid-cols-2",
              "sm:grid-cols-3",
              "lg:col-span-3 lg:grid-cols-subgrid"
            )}
          >
            {groupLinks.map((groupLink) => (
              <InternalLinks key={groupLink.id} {...groupLink} />
            ))}
          </div>
        </div>

        {/* 2nd row - 📧 Newsletter */}
        <div
          className={cn(
            "relative justify-between gap-x-8 gap-y-4",
            "border-t border-t-zinc-600/20 border-b border-b-zinc-600/20 py-6",
            "flex flex-col",
            "md:flex-row md:items-center"
          )}
        >
          {/* 🔤 Restez informés*/}
          <div>
            <div className="font-bold text-lg text-primary-foreground leading-none">
              Restez informé
            </div>
            <div className="text-muted-foreground text-sm">
              Recevez nos dernières actualités et nouveautés
            </div>
          </div>
          {/* 📨 Newsletter */}
          <div
            className={cn(
              "flex w-full grow flex-col gap-4",
              "sm:w-auto sm:flex-row sm:items-center sm:justify-end",
              "md:max-w-[500px]"
            )}
          >
            <Input
              className={cn(
                "h-10 bg-zinc-950 text-primary-foreground text-sm",
                "sm:text-[1rem]"
              )}
              placeholder="Email"
              type="email"
            />
            <Button
              className={cn(
                "bg-primary text-primary-foreground text-sm",
                "xs:text-[1rem]",
                "sm:px-10"
              )}
            >
              S'abonner
            </Button>
          </div>
        </div>

        {/* 3️⃣ Row -📝 Copyright */}
        <div
          className={cn(
            "relative flex flex-col items-center gap-4",
            "sm:flex-row sm:justify-between sm:gap-0"
          )}
        >
          {/* ©️ Copyright */}
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SudWeb. Tous droits réservés.
          </div>
          {/* 🔗 Legal links */}
          <div
            className={cn(
              "flex items-center gap-4",
              "text-muted-foreground text-sm",
              "flex-col",
              "sm:flex-row"
            )}
          >
            {legalLinks.map((link) => (
              <LegalLink key={link.name} {...link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

// ------------------------------------------------------------------------------------------------
function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm hover:text-primary">
      {icon}
      <a className="cursor-pointer transition-colors" href={href}>
        {label}
      </a>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
function InternalLinks({
  title,
  links,
}: {
  id: string;
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <div className="mb-5 pl-6 font-bold text-lg text-primary-foreground">
        {title}
      </div>
      <div className="flex flex-col gap-3 text-muted-foreground">
        {links.map((link) => (
          <a
            className="group flex cursor-pointer items-center gap-2 text-sm transition-colors hover:text-primary-foreground"
            href={link.href}
            key={link.name}
          >
            <ArrowRightIcon
              className="opacity-0 transition-opacity group-hover:opacity-100"
              size={16}
            />
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
function LegalLink({ href, name }: { href: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground text-sm sm:flex-row">
      <a
        className="transition-colors hover:text-primary"
        href={href}
        key={name}
      >
        {name}
      </a>
    </div>
  );
}
