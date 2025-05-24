import React, { useRef, useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  title?: string;
  data: Array<{ name: string; value: number }>;
  className?: string;
  primaryBarName?: string;
  yAxisUnit?: string;
  description?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  className,
  primaryBarName = "이 슬롯",
  yAxisUnit = "%",
  description = "변동성 수치는 이 슬롯 머신이 일반적인 슬롯 머신들과 비교했을 때 얼마나 변동이 큰지를 나타냅니다. 높은 값은 더 큰 상금을 얻을 가능성이 있지만, 잦은 손실이 발생할 수 있음을 의미합니다.",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

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

    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Get bar colors based on name
  const getBarColor = (name: string) => {
    return name === primaryBarName ? "#FDC42C" : "#595959";
  };

  return (
    <div
      ref={chartRef}
      className={cn(
        "border border-[#333333] rounded-lg p-4 bg-[#1f1f1f]",
        className,
      )}
    >
      {title && <h4 className="text-[#999999] text-sm mb-2">{title}</h4>}

      <div
        className="transition-opacity duration-700 w-full h-[200px]"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{
                  fill: "#999",
                  fontSize: isMobile ? 10 : 12, // Smaller font on mobile
                }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{
                  fill: "#999",
                  fontSize: isMobile ? 10 : 12, // Smaller font on mobile
                }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
                unit={yAxisUnit}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#262626",
                  borderColor: "#333",
                  color: "#fff",
                }}
                formatter={(value: number) => [`${value}${yAxisUnit}`, ""]}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                isAnimationActive={isVisible}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Description box */}
      <div className="mt-4 mx-[10%] p-3 bg-[#262626] rounded border border-[#333333] text-sm text-[#999999]">
        {description}
      </div>
    </div>
  );
};
