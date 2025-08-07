
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useUserProfile } from '@/hooks/useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useUserProfile();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              {location.pathname.startsWith('/dashboard') && <SidebarTrigger />}
              <Link to="/" className="flex items-center space-x-3">
                <img src={logo} alt="True Property Cost Calculator" className="h-16 w-auto" />
                <span className="font-poppins font-bold text-xl text-primary">True Property Cost Calculator</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/dashboard') 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {t('nav.dashboard')}
              </Link>
              <a 
                href="#pricing" 
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-primary hover:bg-gray-100"
              >
                {t('nav.pricing')}
              </a>
              <Link 
                to="/privacy" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/privacy' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                Privacy
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/auth" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/auth' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                >
                  {t('nav.signIn')}
                </Link>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-primary hover:bg-gray-100"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            {!isAuthenticated && (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="hidden md:inline-flex">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm">
                    {t('nav.getStarted')}
                  </Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
