import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import HowItWorks from "../components/home/HowItWorks";
import SupplierCTA from "../components/home/SupplierCTA";
import TrustSection from "../components/home/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <HowItWorks />
      <SupplierCTA />
      <TrustSection />
    </>
  );
}
