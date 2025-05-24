import React from "react";
import { SlotMachine } from "@/types";
import { BarChart } from "@/components/charts/BarChart";
import { ScoreProgressBar } from "./ScoreProgressBar";

interface ProfitHitRateContentProps {
  slotMachine: SlotMachine;
}

export const ProfitHitRateContent = ({
  slotMachine,
}: ProfitHitRateContentProps) => {
  const { profithitRatio, profithitRatioScore } = slotMachine;

  // Sample data for comparison
  const comparisonData = [
    { name: "이 슬롯", value: profithitRatio },
    { name: "평균", value: 8.4 }, // Placeholder average value
    { name: "필터 평균", value: 9.1 }, // Placeholder filtered average value
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        흑자 히트율 평가
      </h3>

      {/* Bar chart for profit hit rate comparison in its own container */}
      <div className="mb-6">
        <BarChart
          title={`흑자 히트율 비교 (${profithitRatio}%)`}
          data={comparisonData}
          yAxisUnit="%"
          description="흑자 히트율은 히트(당첨)가 발생했을 때 베팅 금액보다 더 많은 금액을 획득할 확률을 나타냅니다. 높은 흑자 히트율은 더 많은 수익성 있는 당첨을 의미합니다."
        />
      </div>

      {/* Score progress bar in its own container */}
      <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] mb-6">
        <h4 className="text-[#999999] text-sm mb-2">흑자 히트율 점수 평가</h4>
        <div className="py-4">
          <ScoreProgressBar score={profithitRatioScore} />
        </div>
        <div className="mt-4 mx-[6px] mr-[10px] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#BBBBBB] leading-6 text-center">
          흑자 히트율 점수는 슬롯 머신의 흑자 히트율을 0~100 사이의 점수로
          나타낸 것입니다.
          <br />
          50점을 기준으로 하여, 점수가 높을수록 베팅 금액 이상의 당첨금을 받을
          확률이 높은 것을 의미합니다.
        </div>
      </div>
    </div>
  );
};
