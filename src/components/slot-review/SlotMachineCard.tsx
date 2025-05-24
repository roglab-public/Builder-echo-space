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
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

interface SlotMachineCardProps {
  slotMachine: SlotMachine;
  className?: string;
}

export const SlotMachineCard = ({
  slotMachine,
  className,
}: SlotMachineCardProps) => {
  const { id, title, dev, imageUrl, overallScore, rtp } = slotMachine;

  // 점수에 따른 색상 결정
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-brand-yellow";
    if (score >= 60) return "bg-amber-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-brand-red";
  };

  return (
    <Link to={`/slot-machine/${id}`}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-md transition-shadow border-[#707070]",
          className,
        )}
      >
        <div className="relative overflow-hidden">
          <CloudinaryImage
            src={imageUrl}
            alt={title.kr}
            imgClassName="transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            RTP: {rtp}%
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl" lang="ko">
            {title.kr}
          </CardTitle>
          <p className="text-sm text-muted-foreground" lang="ko">
            {dev.kr}
          </p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium" lang="ko">
                종합 점수
              </span>
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
          <span
            className="text-sm text-muted-foreground hover:text-brand-yellow transition-colors"
            lang="ko"
          >
            자세히 보기 &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
