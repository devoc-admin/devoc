import { MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
import SectionTitle from "@/app/components/section-title";
import { LaserFlow } from "@/components/react-bits/laser-flow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="p-0 pr-14 hidden md:block">
      <a href={href} className="flex items-center gap-6 p-6">
        <div className="transition-all grid items-center p-2.5 w-fit rounded-lg group-hover:bg-purple-800/30 bg-purple-900/20 text-purple-900">
          {icon}
        </div>
        <CardContent className="m-0 p-0">
          <div className="text-white font-semibold">{title}</div>
          <div className="text-base">{content}</div>
        </CardContent>
      </a>
    </Card>
  );
}

export default function Contact() {
  return (
    <div className="relative overflow-hidden bg-zinc-950 bg-gradient-to-br w-full bg-zinc-950 px-6 py-24 flex flex-col items-center gap-24">
      {/* 🆎 Title */}
      <div className="z-10 flex flex-col gap-4 mx-auto text-center mb-0 md:mb-16">
        <SectionTitle
          title="Contactez-nous"
          description="Prêt à démarrer votre projet ? Contactez notre équipe pour discuter de vos besoins et obtenir un devis personnalisé."
        />
      </div>
      {/* 🃏 Cards */}
      <div className="flex max-w-[1400px] md:flex-row flex-col md:items-start gap-6 w-full justify-center z-1">
        {/* Contact cards */}
        <div className="flex order-2 md:order-1 flex-col gap-6 min-w-[335px]">
          <ContactCard
            icon={<MailIcon size={28} />}
            content="sudweb@contact.fr"
            title="Email"
            href="mailto:sudweb@contact.fr"
          />
          <ContactCard
            icon={<PhoneIcon size={28} />}
            content="+33 6 20 23 98 38"
            title="Téléphone"
            href="tel:+33620239838"
          />
          <ContactCard
            icon={<MapPinIcon size={28} />}
            content="Carcassonne, France"
            title="Adresse"
            href="https://maps.app.goo.gl/1234567890"
          />
          <Card
            animation={false}
            className="bg-purple-950/10 border-purple-950/50 max-w-[450px]"
          >
            <CardHeader>
              <CardTitle className="text-2xl">
                Réponse rapide garantie
              </CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400">
              Nous nous engageons à répondre à tous les messages dans les 24
              heures ouvrées.
            </CardContent>
            <CardFooter className="text-purple-700 text-sm font-bold">
              <div className="size-2 bg-green-500 rounded-full mr-2"></div>
              <span>Équipe disponible</span>
            </CardFooter>
          </Card>
        </div>
        {/* Contact form */}
        <Card
          className="grow relative overflow-visible order-1 md:order-2"
          animation={false}
        >
          <div className="hidden md:block absolute h-160 -translate-y-[50%] top-0 left-0 mask-t-from-70%">
            <LaserFlow horizontalSizing={2} fogIntensity={0} color="#c084fc" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl !text-white">
              Démarrons votre projet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-2 gap-6">
              {/* 🧑 Nom */}
              <div className="col-span-1">
                <Label htmlFor="name">Nom *</Label>
                <Input
                  type="text"
                  placeholder="Nom"
                  className="bg-zinc-950 col-span-1"
                />
              </div>

              {/* 📧 Email */}
              <div className="col-span-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-zinc-950 col-span-1"
                />
              </div>

              {/* 🏢 Entreprise */}
              <div className="col-span-2">
                <Label htmlFor="email">Entreprise</Label>
                <Input
                  className="bg-zinc-950 col-span-2"
                  type="email"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              {/* 📝 Message */}
              <div className="col-span-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  className="h-36 bg-zinc-950"
                  placeholder="Décrivez votre projet, vos besoins, vos objectifs etc."
                />
              </div>

              <Button
                type="submit"
                className="gap-3 cursor-pointer font-semibold text-lg py-6 col-span-2 bg-purple-700 rounded-xl hover:bg-purple-800"
              >
                <SendIcon size={20} />
                <span>Envoyer le message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
