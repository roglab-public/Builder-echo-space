import { SlotMachine, ScoreCategory } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { getScoreCategories } from "@/data/slot-machines";
import { SlotTabs } from "./SlotTabs";
import { TabContent } from "./TabContent";
import { useState } from "react";

interface SlotMachineDetailsProps {
  slotMachine: SlotMachine;
}

export const SlotMachineDetails = ({
  slotMachine,
}: SlotMachineDetailsProps) => {
  const { title, dev, description, rtp, betAmount, updatedDate } = slotMachine;
  const categories = getScoreCategories(slotMachine);

  // Tab state
  const [activeTab, setActiveTab] = useState<string>("topPerforming");

  // Tabs configuration
  const tabOptions = [
    { id: "topPerforming", label: "상위 성능 슬롯" },
    { id: "topRanked", label: "상위 평점 슬롯" },
    { id: "recommended", label: "추천 슬롯" },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="space-y-8">
      {/* Header section with title and description */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-brand-yellow" lang="ko">
          {title.kr} 리뷰
        </h2>
        <p className="text-muted-foreground mb-6" lang="ko">
          {description.kr}
        </p>
      </div>

      {/* Image section */}
      <div className="aspect-video overflow-hidden rounded-lg border border-[#707070] w-full max-w-3xl mx-auto">
        <img
          src={slotMachine.imageUrl}
          alt={title.kr}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Basic info section */}
      <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground" lang="ko">
              제공 업체
            </h3>
            <p lang="ko">{dev.kr}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground" lang="ko">
              RTP (Return to Player)
            </h3>
            <p>{rtp}%</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground" lang="ko">
              기본 베팅 금액
            </h3>
            <p>{betAmount}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground" lang="ko">
              업데이트 날짜
            </h3>
            <p>{formatDate(updatedDate.substring(0, 10))}</p>
          </div>
        </div>
      </div>

      {/* Score categories */}
      <div className="space-y-6 w-full max-w-3xl mx-auto">
        {categories.map((category: ScoreCategory, index: number) => (
          <div
            key={index}
            className="border border-[#707070] p-4 rounded-lg bg-card"
          >
            <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
              {category.title}
            </h3>

            {/* Add tabs after the "전체 평가" section */}
            {category.title === "전체 평가" && (
              <div className="mt-6">
                <SlotTabs
                  options={tabOptions}
                  defaultTab="topPerforming"
                  onChange={setActiveTab}
                  className="mb-4"
                />

                <TabContent id="topPerforming" activeTab={activeTab}>
                  <div className="p-4 border border-[#707070] rounded-lg bg-[#1f1f1f]">
                    <p lang="ko" className="text-[#999999]">
                      상위 성능 슬롯에 대한 정보가 여기에 표시됩니다. 높은 RTP와
                      우수한 히트율을 가진 슬롯 머신입니다.
                    </p>
                  </div>
                </TabContent>

                <TabContent id="topRanked" activeTab={activeTab}>
                  <div className="p-4 border border-[#707070] rounded-lg bg-[#1f1f1f]">
                    <p lang="ko" className="text-[#999999]">
                      상위 평점 슬롯에 대한 정보가 여기에 표시됩니다.
                      사용자들에게 높은 평가를 받은 슬롯 머신입니다.
                    </p>
                  </div>
                </TabContent>

                <TabContent id="recommended" activeTab={activeTab}>
                  <div className="p-4 border border-[#707070] rounded-lg bg-[#1f1f1f]">
                    <p lang="ko" className="text-[#999999]">
                      추천 슬롯에 대한 정보가 여기에 표시됩니다. 전문가가
                      추천하는 슬�� 머신입니다.
                    </p>
                  </div>
                </TabContent>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.metrics.map((metric, metricIndex) => (
                <ScoreCard key={metricIndex} metric={metric} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Screenshots section */}
      {slotMachine.screenshots && slotMachine.screenshots.length > 0 && (
        <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
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
