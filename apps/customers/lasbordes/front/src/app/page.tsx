import { Hero } from "@/components/features/hero";
import { HoursSection } from "@/components/features/hours-section";
import { MapSection } from "@/components/features/map-section";
import { NewsSection } from "@/components/features/news-section";
import { ServicesGrid } from "@/components/features/services-grid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <HoursSection />
      <ServicesGrid />
      <MapSection />
    </>
  );
}
