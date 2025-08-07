import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, TrendingDown, Shield } from "lucide-react";
import { useTranslation } from 'react-i18next';
import dubaiSkyline from "@/assets/dubai-skyline.jpg";
const HeroSection = () => {
  const { t } = useTranslation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={dubaiSkyline} alt="Dubai Skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          

          {/* Main Headline */}
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            {t('hero.title')}
          </h1>
          
          {/* Sub-headline */}
          <p className="font-lato text-xl md:text-2xl lg:text-3xl text-gray-100 mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <p className="font-lato text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>

          {/* Feature Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Search className="w-8 h-8 text-luxury mb-4" />
              <h3 className="font-poppins font-semibold text-lg mb-2">{t('hero.features.uncoverFees.title')}</h3>
              <p className="text-gray-200 text-center">{t('hero.features.uncoverFees.description')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <TrendingDown className="w-8 h-8 text-luxury mb-4" />
              <h3 className="font-poppins font-semibold text-lg mb-2">{t('hero.features.avoidGaps.title')}</h3>
              <p className="text-gray-200 text-center">{t('hero.features.avoidGaps.description')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Shield className="w-8 h-8 text-luxury mb-4" />
              <h3 className="font-poppins font-semibold text-lg mb-2">{t('hero.features.inheritanceProof.title')}</h3>
              <p className="text-gray-200 text-center">{t('hero.features.inheritanceProof.description')}</p>
            </div>
          </div>

          {/* CTA */}
          <Link to="/auth">
            <Button size="lg" className="bg-luxury hover:bg-luxury/90 text-primary font-poppins font-semibold text-lg px-8 py-6 shadow-button animate-pulse-primary">
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;