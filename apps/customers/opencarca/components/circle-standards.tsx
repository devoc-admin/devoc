import { motion } from "motion/react";
import { useId } from "react";

export function CircleStandards({ className }: { className?: string }) {
  const titleId = useId();
  const ringR = 70; // rayon du cercle principal
  const labels = [
    { angle: -90, text: "RGAA" },
    { angle: 30, text: "RGPD" },
    { angle: 150, text: "RGS" },
  ];
  const circ = 2 * Math.PI * ringR;
  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <motion.svg
        aria-labelledby={titleId}
        className="h-auto w-full"
        initial={{ opacity: 0, scale: 0.96 }}
        role="img"
        transition={{ duration: 0.5 }}
        viewBox="0 0 220 220"
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
        {/* Traînée animée qui tourne autour du cercle */}
        <motion.circle
          animate={{ strokeDashoffset: [0, -circ] }}
          cx={120}
          cy={120}
          fill="none"
          r={ringR}
          stroke="var(--primary)"
          strokeDasharray={`${Math.max(18, Math.round(circ * 0.18))} ${circ}`}
          strokeLinecap="round"
          strokeWidth={6}
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))" }}
          transition={{
            duration: 3.6,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        {labels.map((l) => {
          const rad = (l.angle * Math.PI) / 180;
          const x = 120 + ringR * Math.cos(rad);
          const y = 120 + ringR * Math.sin(rad);
          // Position du label : au-dessus si angle dans [-90,90], en dessous sinon
          const isTop = l.angle <= 0;
          const labelDy = isTop ? -18 : 28;
          return (
            <g key={l.text}>
              <circle cx={x} cy={y} fill="var(--primary)" r={8} />
              <text
                className="fill-current"
                fontSize={12}
                textAnchor="middle"
                x={x}
                y={y + labelDy}
              >
                {l.text}
              </text>
            </g>
          );
        })}
        <text
          className="fill-current"
          color="#daa30cff"
          dominantBaseline="middle"
          fontSize={60}
          textAnchor="middle"
          x={120}
          y={120}
        >
          0,5%
        </text>
      </motion.svg>
    </div>
  );
}
