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

  // Get category IDs dynamically from categories
  const categoryIds = categories.map((cat, index) => ({
    id: `category-${index}`,
    label: cat.title,
  }));

  // Skip the first category (Overall Evaluation) for tabs
  const tabOptions = categoryIds.slice(1);

  // Set default selected tab to the first category after Overall
  const [activeTab, setActiveTab] = useState<string>(tabOptions[0]?.id || "");

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

      {/* Overall Evaluation section (always shown) */}
      <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
          {categories[0].title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories[0].metrics.map((metric, index) => (
            <ScoreCard key={index} metric={metric} />
          ))}
        </div>
      </div>

      {/* Tabs section - positioned between Overall Evaluation and other categories */}
      <div className="w-full max-w-3xl mx-auto">
        <SlotTabs
          options={tabOptions}
          defaultTab={tabOptions[0]?.id}
          onChange={setActiveTab}
          className="mb-4"
        />

        {/* Show tab content based on selected tab */}
        {tabOptions.map((tabOption, index) => (
          <TabContent
            key={tabOption.id}
            id={tabOption.id}
            activeTab={activeTab}
          >
            <div className="border border-[#707070] p-4 rounded-lg bg-card">
              <h3
                className="text-xl font-bold mb-4 text-brand-yellow"
                lang="ko"
              >
                {categories[index + 1].title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories[index + 1].metrics.map((metric, metricIndex) => (
                  <ScoreCard key={metricIndex} metric={metric} />
                ))}
              </div>
            </div>
          </TabContent>
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
