import { CodeXmlIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LINKS = [
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

function Footer() {
  return (
    <div
      className="bg-zinc-950 bg-gradient-to-br from-purple-950/10
    10 via-transparent to-purple-950/10 border-t border-t-zinc-600/10 py-10"
    >
      <div className="w-[90vw] max-w-[1000px] mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-5 gap-8 mx-auto">
          <div className="flex flex-col gap-5 col-span-2">
            <div className="text-2xl font-black flex items-center gap-2">
              <div className="p-2 bg-purple-900/20 rounded-lg">
                <CodeXmlIcon className="text-purple-600" size={16} />
              </div>
              <div>
                <span className="text-purple-600">Sud</span>
                <span className="text-white">Web</span>
              </div>
            </div>
            <div className="text-zinc-400 text-sm">
              Agence spécialisée dans le développement web moderne. Nous créons
              des solutions digitales sur mesure pour propulser votre
              entreprise.
            </div>
            {/* 📨 Contact */}
            <div className="flex flex-col gap-2 text-zinc-400 font-regular">
              <div className="flex items-center gap-2.5 hover:text-purple-600 text-sm">
                <MailIcon className="text-purple-600" size={16} />
                <a
                  href="mailto:sudweb@contact.fr"
                  className="transition-colors cursor-pointer"
                >
                  sudweb@contact.fr
                </a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-purple-600 text-sm">
                <PhoneIcon className="text-purple-600" size={16} />
                <a
                  href="tel:+33620239838"
                  className="transition-colors cursor-pointer"
                >
                  +33 6 20 23 98 38
                </a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-purple-600 text-sm">
                <MapPinIcon className="text-purple-600" size={16} />
                <a
                  href="https://maps.app.goo.gl/1234567890"
                  className="transition-colors cursor-pointer"
                >
                  Carcassonne, France
                </a>
              </div>
            </div>
          </div>
          {LINKS.map(({ id, title, links }) => (
            <div key={id}>
              <div className="text-lg text-white font-bold mb-5">{title}</div>
              <div className="flex flex-col gap-3 text-zinc-400">
                {links.map((link) => (
                  <a
                    className="text-sm transition-colors cursor-pointer hover:text-purple-600"
                    key={link.name}
                    href={link.href}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* 📧 Newsletter */}
        <div className="flex items-center border-t border-t-zinc-600/20 border-b border-b-zinc-600/20 justify-between gap-4 py-6">
          <div className="flex flex-col gap-2">
            <div className="text-white text-lg font-bold">Restez informé</div>
            <div className="text-zinc-400 text-sm">
              Recevez nos dernières actualités et nouveautés
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="email"
              placeholder="Email"
              className="bg-zinc-950 text-white h-10 text-[1rem]"
            />
            <Button className="bg-purple-600 text-white text-[1rem]" size="lg">
              S'abonner
            </Button>
          </div>
        </div>
        {/* 📝 Copyright */}
        <div className="flex items-center justify-between">
          <div className="text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} SudWeb. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <a
              href="/mentions-legales"
              className="hover:text-purple-600 transition-all"
            >
              Mentions légales
            </a>
            <a
              href="/politique-de-confidentialite"
              className="hover:text-purple-600 transition-all"
            >
              Politique de confidentialité
            </a>
            <a href="/cookies" className="hover:text-purple-600 transition-all">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
