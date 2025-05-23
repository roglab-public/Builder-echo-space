import { CountUp } from "@/components/animations/CountUp";
import { cn } from "@/lib/utils";

interface LargeScoreCardProps {
  title: string;
  score: number;
  className?: string;
}

export const LargeScoreCard = ({
  title,
  score,
  className,
}: LargeScoreCardProps) => {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    return score >= 50 ? "bg-brand-yellow" : "bg-brand-red";
  };

  return (
    <div
      className={cn(
        "bg-[#1f1f1f] border border-[#333333] rounded-lg overflow-hidden shadow-sm relative",
        className,
      )}
    >
      <div className="text-[#999999] px-4 pt-4 flex flex-col tracking-[-0.4px]">
        {title}
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center flex-col min-h-[90px]">
          <div className="text-center">
            <div className="font-extrabold py-1 px-1 relative">
              <CountUp value={score} duration={1.5} />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="bg-[#333333] h-2 rounded-full overflow-hidden w-full">
            <div
              className={cn(
                "h-full rounded-full transition-width duration-[2s] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                getScoreColor(score),
              )}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
