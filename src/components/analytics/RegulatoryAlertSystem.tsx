import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertCircle, ChevronDown, ChevronRight, Scale, Home, CreditCard } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  category: "DLD" | "Mortgage" | "Leasehold";
  tags: string[];
  date: string;
  checklist?: string[];
}

export const RegulatoryAlertSystem = () => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const alerts: Alert[] = [
    {
      id: "1",
      title: "New DLD Fee Structure",
      description: "Dubai Land Department introduces revised transfer fee calculation effective Q2 2024",
      severity: "high",
      category: "DLD",
      tags: ["#Tax", "#Transfer"],
      date: "2024-01-15",
      checklist: [
        "Review pending property transfers",
        "Calculate impact on current transactions",
        "Update financial projections",
        "Consult with legal advisor"
      ]
    },
    {
      id: "2", 
      title: "Mortgage Interest Rate Changes",
      description: "CBUAE updates guidelines affecting variable rate mortgages",
      severity: "medium",
      category: "Mortgage",
      tags: ["#Interest", "#Banking"],
      date: "2024-01-12",
      checklist: [
        "Review current mortgage terms",
        "Compare refinancing options",
        "Contact bank relationship manager",
        "Assess portfolio cash flow impact"
      ]
    },
    {
      id: "3",
      title: "Leasehold Extension Rules",
      description: "Updated regulations for leasehold property extensions and renewals",
      severity: "low",
      category: "Leasehold",
      tags: ["#Inheritance", "#Visa"],
      date: "2024-01-10",
      checklist: [
        "Identify leasehold properties in portfolio",
        "Check expiration dates",
        "Review renewal procedures",
        "Plan succession strategy"
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "DLD": return <Scale className="h-4 w-4" />;
      case "Mortgage": return <CreditCard className="h-4 w-4" />;
      case "Leasehold": return <Home className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getAlertCount = () => alerts.length;
  const getHighPriorityCount = () => alerts.filter(a => a.severity === "high").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Regulatory Alerts
          </div>
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {getAlertCount()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alert Categories Summary */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-red-600">{getHighPriorityCount()}</div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
          <div className="p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-amber-600">
              {alerts.filter(a => a.severity === "medium").length}
            </div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </div>
          <div className="p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-blue-600">
              {alerts.filter(a => a.severity === "low").length}
            </div>
            <div className="text-xs text-muted-foreground">Low</div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Collapsible
              key={alert.id}
              open={expandedAlert === alert.id}
              onOpenChange={(open) => setExpandedAlert(open ? alert.id : null)}
            >
              <CollapsibleTrigger asChild>
                <div className="w-full p-3 bg-muted/20 hover:bg-muted/40 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getCategoryIcon(alert.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{alert.title}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground break-words">
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {alert.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <span className="text-xs text-muted-foreground ml-auto">
                            {alert.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-2">
                      {expandedAlert === alert.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <div className="p-4 bg-muted/10 rounded-lg space-y-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Compliance Checklist:</h5>
                    <div className="space-y-2">
                      {alert.checklist?.map((item, itemIndex) => (
                        <label key={itemIndex} className="flex items-start gap-2 text-sm">
                          <input type="checkbox" className="rounded flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground break-words">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">Monitor Sources:</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              DLD Updates
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              CBUAE News
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Legal Portal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};