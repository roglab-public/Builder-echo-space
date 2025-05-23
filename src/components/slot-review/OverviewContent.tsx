import React from "react";
import { SlotMachine } from "@/types";
import { LineChart } from "@/components/charts/LineChart";
import { RadarChart } from "@/components/charts/RadarChart";

interface OverviewContentProps {
  slotMachine: SlotMachine;
}

export const OverviewContent = ({ slotMachine }: OverviewContentProps) => {
  const {
    volatilityScore,
    hitFrequencyScore,
    profithitRatioScore,
    maxMultiplierScore,
    avgMultiplierScore,
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

      {/* Line chart in its own container */}
      <div className="mb-6">
        <LineChart
          title="잔액 변화 (1~200회)"
          startValue={2000}
          endValue={1650}
          minValue={1500}
          maxValue={2200}
          description="이 차트는 200회의 게임 동안 잔액이 어떻게 변화하는지 보여줍니다. 최종 금액이 턴오버보다 높으면 수익이 발생했음을 의미합니다."
        />
      </div>

      {/* Radar chart in its own container */}
      <div className="mb-6">
        <RadarChart
          title="슬롯 머신 성능 지표"
          metrics={radarMetrics}
          description="이 차트는 슬롯 머신의 5가지 주요 성능 지표를 보여줍니다: 변동성, 히트율, 흑자 히트율, 최고 배수, 평균 배수. 각 지표가 높을수록 전체적인 성능이 우수합니다."
        />
      </div>
    </div>
  );
};
