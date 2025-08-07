import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface MarketData {
  id: string;
  emirate: string;
  property_type: string;
  avg_price_psf: number | null;
  rental_yield: number | null;
  off_plan_discount: number | null;
  hidden_fees_percentage: number | null;
  total_properties: number | null;
  data_source: string;
  last_updated: string;
}

export interface FinancialData {
  id: string;
  data_type: string;
  value: number;
  bank_name: string | null;
  data_source: string;
  effective_date: string;
  last_updated: string;
}

export interface RegulatoryUpdate {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  tags: string[];
  source_url: string | null;
  effective_date: string | null;
  last_updated: string;
}

export interface DataSource {
  id: string;
  source_name: string;
  source_type: string;
  endpoint_url: string | null;
  is_active: boolean;
  last_successful_fetch: string | null;
  last_error: string | null;
  fetch_frequency_minutes: number;
}

export const useMarketData = (emirate?: string) => {
  return useQuery({
    queryKey: ['market-data', emirate],
    queryFn: async (): Promise<MarketData[]> => {
      // Mock data since we don't have market_data table yet
      return [];
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useFinancialData = () => {
  return useQuery({
    queryKey: ['financial-data'],
    queryFn: async (): Promise<FinancialData[]> => {
      // Mock data since we don't have financial_data table yet
      return [];
    },
    refetchInterval: 600000, // Refetch every 10 minutes
  });
};

export const useRegulatoryUpdates = () => {
  return useQuery({
    queryKey: ['regulatory-updates'],
    queryFn: async (): Promise<RegulatoryUpdate[]> => {
      // Mock data since we don't have regulatory_updates table yet
      return [];
    },
    refetchInterval: 900000, // Refetch every 15 minutes
  });
};

export const useDataSources = () => {
  return useQuery({
    queryKey: ['data-sources'],
    queryFn: async (): Promise<DataSource[]> => {
      // Mock data since we don't have data_sources table yet
      return [];
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useCriticalAlerts = () => {
  return useQuery({
    queryKey: ['critical-alerts'],
    queryFn: async (): Promise<number> => {
      // Mock data since we don't have regulatory_updates table yet
      return 0;
    },
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useRefreshMarketData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // Mock refresh function since we don't have real data yet
      console.log('Market data refresh requested');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    },
    onSuccess: () => {
      // Invalidate and refetch all market data queries
      queryClient.invalidateQueries({ queryKey: ['market-data'] });
      queryClient.invalidateQueries({ queryKey: ['financial-data'] });
      queryClient.invalidateQueries({ queryKey: ['regulatory-updates'] });
      queryClient.invalidateQueries({ queryKey: ['critical-alerts'] });
    },
  });
};