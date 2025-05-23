import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export const FlipCounter = ({
  value,
  duration = 1.5,
  className,
}: FlipCounterProps) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Split value into digits
  const valueString = value.toString();
  const digits = valueString.split("");

  useEffect(() => {
    // Store previous value before updating
    setPrevValue(currentValue);
    setCurrentValue(value);

    // Initialize with current digits
    setDisplayed(digits);

    // Start animation
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [value, duration]);

  return (
    <div className={cn("inline-block perspective-[1000px]", className)}>
      <div className="flex justify-center">
        {digits.map((digit, index) => {
          const prevDigit =
            prevValue.toString().padStart(digits.length, "0")[index] || "0";

          return (
            <div
              key={index}
              className="relative mx-1 w-16 h-24 overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Top half (static) */}
              <div className="absolute top-0 left-0 w-full h-[50%] bg-[#1f1f1f] flex items-end justify-center overflow-hidden rounded-t-md z-10">
                <span className="text-[75px] font-bold leading-[150px] text-center">
                  {digit}
                </span>
              </div>

              {/* Bottom half (static) */}
              <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[#1f1f1f] flex items-start justify-center overflow-hidden rounded-b-md z-10">
                <span className="text-[75px] font-bold leading-[0px] text-center">
                  {digit}
                </span>
              </div>

              {isAnimating && (
                <>
                  {/* Top half (flipping down) */}
                  <div
                    className="absolute top-0 left-0 w-full h-[50%] bg-[#1f1f1f] flex items-end justify-center overflow-hidden rounded-t-md z-20 shadow-md origin-bottom"
                    style={{
                      animation: `flipDown ${duration}s cubic-bezier(0.36, 0, 0.66, 1) forwards`,
                      animationDelay: `${index * 0.1}s`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <span className="text-[75px] font-bold leading-[150px] text-center">
                      {prevDigit}
                    </span>
                  </div>

                  {/* Bottom half (revealed) */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[50%] bg-[#1f1f1f] flex items-start justify-center overflow-hidden rounded-b-md z-0"
                    style={{
                      opacity: isAnimating ? 1 : 0,
                    }}
                  >
                    <span className="text-[75px] font-bold leading-[0px] text-center">
                      {digit}
                    </span>
                  </div>
                </>
              )}

              {/* Horizontal dividing line */}
              <div className="absolute top-[50%] left-0 w-full h-[1px] bg-[#333333] z-30"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
