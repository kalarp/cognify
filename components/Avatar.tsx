import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallback?: string;
}

const Avatar = ({
  src,
  alt,
  size = "md",
  className = "",
  fallback,
}: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  // Generate fallback from alt text if not provided
  const fallbackText = fallback || alt.charAt(0).toUpperCase();

  return (
    <AvatarPrimitive.Root
      className={`${sizeClasses[size]} mx-auto rounded-full overflow-hidden bg-gray-100 ${className}`}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium"
        delayMs={600}
      >
        {fallbackText}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;
