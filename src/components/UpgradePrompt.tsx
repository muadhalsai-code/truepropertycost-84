import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Crown, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface UpgradePromptProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradePrompt = ({ open, onClose, onUpgrade }: UpgradePromptProps) => {
  const { t } = useTranslation();
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-luxury" />
            <AlertDialogTitle>{t('dashboard.upgradePrompt.title')}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left space-y-3">
            <p>{t('dashboard.upgradePrompt.description')}</p>
            
            <div className="bg-gradient-to-r from-primary/10 to-luxury/10 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-luxury" />
                <span className="font-medium text-sm">{t('dashboard.upgradePrompt.upgradeTitle')}</span>
              </div>
              <ul className="text-xs space-y-1 text-muted-foreground">
                {(t('dashboard.upgradePrompt.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{t('dashboard.upgradePrompt.maybeLater')}</AlertDialogCancel>
          <AlertDialogAction onClick={onUpgrade} className="bg-luxury hover:bg-luxury/90">
            {t('dashboard.upgradePrompt.upgradeNow')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};