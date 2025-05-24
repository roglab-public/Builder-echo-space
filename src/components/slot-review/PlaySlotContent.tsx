import React from "react";
import GameFrame from "./GameFrame";

interface PlaySlotContentProps {
  gameUrl?: string;
}

export const PlaySlotContent: React.FC<PlaySlotContentProps> = ({
  gameUrl = "https://casinoguru-kr.com/embedGame?identifier=17e3beef-3c98-4112-8955-e0d396d330f7",
}) => {
  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        실제로 해 보기
      </h3>

      <div className="space-y-4">
        <p className="text-muted-foreground mb-4" lang="ko">
          아래에서 이 슬롯 머신을 직접 플레이해 볼 수 있습니다. 실제 머니를 걸지
          않고도 슬롯의 게임플레이를 체험할 수 있습니다.
        </p>

        <div className="rounded-lg border border-[#333333] w-full">
          <GameFrame
            gameUrl={gameUrl}
            title="슬롯 머신 게임"
            aspectRatio="16/9"
          />
        </div>

        <div
          className="mt-4 mx-[6px] mr-[10px] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#BBBBBB] leading-6"
          lang="ko"
        >
          이 데모 버전에서는 실제 게임과 동일한 경험을 제공하지만, 실제 돈을
          걸거나 획득할 수는 없습니다.
          <br />
          게임플레이, 그래픽, 사운드 효과 등은 실제 머니 플레이와 동일합니다.
        </div>
      </div>
    </div>
  );
};
