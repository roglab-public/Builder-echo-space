import React, { useRef, useEffect, useState } from "react";

interface GameFrameProps {
  gameUrl: string;
  title?: string;
  aspectRatio?: string;
  className?: string;
}

/**
 * 게임 전용 iframe 컴포넌트
 * casinoguru 및 기타 사이트의 광고를 제거하고 게임만 표시
 */
export const GameFrame: React.FC<GameFrameProps> = ({
  gameUrl,
  title = "Game Preview",
  aspectRatio = "16/9",
  className = "",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 로딩 상태 관리
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // 오류 처리
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // URL 매개변수 추가하여 광고 숨기기 시도
  const getCleanGameUrl = () => {
    try {
      const url = new URL(gameUrl);

      // 광고 숨김 매개변수 추가
      url.searchParams.append("hideAds", "true");
      url.searchParams.append("embedded", "true");
      url.searchParams.append("fullscreen", "true");

      return url.toString();
    } catch (e) {
      // URL 파싱 오류 시 원본 반환
      return gameUrl;
    }
  };

  // iframe 내부 콘텐츠 조작으로 광고 요소 숨기기
  useEffect(() => {
    if (!iframeRef.current) return;

    // iframe이 로드된 후 실행
    const timer = setTimeout(() => {
      try {
        const iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow) return;

        // iframe의 콘텐츠에 접근 시도 (Same-Origin Policy로 인해 제한될 수 있음)
        try {
          const iframeDoc =
            iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            // 광고 요소 제거 시도
            const adElements = iframeDoc.querySelectorAll(
              '[class*="banner"], [class*="ad"], [class*="promo"]',
            );
            adElements.forEach((el) => {
              (el as HTMLElement).style.display = "none";
            });

            // 게임 컨테이너만 남기기
            const gameContainer = iframeDoc.querySelector(
              '#game-container, [class*="game"]',
            );
            if (gameContainer) {
              (gameContainer as HTMLElement).style.position = "absolute";
              (gameContainer as HTMLElement).style.top = "0";
              (gameContainer as HTMLElement).style.left = "0";
              (gameContainer as HTMLElement).style.width = "100%";
              (gameContainer as HTMLElement).style.height = "100%";
            }
          }
        } catch (err) {
          console.log(
            "Cannot access iframe content due to Same-Origin Policy",
            err,
          );
          // 오류가 발생해도 게임은 표시됨 - 단지 광고만 제거하지 못할 수 있음
        }
      } catch (error) {
        console.error("Error accessing iframe:", error);
      }
    }, 2000); // iframe 로드 후 2초 후에 스타일 적용 시도

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* 로딩 스피너 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
        </div>
      )}

      {/* 오류 표시 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">게임을 불러올 수 없습니다</p>
            <button
              className="px-4 py-2 bg-brand-yellow text-black rounded-md mt-2"
              onClick={() => {
                setIsLoading(true);
                setHasError(false);
                if (iframeRef.current) {
                  iframeRef.current.src = getCleanGameUrl();
                }
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
      )}

      {/* 게임 iframe */}
      <iframe
        ref={iframeRef}
        src={getCleanGameUrl()}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      ></iframe>

      {/* 상단 및 하단 커버 오버레이 (광고 가리기) */}
      <div className="absolute top-0 left-0 w-full h-[30px] bg-[#1f1f1f] z-[5]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[30px] bg-[#1f1f1f] z-[5]"></div>
    </div>
  );
};

export default GameFrame;
