import React from "react";
import { SlotMachine } from "@/types";
import { BarChart } from "@/components/charts/BarChart";
import { ScoreProgressBar } from "./ScoreProgressBar";

interface HitRateContentProps {
  slotMachine: SlotMachine;
}

export const HitRateContent = ({ slotMachine }: HitRateContentProps) => {
  const { hitFrequency, hitFrequencyScore } = slotMachine;

  // Sample data for comparison
  const comparisonData = [
    { name: "이 슬롯", value: hitFrequency },
    { name: "평균", value: 30.5 }, // Placeholder average value
    { name: "필터 평균", value: 28.2 }, // Placeholder filtered average value
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        히트율 평가
      </h3>

      {/* Bar chart for hit rate comparison in its own container */}
      <div className="mb-6">
        <BarChart
          title={`히트율 비교 (${hitFrequency}%)`}
          data={comparisonData}
          yAxisUnit="%"
          description="히트율은 슬롯 머신에서 화면에 특정 심볼이나 조합이 나타나는 빈도를 나타냅니다. 높은 히트율은 더 자주 당첨되지만, 일반적으로 작은 금액을 받게 됩니다."
        />
      </div>

      {/* Score progress bar in its own container */}
      <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] mb-6">
        <h4 className="text-[#999999] text-sm mb-2">히트율 점수 평가</h4>
        <div className="py-4">
          <ScoreProgressBar score={hitFrequencyScore} />
        </div>
        <div className="mt-4 mx-[10px] md:mx-[5%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
          히트율 점수는 슬롯 머신의 히트 빈도를 0~100 사이의 점수로 나타낸
          것입니다.
          <br />
          50점을 기준으로 하여, 점수가 높을수록 히트율이 높은 것을 의미합니다.
          <br />
          히��율이 높은 슬롯은 자주 당첨되지만 당첨 금액은 작을 수 있습니다.
        </div>
      </div>
    </div>
  );
};
