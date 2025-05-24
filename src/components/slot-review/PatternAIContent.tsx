import { SlotMachine } from "@/types";

interface PatternAIContentProps {
  slotMachine: SlotMachine;
}

export const PatternAIContent = ({ slotMachine }: PatternAIContentProps) => {
  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        PatternAI™
      </h3>
      <div className="p-4 bg-[#1f1f1f] border border-[#333333] rounded-lg">
        <p className="text-[#BBBBBB] mb-4 leading-6" lang="ko">
          PatternAI™는 슬롯 머신의 패턴을 분석하여 최적의 플레이 방법을
          제안합니다.
        </p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground" lang="ko">
              승률 예측
            </span>
            <span className="font-medium">68%</span>
          </div>
          <div className="bg-[#333333] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-yellow rounded-full"
              style={{ width: "68%" }}
            />
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground" lang="ko">
              최적 베팅 금액
            </span>
            <span className="font-medium">{slotMachine.betAmount * 2}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground" lang="ko">
              권장 플레이 시간
            </span>
            <span className="font-medium">30분</span>
          </div>
        </div>
      </div>
    </div>
  );
};
