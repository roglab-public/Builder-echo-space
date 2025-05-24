import React, { useState, useEffect } from "react";
import { getCloudinaryCloudName } from "@/config/cloudinary";

interface CloudinaryImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  className?: string;
  imgClassName?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
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
  onLoad,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cloudName, setCloudName] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string>(src || fallbackSrc);

  // 페이지 로드 시 클라우드 이름 가져오기
  useEffect(() => {
    // 컴포넌트 마운트 후 클라우드 이름 가져오기
    setCloudName(getCloudinaryCloudName());

    // src가 없으면 fallback 사용
    if (!src) {
      setProcessedSrc(fallbackSrc);
      setLoading(false);
      return;
    }

    // Cloudinary URL 최적화 (필요한 경우)
    if (src.includes("cloudinary.com")) {
      setProcessedSrc(src);
    } else if (src.startsWith("http")) {
      // 다른 외부 URL
      setProcessedSrc(src);
    } else {
      // fallback 사용
      setProcessedSrc(src);
    }
  }, [src, fallbackSrc]);

  // 이미지 로드 완료 처리
  const handleLoad = () => {
    setLoading(false);
    if (onLoad) onLoad();
  };

  // 이미지 로드 오류 처리
  const handleError = () => {
    console.error("이미지 로드 실패:", processedSrc);
    setError(true);
    setLoading(false);
    if (onError) onError();
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
        src={error ? fallbackSrc : processedSrc}
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
