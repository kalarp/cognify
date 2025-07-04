import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  asChild?: boolean;
}

const LoadingButton = ({
  isLoading,
  onClick,
  children,
  variant = "primary",
  disabled = false,
  className = "",
  asChild = false,
}: LoadingButtonProps) => {
  const baseClasses =
    "py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400",
  };

  const disabledClasses = "bg-gray-400 cursor-not-allowed hover:bg-gray-400";

  const isDisabled = isLoading || disabled;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${
        isDisabled ? disabledClasses : variantClasses[variant]
      } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </Comp>
  );
};

export default LoadingButton;
