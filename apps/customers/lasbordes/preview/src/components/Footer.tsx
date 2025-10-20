import { ExternalLink, Facebook, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Informations générales */}
          <div>
            <div className="mb-6 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20 font-bold text-lg">
                L
              </div>
              <div>
                <h3 className="font-bold text-lg">Lasbordes</h3>
                <p className="text-sm opacity-90">Commune de l'Aude</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Commune authentique au cœur de l'Aude, Lasbordes vous accueille
              dans un cadre préservé alliant tradition et modernité.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <div>
                  <p>2 Place de la Mairie</p>
                  <p>11400 Lasbordes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>04 68 94 31 48</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>mairie.lasbordes@wanadoo.fr</span>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="h-4 w-4" />
                <span>@MairieLasbordes</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Horaires</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lundi</span>
                <span>8h30-12h30</span>
              </div>
              <div className="flex justify-between">
                <span>Mardi</span>
                <span>Fermé</span>
              </div>
              <div className="flex justify-between">
                <span>Mercredi</span>
                <span>
                  8h30-12h30
                  <br />
                  13h30-17h
                </span>
              </div>
              <div className="flex justify-between">
                <span>Jeudi</span>
                <span>8h30-12h30</span>
              </div>
              <div className="flex justify-between">
                <span>Vendredi</span>
                <span>
                  8h30-12h30
                  <br />
                  13h30-16h30
                </span>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="mb-4 font-semibold text-lg">Liens utiles</h4>
            <div className="space-y-2">
              {[
                "Service public",
                "Préfecture de l'Aude",
                "Conseil départemental",
                "Région Occitanie",
                "Communauté de communes",
              ].map((link) => (
                <a
                  className="flex items-center text-sm opacity-90 transition-opacity hover:opacity-100"
                  href="#"
                  key={link}
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-primary-foreground/20 border-t py-4">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 text-sm md:flex-row">
          <div className="mb-2 flex items-center gap-4 md:mb-0">
            <span>© 2024 Mairie de Lasbordes - Tous droits réservés</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="opacity-90 transition-opacity hover:opacity-100"
              href="#"
            >
              Mentions légales
            </a>
            <span className="opacity-50">|</span>
            <a
              className="opacity-90 transition-opacity hover:opacity-100"
              href="#"
            >
              Plan du site
            </a>
            <span className="opacity-50">|</span>
            <a
              className="opacity-90 transition-opacity hover:opacity-100"
              href="#"
            >
              Accessibilité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
