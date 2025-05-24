import React, { useState } from "react";
import { getCloudinaryUrl } from "@/config/cloudinary";

interface CloudinaryImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  className?: string;
  imgClassName?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/placeholder.svg",
  className = "",
  imgClassName = "",
  objectFit = "cover",
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 최적화된 이미지 URL 가져오기
  const optimizedSrc = src
    ? getCloudinaryUrl(src, { width, height })
    : fallbackSrc;

  // 이미지 로드 완료 처리
  const handleLoad = () => {
    setLoading(false);
  };

  // 이미지 로드 오류 처리
  const handleError = () => {
    console.error("이미지 로드 실패:", optimizedSrc);
    setError(true);
    setLoading(false);
  };

  // 클래스 이름 결합 유틸리티 함수 (tailwind-merge와 같은 역할)
  const cn = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
      {...props}
    >
      {/* 로딩 스피너 */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-b-transparent border-brand-yellow"></div>
        </div>
      )}

      {/* 이미지 */}
      <img
        src={error ? fallbackSrc : optimizedSrc}
        alt={alt}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          `object-${objectFit}`,
          loading ? "opacity-0" : "opacity-100",
          imgClassName,
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default CloudinaryImage;
