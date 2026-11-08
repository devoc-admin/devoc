import { BASE_PATH } from "@/lib/base-path";

export default function Icon() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* biome-ignore lint/performance/noImgElement: Payload admin component, next/image not available */}
      <img
        alt="Saveurs d'Aude"
        height={250}
        src={`${BASE_PATH}/saveurs_aude_logo_no_margin.svg`}
        style={{ maxWidth: "100%" }}
        width={250}
      />
    </div>
  );
}
