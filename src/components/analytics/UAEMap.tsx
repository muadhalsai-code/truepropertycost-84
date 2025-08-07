import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UAEMapProps {
  heatmapMode: string;
  selectedYear: number;
  selectedEmirate: string;
}

interface EmirateData {
  name: string;
  value: number;
  portfolioImpact: string;
  properties: number;
}

export const UAEMap = ({ heatmapMode, selectedYear, selectedEmirate }: UAEMapProps) => {
  const [hoveredEmirate, setHoveredEmirate] = useState<string | null>(null);

  // Mock data based on heatmap mode
  const getEmirateData = (): EmirateData[] => {
    const baseData = {
      discounts: {
        Dubai: { value: 15, portfolioImpact: "High savings potential", properties: 247 },
        "Abu Dhabi": { value: 8, portfolioImpact: "Moderate savings", properties: 89 },
        Sharjah: { value: 22, portfolioImpact: "Excellent value", properties: 156 },
        Ajman: { value: 18, portfolioImpact: "Good opportunities", properties: 67 },
        "Ras Al Khaimah": { value: 25, portfolioImpact: "Best discounts", properties: 34 },
      },
      fees: {
        Dubai: { value: 12, portfolioImpact: "High fee burden", properties: 247 },
        "Abu Dhabi": { value: 7, portfolioImpact: "Moderate fees", properties: 89 },
        Sharjah: { value: 5, portfolioImpact: "Low fee impact", properties: 156 },
        Ajman: { value: 6, portfolioImpact: "Reasonable fees", properties: 67 },
        "Ras Al Khaimah": { value: 4, portfolioImpact: "Minimal fees", properties: 34 },
      },
      yields: {
        Dubai: { value: 6.8, portfolioImpact: "Strong rental market", properties: 247 },
        "Abu Dhabi": { value: 7.2, portfolioImpact: "Excellent yields", properties: 89 },
        Sharjah: { value: 8.5, portfolioImpact: "Outstanding returns", properties: 156 },
        Ajman: { value: 9.1, portfolioImpact: "Premium yields", properties: 67 },
        "Ras Al Khaimah": { value: 8.8, portfolioImpact: "High yield potential", properties: 34 },
      },
    };

    return Object.entries(baseData[heatmapMode as keyof typeof baseData] || baseData.discounts).map(
      ([name, data]) => ({
        name,
        ...data,
      })
    );
  };

  const emirateData = getEmirateData();
  const filteredData = selectedEmirate === "all" 
    ? emirateData 
    : emirateData.filter(e => e.name === selectedEmirate);

  const getIntensityColor = (value: number, mode: string) => {
    if (mode === "discounts" || mode === "yields") {
      // Higher is better (green)
      if (value >= 20 || value >= 8) return "bg-teal-500";
      if (value >= 15 || value >= 7) return "bg-teal-400";
      if (value >= 10 || value >= 6) return "bg-teal-300";
      return "bg-teal-200";
    } else {
      // Lower is better for fees (red scale inverted)
      if (value <= 5) return "bg-teal-500";
      if (value <= 8) return "bg-amber-300";
      if (value <= 12) return "bg-amber-400";
      return "bg-red-400";
    }
  };

  const getModeLabel = () => {
    switch (heatmapMode) {
      case "discounts": return "Discount %";
      case "fees": return "Hidden Fees %";
      case "yields": return "Rental Yield %";
      default: return "Value";
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Visualization */}
      <div className="relative min-h-[400px] bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
          {filteredData.map((emirate) => (
            <div
              key={emirate.name}
              className={`
                relative p-4 rounded-lg cursor-pointer transition-all duration-300 transform
                ${getIntensityColor(emirate.value, heatmapMode)}
                ${hoveredEmirate === emirate.name ? 'scale-105 shadow-lg' : 'hover:scale-102'}
                border-2 border-white/50
              `}
              onMouseEnter={() => setHoveredEmirate(emirate.name)}
              onMouseLeave={() => setHoveredEmirate(null)}
            >
              <div className="text-white font-medium text-lg">{emirate.name}</div>
              <div className="text-white/90 text-2xl font-bold mt-1">
                {emirate.value}%
              </div>
              <div className="text-white/80 text-sm">
                {emirate.properties} properties
              </div>
              
              {/* Hover Tooltip */}
              {hoveredEmirate === emirate.name && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Card className="p-3 shadow-lg border-2 border-teal-200 bg-white dark:bg-gray-800">
                    <div className="space-y-1 text-sm">
                      <div className="font-medium">{emirate.name}</div>
                      <div className="text-muted-foreground">
                        {getModeLabel()}: {emirate.value}%
                      </div>
                      <div className="text-teal-600 font-medium">
                        {emirate.portfolioImpact}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {emirate.properties} active listings
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg">
          <div className="text-xs font-medium mb-2">{getModeLabel()}</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-teal-200 rounded"></div>
            <span className="text-xs">Low</span>
            <div className="w-4 h-4 bg-teal-400 rounded"></div>
            <div className="w-4 h-4 bg-teal-500 rounded"></div>
            <span className="text-xs">High</span>
          </div>
        </div>
      </div>

      {/* Market Trends Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Avg {getModeLabel()}</div>
          <div className="text-2xl font-bold text-teal-600">
            {(filteredData.reduce((sum, e) => sum + e.value, 0) / filteredData.length).toFixed(1)}%
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Best Performer</div>
          <div className="text-lg font-bold">
            {filteredData.reduce((best, current) => 
              (heatmapMode === "fees" ? current.value < best.value : current.value > best.value) 
                ? current : best
            ).name}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Properties</div>
          <div className="text-2xl font-bold">
            {filteredData.reduce((sum, e) => sum + e.properties, 0)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Year-over-Year</div>
          <div className="text-lg font-bold text-green-600">+8.3%</div>
        </Card>
      </div>
    </div>
  );
};