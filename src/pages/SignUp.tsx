
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup } = useAuth();

  useEffect(() => {
    setAnimatePanel(true);
  }, []);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormSubmitted(true);
    let isValid = true;
    
    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    }
    
    // Validate passwords match
    if (password !== confirmPassword || password.length < 6) {
      setPasswordError(true);
      isValid = false;
    }
    
    if (isValid) {
      // Attempt signup
      const signupSuccess = signup(firstName, lastName, email, password);
      
      if (signupSuccess) {
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Please check the form for errors.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
    }
  };
  
  const isFormValid = firstName && lastName && email && password && confirmPassword && password === confirmPassword && !emailError && !passwordError;
  const showErrorMessage = formSubmitted && (!firstName || !lastName || !email || !password || !confirmPassword || emailError || passwordError);

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
        <h1 className="text-2xl font-bold text-black">Welcome to the panda Family - Sign up</h1>
      </div>

      {/* Signup Box - Centered */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-8 py-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg z-10 transition-all duration-500 ease-in-out ${animatePanel ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Sign up
        </h2>
        
        {showErrorMessage && (
          <div className="mb-4 text-center text-red-500 font-medium">
            Hold up! Don't forget anything!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-gray-400 focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500"
              />
            </div>
            
            <div className="relative">
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-gray-400 focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              placeholder="Email"
              className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 ${emailError ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${emailError ? 'text-red-500' : ''}`}
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
              }}
              placeholder="Password"
              className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 ${passwordError ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${passwordError ? 'text-red-500' : ''}`}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError(false);
              }}
              placeholder="Confirm password"
              className={`w-full border-b-2 border-t-0 border-l-0 border-r-0 ${passwordError ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${passwordError ? 'text-red-500' : ''}`}
            />
            <button 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-3 text-gray-500"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Signup Button */}
          <Button 
            type="submit"
            className={`w-full h-14 text-xl font-semibold rounded-full ${isFormValid ? 'bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Sign up
          </Button>

          {/* Already have account link */}
          <div className="text-center text-sm">
            <span>Already have an account?</span>{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center text-xs text-gray-600">
            By signing in, I agree to panda's{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
