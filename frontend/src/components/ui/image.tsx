import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
  fallbackText?: string;
  sizes?: string;
}

export const Image: React.FC<ImageProps> = (
  {
    src,
    alt,
    width,
    height,
    className = "",
    priority = false,
    objectFit = "cover",
    onLoad,
    onError,
    fallbackText = "Failed to load image",
    sizes,
  }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  // Combine objectFit with Tailwind class dynamically
  const objectFitClass = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{width, height}}
      aria-live="polite"
    >
      {error ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
          role="alert"
          aria-label={fallbackText}
        >
          <span>{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          className={`h-full w-full ${objectFitClass}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};
