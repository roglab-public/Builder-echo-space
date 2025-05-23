import React, { useRef, useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  title?: string;
  data: Array<{ name: string; value: number }>;
  className?: string;
  primaryBarName?: string;
  yAxisUnit?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  className,
  primaryBarName = "이 슬롯",
  yAxisUnit = "%",
}) => {
  const [isVisible, setIsVisible] = useState(false);
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={chartRef} className={`w-full ${className}`}>
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
                tick={{ fill: "#999" }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: "#999" }}
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
                fill={(entry) =>
                  entry.name === primaryBarName ? "#FDC42C" : "#555"
                }
                radius={[4, 4, 0, 0]}
                isAnimationActive={isVisible}
                animationDuration={1500}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
