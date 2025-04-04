
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-blue-300 relative overflow-hidden">
      {/* Panda Images */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <img 
          src="/lovable-uploads/3b7596ad-48ba-409e-866a-999826d9a270.png" 
          alt="Panda illustration" 
          className="w-32 h-auto"
        />
      </div>
      <div className="absolute top-60 left-32">
        <img 
          src="/lovable-uploads/3b7596ad-48ba-409e-866a-999826d9a270.png" 
          alt="Panda illustration" 
          className="w-32 h-auto"
        />
      </div>
      <div className="absolute bottom-40 left-40">
        <img 
          src="/lovable-uploads/3b7596ad-48ba-409e-866a-999826d9a270.png" 
          alt="Panda illustration" 
          className="w-32 h-auto"
        />
      </div>
      <div className="absolute bottom-0 left-16">
        <img 
          src="/lovable-uploads/3b7596ad-48ba-409e-866a-999826d9a270.png" 
          alt="Panda illustration" 
          className="w-32 h-auto"
        />
      </div>
      <div className="absolute bottom-10 left-1/2">
        <img 
          src="/lovable-uploads/3b7596ad-48ba-409e-866a-999826d9a270.png" 
          alt="Panda illustration" 
          className="w-32 h-auto"
        />
      </div>

      {/* Blue wave decoration */}
      <div className="absolute bottom-0 w-full h-1/3 bg-blue-300 rounded-t-full opacity-70" />

      {/* Header */}
      <div className="bg-blue-200 w-full py-6 px-4 text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Panda's Got Your Back- Sign in</h1>
      </div>

      {/* Login Box */}
      <div className="mx-auto w-full max-w-md px-8 py-10 bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg z-10">
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-10">
          Login
        </h2>

        <div className="space-y-8">
          {/* Email Input */}
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-gray-400 focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500"
            />
            <div className="absolute right-0 top-3">
              <span className="text-gray-500">
                ✉
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-gray-400 focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500"
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

          {/* Login Button */}
          <Button 
            className="w-full h-14 text-xl font-semibold rounded-full bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white"
          >
            Login
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

          {/* Google Login */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="flex items-center space-x-2 rounded-full border-none"
              onClick={() => window.location.href = "https://accounts.google.com/"}
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
            By signing in, I agree to panda's{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
