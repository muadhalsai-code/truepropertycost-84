import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  subscription_tier: 'free' | 'premium' | 'professional';
  subscription_status: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchOrCreateProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchOrCreateProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_or_create_user_profile', {
        target_user_id: userId
      });

      if (error) throw error;
      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUsageLimit = () => {
    if (!profile) return 0;
    
    switch (profile.subscription_tier) {
      case 'free':
        return 2;
      case 'premium':
      case 'professional':
        return Infinity;
      default:
        return 0;
    }
  };

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    usageLimit: getUsageLimit(),
    isPremium: profile?.subscription_tier !== 'free'
  };
};