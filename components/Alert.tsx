import * as Toast from "@radix-ui/react-toast";
import { useEffect } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
  duration?: number;
}

const Alert = ({ message, type, onClose, duration = 3000 }: AlertProps) => {
  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <Toast.Root
      className={`${typeClasses[type]} rounded-lg p-4 border shadow-lg mb-4 data-[state=open]:animate-slideInDown data-[state=closed]:animate-fadeOut`}
      open={!!message}
      onOpenChange={(open) => !open && onClose?.()}
      duration={duration}
    >
      <div className="flex justify-between items-start">
        <Toast.Title className="font-semibold text-sm flex-1">
          {message}
        </Toast.Title>
        {onClose && (
          <Toast.Action altText="Close" asChild>
            <button
              onClick={onClose}
              className="ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </Toast.Action>
        )}
      </div>
    </Toast.Root>
  );
};

export default Alert;
