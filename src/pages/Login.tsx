
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animatePanel, setAnimatePanel] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    setAnimatePanel(true);
    
    // If user is already logged in, redirect to home page
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    
    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address");
      isValid = false;
    }
    
    // Password validation
    if (password.length < 6) {
      setPasswordError(true);
      if (isValid) { // Only set if no previous error
        setErrorMessage("Password must be at least 6 characters long");
      }
      isValid = false;
    }
    
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { success, error } = await login(email, password);
      
      if (!success) {
        if (error?.toLowerCase().includes("invalid") || error?.toLowerCase().includes("incorrect")) {
          setErrorMessage("The password you entered is incorrect. Let's try that again! 🔑");
        } else if (error?.toLowerCase().includes("not found") || error?.toLowerCase().includes("no user")) {
          setErrorMessage("Hmm, we can't find an account with that email. Did you sign up yet? 🧐");
        } else {
          setErrorMessage(error || "Login failed. Please try again.");
        }
      } else {
        // Successfully logged in, navigation is handled by AuthContext
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-black">Price Panda - Sign in</h1>
      </div>

      {/* Login Box - Centered */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-8 py-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg z-10 transition-all duration-500 ease-in-out ${animatePanel ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Login
        </h2>
        
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="ml-3">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setErrorMessage("");
              }}
              placeholder="Email"
              className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 ${emailError ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${emailError ? 'text-red-500' : ''}`}
              disabled={loading}
            />
            <div className="absolute right-0 top-3 flex items-center">
              <span className={emailError ? "text-red-500" : "text-gray-500"}>
                ✉
              </span>
              {emailError && <AlertCircle className="h-5 w-5 ml-1 text-amber-400" />}
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
                setErrorMessage("");
              }}
              placeholder="Password"
              className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 ${passwordError ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${passwordError ? 'text-red-500' : ''}`}
              disabled={loading}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Login Button */}
          <Button 
            type="submit"
            className={`w-full h-14 text-xl font-semibold rounded-full bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forget password?
            </Link>
          </div>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <span className="bg-white/30 px-2 text-gray-600">-OR-</span>
          </div>

          {/* Google Login - Placeholder for future implementation */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="flex items-center space-x-2 rounded-full border-none"
              type="button"
              disabled={true} // Disabled for now until we add Google auth
              onClick={() => toast({
                title: "Coming soon",
                description: "Google login will be available soon!"
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28px" height="28px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
            </Button>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center text-xs text-gray-600">
            By signing in, I agree to Price Panda's{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
