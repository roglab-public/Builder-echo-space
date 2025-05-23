import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreMetric } from "@/types";
import { CountUp } from "@/components/animations/CountUp";

interface ScoreCardProps {
  metric: ScoreMetric;
  className?: string;
}

export const ScoreCard = ({ metric, className }: ScoreCardProps) => {
  const { title, score, value } = metric;

  // Determine color based on score using brand colors
  const getScoreColor = (score: number) => {
    if (score >= 50) return "bg-brand-yellow";
    return "bg-brand-red";
  };

  return (
    <Card className={cn("overflow-hidden border-[#707070]", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium" lang="ko">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground" lang="ko">
              점수
            </span>
            <span className="font-medium">{score}</span>
          </div>
          <Progress
            value={score}
            className="h-2"
            indicatorClassName={getScoreColor(score)}
          />
          {value !== undefined && (
            <div className="flex justify-between pt-2">
              <span className="text-sm text-muted-foreground" lang="ko">
                실제 값
              </span>
              <span className="font-medium">{value.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
