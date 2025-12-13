import { Timeline } from "@/components/aceternity/timeline";

export function TimelineProjections() {
  const data = [
    {
      content: (
        <div>
          <p className="mb-8 font-semibold text-3xl! text-neutral-800 md:text-sm dark:text-neutral-200">
            🚀 Lancement du collectif et réalisation des premières missions
          </p>
          <div className="grid max-w-[450px] grid-cols-[1fr_auto] gap-y-6 text-xl">
            <div className="font-bold">Nombre de clients cible</div>
            <div>~6-10</div>
            <div className="font-bold">Chiffres d'affaires estimé</div>
            <div>180k€</div>
            <div className="font-bold">Charges</div>
            <div>8.5k€ </div>
            <div className="font-bold">Résultat</div>
            <div>171.5k€ </div>
            <div className="font-bold">ETP</div>
            <div>2</div>
          </div>
        </div>
      ),
      title: "2026",
    },
    {
      content: (
        <div>
          <p className="mb-8 font-semibold text-3xl! text-neutral-800 md:text-sm dark:text-neutral-200">
            🏗️ Consolidation des activités et développement de nouvelles missions
          </p>
          <div className="grid max-w-[450px] grid-cols-[1fr_auto] gap-y-6 text-xl">
            <div className="font-bold">Nombre de clients cible</div>
            <div>~10-15</div>
            <div className="font-bold">Chiffres d'affaires estimé</div>
            <div>360k€ </div>
            <div className="font-bold">Charges</div>
            <div>10k€ </div>
            <div className="font-bold">Résultat</div>
            <div>350k€ </div>
            <div className="font-bold">ETP</div>
            <div>2</div>
          </div>
        </div>
      ),
      title: "2027",
    },
    {
      content: (
        <div>
          <p className="mb-8 font-semibold !text-3xl text-neutral-800 md:text-sm dark:text-neutral-200">
            ↔️ Expansion
          </p>
          <div className="grid max-w-[450px] grid-cols-[1fr_auto] gap-y-6 text-xl">
            <div className="font-bold">Nombre de clients cible</div>
            <div>~15-20</div>
            <div className="font-bold">Chiffres d'affaires estimé</div>
            <div>500k€</div>
            <div className="font-bold">Charges</div>
            <div>15k€</div>
            <div className="font-bold">Résultat</div>
            <div>485k€ </div>
            <div className="font-bold">ETP</div>
            <div>3</div>
          </div>
        </div>
      ),
      title: "2028",
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
