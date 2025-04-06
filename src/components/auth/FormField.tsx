
import React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./PasswordInput";

interface FormFieldProps {
  id: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  icon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
}

export const FormField = ({ 
  id, 
  type, 
  value, 
  onChange, 
  placeholder, 
  className = "",
  icon,
  error = false,
  disabled = false
}: FormFieldProps) => {
  const baseClassName = `w-full border-b-2 border-t-0 border-l-0 border-r-0 ${error ? 'border-red-500' : 'border-gray-400'} focus:border-blue-500 rounded-none px-0 h-12 text-lg bg-transparent caret-blue-500 ${error ? 'text-red-500' : ''}`;
  
  return (
    <div className="relative">
      {type === 'password' ? (
        <PasswordInput
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClassName} ${className}`}
          error={error}
          disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClassName} ${className}`}
          disabled={disabled}
        />
      )}
      
      {icon && (
        <div className="absolute right-0 top-3 flex items-center">
          <span className={error ? "text-red-500" : "text-gray-500"}>
            {icon}
          </span>
          {error && <AlertCircle className="h-5 w-5 ml-1 text-amber-400" />}
        </div>
      )}
    </div>
  );
};
