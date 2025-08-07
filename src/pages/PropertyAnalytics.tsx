
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Download, TrendingUp, TrendingDown, AlertCircle, BarChart3, Loader2, Lock, Crown, RefreshCw, Wifi, WifiOff, Clock, Zap } from "lucide-react";
import { UAEMap } from "@/components/analytics/UAEMap";
import { PortfolioRiskWidget } from "@/components/analytics/PortfolioRiskWidget";
import { ComparativeAnalysisTool } from "@/components/analytics/ComparativeAnalysisTool";
import { RegulatoryAlertSystem } from "@/components/analytics/RegulatoryAlertSystem";
import { LiveAlertStream } from "@/components/analytics/LiveAlertStream";
import { DataHealthMonitor } from "@/components/analytics/DataHealthMonitor";
import { LiveDataIndicator } from "@/components/LiveDataIndicator";
import { useMarketData, useRefreshMarketData } from "@/hooks/useMarketData";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/hooks/use-toast";

const PropertyAnalytics = () => {
  const { isPremium, loading: profileLoading } = useUserProfile();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedEmirate, setSelectedEmirate] = useState("all");
  const [heatmapMode, setHeatmapMode] = useState("discounts");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(15); // minutes
  
  const { data: marketData, isLoading: isLoadingMarketData } = useMarketData(
    selectedEmirate === "all" ? undefined : selectedEmirate
  );
  
  const refreshMarketData = useRefreshMarketData();

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !isPremium) return;
    
    const interval = setInterval(() => {
      handleManualRefresh(true);
    }, refreshInterval * 60 * 1000); // Convert minutes to milliseconds
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, isPremium]);

  // Manual refresh function
  const handleManualRefresh = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    
    try {
      await refreshMarketData.mutateAsync();
      setLastRefresh(new Date());
      
      if (!silent) {
        toast({
          title: "Data Refreshed",
          description: "Market data has been updated with the latest information",
        });
      }
    } catch (error) {
      if (!silent) {
        toast({
          title: "Refresh Failed", 
          description: "Unable to refresh data. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

  // Get data freshness status
  const getDataFreshness = () => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastRefresh.getTime()) / (1000 * 60));
    
    if (diffMinutes < 5) return { status: "fresh", color: "text-green-500", icon: Zap };
    if (diffMinutes < 15) return { status: "recent", color: "text-blue-500", icon: Wifi };
    if (diffMinutes < 60) return { status: "stale", color: "text-yellow-500", icon: Clock };
    return { status: "old", color: "text-red-500", icon: WifiOff };
  };

  const freshness = getDataFreshness();
  const FreshnessIcon = freshness.icon;

  const handleSearchAnalytics = async () => {
    if (selectedYear < 2018 || selectedYear > 2024) {
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowAnalytics(true);
    setIsLoading(false);
  };

  // Show loading state while checking user profile
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-section flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show access restriction for free users
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-section">
        <div className="p-6">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white shadow-card mb-8">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h1 className="text-4xl font-bold mb-2">Property Analytics Hub</h1>
                <p className="text-white/90 text-lg">
                  Comprehensive market insights and portfolio risk analysis for UAE real estate
                </p>
              </div>
              <div className="flex items-center gap-3">
                <LiveDataIndicator />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          </div>

          {/* Access Restriction Card */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="py-16 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    Premium Feature
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    Property Analytics is available exclusively for Premium and Professional subscribers. 
                    Upgrade your plan to access comprehensive market insights, portfolio risk analysis, 
                    and regulatory alerts.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2">Premium Analytics Include:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Interactive UAE market heatmaps</li>
                      <li>• Portfolio risk assessment tools</li>
                      <li>• Comparative market analysis</li>
                      <li>• Real-time regulatory alerts</li>
                      <li>• Historical market trends</li>
                    </ul>
                  </div>
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-button">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-section">
      <div className="container mx-auto p-6 max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Property Analytics Hub</h1>
              <p className="text-white/90 text-lg mb-4">
                Real-time market insights and portfolio monitoring for UAE real estate
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <FreshnessIcon className={`w-4 h-4 ${freshness.color}`} />
                  <span className="text-sm text-white/80">
                    Updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                </div>
                {autoRefresh && (
                  <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                    Auto-refresh: {refreshInterval}min
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DataHealthMonitor />
              <LiveDataIndicator />
              <Button
                onClick={() => handleManualRefresh()}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {isRefreshing ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
        </div>

        {/* Controls Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Filters */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Market Analysis Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Analysis Year</Label>
                    <Input
                      type="number"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      min={2018}
                      max={2024}
                      placeholder="2018-2024"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Emirate</Label>
                    <Select value={selectedEmirate} onValueChange={setSelectedEmirate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Emirates</SelectItem>
                        <SelectItem value="Dubai">Dubai</SelectItem>
                        <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="Sharjah">Sharjah</SelectItem>
                        <SelectItem value="Ajman">Ajman</SelectItem>
                        <SelectItem value="RAK">Ras Al Khaimah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Analysis Type</Label>
                    <Select value={heatmapMode} onValueChange={setHeatmapMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discounts">Off-plan Discounts</SelectItem>
                        <SelectItem value="fees">Hidden Fees</SelectItem>
                        <SelectItem value="yields">Rental Yields</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleSearchAnalytics}
                  disabled={isLoading || isLoadingMarketData || selectedYear < 2018 || selectedYear > 2024}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
                >
                  {(isLoading || isLoadingMarketData) ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading Analytics...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Analytics
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Data Settings */}
          <Card className="shadow-card border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-base">
                Data Settings
                <Badge variant={freshness.status === "fresh" ? "default" : "outline"} 
                       className={freshness.status === "fresh" ? "bg-green-500" : ""}>
                  <FreshnessIcon className="w-3 h-3 mr-1" />
                  {freshness.status === "fresh" ? "Live" : freshness.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Auto-refresh</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={autoRefresh ? "bg-green-500/10 border-green-500 text-green-600" : ""}
                >
                  {autoRefresh ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Refresh Interval</Label>
                <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Quality: {freshness.status === "fresh" ? "Real-time" : 
                               freshness.status === "recent" ? "Near real-time" : 
                               freshness.status === "stale" ? "Delayed" : "Outdated"}</div>
                  <div>Last update: {Math.floor((new Date().getTime() - lastRefresh.getTime()) / 60000)}m ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="space-y-4 animate-fade-in">
            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Market Overview - Takes up 2/3 width */}
              <div className="xl:col-span-2">
                <Card className="h-full shadow-card border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        UAE Market Heatmap
                      </span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-primary border-primary">
                          {selectedYear}
                        </Badge>
                        <Badge variant="outline">
                          {selectedEmirate === "all" ? "All Emirates" : selectedEmirate}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <UAEMap 
                      heatmapMode={heatmapMode}
                      selectedYear={selectedYear}
                      selectedEmirate={selectedEmirate}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel - Risk & Alerts */}
              <div className="space-y-4">
                <PortfolioRiskWidget />
                <RegulatoryAlertSystem />
              </div>
            </div>

            {/* Secondary Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ComparativeAnalysisTool />
              <LiveAlertStream />
            </div>
          </div>
        )}

        {/* No Results State */}
        {!showAnalytics && !isLoading && (
          <Card className="shadow-card border-0 bg-card/30 backdrop-blur-sm">
            <CardContent className="py-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Enter a year between 2018-2024 and click "Show Analytics" to view comprehensive market insights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertyAnalytics;
