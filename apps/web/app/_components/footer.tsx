import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import PurpleCircleImage from "@/assets/purple-circle.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Icon from "@/public/icon.svg";

function Footer() {
  return (
    <div className="relative overflow-hidden bg-zinc-950">
      <div className="rounded-t-4xl border-t border-t-zinc-600/10 bg-linear-to-br from-primary/5 via-transparent to-primary/5 px-6 py-12">
        <div className="relative mx-auto max-w-[1300px] space-y-8">
          <PurpleCircle />
          {/* 1️⃣ Row */}
          <div
            className={cn(
              "relative space-y-8",
              "lg:mx-auto lg:grid lg:grid-cols-5"
            )}
          >
            {/* 🐲 Logo and contact */}
            <div className="col-span-2 flex flex-col gap-5">
              <Logo />
              <div className="max-w-175 text-muted-foreground text-sm">
                Collectif de développeurs implanté en Occitanie. Nous créons des
                solutions digitales sur-mesure pour propulser votre
                organisation.
              </div>
              <ContactLinks />
            </div>

            {/* 🔗 Internal links */}
            <GroupsInternalLinks />
          </div>

          {/* 2️⃣ row - 📧 Newsletter */}
          {/* <Newsletter /> */}

          {/* 3️⃣ row -📝 Copyright */}
          <div
            className={cn(
              "relative flex flex-col items-center gap-4",
              "sm:flex-row sm:justify-between sm:gap-0"
            )}
          >
            <Copyright />
            {/*<LegalLinks/>*/}
          </div>
        </div>
      </div>
      <GradientLine />
    </div>
  );
}

export default Footer;

// ------------------------------------------------------------------------------------------------
function PurpleCircle() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={cn(
        "absolute right-0 bottom-0 z-0 translate-x-[80%] opacity-40 hue-rotate-125",
        "mask-radial-[135%_117%] mask-radial-at-bottom-right mask-radial-from-0% mask-radial-to-92%"
      )}
      height={300}
      src={PurpleCircleImage}
      width={300}
    />
  );
}

// ------------------------------------------------------------------------------------------------
function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl">
      <Image alt="" aria-hidden="true" height={22} src={Icon} width={22} />
      <div>
        <span className="font-black text-primary-foreground tracking-tighter">
          Dev'
        </span>
        <span className="bg-linear-to-br from-[#FF5709] to-[#FFC731] bg-clip-text font-bold font-regular text-transparent tracking-tighter">
          Oc
        </span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
type ContactLink = {
  href: string;
  icon: React.ReactNode;
  label: string;
  id: string;
  newPage?: boolean;
};

const contactLinks: ContactLink[] = [
  {
    href: "mailto:contact@dev-oc.fr",
    icon: <MailIcon size={16} />,
    id: "email",
    label: "contact@dev-oc.fr",
    newPage: false,
  },
  {
    href: "tel:+33620239838",
    icon: <PhoneIcon size={16} />,
    id: "phone1",
    label: "+33 6 20 23 98 38",
    newPage: false,
  },
  {
    href: "tel:+33658889701",
    icon: <PhoneIcon size={16} />,
    id: "phone2",
    label: "+33 6 58 88 97 01",
  },
  {
    href: "https://maps.app.goo.gl/u8M4QDvL5pA4o4Xt6",
    icon: <MapPinIcon size={16} />,
    id: "address",
    label: "Carcassonne, France",
    newPage: true,
  },
];

function ContactLinks() {
  return (
    <div className="flex flex-col gap-2 font-regular text-muted-foreground">
      {contactLinks.map((link) => (
        <ContactLink key={link.id} {...link} />
      ))}
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  newPage,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  newPage?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm hover:text-primary">
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

// ------------------------------------------------------------------------------------------------
type GroupInternalLink = {
  id: string;
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const groupLinks: GroupInternalLink[] = [
  {
    id: "navigation",
    links: [
      {
        href: "/#services",
        name: "Services",
      },
      {
        href: "/#realisations",
        name: "Réalisations",
      },
      {
        href: "/#processus",
        name: "Notre méthode",
      },
      {
        href: "/#us",
        name: "Le collectif",
      },
      {
        href: "/#contact",
        name: "Contact",
      },
    ],
    title: "Navigation",
  },
];

function GroupsInternalLinks() {
  return (
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
  );
}

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
      <div className="mb-5 pl-6 font-kanit font-semibold text-lg text-primary-foreground">
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
function Copyright() {
  return (
    <div className="text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} Dev'Oc. Tous droits réservés.
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
// type LegalLinkProps = {
//   href: string;
//   name: string;
// };

// const legalLinks: LegalLink[] = [
//   {
//     href: "/mentions-legales",
//     name: "Mentions légales",
//   },
//   {
//     href: "/politique-de-confidentialite",
//     name: "Politique de confidentialité",
//   },
//   {
//     href: "/cookies",
//     name: "Cookies",
//   },
// ];

// function LegalLinks() {
//   return (
//     <div
//       className={cn(
//         "flex items-center gap-4",
//         "text-muted-foreground text-sm",
//         "flex-col",
//         "sm:flex-row"
//       )}
//     >
//       {legalLinks.map((link) => (
//         <LegalLink key={link.name} {...link} />
//       ))}
//     </div>
//   );
// }

// function LegalLink({ href, name }: LegalLinkProps) {
//   return (
//     <div className="flex flex-col items-center gap-4 text-muted-foreground text-sm sm:flex-row">
//       <a
//         className="transition-colors hover:text-primary"
//         href={href}
//         key={name}
//       >
//         {name}
//       </a>
//     </div>
//   );
// }

// ------------------------------------------------------------------------------------------------
// biome-ignore lint/correctness/noUnusedVariables: later
function Newsletter() {
  return (
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
            "cursor-pointer bg-primary/90 text-primary-foreground text-sm transition-colors hover:bg-primary",
            "xs:text-[1rem]",
            "sm:px-10"
          )}
        >
          S'abonner
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------
function GradientLine() {
  return (
    <div className="absolute bottom-0 left-0 h-2 w-screen bg-linear-to-r from-primary via-orange-500 to-primary-lighter" />
  );
}
