import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import ContactForm from "@/app/components/contact-form";
import SectionTitle from "@/app/components/section-title";
import { LaserFlow } from "@/components/react-bits/laser-flow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ContactItem = {
  content: string;
  href: string;
  icon: React.ReactNode;
  title: string;
};

const contactItems: ContactItem[] = [
  {
    content: "sudweb@contact.fr",
    href: "mailto:sudweb@contact.fr",
    icon: <MailIcon size={26} />,
    title: "Email",
  },
  {
    content: "+33 6 20 23 98 38",
    href: "tel:+33620239838",
    icon: <PhoneIcon size={26} />,
    title: "Téléphone",
  },
  {
    content: "Carcassonne, France",
    href: "https://maps.app.goo.gl/1234567890",
    icon: <MapPinIcon size={26} />,
    title: "Adresse",
  },
];

export default function Contact() {
  return (
    <div
      className="relative flex w-full flex-col items-center gap-24 overflow-hidden bg-gradient-to-br bg-zinc-950 px-6 py-24"
      id="contact"
    >
      {/* 🆎 Title */}
      <SectionTitle
        className="z-10"
        description="Prêt à démarrer votre projet ? Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé."
        title="Contactez-nous"
      />
      {/* 🃏 Cards */}
      <div
        className={cn(
          "z-1 flex w-full justify-center gap-6 md:max-w-[1400px]",
          "flex-col",
          "md:flex-row md:items-start"
        )}
      >
        <div className={cn("flex flex-col gap-6", "order-2", "md:order-1")}>
          {contactItems.map((item) => (
            <ContactCard key={item.title} {...item} />
          ))}
          {/* 📧 Response rapide garantie*/}
          <Card
            animation={false}
            className="border-primary/30 bg-primary/5 md:max-w-[450px]"
          >
            <CardHeader>
              <CardTitle className="text-wrap text-2xl">
                Réponse rapide garantie
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Nous nous engageons à répondre à tous les messages dans les 24
              heures ouvrées.
            </CardContent>
            <CardFooter className="font-bold text-primary text-sm">
              {/* 🟢 Équipe disponible */}
              <div className="mr-2 size-2 rounded-full bg-green-500" />
              <span>Équipe disponible</span>
            </CardFooter>
          </Card>
        </div>

        {/* 📝 Contact form */}
        <Card
          animation={false}
          className="relative order-1 grow overflow-visible md:order-2"
        >
          <div className="-translate-y-[50%] mask-t-from-70% absolute top-0 left-0 hidden h-160 md:block">
            <LaserFlow color="#c084fc" fogIntensity={0} horizontalSizing={2} />
          </div>
          <CardHeader>
            <CardTitle className={cn("text-center text-2xl", "xs:text-left")}>
              Démarrons votre projet
            </CardTitle>
          </CardHeader>
          <CardContent className={cn("z-1", "max-xs:p-3")}>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ----------------------------------
function ContactCard({
  icon,
  content,
  title,
  href,
}: {
  icon: React.ReactNode;
  content: string;
  title: string;
  href: string;
}) {
  return (
    <Card className="hidden p-0 pr-14 md:block">
      <a className="flex items-center gap-6 p-6" href={href}>
        <div
          className={cn(
            "grid w-fit items-center rounded-lg p-2.5 text-primary",
            "bg-primary/15",
            "group-hover:bg-primary/20"
          )}
        >
          {icon}
        </div>
        <CardContent className="m-0 p-0">
          <CardTitle>{title}</CardTitle>
          <div>{content}</div>
        </CardContent>
      </a>
    </Card>
  );
}
