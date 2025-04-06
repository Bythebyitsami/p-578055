
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: { firstName?: string; lastName?: string; profileImage?: string }) => Promise<void>;
}

interface UserMetadata {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoggedIn(!!newSession);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Login successful",
            description: "Welcome to Price Panda!"
          });
          navigate('/');
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Logged out",
            description: "You have been logged out successfully"
          });
        }
      }
    );
    
    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoggedIn(!!currentSession);
    });
    
    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Login exception:", error);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      // Set email confirmation to false
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName
          },
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        return { success: false, error: error.message };
      }
      
      // Check if email confirmation is needed
      if (data?.user?.identities?.length === 0) {
        return { 
          success: false, 
          error: "This email is already registered! Try logging in instead." 
        };
      }
      
      // Auto-login the user after signup (no email confirmation required)
      if (data?.user) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!"
        });
        
        // Try to login automatically
        await login(email, password);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Signup exception:", error);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  };

  const updateProfile = async (updates: { firstName?: string; lastName?: string; profileImage?: string }) => {
    if (!user) return;
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates as UserMetadata
      });
      
      if (error) throw error;
      
      // Update the local user state with the new metadata
      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...updates
          }
        });
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, session, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
