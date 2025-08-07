-- Function to start premium trial for users
CREATE OR REPLACE FUNCTION public.start_premium_trial(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update or insert the user profile with premium trial
  INSERT INTO public.user_profiles (
    user_id,
    subscription_tier,
    subscription_status,
    created_at,
    updated_at
  ) VALUES (
    target_user_id,
    'premium',
    'trial',
    now(),
    now()
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    subscription_tier = 'premium',
    subscription_status = 'trial',
    updated_at = now();
END;
$$;