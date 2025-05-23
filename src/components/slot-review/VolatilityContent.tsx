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

      {/* Bar chart for volatility comparison */}
      <div className="mt-6">
        <h4 className="text-base font-medium mb-2" lang="ko">
          변동성 비교 ({volatility / 100}%)
        </h4>
        <BarChart data={comparisonData} yAxisUnit="%" className="mb-6" />
      </div>

      {/* Score progress bar */}
      <div className="mt-6">
        <ScoreProgressBar score={volatilityScore} className="mb-6" />
      </div>

      {/* Description box */}
      <div className="mt-6 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
        변동성은 슬롯 머신의 지불 패턴 예측 가능성을 나타냅니다. 높은 변동성은
        큰 상금을 얻을 가능성이 있지만, 잦은 손실이 발생할 수 있습니다. 낮은
        변동성은 작은 상금을 자주 얻을 수 있지만, 큰 상금을 얻기는 어려울 수
        있습니다.
      </div>
    </div>
  );
};
