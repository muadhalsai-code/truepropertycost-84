import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, DollarSign, FileX } from "lucide-react";
import { useTranslation } from 'react-i18next';

const PainSection = () => {
  const { t } = useTranslation();
  const painPoints = [
    {
      icon: DollarSign,
      quote: "Clients abandon deals when they discover 15+ hidden fees after signing. Our reputation suffers from these surprises.",
      impact: "Lost commissions & trust"
    },
    {
      icon: AlertTriangle,
      quote: "Manual cost calculations across 7 emirates are error-prone. One mistake costs thousands and client relationships.",
      impact: "Professional liability"
    },
    {
      icon: FileX,
      quote: "Investors demand ROI clarity, but complex fee structures make accurate projections nearly impossible to deliver quickly.",
      impact: "Delayed decision-making"
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-5xl text-foreground mb-6">
              {t('pain.title')}
            </h2>
            <p className="font-lato text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pain.subtitle')}
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {painPoints.map((pain, index) => (
              <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 border-destructive/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-destructive/10 mr-4">
                      <pain.icon className="w-6 h-6 text-destructive" />
                    </div>
                    <span className="font-poppins font-semibold text-destructive">{pain.impact}</span>
                  </div>
                  
                  <blockquote className="font-lato text-lg text-foreground leading-relaxed mb-4">
                    "{pain.quote}"
                  </blockquote>
                  
                  <div className="w-12 h-1 bg-destructive/30 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reality Check */}
          <div className="text-center bg-destructive/5 p-8 rounded-lg border border-destructive/20">
            <h4 className="font-poppins font-bold text-2xl text-destructive mb-4">
              The Hidden Truth
            </h4>
            <p className="font-lato text-lg text-foreground max-w-3xl mx-auto">
              {t('pain.realityCheck')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;