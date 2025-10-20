import { ArrowRight, Calendar, Users } from "lucide-react";
import heroImage from "@/assets/lasbordes-hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay avec gradient */}
      <div className="hero-gradient absolute inset-0" />

      {/* Contenu */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="hero-text mb-6 font-bold text-5xl md:text-7xl">
            Bienvenue à Lasbordes
          </h1>
          <p className="hero-text mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
            Découvrez notre commune authentique au cœur de l'Aude, riche
            d'histoire et tournée vers l'avenir
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="border-white/30 bg-white/20 px-8 py-6 text-lg text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
              size="lg"
              variant="secondary"
            >
              <Users className="mr-2 h-5 w-5" />
              Services municipaux
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              className="border-white/50 bg-transparent px-8 py-6 text-lg text-white transition-all duration-300 hover:bg-white/10"
              size="lg"
              variant="outline"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Actualités
            </Button>
          </div>

          {/* Statistiques */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="hero-text mb-2 font-bold text-4xl">~450</div>
              <div className="text-lg opacity-90">Habitants</div>
            </div>
            <div className="text-center">
              <div className="hero-text mb-2 font-bold text-4xl">1892</div>
              <div className="text-lg opacity-90">Année de création</div>
            </div>
            <div className="text-center">
              <div className="hero-text mb-2 font-bold text-4xl">11400</div>
              <div className="text-lg opacity-90">Code postal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flèche de scroll */}
      <div className="-translate-x-1/2 absolute bottom-8 left-1/2 transform animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
