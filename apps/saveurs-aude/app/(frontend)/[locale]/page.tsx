import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20">
      <h1 className="sr-only">Saveurs d'Aude - Épicerie Fine</h1>
      <Image
        alt="Saveurs d'Aude - Épicerie Fine"
        height={314}
        priority
        src="/saveurs_aude_logo_no_margin.svg"
        width={336}
      />
    </div>
  );
}
