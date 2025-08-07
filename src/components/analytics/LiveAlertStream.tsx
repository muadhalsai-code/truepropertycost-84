import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ExternalLink, Bell, BellRing, X } from "lucide-react";

interface LiveAlert {
  id: string;
  type: "regulatory" | "market" | "portfolio";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  isNew: boolean;
}

export const LiveAlertStream = () => {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate live alerts stream
    const generateAlert = (): LiveAlert => {
      const alertTypes = [
        {
          type: "regulatory" as const,
          title: "Dubai Land Department Fee Update",
          description: "Service charges for leasehold properties increased by 8% effective immediately",
          severity: "medium" as const,
          actionText: "Check Impact",
        },
        {
          type: "market" as const,
          title: "Palm Jumeirah Price Surge",
          description: "Luxury villa prices increased 12% in last 90 days - portfolio impact detected",
          severity: "high" as const,
          actionText: "View Analysis",
        },
        {
          type: "portfolio" as const,
          title: "DAMAC Towers Service Charge Alert",
          description: "Your property's maintenance fees increased 15% this quarter",
          severity: "critical" as const,
          actionText: "Request Audit",
        },
        {
          type: "regulatory" as const,
          title: "Mortgage Cap Regulation Change",
          description: "LTV ratio reduced to 75% for properties above AED 5M",
          severity: "high" as const,
          actionText: "See Details",
        },
      ];

      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...randomAlert,
        timestamp: new Date(),
        isNew: true,
      };
    };

    // Add initial alerts
    setAlerts([generateAlert(), generateAlert()]);

    // Simulate new alerts every 30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        setAlerts(prev => [generateAlert(), ...prev.slice(0, 9)]); // Keep max 10 alerts
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "regulatory": return "🏛️";
      case "market": return "📈";
      case "portfolio": return "🏠";
      default: return "ℹ️";
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissed(prev => new Set([...prev, alertId]));
  };

  const visibleAlerts = alerts.filter(alert => !dismissed.has(alert.id));

  return (
    <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BellRing className="w-5 h-5 text-primary" />
          Live Alert Stream
          {visibleAlerts.some(alert => alert.isNew) && (
            <Badge variant="default" className="bg-red-500">
              New
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                alert.isNew ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-lg">{getTypeIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSeverityColor(alert.severity)}`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      {alert.isNew && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 break-words">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                      {alert.actionText && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          {alert.actionText}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="h-6 w-6 p-0 hover:bg-destructive/10"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
        
        {visibleAlerts.length > 0 && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{visibleAlerts.length} active alert(s)</span>
              <span>Updates every 30s</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};