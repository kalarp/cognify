import React from "react";
import * as Label from "@radix-ui/react-label";

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

const FormTextarea = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  required = false,
  className = "",
  id,
}: FormTextareaProps) => {
  const textareaId =
    id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`mb-4 ${className}`}>
      <Label.Root
        htmlFor={textareaId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label.Root>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
      />
    </div>
  );
};

export default FormTextarea;
