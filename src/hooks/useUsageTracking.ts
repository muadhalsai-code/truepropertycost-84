import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';

export const useUsageTracking = () => {
  const { user, usageLimit, isAuthenticated } = useUserProfile();
  const [todayUsage, setTodayUsage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTodayUsage();
    }
  }, [isAuthenticated, user]);

  const fetchTodayUsage = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('calculation_count')
        .eq('user_id', user.id)
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setTodayUsage(data?.calculation_count || 0);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const incrementUsage = async (): Promise<boolean> => {
    if (!user) return false;

    // Check if user has reached limit
    if (todayUsage >= usageLimit) {
      return false;
    }

    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Try to increment existing record or create new one
      const { error } = await supabase
        .from('usage_tracking')
        .upsert({
          user_id: user.id,
          date: today,
          calculation_count: todayUsage + 1
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      setTodayUsage(todayUsage + 1);
      return true;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const canCalculate = isAuthenticated ? todayUsage < usageLimit : false;
  const remainingCalculations = Math.max(0, usageLimit - todayUsage);

  return {
    todayUsage,
    usageLimit,
    canCalculate,
    remainingCalculations,
    incrementUsage,
    loading,
    isAuthenticated
  };
};