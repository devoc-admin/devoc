import { motion } from "motion/react";
import { useId } from "react";

// Centres approximatifs des 5 grandes métropoles (coordonnées relatives au viewBox 0 0 248 260)

export function FranceMapGauge({
  percent = 75,
  className,
}: {
  percent?: number;
  className?: string;
}) {
  const titleId = useId();
  const clamped = Math.min(100, Math.max(0, percent));
  // Jauge circulaire autour de la carte: longueur d'un cercle fictif
  const radius = 135; // un peu plus grand que la carte
  const circ = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circ;

  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <motion.svg
        animate={{ opacity: 1, scale: 1 }}
        aria-labelledby={titleId}
        className="h-auto w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        role="img"
        transition={{ duration: 0.8 }}
        viewBox="0 0 520 520"
      >
        <title
          id={titleId}
        >{`Carte de France — concentration de l'expertise: ${clamped}%`}</title>
        {/* Jauge cercle arrière */}
        <circle
          className="opacity-40"
          cx={260}
          cy={260}
          fill="none"
          r={radius}
          stroke="var(--border)"
          strokeWidth={14}
        />
        {/* Jauge progression (effet doux sans néon) */}
        <motion.circle
          animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
          cx={260}
          cy={260}
          fill="none"
          initial={{ strokeDasharray: `0 ${circ}` }}
          r={radius}
          stroke="var(--primary)"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          strokeWidth={14}
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.2))" }}
          transform="rotate(-90 260 260)"
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {/* Import carte France centrée (on scale pour rentrer dans le cercle) */}
        <g transform="translate(180 150) scale(1.1)">
          <path
            className="animate-breath"
            d="M231.992,197.322 230.32,181.434 222.2,172.344 231.777,167.866 224.574,151.843 228.863,148.714 221.526,134.715
              208.767,135.551 228.513,103.451 237.01,100.106 235.769,85.378 239.329,70.03 235.337,58.08 219.611,54.033 212.84,47.857
              167.874,33.911 165.608,23.417 140.86,8.812 137.69,2 120.426,8.285 120.561,22.69 116.326,31.537 94.827,41.86 94.727,46.48
              84.882,50.661 69.751,46.606 66.244,38.244 54.069,39.387 60.381,59.834 58.978,71.027 37.291,72.16 27.483,62.963 2.008,67.468
              3.517,86.931 40.177,104.477 48.728,116.561 45.869,123.143 51.614,132.637 65.048,138.868 54.042,217.472 57.576,233.117
              90.337,247.606 99.305,245.161 129.139,258 149.639,249.059 149.262,237.811 168.089,220.467 197.789,225.322 210.844,232.416
              226.328,227.857 245.992,201.017"
            fill="var(--muted)"
            stroke="var(--border)"
            strokeWidth={3}
          />
        </g>
        {/* Pourcentage */}
        <motion.text
          animate={{ opacity: 1, scale: 1 }}
          className="font-kanit"
          dominantBaseline="middle"
          fill="var(--foreground)"
          fontSize={72}
          fontWeight={700}
          initial={{ opacity: 0, scale: 0.8 }}
          textAnchor="middle"
          transition={{ delay: 0.4, duration: 0.8 }}
          x={260}
          y={260}
        >
          {clamped}%
        </motion.text>
      </motion.svg>
      <div className="-mt-3 text-muted-foreground text-xs">
        <ul>
          <li>Concentration de l'expertise numérique</li>
          <li>
            Source:{" "}
            <a
              className="underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/60"
              href="https://www.insee.fr/"
              rel="noopener noreferrer"
              target="_blank"
            >
              INSEE
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
