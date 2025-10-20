import ActualitesSection from "@/components/ActualitesSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <Hero />
    <ServicesSection />
    <ActualitesSection />
    <Footer />
  </div>
);

export default Index;
