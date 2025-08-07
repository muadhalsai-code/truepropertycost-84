import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, X, User, Crown, Briefcase, Building2, ChevronDown, Shield, Lock, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/hooks/use-toast";
const PricingSection = () => {
  const { t } = useTranslation();
  const { user, profile } = useUserProfile();
  const [isAnnual, setIsAnnual] = useState(false);
  const [showDetails, setShowDetails] = useState({
    starter: false,
    premium: false,
    professional: false
  });

  const toggleDetails = (tier: keyof typeof showDetails) => {
    setShowDetails(prev => ({
      ...prev,
      [tier]: !prev[tier]
    }));
  };

  const redirectToAuth = () => {
    window.location.href = '/auth';
  };
  const plans = [{
    id: "starter",
    name: "Starter",
    subtitle: "First-time buyers & casual investors",
    price: "Free",
    period: "forever",
    icon: User,
    badge: "15,000+ new buyers",
    badgeColor: "bg-slate-100 text-slate-700",
    features: ["Basic cost calculations for all 7 emirates", "5 daily calculations limit", "Ad-supported experience"],
    cta: "Get Started Free →",
    ctaVariant: "outline" as const,
    popular: false,
    borderColor: "border-slate-200",
    iconColor: "text-slate-600",
    comingSoon: false
  }, {
    id: "premium",
    name: "Premium",
    subtitle: "Automatically included for all users!",
    price: "FREE",
    period: "",
    savings: "🎉 Free premium access for everyone!",
    icon: Crown,
    badge: "Always FREE",
    badgeColor: "bg-green-500 text-white",
    features: ["Unlimited calculations", "Custom commission/NOC adjustments", "Downloadable PDF reports", "Priority support", "No ads", "All premium features included"],
    cta: "Sign Up & Start Using →",
    ctaVariant: "default" as const,
    popular: true,
    borderColor: "border-green-500",
    iconColor: "text-green-500",
    highlight: true,
    comingSoon: false
  }, {
    id: "professional",
    name: "Professional",
    subtitle: "Agents & small brokerages",
    price: isAnnual ? "AED 3,999" : "AED 399",
    period: isAnnual ? "year" : "month",
    icon: Briefcase,
    tooltip: "Tax-deductible business expense",
    features: ["All Premium features +", "Client management dashboard", "Branded reports", "Basic API access", "5 user seats"],
    cta: "Coming Soon",
    ctaVariant: "outline" as const,
    popular: false,
    borderColor: "border-slate-200",
    iconColor: "text-slate-600",
    comingSoon: true
  }];
  const comparisonData = [{
    feature: "Multi-Emirate Coverage",
    competitors: false,
    truecost: true
  }, {
    feature: "Live Regulatory Updates",
    competitors: "Manual",
    truecost: "AI-Powered"
  }, {
    feature: "Bank Gap Predictions",
    competitors: false,
    truecost: true
  }];
  const enterpriseFeatures = ["White-label integration", "Unlimited user seats", "SLA with 99.9% uptime", "On-premise deployment options"];
  const trustBadges = [{
    icon: Shield,
    text: "RERA-Certified Calculations"
  }, {
    icon: Lock,
    text: "GDPR-Compliant Data Handling"
  }];

  // Calculate end date (30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  return <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-foreground mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('pricing.subtitle')}
            </p>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isAnnual ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-[#2A9D8F]" />
              <span className={`text-lg ${isAnnual ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && <Badge className="bg-[#E9C46A] text-slate-800 ml-2">Save 15%</Badge>}
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return <TooltipProvider key={index}>
                  <Card className={`relative hover-scale transition-all duration-300 ${plan.highlight ? `${plan.borderColor} shadow-xl border-2 shadow-[#2A9D8F]/20` : `${plan.borderColor} hover:shadow-lg`}`}>
                    {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                      </div>}

                    {!plan.popular && plan.badge && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                      </div>}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-[#2A9D8F]/10' : 'bg-slate-100'}`}>
                        <IconComponent className={`w-8 h-8 ${plan.iconColor}`} />
                      </div>
                      
                      <CardTitle className="font-poppins text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-muted-foreground mb-4">{plan.subtitle}</p>
                      
                      <div className="py-4">
                        <div className="text-3xl font-bold text-foreground mb-2">
                          {plan.price}
                          {plan.period !== "forever" && <span className="text-lg text-muted-foreground font-normal">/{plan.period}</span>}
                        </div>
                        {plan.savings && <p className="text-sm text-[#2A9D8F] font-medium">{plan.savings}</p>}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-2">
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-[#2A9D8F]' : 'text-slate-500'}`} />
                            <span className="text-sm">{feature}</span>
                          </li>)}
                      </ul>

                       {plan.tooltip ? <Tooltip>
                           <TooltipTrigger asChild>
                             <Button 
                               className={`w-full ${plan.highlight ? 'bg-[#2A9D8F] hover:bg-[#2A9D8F]/90 text-white' : ''}`} 
                               variant={plan.ctaVariant}
                               disabled={plan.comingSoon}
                             onClick={() => {
                               if (plan.id === 'starter' || plan.id === 'premium') {
                                 redirectToAuth();
                               }
                             }}
                             >
                               {plan.cta}
                             </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                             <p>{plan.tooltip}</p>
                           </TooltipContent>
                         </Tooltip> : <Button 
                           className={`w-full ${plan.highlight ? 'bg-[#2A9D8F] hover:bg-[#2A9D8F]/90 text-white' : ''}`} 
                           variant={plan.ctaVariant}
                           disabled={plan.comingSoon}
                             onClick={() => {
                               if (plan.id === 'starter' || plan.id === 'premium') {
                                 redirectToAuth();
                               }
                             }}
                         >
                           {plan.cta}
                         </Button>}
                    </CardContent>
                  </Card>
                </TooltipProvider>;
          })}
          </div>

          {/* Enterprise Solutions Block */}
          <div className="mb-16">
            <Card className="border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="font-poppins font-bold text-2xl mb-4">
                  Custom Solutions for Developers & Institutions
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
                  {enterpriseFeatures.map((feature, index) => <div key={index} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#E9C46A]" />
                      <span className="text-sm">{feature}</span>
                    </div>)}
                </div>
                <Button size="lg" className="bg-[#E9C46A] hover:bg-[#E9C46A]/90 text-slate-800">
                  Request Enterprise Demo →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Justification Section */}
          <div className="mb-16">
            <h3 className="font-poppins font-bold text-3xl text-center mb-8">
              Why Our Pricing Wins
            </h3>
            
            {/* Comparison Table */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-4 font-poppins font-semibold">Feature</th>
                      <th className="text-center p-4 font-poppins font-semibold">Competitors</th>
                      <th className="text-center p-4 font-poppins font-semibold text-[#2A9D8F]">True Property Cost Calculator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => <tr key={index} className="border-t border-slate-200">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.competitors === 'boolean' ? row.competitors ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" /> : <span className="text-muted-foreground">{row.competitors}</span>}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.truecost === 'boolean' ? row.truecost ? <Check className="w-5 h-5 text-[#2A9D8F] mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" /> : <span className="text-[#2A9D8F] font-medium">{row.truecost}</span>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return <div key={index} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                    <IconComponent className="w-5 h-5 text-[#2A9D8F]" />
                    <span className="font-medium text-slate-700">{badge.text}</span>
                  </div>;
            })}
            </div>
          </div>

          {/* Special Offer Footer */}
          <div className="text-center bg-gradient-to-r from-[#E9C46A]/10 to-[#2A9D8F]/10 p-8 rounded-xl border border-[#E9C46A]/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-[#E9C46A]" />
              <span className="font-poppins font-bold text-xl text-foreground">
                Lock introductory pricing
              </span>
            </div>
            <p className="text-lg text-muted-foreground">
              Save 20% on annual plans before <span className="font-semibold text-[#E9C46A]">{formattedEndDate}</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;