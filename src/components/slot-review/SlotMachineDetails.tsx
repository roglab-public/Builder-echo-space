import { SlotMachine, ScoreCategory } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { getScoreCategories } from "@/data/slot-machines";

interface SlotMachineDetailsProps {
  slotMachine: SlotMachine;
}

export const SlotMachineDetails = ({
  slotMachine,
}: SlotMachineDetailsProps) => {
  const { title, dev, description, rtp, betAmount, updatedDate } = slotMachine;
  const categories = getScoreCategories(slotMachine);

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Slot machine image and basic info */}
        <div className="md:w-1/3">
          <div className="aspect-video overflow-hidden rounded-lg border border-[#707070]">
            <img
              src={slotMachine.imageUrl}
              alt={title.kr}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-4 space-y-3 border border-[#707070] p-4 rounded-lg bg-card">
            <div>
              <h3
                className="text-sm font-medium text-muted-foreground"
                lang="ko"
              >
                제공 업체
              </h3>
              <p lang="ko">{dev.kr}</p>
            </div>
            <div>
              <h3
                className="text-sm font-medium text-muted-foreground"
                lang="ko"
              >
                RTP (Return to Player)
              </h3>
              <p>{rtp}%</p>
            </div>
            <div>
              <h3
                className="text-sm font-medium text-muted-foreground"
                lang="ko"
              >
                기본 베팅 금액
              </h3>
              <p>{betAmount}</p>
            </div>
            <div>
              <h3
                className="text-sm font-medium text-muted-foreground"
                lang="ko"
              >
                업데이트 날짜
              </h3>
              <p>{formatDate(updatedDate.substring(0, 10))}</p>
            </div>
          </div>
        </div>

        {/* Scores and metrics */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-brand-yellow" lang="ko">
            {title.kr} 리뷰
          </h2>
          <p className="text-muted-foreground mb-6" lang="ko">
            {description.kr}
          </p>

          {/* Score categories */}
          <div className="space-y-8">
            {categories.map((category: ScoreCategory, index: number) => (
              <div
                key={index}
                className="border border-[#707070] p-4 rounded-lg bg-card"
              >
                <h3
                  className="text-xl font-bold mb-4 text-brand-yellow"
                  lang="ko"
                >
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <ScoreCard key={metricIndex} metric={metric} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots section */}
      {slotMachine.screenshots && slotMachine.screenshots.length > 0 && (
        <div className="mt-8 border border-[#707070] p-4 rounded-lg bg-card">
          <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
            스크린샷
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slotMachine.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="aspect-video overflow-hidden rounded-lg border border-[#707070]"
              >
                <img
                  src={`/placeholder.svg`} // Using placeholder since we don't have actual screenshots
                  alt={`${title.kr} 스크린샷 ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
