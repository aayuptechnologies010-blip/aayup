import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { optimizeSupabaseImage } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  quality?: number;
  fallback?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width = 200,
  quality = 75,
  fallback,
  className = "",
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const optimizedSrc = optimizeSupabaseImage(src, width, quality);
            setImageSrc(optimizedSrc || src);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src, width, quality]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (fallback) {
      setImageSrc(fallback);
    }
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc || undefined}
      alt={alt}
      className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
