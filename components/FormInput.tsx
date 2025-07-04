import React from "react";
import * as Label from "@radix-ui/react-label";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
  id,
}: FormInputProps) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`mb-4 ${className}`}>
      <Label.Root
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label.Root>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      />
    </div>
  );
};

export default FormInput;
