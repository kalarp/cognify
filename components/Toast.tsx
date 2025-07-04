import * as Toast from "@radix-ui/react-toast";

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
}

const ToastComponent = ({
  open,
  onOpenChange,
  title,
  description,
  type = "info",
}: ToastProps) => {
  const typeClasses = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <Toast.Root
      className={`${typeClasses[type]} rounded-md p-4 border shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut`}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Toast.Title className="font-semibold text-sm">{title}</Toast.Title>
      {description && (
        <Toast.Description className="text-sm mt-1 opacity-90">
          {description}
        </Toast.Description>
      )}
      <Toast.Action altText="Close" asChild>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ×
        </button>
      </Toast.Action>
    </Toast.Root>
  );
};

// Toast Provider wrapper
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Toast.Provider swipeDirection="right">
      {children}
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
    </Toast.Provider>
  );
};

export default ToastComponent;
