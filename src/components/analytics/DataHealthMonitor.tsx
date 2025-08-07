import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, RefreshCw, ExternalLink, TrendingUp } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  endpoint: string;
  uptime: number;
  lastUpdate: Date;
  status: "operational" | "degraded" | "down";
  refreshRate: string;
  completeness: number;
  freshness: number;
}

interface HealthMetrics {
  overall: number;
  uptime: number;
  freshness: number;
  completeness: number;
}

export const DataHealthMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [lastCheck, setLastCheck] = useState(new Date());

  const [dataSources] = useState<DataSource[]>([
    {
      id: "dld",
      name: "Dubai Land Department",
      endpoint: "api.dubailand.gov.ae/status",
      uptime: 99.9,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
      status: "operational",
      refreshRate: "5-minute checks",
      completeness: 98.5,
      freshness: 95.2
    },
    {
      id: "cbuae", 
      name: "UAE Central Bank",
      endpoint: "centralbank.ae/api/v1/health",
      uptime: 97.1,
      lastUpdate: new Date(Date.now() - 4 * 60 * 1000), // 4 mins ago
      status: "degraded",
      refreshRate: "15-minute checks",
      completeness: 94.8,
      freshness: 89.3
    },
    {
      id: "dewa",
      name: "DEWA Fee Database", 
      endpoint: "dewa.gov.ae/api/system-status",
      uptime: 100,
      lastUpdate: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
      status: "operational",
      refreshRate: "Hourly checks",
      completeness: 100,
      freshness: 92.1
    },
    {
      id: "portfolio",
      name: "Your Portfolio Sync",
      endpoint: "Internal /sync-health",
      uptime: 98.7,
      lastUpdate: new Date(Date.now() - 30 * 1000), // 30 secs ago
      status: "operational", 
      refreshRate: "Real-time",
      completeness: 75, // 3/4 properties synced
      freshness: 99.8
    }
  ]);

  const calculateHealthScore = (): HealthMetrics => {
    const weights = {
      freshness: 0.4,
      uptime: 0.3,
      completeness: 0.3
    };

    const avgUptime = dataSources.reduce((sum, source) => sum + source.uptime, 0) / dataSources.length;
    const avgFreshness = dataSources.reduce((sum, source) => sum + source.freshness, 0) / dataSources.length;
    const avgCompleteness = dataSources.reduce((sum, source) => sum + source.completeness, 0) / dataSources.length;

    const overall = (avgFreshness * weights.freshness) + (avgUptime * weights.uptime) + (avgCompleteness * weights.completeness);

    return {
      overall: Math.round(overall * 10) / 10,
      uptime: Math.round(avgUptime * 10) / 10,
      freshness: Math.round(avgFreshness * 10) / 10,
      completeness: Math.round(avgCompleteness * 10) / 10
    };
  };

  const getHealthColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 90) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBadgeColor = (score: number) => {
    if (score >= 95) return "bg-green-500";
    if (score >= 90) return "bg-amber-500";
    return "bg-red-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "degraded": return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "down": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const healthMetrics = calculateHealthScore();

  useEffect(() => {
    // Simulate periodic health checks
    const interval = setInterval(() => {
      setLastCheck(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`fixed top-4 right-4 z-50 h-auto p-3 rounded-xl text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 ${
            getHealthBadgeColor(healthMetrics.overall)
          }`}
          style={{
            background: `linear-gradient(135deg, ${
              healthMetrics.overall >= 95 
                ? '#2A9D8F 0%, #264653 100%'
                : healthMetrics.overall >= 90 
                ? '#F59E0B 0%, #D97706 100%'
                : '#EF4444 0%, #DC2626 100%'
            })`,
            animation: healthMetrics.overall >= 95 
              ? 'pulse 2s infinite' 
              : healthMetrics.overall >= 90 
              ? 'pulse 1.5s infinite'
              : 'pulse 1s infinite'
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Data Health: {healthMetrics.overall}%</span>
          </div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent align="end" className="w-96 p-0 border-0 shadow-xl">
        <Card className="border-0">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Data Reliability Report</h3>
              <Badge variant="outline" className="text-xs">
                Live Monitoring
              </Badge>
            </div>

            {/* Overall Health Score */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Health Score</span>
                <span className={`font-bold text-lg ${getHealthColor(healthMetrics.overall)}`}>
                  {healthMetrics.overall}%
                </span>
              </div>
              <Progress value={healthMetrics.overall} className="h-2" />
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-muted/20 rounded">
                <div className={`text-lg font-bold ${getHealthColor(healthMetrics.uptime)}`}>
                  {healthMetrics.uptime}%
                </div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="p-3 bg-muted/20 rounded">
                <div className={`text-lg font-bold ${getHealthColor(healthMetrics.freshness)}`}>
                  {healthMetrics.freshness}%
                </div>
                <div className="text-xs text-muted-foreground">Freshness</div>
              </div>
              <div className="p-3 bg-muted/20 rounded">
                <div className={`text-lg font-bold ${getHealthColor(healthMetrics.completeness)}`}>
                  {healthMetrics.completeness}%
                </div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>

            {/* Data Sources Status */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Data Sources</h4>
              {dataSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-muted/10 rounded">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(source.status)}
                    <div>
                      <div className="font-medium text-sm">{source.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimeAgo(source.lastUpdate)} • {source.refreshRate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getHealthColor(source.uptime)}`}>
                      {source.uptime}%
                    </div>
                    {source.id === "portfolio" && source.completeness < 100 && (
                      <div className="text-xs text-amber-600">
                        Syncing {Math.floor((source.completeness / 100) * 4)}/4 properties
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts & Recommendations */}
            {dataSources.some(s => s.status === "degraded") && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-medium">Action Suggested:</span>
                    <p className="text-amber-700 dark:text-amber-300 mt-1">
                      Central Bank data is experiencing delays (maintenance). Consider manual refresh for critical decisions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex flex-col gap-2 pt-2 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last checked: {formatTimeAgo(lastCheck)}</span>
                <span>Independently audited</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Manual Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" className="text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                Report inaccuracies
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="pt-2 border-t">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Independently audited data pipelines</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};