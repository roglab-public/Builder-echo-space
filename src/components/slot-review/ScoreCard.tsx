import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreMetric } from "@/types";

interface ScoreCardProps {
  metric: ScoreMetric;
  className?: string;
}

export const ScoreCard = ({ metric, className }: ScoreCardProps) => {
  const { title, score, value } = metric;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">점수</span>
            <span className="font-medium">{score}</span>
          </div>
          <Progress
            value={score}
            className="h-2"
            indicatorClassName={getScoreColor(score)}
          />
          {value !== undefined && (
            <div className="flex justify-between pt-2">
              <span className="text-sm text-muted-foreground">실제 값</span>
              <span className="font-medium">{value.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
