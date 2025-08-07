import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Home, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Scenario {
  name: string;
  icon: any;
  description: string;
  value: number;
  roi: number;
  timeframe: string;
  pros: string[];
  cons: string[];
}

export const ComparativeAnalysisTool = () => {
  const [selectedProperty] = useState("Dubai Marina Off-plan");

  const scenarios: Scenario[] = [
    {
      name: "Hold Strategy",
      icon: Home,
      description: "Projected 5-year value appreciation",
      value: 1850000,
      roi: 23.5,
      timeframe: "5 years",
      pros: ["Capital appreciation", "Market recovery potential", "Long-term stability"],
      cons: ["Ongoing service charges", "Market volatility risk", "Opportunity cost"]
    },
    {
      name: "Sell Now",
      icon: TrendingUp,
      description: "Current market value minus transaction fees",
      value: 1420000,
      roi: -5.3,
      timeframe: "Immediate",
      pros: ["Immediate liquidity", "No further obligations", "Risk elimination"],
      cons: ["Capital loss", "Transaction costs", "Market exit at low point"]
    },
    {
      name: "Convert to Rental",
      icon: DollarSign,
      description: "Net Present Value of rental income stream",
      value: 1650000,
      roi: 10.2,
      timeframe: "10 years",
      pros: ["Monthly income", "Tax benefits", "Portfolio diversification"],
      cons: ["Property management", "Vacancy risk", "Maintenance costs"]
    }
  ];

  const chartData = scenarios.map(scenario => ({
    name: scenario.name.replace(" Strategy", "").replace(" Now", "").replace(" to Rental", ""),
    value: scenario.value / 1000,
    roi: scenario.roi
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getROIColor = (roi: number) => {
    if (roi > 15) return "text-teal-600";
    if (roi > 0) return "text-amber-600";
    return "text-red-600";
  };

  const getBestStrategy = () => {
    return scenarios.reduce((best, current) => 
      current.roi > best.roi ? current : best
    );
  };

  const generatePDFReport = () => {
    // Mock PDF generation
    console.log("Generating comparative analysis PDF report...");
    // In a real implementation, this would generate a comprehensive PDF
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Comparative Strategy Analysis</CardTitle>
          <Badge variant="outline" className="text-teal-600 border-teal-600">
            {selectedProperty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            const isBest = scenario.name === getBestStrategy().name;
            
            return (
              <Card 
                key={index} 
                className={`relative ${isBest ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950' : ''}`}
              >
                {isBest && (
                  <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white">
                    Recommended
                  </Badge>
                )}
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <h3 className="font-semibold break-words">{scenario.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xl md:text-2xl font-bold break-all">
                      {formatCurrency(scenario.value)}
                    </div>
                    <div className={`text-sm font-medium ${getROIColor(scenario.roi)}`}>
                      ROI: {scenario.roi > 0 ? '+' : ''}{scenario.roi}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {scenario.timeframe}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground break-words">
                    {scenario.description}
                  </p>
                  
                  {/* Pros & Cons */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-medium text-teal-600">Pros:</span>
                      <ul className="mt-1 space-y-1">
                         {scenario.pros.slice(0, 2).map((pro, i) => (
                           <li key={i} className="flex items-start gap-1">
                             <div className="w-1 h-1 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />
                             <span className="break-words">{pro}</span>
                           </li>
                         ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-amber-600">Cons:</span>
                      <ul className="mt-1 space-y-1">
                         {scenario.cons.slice(0, 2).map((con, i) => (
                           <li key={i} className="flex items-start gap-1">
                             <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                             <span className="break-words">{con}</span>
                           </li>
                         ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Interactive Bar Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold">Strategy Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'value' ? `${value}K AED` : `${value}%`,
                    name === 'value' ? 'Value' : 'ROI'
                  ]}
                />
                <Bar dataKey="value" fill="#2A9D8F" name="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium mb-2">Analysis Summary</h4>
            <p className="text-sm text-muted-foreground break-words">
              Based on current market conditions, the <span className="font-medium text-teal-600">
              {getBestStrategy().name}</span> offers the best risk-adjusted return with an ROI of{' '}
              <span className="font-medium">{getBestStrategy().roi}%</span> over{' '}
              {getBestStrategy().timeframe.toLowerCase()}.
            </p>
          </div>
          
          <Button 
            onClick={generatePDFReport}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};