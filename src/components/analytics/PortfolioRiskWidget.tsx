import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface RiskMetric {
  label: string;
  value: number;
  description: string;
  trend: "up" | "down" | "stable";
  severity: "low" | "medium" | "high";
}

export const PortfolioRiskWidget = () => {
  const riskMetrics: RiskMetric[] = [
    {
      label: "Valuation Gap Forecast",
      value: 18,
      description: "Bank devaluation risk",
      trend: "up",
      severity: "high"
    },
    {
      label: "Fee Trajectory",
      value: 7,
      description: "Annual service charge increase",
      trend: "up",
      severity: "medium"
    },
    {
      label: "Liquidity Score",
      value: 73,
      description: "Market liquidity rating",
      trend: "stable",
      severity: "low"
    }
  ];

  const getThermometerColor = (value: number, isLiquidity = false) => {
    if (isLiquidity) {
      // For liquidity, higher is better
      if (value >= 70) return "bg-teal-500";
      if (value >= 50) return "bg-amber-400";
      return "bg-red-400";
    } else {
      // For risks, lower is better
      if (value <= 5) return "bg-teal-500";
      if (value <= 15) return "bg-amber-400";
      return "bg-red-400";
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return variants[severity as keyof typeof variants];
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-teal-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Portfolio Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{metric.label}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <Badge className={getSeverityBadge(metric.severity)}>
                {metric.severity}
              </Badge>
            </div>
            
            {/* Thermometer-style meter */}
            <div className="relative">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${getThermometerColor(
                    metric.value, 
                    metric.label.includes("Liquidity")
                  )}`}
                  style={{ 
                    width: `${metric.label.includes("Liquidity") ? metric.value : Math.min(metric.value * 2, 100)}%` 
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  {metric.value}{metric.label.includes("Liquidity") ? "/100" : "%"}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">{metric.description}</p>
            
            {/* Risk threshold indicators */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Risk</span>
              <span>Medium</span>
              <span>High Risk</span>
            </div>
          </div>
        ))}
        
        {/* Overall Risk Score */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overall Risk Score</span>
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              Medium Risk
            </Badge>
          </div>
          <Progress value={65} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            Based on current market conditions and portfolio composition
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="pt-4 space-y-2">
          <h4 className="font-medium text-sm">Recommended Actions:</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              Review properties with high service charges
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              Consider diversifying to lower-risk areas
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              Monitor bank valuation trends closely
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};