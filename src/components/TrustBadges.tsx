import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';
const TrustBadges = () => {
  const { t } = useTranslation();
  
  const badges = [{
    icon: Shield,
    text: t('trustBadges.compliance'),
    color: "text-primary"
  }, {
    icon: Award,
    text: t('trustBadges.certified'),
    color: "text-success"
  }, {
    icon: Users,
    text: t('trustBadges.customers'),
    color: "text-luxury"
  }, {
    icon: CheckCircle,
    text: t('trustBadges.gdpr'),
    color: "text-primary"
  }];
  return (
    <section className="py-12 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div key={index} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <IconComponent className={`w-5 h-5 ${badge.color}`} />
                <span className="text-sm font-medium text-muted-foreground">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default TrustBadges;