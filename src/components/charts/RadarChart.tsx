import React from "react";

interface MetricData {
  name: string;
  value: number;
  maxValue: number;
}

interface RadarChartProps {
  title?: string;
  metrics: MetricData[];
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  title = "슬롯 머신 성능 지표",
  metrics,
  className,
}) => {
  const center = 50;
  const radius = 40;
  const sides = metrics.length;

  // Calculate coordinates for each axis point on the radar
  const getAxisPoints = () => {
    return metrics.map((_, i) => {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    });
  };

  // Calculate coordinates for each data point
  const getDataPoints = () => {
    return metrics.map((metric, i) => {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const value = metric.value / metric.maxValue; // Normalize to 0-1
      return {
        x: center + radius * value * Math.cos(angle),
        y: center + radius * value * Math.sin(angle),
      };
    });
  };

  const axisPoints = getAxisPoints();
  const dataPoints = getDataPoints();

  // Create the polygon string for the radar chart
  const polygonPoints = dataPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div
      className={`border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] ${className}`}
    >
      <h4 className="text-[#999999] text-sm mb-4">{title}</h4>

      <div className="relative w-full">
        <svg viewBox="0 0 100 100" className="w-full h-[250px]">
          {/* Background grid - multiple levels */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((level, idx) => (
            <polygon
              key={idx}
              points={axisPoints
                .map((point) => {
                  const x = center + (point.x - center) * level;
                  const y = center + (point.y - center) * level;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#333333"
              strokeWidth="0.5"
            />
          ))}

          {/* Axis lines */}
          {axisPoints.map((point, i) => (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#333333"
              strokeWidth="0.5"
            />
          ))}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(253, 196, 44, 0.2)"
            stroke="#FDC42C"
            strokeWidth="2"
          />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="2" fill="#FDC42C" />
          ))}
        </svg>

        {/* Labels */}
        {axisPoints.map((point, i) => {
          const metric = metrics[i];
          const isLeft = point.x < center;
          const isTop = point.y < center;

          // Position labels outside the chart
          const labelX = center + (point.x - center) * 1.2;
          const labelY = center + (point.y - center) * 1.2;

          return (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs text-[#999999]"
              style={{
                left: `${labelX}%`,
                top: `${labelY}%`,
                textAlign: isLeft ? "right" : isTop ? "center" : "left",
              }}
            >
              {metric.name}
              <div className="font-bold text-white">{metric.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
