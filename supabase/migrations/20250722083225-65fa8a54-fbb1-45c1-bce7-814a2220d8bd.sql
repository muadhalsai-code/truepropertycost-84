
-- Fix search_path warnings for all database functions
-- This ensures functions use a secure search path to prevent potential security issues

-- Update get_or_create_user_profile function
CREATE OR REPLACE FUNCTION public.get_or_create_user_profile(target_user_id UUID)
RETURNS public.user_profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile public.user_profiles;
BEGIN
  -- Try to get existing profile
  SELECT * INTO profile 
  FROM public.user_profiles 
  WHERE user_id = target_user_id;
  
  -- If no profile exists, create one
  IF NOT FOUND THEN
    INSERT INTO public.user_profiles (user_id, subscription_tier, subscription_status)
    VALUES (target_user_id, 'free', 'active')
    RETURNING * INTO profile;
  END IF;
  
  RETURN profile;
END;
$$;

-- Update get_latest_market_data function
CREATE OR REPLACE FUNCTION public.get_latest_market_data(target_emirate TEXT DEFAULT NULL)
RETURNS TABLE(
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
SET search_path = public
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

-- Update get_data_freshness function
CREATE OR REPLACE FUNCTION public.get_data_freshness()
RETURNS TABLE(
  source_name TEXT,
  source_type TEXT,
  minutes_since_update INTEGER,
  is_stale BOOLEAN,
  status TEXT
)
LANGUAGE plpgsql
SET search_path = public
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

-- Update increment_usage_count function
CREATE OR REPLACE FUNCTION public.increment_usage_count(target_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  -- Insert or update usage for today
  INSERT INTO public.usage_tracking (user_id, calculation_date, calculation_count)
  VALUES (target_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, calculation_date)
  DO UPDATE SET 
    calculation_count = usage_tracking.calculation_count + 1,
    updated_at = now()
  RETURNING calculation_count INTO current_count;
  
  RETURN current_count;
END;
$$;

-- Update get_today_usage_count function
CREATE OR REPLACE FUNCTION public.get_today_usage_count(target_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  usage_count INTEGER;
BEGIN
  SELECT calculation_count INTO usage_count
  FROM public.usage_tracking
  WHERE user_id = target_user_id 
  AND calculation_date = CURRENT_DATE;
  
  RETURN COALESCE(usage_count, 0);
END;
$$;
