import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Wifi, WifiOff, Clock } from "lucide-react";
import { useDataSources, useRefreshMarketData } from "@/hooks/useMarketData";
import { formatDistanceToNow } from "date-fns";

export const LiveDataIndicator = () => {
  const { data: dataSources, isLoading } = useDataSources();
  const refreshMutation = useRefreshMarketData();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-pulse w-4 h-4 bg-muted rounded-full" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const activeSources = dataSources?.filter(source => source.is_active) || [];
  const staleSources = activeSources.filter(source => {
    if (!source.last_successful_fetch) return true;
    const lastUpdate = new Date(source.last_successful_fetch);
    const threshold = source.fetch_frequency_minutes * 2; // 2x frequency = stale
    const minutesSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60);
    return minutesSinceUpdate > threshold;
  });

  const hasStaleData = staleSources.length > 0;
  const mostRecentUpdate = activeSources
    .filter(source => source.last_successful_fetch)
    .sort((a, b) => new Date(b.last_successful_fetch!).getTime() - new Date(a.last_successful_fetch!).getTime())[0];

  return (
    <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm rounded-lg border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {hasStaleData ? (
            <>
              <WifiOff className="w-4 h-4 text-destructive" />
              <Badge variant="destructive" className="gap-1">
                <Clock className="w-3 h-3" />
                Data Stale
              </Badge>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-primary" />
              <Badge variant="default" className="gap-1 bg-primary/10 text-primary border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Live Data
              </Badge>
            </>
          )}
        </div>
        
        {mostRecentUpdate && (
          <span className="text-sm text-muted-foreground">
            Last updated {formatDistanceToNow(new Date(mostRecentUpdate.last_successful_fetch!), { addSuffix: true })}
          </span>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => refreshMutation.mutate()}
        disabled={refreshMutation.isPending}
        className="gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
};