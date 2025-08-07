
-- Create table for storing live property market data
CREATE TABLE public.market_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  emirate TEXT NOT NULL,
  property_type TEXT NOT NULL,
  avg_price_psf DECIMAL(10,2),
  rental_yield DECIMAL(5,2),
  off_plan_discount DECIMAL(5,2),
  hidden_fees_percentage DECIMAL(5,2),
  total_properties INTEGER DEFAULT 0,
  data_source TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing financial data (mortgage rates, etc.)
CREATE TABLE public.financial_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type TEXT NOT NULL, -- 'mortgage_rate', 'service_charge_trend', 'aed_usd_rate'
  value DECIMAL(10,4) NOT NULL,
  bank_name TEXT, -- for mortgage rates
  data_source TEXT NOT NULL,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing regulatory alerts and updates
CREATE TABLE public.regulatory_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  category TEXT NOT NULL CHECK (category IN ('DLD', 'Mortgage', 'Leasehold', 'Tax', 'General')),
  tags TEXT[] DEFAULT '{}',
  source_url TEXT,
  effective_date DATE,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for API connection status monitoring
CREATE TABLE public.data_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT UNIQUE NOT NULL,
  source_type TEXT NOT NULL, -- 'property_api', 'financial_api', 'regulatory_feed'
  endpoint_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_successful_fetch TIMESTAMP WITH TIME ZONE,
  last_error TEXT,
  fetch_frequency_minutes INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial data sources
INSERT INTO public.data_sources (source_name, source_type, endpoint_url, fetch_frequency_minutes) VALUES
('Dubai Land Department', 'regulatory_feed', 'https://dubailand.gov.ae', 1440), -- daily
('UAE Central Bank', 'financial_api', 'https://centralbank.ae', 720), -- twice daily
('Bayut API', 'property_api', 'https://api.bayut.com', 60), -- hourly
('Property Finder API', 'property_api', 'https://api.propertyfinder.ae', 60); -- hourly

-- Create indexes for better performance
CREATE INDEX idx_market_data_emirate_updated ON public.market_data(emirate, last_updated DESC);
CREATE INDEX idx_financial_data_type_date ON public.financial_data(data_type, effective_date DESC);
CREATE INDEX idx_regulatory_updates_severity ON public.regulatory_updates(severity, created_at DESC);
CREATE INDEX idx_data_sources_active ON public.data_sources(is_active, last_successful_fetch DESC);

-- Enable RLS (Row Level Security) - making data publicly readable for this analytics use case
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regulatory_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (analytics dashboard)
CREATE POLICY "Allow public read access to market data" ON public.market_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to financial data" ON public.financial_data FOR SELECT USING (true);
CREATE POLICY "Allow public read access to regulatory updates" ON public.regulatory_updates FOR SELECT USING (true);
CREATE POLICY "Allow public read access to data sources" ON public.data_sources FOR SELECT USING (true);

-- Create function to get latest market data by emirate
CREATE OR REPLACE FUNCTION public.get_latest_market_data(target_emirate TEXT DEFAULT NULL)
RETURNS TABLE (
  emirate TEXT,
  avg_price_psf DECIMAL(10,2),
  rental_yield DECIMAL(5,2),
  off_plan_discount DECIMAL(5,2),
  hidden_fees_percentage DECIMAL(5,2),
  total_properties INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE,
  data_source TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (md.emirate)
    md.emirate,
    md.avg_price_psf,
    md.rental_yield,
    md.off_plan_discount,
    md.hidden_fees_percentage,
    md.total_properties,
    md.last_updated,
    md.data_source
  FROM public.market_data md
  WHERE (target_emirate IS NULL OR md.emirate = target_emirate)
  ORDER BY md.emirate, md.last_updated DESC;
END;
$$;

-- Create function to check data freshness
CREATE OR REPLACE FUNCTION public.get_data_freshness()
RETURNS TABLE (
  source_name TEXT,
  source_type TEXT,
  minutes_since_update INTEGER,
  is_stale BOOLEAN,
  status TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ds.source_name,
    ds.source_type,
    EXTRACT(EPOCH FROM (NOW() - ds.last_successful_fetch))::INTEGER / 60 AS minutes_since_update,
    (ds.last_successful_fetch IS NULL OR 
     ds.last_successful_fetch < NOW() - INTERVAL '1 hour' * (ds.fetch_frequency_minutes / 60.0 * 2)) AS is_stale,
    CASE 
      WHEN ds.last_successful_fetch IS NULL THEN 'Never Updated'
      WHEN ds.last_successful_fetch < NOW() - INTERVAL '1 hour' * (ds.fetch_frequency_minutes / 60.0 * 2) THEN 'Stale'
      WHEN ds.is_active = false THEN 'Inactive'
      ELSE 'Fresh'
    END AS status
  FROM public.data_sources ds
  ORDER BY ds.source_type, ds.source_name;
END;
$$;
