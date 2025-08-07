
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PainSection from "@/components/PainSection";
import OutcomeSection from "@/components/OutcomeSection";
import ProductSection from "@/components/ProductSection";
import PricingSection from "@/components/PricingSection";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <HeroSection />
        
        <PainSection />
        <OutcomeSection />
        <ProductSection />
        <PricingSection />
      </div>
    </div>
  );
};

export default Index;
