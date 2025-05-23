import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  getOptimizedGoogleDriveUrl,
  getPlaceholderImage,
  isGoogleDriveUrl,
} from "@/lib/image-utils";

interface GoogleDriveImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
}

export const GoogleDriveImage: React.FC<GoogleDriveImageProps> = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  width = 800,
  height = 600,
  className,
  imgClassName,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    // Reset state when src changes
    setLoading(true);
    setError(false);
    setRetryCount(0);

    // Process the source URL
    processImageUrl();
  }, [src]);

  /**
   * Process the image URL based on its type and handle Google Drive URLs specially
   */
  const processImageUrl = async () => {
    // If there's no source or we've exceeded retry attempts
    if (!src || retryCount >= maxRetries) {
      setImgSrc(fallbackSrc);
      setLoading(false);
      setError(true);
      return;
    }

    try {
      if (isGoogleDriveUrl(src)) {
        // For Google Drive images, use optimized URL formats
        const optimizedUrl = getOptimizedGoogleDriveUrl(src);
        setImgSrc(optimizedUrl);
      } else {
        // For regular images, use as is
        setImgSrc(src);
      }
    } catch (err) {
      console.error("Error processing image URL:", err);
      setImgSrc(fallbackSrc);
      setError(true);
      setLoading(false);
    }
  };

  /**
   * Try an alternative method when initial loading fails
   */
  const tryAlternativeMethod = () => {
    setRetryCount((prev) => prev + 1);

    // Different approaches based on retry count
    if (retryCount === 0) {
      // Try thumbnail approach on first retry
      const fileId =
        src.match(/id=([^&]+)/)?.[1] || src.match(/\/file\/d\/([^/]+)/)?.[1];
      if (fileId) {
        setImgSrc(`https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`);
      } else {
        setImgSrc(fallbackSrc);
        setError(true);
        setLoading(false);
      }
    } else {
      // Fall back to placeholder on subsequent retries
      setImgSrc(fallbackSrc);
      setError(true);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    console.error(`Image failed to load (attempt ${retryCount + 1}):`, imgSrc);

    // Try alternative method if we haven't exceeded max retries
    if (retryCount < maxRetries) {
      tryAlternativeMethod();
    } else {
      setImgSrc(fallbackSrc);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-b-transparent border-brand-yellow"></div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={imgSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          imgClassName,
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default GoogleDriveImage;
