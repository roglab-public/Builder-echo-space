import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountingNumberProps {
  end: number;
  duration?: number; // in seconds
  className?: string;
}

export const CountingNumber: React.FC<CountingNumberProps> = ({
  end,
  duration = 1.5,
  className,
}) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      setIsAnimating(false);
    };
  }, [end, duration]);

  return (
    <div
      className={cn(
        "inline-block text-[60px] font-bold leading-[60px] perspective-[1000px]",
        className,
      )}
    >
      <div className="flex justify-center font-bold leading-[75px]">
        {count
          .toString()
          .split("")
          .map((digit, index) => (
            <span
              key={index}
              className={cn(
                "block font-bold",
                isAnimating &&
                  "animate-flipIn transform-style-3d origin-bottom transform-[matrix3d(1,0,0,0,0,1,0,0,0,0,1,-0.0025,0,0,0,1)]",
              )}
              style={{
                animationDuration: `0.5s`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {digit}
            </span>
          ))}
      </div>
    </div>
  );
};
