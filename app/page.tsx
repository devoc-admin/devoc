"use client";

import { CodeIcon } from "lucide-react";
import Header from "@/app/components/header";
import ServiceCard from "@/app/components/service-card";
import Main from "./sections/main";
export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <div className="h-screen w-full bg-black p-8 grid place-items-center">
        <div className="flex flex-col gap-4 mx-auto text-center">
          <h2 className="text-white text-5xl font-bold">Nos Services</h2>
          <div className="text-gray-400 text-xl max-w-2xl mx-auto">
            Une gamme complète de services pour accompagner votre transformation
            digitale, de la conception à la mise en ligne et au-delà.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ServiceCard
            title="Développement Web"
            description="Sites web modernes et performants avec les dernières technologies (React, Vue, Angular)."
            features={[
              "Responsive Design",
              "Performance optimisée",
              "SEO intégré",
            ]}
            Icon={CodeIcon}
          />
          <ServiceCard
            title="Développement Web"
            description="Sites web modernes et performants avec les dernières technologies (React, Vue, Angular)."
            features={[
              "Responsive Design",
              "Performance optimisée",
              "SEO intégré",
            ]}
            Icon={CodeIcon}
          />
          <ServiceCard
            title="Développement Web"
            description="Sites web modernes et performants avec les dernières technologies (React, Vue, Angular)."
            features={[
              "Responsive Design",
              "Performance optimisée",
              "SEO intégré",
            ]}
            Icon={CodeIcon}
          />
        </div>
      </div>
    </>
  );
}
