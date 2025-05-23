import { SlotMachine } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SlotMachineCardProps {
  slotMachine: SlotMachine;
  className?: string;
}

export const SlotMachineCard = ({
  slotMachine,
  className,
}: SlotMachineCardProps) => {
  const { id, title, dev, imageUrl, overallScore, rtp } = slotMachine;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Link to={`/slot-machine/${id}`}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-md transition-shadow",
          className,
        )}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title.kr}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            RTP: {rtp}%
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title.kr}</CardTitle>
          <p className="text-sm text-muted-foreground">{dev.kr}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">종합 점수</span>
              <span className="font-medium">{overallScore}</span>
            </div>
            <Progress
              value={overallScore}
              className="h-2"
              indicatorClassName={getScoreColor(overallScore)}
            />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <span className="text-sm text-muted-foreground">
            자세히 보기 &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
