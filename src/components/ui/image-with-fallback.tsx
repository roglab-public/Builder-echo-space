import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    // Reset states when src changes
    setLoading(true);
    setError(false);

    // Process Google Drive URLs
    if (src && src.includes("drive.google.com")) {
      // Handle different Google Drive URL formats
      if (src.includes("uc?export=view")) {
        // Already in the correct format
        setImageSrc(src);
      } else if (src.includes("/file/d/")) {
        // Convert from /file/d/ format to uc?export=view format
        const fileIdMatch = src.match(/\/file\/d\/([^/]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
          const fileId = fileIdMatch[1];
          setImageSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
        } else {
          console.error(
            "Could not extract file ID from Google Drive URL:",
            src,
          );
          setImageSrc(src); // Keep original if parsing fails
        }
      } else if (src.includes("id=")) {
        // Extract ID from other formats
        const idMatch = src.match(/id=([^&]+)/);
        if (idMatch && idMatch[1]) {
          const fileId = idMatch[1];
          setImageSrc(`https://drive.google.com/uc?export=view&id=${fileId}`);
        } else {
          setImageSrc(src); // Keep original if parsing fails
        }
      } else {
        setImageSrc(src); // Keep original for unrecognized formats
      }
    } else {
      setImageSrc(src); // Use original src for non-Google Drive URLs
    }
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    console.error("Image failed to load:", imageSrc);
    setError(true);
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={error ? fallbackSrc : imageSrc}
        alt={alt}
        className={cn("object-cover w-full h-full", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
