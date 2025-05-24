import React from "react";
import { SlotMachine } from "@/types";
import { BarChart } from "@/components/charts/BarChart";
import { ScoreProgressBar } from "./ScoreProgressBar";

interface MaxMultiplierContentProps {
  slotMachine: SlotMachine;
}

export const MaxMultiplierContent = ({
  slotMachine,
}: MaxMultiplierContentProps) => {
  const { maxMultiplier, maxMultiplierScore } = slotMachine;

  // Sample data for comparison
  const comparisonData = [
    { name: "이 슬롯", value: maxMultiplier },
    { name: "평균", value: 800 }, // Placeholder average value
    { name: "필터 평균", value: 900 }, // Placeholder filtered average value
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        최고 배수 평가
      </h3>

      {/* Bar chart for max multiplier comparison in its own container */}
      <div className="mb-6">
        <BarChart
          title={`최고 배수 비교 (${maxMultiplier}x)`}
          data={comparisonData}
          yAxisUnit="x"
          description="최고 배수는 슬롯 머신에서 획득할 수 있는 최대 배수를 나타냅니다. 높은 최고 배수는 큰 당첨금을 얻을 가능성을 의미하지만, 이러한 당첨의
          확률은 일반적으로 매우 낮습니다."
        />
      </div>

      {/* Score progress bar in its own container */}
      <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] mb-6">
        <h4 className="text-[#999999] text-sm mb-2">최고 배수 점수 평가</h4>
        <div className="py-4">
          <ScoreProgressBar score={maxMultiplierScore / 10} />
        </div>
        <div className="mt-4 mx-[6px] mr-[10px] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#BBBBBB] leading-6">
          최고 배수 점수는 슬롯 머신의 최대 배수를 0~100 사이의 점수로 나타낸
          것입니다.
          <br />
          50점을 기준으로 하여, 점수가 높을수록 큰 당첨금을 얻을 가능성이
          높아집니다.
        </div>
      </div>
    </div>
  );
};
