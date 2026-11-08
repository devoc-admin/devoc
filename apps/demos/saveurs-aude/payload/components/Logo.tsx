import { BASE_PATH } from "@/lib/base-path";

export default function Logo() {
  return (
    <a
      href="/"
      rel="noopener"
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        textDecoration: "none",
      }}
      target="_blank"
    >
      {/* biome-ignore lint/performance/noImgElement: Payload admin component, next/image not available */}
      <img
        alt="Saveurs d'Aude"
        height={80}
        src={`${BASE_PATH}/saveurs_aude_logo_no_margin.svg`}
        width={80}
      />
      <span
        style={{
          color: "#6B3A2A",
          fontFamily: "'Playfair Display', serif",
          fontSize: "36px",
          fontWeight: 600,
        }}
      >
        Saveurs d&apos;Aude
      </span>
      <span>Panneau d'administration</span>
    </a>
  );
}
