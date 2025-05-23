import React, { useState, useEffect, useRef } from "react";

interface LineChartProps {
  title?: string;
  data?: number[];
  className?: string;
  description?: string;
  startValue?: number;
  endValue?: number;
  minValue?: number;
  maxValue?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  title = "잔액 변화 (1~200회)",
  data: providedData,
  className,
  description = "이 차트는 200회의 게임 동안 잔액이 어떻게 변화하는지 보여줍니다. 최종 금액이 턴오버보다 높으면 수익이 발생했음을 의미합니다.",
  startValue = 2000, // Default start value
  endValue = 1650, // Default end value
  minValue = 1500, // Default minimum value
  maxValue = 2200, // Default maximum value
}) => {
  const [data, setData] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(!providedData);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Generate data with specific constraints
  useEffect(() => {
    if (providedData) {
      setData(providedData);
      return;
    }

    setIsGenerating(true);

    // Generate 200 data points with specific constraints
    const generateData = () => {
      const points: number[] = [startValue]; // Starting balance
      const numPoints = 199; // We already have the start point, so we need 199 more

      // Generate random points
      for (let i = 1; i < numPoints; i++) {
        // Calculate expected trend to ensure we reach the end value
        const trend = (endValue - startValue) / numPoints;

        // Maximum random deviation decreases as we approach the end
        // This helps ensure the curve is smoother near the end
        const maxDeviation = 50 * (1 - i / numPoints);

        // Generate random change
        const randomChange = (Math.random() * 2 - 1) * maxDeviation;

        // Expected value at this point plus random change
        let nextValue = points[i - 1] + trend + randomChange;

        // Ensure we stay within bounds
        nextValue = Math.max(minValue, Math.min(maxValue, nextValue));

        points.push(nextValue);
      }

      // Replace the last point with the exact end value
      points[numPoints] = endValue;

      return points;
    };

    const randomData = generateData();
    setData(randomData);
    setIsGenerating(false);
  }, [providedData, startValue, endValue, minValue, maxValue]);

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

  if (!data.length) return null;

  // Determine the min and max values for scaling
  const dataMin = Math.min(...data);
  const dataMax = Math.max(...data);
  const range = dataMax - dataMin;

  // Calculate if final value is less than initial value (loss)
  const finalValue = data[data.length - 1];
  const initialValue = data[0];
  const isLoss = finalValue < initialValue;

  // Format the points for the polyline
  const chartWidth = 100; // percentage width
  const chartHeight = 100; // percentage height
  const pointsString = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = 100 - ((value - dataMin) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      ref={chartRef}
      className={`border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] ${className}`}
    >
      <h4 className="text-[#999999] text-sm mb-2">{title}</h4>

      <div
        className="w-full h-[200px] relative mt-2 transition-opacity duration-700"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#666666]">
          <span>{Math.round(dataMax)}</span>
          <span>{Math.round(dataMin + range / 2)}</span>
          <span>{Math.round(dataMin)}</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-6 right-0 top-0 bottom-0">
          {/* Horizontal grid lines */}
          <div className="absolute left-0 top-0 w-full h-[1px] bg-[#333333]"></div>
          <div className="absolute left-0 top-[50%] w-full h-[1px] bg-[#333333]"></div>
          <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#333333]"></div>

          {/* SVG line chart */}
          <svg className="w-full h-full overflow-visible">
            {/* Main line */}
            <polyline
              points={pointsString}
              fill="none"
              stroke={isLoss ? "#CB2026" : "#FDC42C"}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Start and end points */}
            <circle
              cx="0"
              cy={100 - ((data[0] - dataMin) / range) * 100}
              r="3"
              fill={isLoss ? "#CB2026" : "#FDC42C"}
            />
            <circle
              cx="100%"
              cy={100 - ((data[data.length - 1] - dataMin) / range) * 100}
              r="3"
              fill={isLoss ? "#CB2026" : "#FDC42C"}
            />
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-[#666666] mt-1">
        <span>1</span>
        <span>50</span>
        <span>100</span>
        <span>150</span>
        <span>200</span>
      </div>

      {/* Summary */}
      <div className="mt-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[#999999]">최종 잔액:</span>
          <span
            className={`font-bold ${isLoss ? "text-[#CB2026]" : "text-[#FDC42C]"}`}
          >
            {finalValue.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[#999999]">변화율:</span>
          <span
            className={`font-bold ${isLoss ? "text-[#CB2026]" : "text-[#FDC42C]"}`}
          >
            {((finalValue / initialValue - 1) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Description box */}
      <div className="mt-4 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
        {description}
      </div>
    </div>
  );
};
