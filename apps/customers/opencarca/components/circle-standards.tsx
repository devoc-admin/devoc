import { motion } from "motion/react";
import { useId } from "react";

export function CircleStandards() {
  const titleId = useId();
  const ringR = 70; // rayon du cercle principal (réduit pour laisser plus d'espace visuel)
  const labels = [
    { angle: -90, text: "RGAA" },
    { angle: 30, text: "RGPD" },
    { angle: 150, text: "RGS" },
  ];
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
      <motion.svg
        aria-labelledby={titleId}
        className="w-full"
        initial={{ opacity: 0, scale: 0.96 }}
        role="img"
        transition={{ duration: 0.5 }}
        viewBox="0 0 240 240"
        viewport={{ once: true }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <title id={titleId}>
          Normes autour de l’utilisateur — RGAA, RGPD, RGS
        </title>
        <circle
          cx={120}
          cy={120}
          fill="none"
          r={ringR}
          stroke="var(--border)"
          strokeWidth={6}
        />
        {labels.map((l) => {
          const rad = (l.angle * Math.PI) / 180;
          const x = 120 + ringR * Math.cos(rad);
          const y = 120 + ringR * Math.sin(rad);
          return (
            <g key={l.text}>
              <circle cx={x} cy={y} fill="var(--primary)" r={8} />
              <text
                className="fill-current"
                fontSize={12}
                textAnchor="middle"
                x={x}
                y={y - 12}
              >
                {l.text}
              </text>
            </g>
          );
        })}
        <text
          className="fill-current"
          dominantBaseline="middle"
          fontSize={12}
          textAnchor="middle"
          x={120}
          y={120}
        >
          Administration publique
        </text>
        <text
          className="fill-current"
          dominantBaseline="middle"
          fontSize={12}
          textAnchor="middle"
          x={120}
          y={138}
        >
          TPE, PME
        </text>
      </motion.svg>
    </div>
  );
}
