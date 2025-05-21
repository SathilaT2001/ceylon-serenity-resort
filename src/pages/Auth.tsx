
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, signup, isAuthenticated } = useAuth();
  
  // Check if we should display the signup tab by default
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nic: '', // National Identity Card for Sri Lankan citizens
    nationality: 'Sri Lanka',
    contactNumber: '',
  });
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(loginData.email, loginData.password);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signup(signupData);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-center">Ceylon Serenity Resort</CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login' 
                ? 'Sign in to your account to manage your reservations'
                : 'Create an account to start booking your stay'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <a 
                          href="#" 
                          className="text-xs text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            toast({
                              description: "Password reset functionality would be implemented in a real app.",
                            });
                          }}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="login-password" 
                        type="password" 
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      <p className="text-muted-foreground mb-1">Demo Credentials:</p>
                      <p className="text-muted-foreground text-xs">Admin: admin@ceylon.com / admin123</p>
                      {/* <p className="text-muted-foreground text-xs">Guest: guest@example.com / guest123</p> */}
                      <p className="text-muted-foreground text-xs mb-3">Employee: employee@ceylon.com / employee123</p>
                      
                      <div className="mt-2">
                        Don't have an account?{" "}
                        <a 
                          href="#" 
                          className="text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab('signup');
                          }}
                        >
                          Sign up
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input 
                        id="signup-name" 
                        placeholder="John Doe" 
                        required
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-nic">NIC/Passport</Label>
                        <Input 
                          id="signup-nic" 
                          placeholder="National ID or Passport" 
                          value={signupData.nic}
                          onChange={(e) => setSignupData({...signupData, nic: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-contact">Contact Number</Label>
                        <Input 
                          id="signup-contact" 
                          type="tel" 
                          placeholder="+94 123456789" 
                          value={signupData.contactNumber}
                          onChange={(e) => setSignupData({...signupData, contactNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        required
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input 
                        id="signup-confirm-password" 
                        type="password" 
                        required
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>
                    
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <a 
                        href="#" 
                        className="text-primary hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('login');
                        }}
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          {/* <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => toast({ description: "Social login would be implemented in a real app." })}>Google</Button>
              <Button variant="outline" onClick={() => toast({ description: "Social login would be implemented in a real app." })}>Facebook</Button>
            </div>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default Auth;
