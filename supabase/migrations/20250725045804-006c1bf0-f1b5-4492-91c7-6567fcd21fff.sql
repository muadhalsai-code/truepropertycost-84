-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.get_or_create_user_profile(target_user_id UUID)
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  profile_record public.profiles;
BEGIN
  -- Try to get existing profile
  SELECT * INTO profile_record 
  FROM public.profiles 
  WHERE user_id = target_user_id;
  
  -- If no profile exists, create one
  IF NOT FOUND THEN
    INSERT INTO public.profiles (user_id, subscription_tier, subscription_status)
    VALUES (target_user_id, 'free', 'active')
    RETURNING * INTO profile_record;
  END IF;
  
  RETURN profile_record;
END;
$$;

-- Fix update function security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix new user handler security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, subscription_tier, subscription_status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$;