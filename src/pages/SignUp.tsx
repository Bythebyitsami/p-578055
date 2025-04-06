
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  const [animatePanel, setAnimatePanel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, isLoggedIn } = useAuth();

  useEffect(() => {
    setAnimatePanel(true);
    
    // If user is already logged in, redirect to home page
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data from the event target
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    setLoading(true);
    try {
      const { success, error } = await signup(firstName, lastName, email, password);
      
      if (!success) {
        if (error?.toLowerCase().includes("already") || error?.toLowerCase().includes("exists")) {
          setErrorMessage("This email is already registered! Try logging in instead 🙂");
        } else if (error?.toLowerCase().includes("weak")) {
          setErrorMessage("That password looks a bit weak. Try adding some numbers or special characters!");
        } else {
          setErrorMessage(error || "Signup failed. Please try again.");
        }
      } else {
        // Successfully signed up, navigation is handled by AuthContext
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

  const showErrorMessage = !!errorMessage;

  return (
    <div className="min-h-screen flex bg-[#F9F2DA] relative overflow-hidden">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 z-20 p-2 rounded-full hover:bg-[#F7F3E7] transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      {/* Blue wave decoration */}
      <div className="absolute bottom-0 w-full h-1/5 bg-blue-300 rounded-t-full opacity-70" />

      {/* Header */}
      <div className="bg-blue-200 w-full py-3 px-4 text-center mb-6 relative z-10">
        <h1 className="text-2xl font-bold text-black">Welcome to Price Panda - Sign up</h1>
      </div>

      {/* Signup Box - Centered */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-8 py-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg z-10 transition-all duration-500 ease-in-out ${animatePanel ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Sign up
        </h2>
        
        <SignUpForm 
          loading={loading}
          errorMessage={errorMessage}
          showErrorMessage={showErrorMessage}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignUp;
