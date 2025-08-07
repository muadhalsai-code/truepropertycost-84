import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calculator, Home, DollarSign, AlertTriangle, PieChart, FileText, Lock } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UsageIndicator } from "@/components/UsageIndicator";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CalculatorState {
  propertyValue: number;
  emirate: string;
  propertyType: string;
  buyerType: string;
  transactionType: string;
  hasMortgage: boolean;
  isFirstBuyer: boolean;
  agentCommissionRate: number;
  mortgageRate: number;
  valuationFee: number;
  nocFee: number;
}

interface CostBreakdown {
  dldFee: number;
  agentCommission: number;
  trusteeFees: number;
  mortgageFees: number;
  valuationFee: number;
  nocFee: number;
  propertyValue: number;
  totalCosts: number;
}

const emirates = [
  "Abu Dhabi",
  "Dubai", 
  "Sharjah",
  "Ajman",
  "Umm Al-Quwain",
  "Ras Al Khaimah",
  "Fujairah"
];

const propertyTypes = ["Residential", "Commercial", "Land"];
const buyerTypes = ["Individual", "Corporate"];
const transactionTypes = ["Sale", "Gift", "Transfer"];

const PropertyCalculator = () => {
  const [formData, setFormData] = useState<CalculatorState>({
    propertyValue: 1000000,
    emirate: "Dubai",
    propertyType: "Residential",
    buyerType: "Individual",
    transactionType: "Sale",
    hasMortgage: false,
    isFirstBuyer: false,
    agentCommissionRate: 2,
    mortgageRate: 2.5,
    valuationFee: 0,
    nocFee: 0,
  });

  const [results, setResults] = useState<CostBreakdown | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  
  const { canCalculate, incrementUsage, isAuthenticated } = useUsageTracking();
  const { user, isPremium } = useUserProfile();
  const { toast } = useToast();

  const calculateCosts = async () => {
    // Check authentication and usage limits
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the calculator.",
        variant: "destructive"
      });
      return;
    }

    if (!canCalculate && !isPremium) {
      setShowUpgradePrompt(true);
      return;
    }

    // Track usage for free users
    if (!isPremium) {
      const success = await incrementUsage();
      if (!success) {
        setShowUpgradePrompt(true);
        return;
      }
    }

    const { propertyValue, emirate, propertyType, buyerType, transactionType, hasMortgage, isFirstBuyer, agentCommissionRate, mortgageRate, valuationFee, nocFee } = formData;
    
    // DLD Fee calculation based on transaction type and buyer type
    let dldFee = 0;
    if (transactionType === "Sale") {
      if (buyerType === "Individual") {
        dldFee = propertyValue * 0.04; // 4% for individuals
      } else {
        dldFee = propertyValue * 0.04; // 4% for corporate (same rate)
      }
    } else if (transactionType === "Gift") {
      dldFee = propertyValue * 0.03; // 3% for gifts
    } else if (transactionType === "Transfer") {
      dldFee = propertyValue * 0.02; // 2% for transfers
    }
    
    // First-time buyer discount (if applicable)
    if (isFirstBuyer && transactionType === "Sale" && propertyType === "Residential") {
      dldFee = Math.min(dldFee, 25000); // Cap at 25,000 AED for first-time buyers
    }
    
    // Agent Commission (variable rate + 5% VAT)
    const agentCommissionBase = propertyValue * (agentCommissionRate / 100);
    const agentCommission = agentCommissionBase * 1.05;
    
    // Trustee Fees: 4000 AED + 5% VAT (only for mortgaged properties)
    const trusteeFees = hasMortgage ? 4000 * 1.05 : 0;
    
    // Mortgage Fees
    let mortgageFees = 0;
    if (hasMortgage) {
      mortgageFees = propertyValue * (mortgageRate / 100); // User-defined mortgage rate
    }
    
    // Emirate-specific fees
    const abuDhabiValuationFee = emirate === "Abu Dhabi" ? valuationFee : 0;
    const rasAlKhaimahNocFee = emirate === "Ras Al Khaimah" ? nocFee : 0;
    
    const totalCosts = dldFee + agentCommission + trusteeFees + mortgageFees + abuDhabiValuationFee + rasAlKhaimahNocFee + propertyValue;
    
    setResults({
      dldFee,
      agentCommission,
      trusteeFees,
      mortgageFees,
      valuationFee: abuDhabiValuationFee,
      nocFee: rasAlKhaimahNocFee,
      propertyValue,
      totalCosts,
    });
  };

  const resetForm = () => {
    setFormData({
      propertyValue: 1000000,
      emirate: "Dubai",
      propertyType: "Residential",
      buyerType: "Individual",
      transactionType: "Sale",
      hasMortgage: false,
      isFirstBuyer: false,
      agentCommissionRate: 2,
      mortgageRate: 2.5,
      valuationFee: 0,
      nocFee: 0,
    });
    setResults(null);
  };

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('True Property Cost Calculator', 20, 20);
    doc.setFontSize(14);
    doc.text('UAE Real Estate Transaction Cost Report', 20, 30);
    
    // Client name if provided
    if (clientName.trim()) {
      doc.setFontSize(12);
      doc.text(`Client: ${clientName}`, 20, 40);
    }
     
    // Property Details
    const propertyDetailsY = clientName.trim() ? 60 : 50;
    doc.setFontSize(16);
    doc.text('Property Details:', 20, propertyDetailsY);
    doc.setFontSize(12);
    doc.text(`Property Value: ${formatCurrency(results.propertyValue)}`, 20, propertyDetailsY + 10);
    doc.text(`Emirate: ${formData.emirate}`, 20, propertyDetailsY + 20);
    doc.text(`Property Type: ${formData.propertyType}`, 20, propertyDetailsY + 30);
    doc.text(`Buyer Type: ${formData.buyerType}`, 20, propertyDetailsY + 40);
    doc.text(`Transaction Type: ${formData.transactionType}`, 20, propertyDetailsY + 50);
    
    // Cost Breakdown
    const costBreakdownY = propertyDetailsY + 70;
    doc.setFontSize(16);
    doc.text('Cost Breakdown:', 20, costBreakdownY);
    doc.setFontSize(12);
    let yPos = costBreakdownY + 10;
    
    doc.text(`Property Value: ${formatCurrency(results.propertyValue)}`, 20, yPos);
    yPos += 10;
    doc.text(`DLD Fee: ${formatCurrency(results.dldFee)}`, 20, yPos);
    yPos += 10;
    doc.text(`Agent Commission: ${formatCurrency(results.agentCommission)}`, 20, yPos);
    yPos += 10;
    
    if (results.trusteeFees > 0) {
      doc.text(`Trustee Fees: ${formatCurrency(results.trusteeFees)}`, 20, yPos);
      yPos += 10;
    }
    if (results.mortgageFees > 0) {
      doc.text(`Mortgage Fees: ${formatCurrency(results.mortgageFees)}`, 20, yPos);
      yPos += 10;
    }
    if (results.valuationFee > 0) {
      doc.text(`Valuation Fee: ${formatCurrency(results.valuationFee)}`, 20, yPos);
      yPos += 10;
    }
    if (results.nocFee > 0) {
      doc.text(`NOC Fee: ${formatCurrency(results.nocFee)}`, 20, yPos);
      yPos += 10;
    }
    
    // Total
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total Cost: ${formatCurrency(results.totalCosts)}`, 20, yPos);
    
    // Add chart if available
    const chartCanvas = document.querySelector('canvas');
    if (chartCanvas && chartData) {
      try {
        const chartImage = chartCanvas.toDataURL('image/png');
        yPos += 20;
        doc.setFontSize(16);
        doc.text('Cost Distribution Chart:', 20, yPos);
        
        // Add chart image to PDF
        const imgWidth = 120;
        const imgHeight = 80;
        doc.addImage(chartImage, 'PNG', 20, yPos + 10, imgWidth, imgHeight);
      } catch (error) {
        console.log('Could not add chart to PDF:', error);
      }
    }
    
    // Footer
    doc.setFontSize(10);
    doc.text('Generated by True Property Cost Calculator - ' + new Date().toLocaleDateString(), 20, 280);
    
    // Generate filename based on client name
    let filename = 'property-cost-calculation.pdf';
    if (clientName.trim()) {
      const sanitizedClientName = clientName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
      filename = `${sanitizedClientName}-property-cost-calculation.pdf`;
    }
    
    // Save the PDF
    doc.save(filename);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Chart data
  const chartData = results ? {
    datasets: [
      {
        data: [
          results.propertyValue,
          results.dldFee,
          results.agentCommission,
          results.trusteeFees,
          results.mortgageFees,
          results.valuationFee,
          results.nocFee,
        ].filter(value => value > 0),
        backgroundColor: [
          "hsl(210, 40%, 45%)", // Property Value - Blue
          "hsl(142, 76%, 36%)", // DLD Fee - Green
          "hsl(24, 70%, 50%)",  // Agent Commission - Orange
          "hsl(262, 83%, 58%)", // Trustee Fees - Purple
          "hsl(346, 77%, 49%)", // Mortgage Fees - Red
          "hsl(195, 100%, 35%)", // Valuation Fee - Teal
          "hsl(280, 100%, 40%)", // NOC Fee - Magenta
        ],
        borderWidth: 0,
      },
    ],
    labels: [
      "Property Value",
      "DLD Fee", 
      "Agent Commission", 
      ...(results.trusteeFees > 0 ? ["Trustee Fees"] : []),
      ...(results.mortgageFees > 0 ? ["Mortgage Fees"] : []),
      ...(results.valuationFee > 0 ? ["Valuation Fee"] : []),
      ...(results.nocFee > 0 ? ["NOC Fee"] : [])
    ],
  } : null;

  const handleUpgrade = async () => {
    setShowUpgradePrompt(false);
    
    if (!user) {
      window.location.href = '/auth';
      return;
    }

    try {
      const { error } = await supabase.rpc('start_premium_trial', {
        target_user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Premium Trial Started!",
        description: "You now have 30 days of free premium access. Enjoy unlimited calculations!",
      });

      // Refresh the page to update usage limits
      window.location.reload();
    } catch (error) {
      console.error('Error starting premium trial:', error);
      toast({
        title: "Error",
        description: "Unable to start premium trial. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Usage Indicator for Free Users */}
      <UsageIndicator />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Property Details Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Details
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your property information to calculate transaction costs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="propertyValue">Property Value (AED)</Label>
              <Input
                id="propertyValue"
                type="number"
                value={formData.propertyValue}
                onChange={(e) => 
                  setFormData(prev => ({ ...prev, propertyValue: Number(e.target.value) || 0 }))
                }
                className="mt-2"
                placeholder="Enter property value"
              />
            </div>

            <div>
              <Label htmlFor="emirate">Emirate</Label>
              <Select 
                value={formData.emirate} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, emirate: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select emirate" />
                </SelectTrigger>
                <SelectContent>
                  {emirates.map((emirate) => (
                    <SelectItem key={emirate} value={emirate}>
                      {emirate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={formData.propertyType} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, propertyType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="buyerType">Buyer Type</Label>
              <Select 
                value={formData.buyerType} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, buyerType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select buyer type" />
                </SelectTrigger>
                <SelectContent>
                  {buyerTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select 
                value={formData.transactionType} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, transactionType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mortgage"
                checked={formData.hasMortgage}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, hasMortgage: checked as boolean }))
                }
              />
              <Label htmlFor="mortgage">Property purchased with mortgage</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="firstBuyer"
                checked={formData.isFirstBuyer}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isFirstBuyer: checked as boolean }))
                }
              />
              <Label htmlFor="firstBuyer">First-time buyer</Label>
            </div>

            <div>
              <Label htmlFor="agentCommissionRate">Agent Commission Rate (%)</Label>
              <Input
                id="agentCommissionRate"
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={formData.agentCommissionRate}
                onChange={(e) => 
                  setFormData(prev => ({ ...prev, agentCommissionRate: Number(e.target.value) || 0 }))
                }
                className="mt-2"
                placeholder="Enter commission rate"
              />
            </div>

            {formData.hasMortgage && (
              <div>
                <Label htmlFor="mortgageRate">Mortgage Rate (%)</Label>
                <Input
                  id="mortgageRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={formData.mortgageRate}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, mortgageRate: Number(e.target.value) || 0 }))
                  }
                  className="mt-2"
                  placeholder="Enter mortgage rate"
                />
              </div>
            )}

            {formData.emirate === "Abu Dhabi" && (
              <div>
                <Label htmlFor="valuationFee">Valuation Fee (AED)</Label>
                <Input
                  id="valuationFee"
                  type="number"
                  min="0"
                  value={formData.valuationFee}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, valuationFee: Number(e.target.value) || 0 }))
                  }
                  className="mt-2"
                  placeholder="Enter valuation fee"
                />
              </div>
            )}

            {formData.emirate === "Ras Al Khaimah" && (
              <div>
                <Label htmlFor="nocFee">NOC Fee (AED)</Label>
                <Input
                  id="nocFee"
                  type="number"
                  min="0"
                  value={formData.nocFee}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, nocFee: Number(e.target.value) || 0 }))
                  }
                  className="mt-2"
                  placeholder="Enter NOC fee"
                />
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={calculateCosts} 
                className="flex-1"
                disabled={!isAuthenticated || (!canCalculate && !isPremium)}
              >
                {!isAuthenticated ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Sign In to Calculate
                  </>
                ) : (!canCalculate && !isPremium) ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Daily Limit Reached
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Costs
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of all transaction costs
          </p>
        </CardHeader>
        <CardContent>
          {results ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Property Value:</span>
                  <span className="font-semibold">{formatCurrency(results.propertyValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>DLD Fee:</span>
                  <span className="font-semibold">{formatCurrency(results.dldFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agent Commission:</span>
                  <span className="font-semibold">{formatCurrency(results.agentCommission)}</span>
                </div>
                {results.trusteeFees > 0 && (
                  <div className="flex justify-between">
                    <span>Trustee Fees:</span>
                    <span className="font-semibold">{formatCurrency(results.trusteeFees)}</span>
                  </div>
                )}
                {results.mortgageFees > 0 && (
                  <div className="flex justify-between">
                    <span>Mortgage Fees:</span>
                    <span className="font-semibold">{formatCurrency(results.mortgageFees)}</span>
                  </div>
                )}
                {results.valuationFee > 0 && (
                  <div className="flex justify-between">
                    <span>Valuation Fee:</span>
                    <span className="font-semibold">{formatCurrency(results.valuationFee)}</span>
                  </div>
                )}
                {results.nocFee > 0 && (
                  <div className="flex justify-between">
                    <span>NOC Fee:</span>
                    <span className="font-semibold">{formatCurrency(results.nocFee)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost:</span>
                  <span className="text-primary">{formatCurrency(results.totalCosts)}</span>
                </div>
              </div>

              {/* Save PDF Button */}
              <div className="mt-4 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={generatePDF}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Save PDF
                </Button>
                
                <div>
                  <Label htmlFor="clientName">Client Name (Optional)</Label>
                  <Input
                    id="clientName"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-1"
                    placeholder="Enter client name for PDF"
                  />
                </div>
              </div>

              {/* Chart */}
              {chartData && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Cost Distribution
                  </h3>
                  <div className="h-64">
                    <Doughnut 
                      data={chartData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              boxWidth: 12,
                              font: {
                                size: 10
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter property details and click "Calculate Costs" to see the breakdown</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="lg:col-span-2">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important Disclaimer:</strong> This calculator provides estimates based on current regulations and standard fees. 
            Actual costs may vary depending on specific circumstances, property location, and current regulations. 
            Please consult with a qualified real estate professional or legal advisor for accurate cost assessment. 
            Fees and regulations are subject to change without notice.
          </AlertDescription>
        </Alert>
      </div>
      
      {/* Upgrade Prompt */}
      <UpgradePrompt 
        open={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        onUpgrade={handleUpgrade}
      />
      </div>
    </div>
  );
};

export default PropertyCalculator;