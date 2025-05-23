import React, { useState } from "react";

interface PlaySlotContentProps {
  gameUrl?: string;
}

export const PlaySlotContent: React.FC<PlaySlotContentProps> = ({
  gameUrl = "https://www.demoslot.com/free-slots/caishen-wins-slot-demo",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        실제로 해 보기
      </h3>

      <div className="space-y-4">
        <p className="text-muted-foreground mb-4" lang="ko">
          아래에서 Caishen Wins 슬롯 머신을 직접 플레이해 볼 수 있습니다. 실제
          머니를 걸지 않고도 슬롯의 게임플레이를 체험할 수 있습니��.
        </p>

        <div className="relative overflow-hidden rounded-lg border border-[#333333] w-full aspect-[16/9]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f] z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mb-4"></div>
                <p className="text-brand-yellow">게임 로딩 중...</p>
              </div>
            </div>
          )}
          <iframe
            src={gameUrl}
            title="Play Caishen Wins Slot"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>

        <div
          className="mt-6 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]"
          lang="ko"
        >
          이 데모 버전에서는 실제 게임과 동일한 경험을 제공하지만, 실제 돈을
          걸거나 획득할 수는 없습니다. 게임플레이, 그래픽, 사운드 효과 등은 실제
          머니 플레이와 동일합니다.
        </div>
      </div>
    </div>
  );
};
