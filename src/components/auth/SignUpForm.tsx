
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";

interface SignUpFormProps {
  loading: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const SignUpForm = ({ loading, errorMessage, showErrorMessage, handleSubmit }: SignUpFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    
    // Validate required fields
    if (!firstName || !lastName) {
      return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    
    // Validate password
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    
    await handleSubmit(e);
  };

  const isFormValid = firstName && lastName && email && password && confirmPassword && password === confirmPassword && !emailError && !passwordError;
  const showErrorMessageInternal = formSubmitted && (!firstName || !lastName || !email || !password || !confirmPassword || emailError || passwordError);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Error Message */}
      {(showErrorMessage || showErrorMessageInternal) && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="ml-3">
              <p>{errorMessage || "Please fill out all fields correctly"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Name Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          disabled={loading}
          error={formSubmitted && !firstName}
        />
        
        <FormField
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          disabled={loading}
          error={formSubmitted && !lastName}
        />
      </div>

      {/* Email Input */}
      <FormField
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
        placeholder="Email"
        icon="✉"
        disabled={loading}
        error={emailError}
      />

      {/* Password Input */}
      <FormField
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(false);
        }}
        placeholder="Password (min. 6 characters)"
        disabled={loading}
        error={passwordError}
      />

      {/* Confirm Password Input */}
      <FormField
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setPasswordError(false);
        }}
        placeholder="Confirm password"
        disabled={loading}
        error={passwordError || (formSubmitted && password !== confirmPassword && confirmPassword)}
      />

      {/* Signup Button */}
      <Button 
        type="submit"
        className={`w-full h-14 text-xl font-semibold rounded-full bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white`}
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign up"}
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
        By signing in, I agree to Price Panda's{' '}
        <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
        {' '}and{' '}
        <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
      </div>
    </form>
  );
};
