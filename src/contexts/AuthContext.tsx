
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define user types and roles
export type UserRole = 'guest' | 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('ceylon_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll use hardcoded credentials
      
      // Admin login
      if (email === 'admin@ceylon.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@ceylon.com',
          role: 'admin' as UserRole
        };
        setUser(adminUser);
        localStorage.setItem('ceylon_user', JSON.stringify(adminUser));
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the Ceylon Serenity Resort admin portal."
        });
        navigate('/admin');
        return;
      }
      
      // Demo guest login
      if (email === 'guest@example.com' && password === 'guest123') {
        const guestUser = {
          id: 'guest1',
          name: 'John Doe',
          email: 'guest@example.com',
          role: 'guest' as UserRole
        };
        setUser(guestUser);
        localStorage.setItem('ceylon_user', JSON.stringify(guestUser));
        toast({
          title: "Login Successful",
          description: "Welcome to Ceylon Serenity Resort."
        });
        navigate('/dashboard');
        return;
      }
      
      // Simulating login failure
      throw new Error('Invalid credentials');
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register
      const newUser = {
        id: `guest${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: 'guest' as UserRole
      };
      
      setUser(newUser);
      localStorage.setItem('ceylon_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully."
      });
      
      navigate('/dashboard');
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ceylon_user');
    toast({
      description: "You have been logged out."
    });
    navigate('/');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
