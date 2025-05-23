import React from "react";
import { SlotMachine } from "@/types";
import { BarChart } from "@/components/charts/BarChart";
import { ScoreProgressBar } from "./ScoreProgressBar";

interface VolatilityContentProps {
  slotMachine: SlotMachine;
}

export const VolatilityContent = ({ slotMachine }: VolatilityContentProps) => {
  const { volatility, volatilityScore } = slotMachine;

  // Sample data for comparison
  const comparisonData = [
    { name: "이 슬롯", value: volatility / 100 }, // Converting to percentage
    { name: "평균", value: 5500 / 100 }, // Placeholder average value
    { name: "필터 평균", value: 6200 / 100 }, // Placeholder filtered average value
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        변동성 평가
      </h3>

      {/* Bar chart for volatility comparison in its own container */}
      <div className="mb-6">
        <BarChart
          title={`변동성 비교 (${volatility / 100}%)`}
          data={comparisonData}
          yAxisUnit="%"
          description="변동성 수치는 이 슬롯 머신이 일반적인 슬롯 머신들과 비교했을 때 얼마나 변동이 큰지를 나타냅니다. 높은 값은 더 큰 상금을 얻을 가능성이 있지만, 잦은 손실이 발생할 수 있음을 의미합니다."
        />
      </div>

      {/* Score progress bar in its own container */}
      <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] mb-6">
        <h4 className="text-[#999999] text-sm mb-2">변동성 점수 평가</h4>
        <div className="py-4">
          <ScoreProgressBar score={volatilityScore} />
        </div>
        <div className="mt-4 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
          변동성 점수는 슬롯 머신의 변동성을 0~100 사이의 점수로 나타낸
          것입니다. 50점을 기준으로 하여, 점수가 높을수록 변동성이 큰 것을
          의미합니다. 변동성이 큰 슬롯은 큰 승리를 기대할 수 있지만 잃을 확률도
          높습니다.
        </div>
      </div>
    </div>
  );
};
