import { Mail, MapPin, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navigationItems = [
    { href: "#mairie", label: "Mairie" },
    { href: "#infos", label: "Infos pratiques" },
    { href: "#histoire", label: "Histoire" },
    { href: "#actualites", label: "Actualités" },
    { href: "#culture", label: "Culture" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-card/95 backdrop-blur-sm">
      {/* Barre d'informations rapides */}
      <div className="bg-primary py-2 text-primary-foreground">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 px-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>04 68 94 31 48</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>mairie.lasbordes@wanadoo.fr</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>11400 Lasbordes, Aude</span>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
              L
            </div>
            <div>
              <h1 className="font-bold text-foreground text-xl">Lasbordes</h1>
              <p className="text-muted-foreground text-sm">Commune de l'Aude</p>
            </div>
          </div>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navigationItems.map((item) => (
            <a
              className="font-medium text-foreground transition-colors duration-200 hover:text-primary"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Menu mobile */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button size="icon" variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80" side="right">
            <nav className="mt-8 flex flex-col space-y-6">
              {navigationItems.map((item) => (
                <a
                  className="font-medium text-foreground text-lg transition-colors duration-200 hover:text-primary"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
