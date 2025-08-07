-- Update the handle_new_user function to automatically give premium access
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer set search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, subscription_tier, subscription_status)
  VALUES (NEW.id, 'premium', 'active');
  RETURN NEW;
END;
$$;