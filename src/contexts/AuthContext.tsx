
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (firstName: string, lastName: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

const LOCAL_STORAGE_KEY = "pricePandaUser";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // This is a mock login - in a real app, you'd call your backend API
    // For demo purposes, simple validation
    if (email && password.length >= 6) {
      // Check if this user has signed up before
      const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      let userToLogin: User;
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // In a real app, you'd verify the password here
        userToLogin = parsedUser;
      } else {
        // If no saved user, create a default one
        userToLogin = {
          firstName: "User",
          lastName: "Name",
          email: email
        };
      }
      
      // Set the user and login state
      setUser(userToLogin);
      setIsLoggedIn(true);
      
      // Save user to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userToLogin));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userToLogin.firstName}!`
      });
      
      return true;
    }
    return false;
  };

  const signup = (firstName: string, lastName: string, email: string, password: string) => {
    // This is a mock signup - in a real app, you'd call your backend API
    if (firstName && lastName && email && password.length >= 6) {
      // Create user object
      const newUser = {
        firstName,
        lastName,
        email
      };
      
      // Set the user and login state
      setUser(newUser);
      setIsLoggedIn(true);
      
      // Save user to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!"
      });
      
      return true;
    }
    return false;
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Save updated user to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully!"
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Remove user from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, updateProfile }}>
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
