
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (firstName: string, lastName: string, email: string, password: string) => boolean;
  logout: () => void;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    // This is a mock login - in a real app, you'd call your backend API
    // For demo purposes, simple validation
    if (email && password.length >= 6) {
      // Simulate successful login
      setIsLoggedIn(true);
      setUser({
        firstName: "User",
        lastName: "Name",
        email: email
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      
      return true;
    }
    return false;
  };

  const signup = (firstName: string, lastName: string, email: string, password: string) => {
    // This is a mock signup - in a real app, you'd call your backend API
    if (firstName && lastName && email && password.length >= 6) {
      // Simulate successful signup
      setIsLoggedIn(true);
      setUser({
        firstName,
        lastName,
        email
      });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!"
      });
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
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
