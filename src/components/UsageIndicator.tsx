import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useUserProfile } from "@/hooks/useUserProfile";

export const UsageIndicator = () => {
  const { todayUsage, usageLimit, remainingCalculations } = useUsageTracking();
  const { profile, isPremium } = useUserProfile();

  // Everyone has premium now, so no usage indicator needed
  if (!profile || isPremium) return null;

  const usagePercentage = (todayUsage / usageLimit) * 100;
  const isLimitReached = todayUsage >= usageLimit;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Daily Usage</span>
            <Badge variant={isLimitReached ? "destructive" : "secondary"}>
              Free Plan
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            {todayUsage}/{usageLimit} calculations
          </span>
        </div>
        
        <Progress value={usagePercentage} className="mb-2" />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {isLimitReached 
              ? "Daily limit reached" 
              : `${remainingCalculations} calculations remaining`
            }
          </span>
          <span>Resets daily at midnight</span>
        </div>
      </CardContent>
    </Card>
  );
};