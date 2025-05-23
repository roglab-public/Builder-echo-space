import React from "react";
import { SlotMachine } from "@/types";
import { LineChart } from "@/components/charts/LineChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { ScoreNumberCard } from "./ScoreNumberCard";

interface OverviewContentProps {
  slotMachine: SlotMachine;
}

export const OverviewContent = ({ slotMachine }: OverviewContentProps) => {
  const {
    overallScore,
    profitScore,
    volatilityScore,
    hitFrequencyScore,
    profithitRatioScore,
    maxMultiplierScore,
    avgMultiplierScore,
    betAmount,
  } = slotMachine;

  // Metrics for radar chart
  const radarMetrics = [
    { name: "변동성", value: volatilityScore, maxValue: 100 },
    { name: "히트율", value: hitFrequencyScore, maxValue: 100 },
    { name: "흑자 히트율", value: profithitRatioScore, maxValue: 100 },
    { name: "최고 배수", value: maxMultiplierScore / 10, maxValue: 100 }, // Scale down
    { name: "평균 배수", value: avgMultiplierScore, maxValue: 120 },
  ];

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        전체 평가
      </h3>

      {/* Score cards grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <ScoreNumberCard title="종합 점수" score={overallScore} />
        <ScoreNumberCard title="수익 점수" score={profitScore} />
      </div>

      {/* Charts with responsive grid - stacks on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LineChart
          betAmount={betAmount}
          description="이 차트는 200회의 게임 동안 잔액이 어떻게 변화하는지 보여줍니다. 최종 금액이 턴오버보다 높으면 수익이 발생했음을 의미합니다."
        />
        <RadarChart
          metrics={radarMetrics}
          description="이 차트는 슬롯 머신의 5가지 주요 성능 지표를 보여줍니다: 변동성, 히트율, 흑자 히트율, 최고 배수, 평균 배수. 각 지표가 높을수록 전체적인 성능이 우수합니다."
        />
      </div>
    </div>
  );
};
