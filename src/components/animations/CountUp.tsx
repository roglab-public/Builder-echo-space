import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

export const CountUp = ({ value, duration = 1.5, className }: CountUpProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const valueStr = value.toString();
  const digits = valueStr.split("");

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={cn(
        "inline-block text-[75px] font-bold leading-[75px] perspective-[1000px]",
        className,
      )}
    >
      <div className="flex justify-center font-bold leading-[90px]">
        {digits.map((digit, index) => (
          <span
            key={index}
            className={cn(
              "block font-bold origin-bottom",
              isAnimating &&
                "animate-flipIn transform-style-3d transform-[matrix3d(1,0,0,0,0,1,0,0,0,0,1,-0.0025,0,0,0,1)]",
            )}
            style={{
              animationDuration: `${duration}s`,
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
