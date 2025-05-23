import React from "react";
import { cn } from "@/lib/utils";

interface ScoreProgressBarProps {
  score: number;
  className?: string;
}

export const ScoreProgressBar: React.FC<ScoreProgressBarProps> = ({
  score,
  className,
}) => {
  // Determine direction based on score
  const isHighScore = score >= 50;

  // Calculate progress width
  const progressWidth = isHighScore
    ? ((score - 50) / 50) * 100 // For scores >= 50
    : ((50 - score) / 50) * 100; // For scores < 50

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#999999]">변동성 점수</span>
        <span className="font-medium">{score}</span>
      </div>

      <div className="relative h-3 w-full bg-[#333333] rounded-full overflow-hidden">
        {/* Center line indicating 50% mark */}
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-500 -translate-x-1/2 z-10"></div>

        {/* Progress bar - positioned based on score */}
        <div
          className={cn(
            "absolute top-0 h-full rounded-full transition-all duration-1000 ease-out",
            isHighScore ? "left-1/2 bg-brand-yellow" : "right-1/2 bg-brand-red",
          )}
          style={{ width: `${progressWidth}%` }}
        ></div>

        {/* Labels for minimum and maximum */}
        <div className="absolute bottom-full left-0 text-xs text-[#999999] mb-1">
          저
        </div>
        <div className="absolute bottom-full right-0 text-xs text-[#999999] mb-1">
          고
        </div>
      </div>

      {/* Recommendation indicators */}
      <div className="flex justify-between text-xs mt-1">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          <span className="text-[#999999]">추천 1</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-[#999999]">추천 2</span>
        </div>
      </div>
    </div>
  );
};
