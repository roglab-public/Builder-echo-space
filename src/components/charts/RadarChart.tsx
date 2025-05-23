import React, { useRef, useState, useEffect } from "react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface MetricData {
  name: string;
  value: number;
  maxValue: number;
}

interface RadarChartProps {
  title?: string;
  metrics: MetricData[];
  className?: string;
  description?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  title = "슬롯 머신 성능 지표",
  metrics,
  className,
  description = "이 차트는 슬롯 머신의 5가지 주요 성능 지표를 보여줍니다: 변동성, 히트율, 흑자 히트율, 최고 배수, 평균 배수. 각 지표가 높을수록 전체적인 성능이 우수합니다.",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Format data for recharts
  const data = metrics.map((metric) => ({
    name: metric.name,
    value: metric.value,
    fullMark: metric.maxValue,
  }));

  // Add intersection observer to show chart when in viewport
  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }, // 40% of element must be visible
    );

    observer.observe(chartRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className={`border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] ${className}`}
    >
      <h4 className="text-[#999999] text-sm mb-4">{title}</h4>

      <div
        className="transition-opacity duration-700 w-full h-[250px]"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "#999", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, "auto"]}
              tick={{ fill: "#666" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#262626",
                borderColor: "#333",
                color: "#fff",
              }}
              formatter={(value: number) => [value, "점수"]}
            />
            <Radar
              name="성능"
              dataKey="value"
              stroke="#FDC42C"
              fill="#FDC42C"
              fillOpacity={0.2}
              isAnimationActive={isVisible}
              animationDuration={1500}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>

      {/* Description box */}
      <div className="mt-4 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
        {description}
      </div>
    </div>
  );
};
