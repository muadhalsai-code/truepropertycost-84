import { Card, CardContent } from "@/components/ui/card";
import { Heart, Briefcase, Users } from "lucide-react";

const OutcomeSection = () => {
  const outcomes = [
    {
      icon: Heart,
      emoji: "🤝",
      title: "Close Deals Confidently",
      description: "Present clients with precise cost breakdowns that build trust and eliminate post-signature surprises.",
      benefit: "Enhanced client relationships"
    },
    {
      icon: Briefcase,
      emoji: "📈",
      title: "Maximize ROI Accuracy",
      description: "Deliver investment analysis with all fees factored in, helping clients make profitable decisions faster.",
      benefit: "Superior advisory service"
    },
    {
      icon: Users,
      emoji: "⚡",
      title: "Scale Your Practice",
      description: "Serve more clients efficiently with automated cost calculations across all UAE emirates.",
      benefit: "Operational excellence"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-success/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-5xl text-foreground mb-6">
              Transform Your Property Business:
            </h2>
            <h3 className="font-poppins font-bold text-4xl md:text-6xl bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-8">
              From Guesswork to Precision
            </h3>
          </div>

          {/* Outcome Blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {outcomes.map((outcome, index) => (
              <Card key={index} className="shadow-card hover:shadow-xl transition-all duration-300 border-success/20 bg-white/80 backdrop-blur-sm animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{outcome.emoji}</div>
                  
                  <h4 className="font-poppins font-bold text-2xl text-foreground mb-4">
                    {outcome.title}
                  </h4>
                  
                  <p className="font-lato text-lg text-muted-foreground mb-6 leading-relaxed">
                    {outcome.description}
                  </p>
                  
                  <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full">
                    <outcome.icon className="w-5 h-5 text-success mr-2" />
                    <span className="font-poppins font-medium text-success">{outcome.benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Paradigm */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-success/10 p-12 rounded-xl border border-primary/20">
            <h4 className="font-poppins font-bold text-3xl text-primary mb-6">
              The New Paradigm
            </h4>
            <p className="font-lato text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
              True Property Cost Calculator empowers professionals with AI-driven transparency – turning complex transactions into <span className="font-bold text-primary">confident, profitable decisions</span>.
            </p>
            
            <div className="flex justify-center items-center mt-8 space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">BEFORE</div>
                <div className="text-sm text-muted-foreground">Chaos & Surprises</div>
              </div>
              
              <div className="w-16 h-1 bg-gradient-to-r from-destructive to-primary rounded"></div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">AFTER</div>
                <div className="text-sm text-muted-foreground">Clarity & Control</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomeSection;