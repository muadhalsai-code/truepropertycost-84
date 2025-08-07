import PropertyCalculator from "@/components/PropertyCalculator";
import { useTranslation } from 'react-i18next';

const CostCalculator = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">{t('calculator.title')}</h1>
        <p className="text-xl text-muted-foreground mb-2">{t('calculator.subtitle')}</p>
        <p className="text-muted-foreground">{t('calculator.description')}</p>
      </div>
      <PropertyCalculator />
    </div>
  );
};

export default CostCalculator;