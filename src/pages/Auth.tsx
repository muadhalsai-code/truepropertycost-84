import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { validatePassword, validateEmail, sanitizeTextInput } from "@/utils/sanitization";
import { authRateLimiter } from "@/utils/rateLimiting";
import { securityLogger } from "@/utils/securityLogger";

const Auth = () => {
  const { t } = useTranslation();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: [] as string[],
    strength: 'weak' as 'weak' | 'medium' | 'strong'
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to main page
        if (session?.user) {
          navigate("/");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate and sanitize inputs
    const sanitizedEmail = sanitizeTextInput(loginEmail);
    if (!validateEmail(sanitizedEmail)) {
      securityLogger.logValidationFailure('email', loginEmail, 'Invalid email format');
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check rate limiting
    const rateLimitCheck = authRateLimiter.isRateLimited(sanitizedEmail);
    if (rateLimitCheck.isBlocked) {
      securityLogger.logRateLimitEvent(sanitizedEmail, 'login', true);
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${Math.ceil((rateLimitCheck.remainingTime || 0) / 60)} minutes before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: loginPassword,
      });

      if (error) {
        // Record failed attempt
        const blockResult = authRateLimiter.recordFailedAttempt(sanitizedEmail);
        securityLogger.logAuthEvent('login_failed', sanitizedEmail, false, { 
          error: error.message,
          blocked: blockResult.isNowBlocked 
        });
        
        let description = error.message;
        if (blockResult.isNowBlocked) {
          description += ` Account temporarily blocked for ${Math.ceil((blockResult.remainingTime || 0) / 60)} minutes due to repeated failed attempts.`;
        } else {
          const remaining = authRateLimiter.getRemainingAttempts(sanitizedEmail);
          if (remaining <= 2) {
            description += ` ${remaining} attempts remaining before temporary block.`;
          }
        }
        
        toast({
          title: "Login Failed",
          description,
          variant: "destructive",
        });
      } else {
        // Record successful attempt
        authRateLimiter.recordSuccessfulAttempt(sanitizedEmail);
        securityLogger.logAuthEvent('login_success', sanitizedEmail, true);
        toast({
          title: "Success",
          description: "Successfully logged in!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate and sanitize email
    const sanitizedEmail = sanitizeTextInput(signupEmail);
    if (!validateEmail(sanitizedEmail)) {
      securityLogger.logValidationFailure('email', signupEmail, 'Invalid email format');
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Enhanced password validation
    const validation = validatePassword(signupPassword);
    if (!validation.isValid) {
      toast({
        title: "Password Requirements Not Met",
        description: validation.errors.join('. '),
        variant: "destructive",
      });
      return;
    }
    
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        securityLogger.logAuthEvent('signup_failed', sanitizedEmail, false, { error: error.message });
        if (error.message.includes("already registered")) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please log in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        securityLogger.logAuthEvent('signup_success', sanitizedEmail, true);
        toast({
          title: "Success",
          description: "Account created successfully! You now have free premium access with unlimited calculations. Please check your email for verification.",
        });
        // Clear form
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              UAE Property Calculator
            </h1>
            <p className="text-muted-foreground">
              Access your professional property cost calculations
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to access your property calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join thousands of property professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signupPassword}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSignupPassword(value);
                            if (value) {
                              setPasswordValidation(validatePassword(value));
                            } else {
                              setPasswordValidation({ isValid: false, errors: [], strength: 'weak' });
                            }
                          }}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {signupPassword && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  passwordValidation.strength === 'strong' 
                                    ? 'w-full bg-green-500' 
                                    : passwordValidation.strength === 'medium'
                                    ? 'w-2/3 bg-yellow-500'
                                    : 'w-1/3 bg-red-500'
                                }`}
                              />
                            </div>
                            <span className={`text-xs font-medium ${
                              passwordValidation.strength === 'strong' 
                                ? 'text-green-600' 
                                : passwordValidation.strength === 'medium'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}>
                              {passwordValidation.strength.charAt(0).toUpperCase() + passwordValidation.strength.slice(1)}
                            </span>
                          </div>
                          
                          {passwordValidation.errors.length > 0 && (
                            <div className="space-y-1">
                              {passwordValidation.errors.map((error, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-red-600">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>{error}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {passwordValidation.isValid && (
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>Password meets all requirements</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;