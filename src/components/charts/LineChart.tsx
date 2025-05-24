import React, { useState, useEffect, useRef } from "react";
import { addLineBreaksAfterSentences } from "@/utils/text-utils";
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Suppress the React defaultProps warning for Recharts
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Support for defaultProps will be removed")
  ) {
    return;
  }
  originalConsoleError(...args);
};

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
  const [data, setData] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Generate data for chart
  useEffect(() => {
    if (providedData) {
      // If data is provided, format it for recharts
      const formattedData = providedData.map((value, index) => ({
        name: index + 1,
        balance: value,
      }));
      setData(formattedData);
      return;
    }

    // Generate 200 data points with specific constraints
    const generateData = () => {
      const points = [];
      points.push({ name: 1, balance: startValue });

      // Need to generate 198 points in between
      const totalPoints = 200;
      const middlePoints = totalPoints - 2;

      // Total amount to decrease
      const totalDecrease = startValue - endValue;

      // Generate some realistic wave patterns in the data
      for (let i = 1; i < totalPoints - 1; i++) {
        // Calculate expected trend to ensure we reach end value
        const expectedBalance = startValue - (totalDecrease * i) / middlePoints;

        // Add some randomization with increasing volatility in the middle
        // This creates a more natural curve
        const volatility = 100 * Math.sin((i / middlePoints) * Math.PI);
        const randomDeviation = (Math.random() * 2 - 1) * volatility;

        // Calculate balance with some random movement
        let balance = expectedBalance + randomDeviation;

        // Add occasional spikes (wins/losses)
        if (Math.random() > 0.9) {
          // 10% chance of a significant spike
          balance +=
            Math.random() > 0.5
              ? Math.random() * 200 // win
              : -Math.random() * 150; // loss
        }

        // Ensure we stay within bounds
        balance = Math.max(minValue, Math.min(maxValue, balance));

        points.push({
          name: i + 1,
          balance: balance,
        });
      }

      // Add the exact end point
      points.push({ name: totalPoints, balance: endValue });

      return points;
    };

    setData(generateData());
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

  // Determine if we have a loss
  const isLoss = endValue < startValue;
  const lineColor = isLoss ? "#CB2026" : "#FDC42C";

  // Calculate change percentage
  const changePercentage = ((endValue / startValue - 1) * 100).toFixed(1);

  return (
    <div
      ref={chartRef}
      className={`border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] ${className}`}
    >
      <h4 className="text-[#999999] text-sm mb-2">{title}</h4>

      {/* Chart container */}
      <div
        className="transition-opacity duration-700 w-full h-[200px]"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#666" }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
                ticks={[1, 50, 100, 150, 200]}
              />
              <YAxis
                domain={[
                  Math.floor(minValue * 0.99),
                  Math.ceil(maxValue * 1.01),
                ]}
                tick={{ fill: "#666" }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#262626",
                  borderColor: "#333",
                  color: "#fff",
                }}
                formatter={(value: number) => [value.toFixed(1), "잔액"]}
                labelFormatter={(label) => `${label}회차`}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: lineColor }}
                isAnimationActive={isVisible}
                animationDuration={1500}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary */}
      <div className="mt-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[#999999]">최종 잔액:</span>
          <span
            className={`font-bold ${isLoss ? "text-[#CB2026]" : "text-[#FDC42C]"}`}
          >
            {endValue.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[#999999]">변화율:</span>
          <span
            className={`font-bold ${isLoss ? "text-[#CB2026]" : "text-[#FDC42C]"}`}
          >
            {changePercentage}%
          </span>
        </div>
      </div>

      {/* Description box - 마진, 행간 조정 및 가운데 정렬 */}
      <div className="mt-4 mx-[6px] mr-[10px] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#BBBBBB] leading-6 text-center">
        {description.split(". ").map((sentence, index, array) => (
          <React.Fragment key={index}>
            {sentence}
            {index < array.length - 1 && sentence.trim() !== "" ? ". " : ""}
            {index < array.length - 1 && sentence.trim() !== "" && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
