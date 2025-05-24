import React from "react";
import { SlotMachine } from "@/types";
import { BarChart } from "@/components/charts/BarChart";
import { ScoreProgressBar } from "./ScoreProgressBar";

interface AvgMultiplierContentProps {
  slotMachine: SlotMachine;
}

export const AvgMultiplierContent = ({
  slotMachine,
}: AvgMultiplierContentProps) => {
  const { avgMultiplier, avgMultiplierScore } = slotMachine;

  // Sample data for comparison
  const comparisonData = [
    { name: "이 슬롯", value: avgMultiplier },
    { name: "평균", value: 90 }, // Placeholder average value
    { name: "필터 평균", value: 105 }, // Placeholder filtered average value
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        평균 배수 평가
      </h3>

      {/* Bar chart for avg multiplier comparison in its own container */}
      <div className="mb-6">
        <BarChart
          title={`평균 배수 비교 (${avgMultiplier}x)`}
          data={comparisonData}
          yAxisUnit="x"
          description="평균 배수는 슬롯 머신에서 당첨 시 평균적으로 얻게 되는 배수를 나타냅니다. 높은 평균 배수는 일반적인 당첨에서도 더 많은 금액을 획득할 가능성을 의미합니다."
        />
      </div>

      {/* Score progress bar in its own container */}
      <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] mb-6">
        <h4 className="text-[#999999] text-sm mb-2">평균 배수 점수 평가</h4>
        <div className="py-4">
          <ScoreProgressBar score={avgMultiplierScore} />
        </div>
        <div className="mt-4 mx-[6px] mr-[10px] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#BBBBBB] leading-6 text-center">
          평�� 배수 점수는 슬롯 머신의 평균 배수를 0~100 사이의 점수로 나타낸
          것입니다.
          <br />
          50점을 기준으로 하여, 점수가 높을수록 평균적으로 더 높은 당첨금을 얻을
          가능성이 높아집니다.
        </div>
      </div>
    </div>
  );
};
