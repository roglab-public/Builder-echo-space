import { SlotMachine, ScoreCategory } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { LargeScoreCard } from "./LargeScoreCard";
import { getScoreCategories } from "@/data/slot-machines";
import { SlotTabs } from "./SlotTabs";
import { TabContent } from "./TabContent";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SlotMachineDetailsProps {
  slotMachine: SlotMachine;
}

export const SlotMachineDetails = ({
  slotMachine,
}: SlotMachineDetailsProps) => {
  const {
    title,
    dev,
    description,
    rtp,
    updatedDate,
    overallScore,
    profitScore,
  } = slotMachine;
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

  // Format date for header display
  const formatShortDate = (dateString: string) => {
    return dateString.substring(0, 10);
  };

  // Determine badge color based on score
  const getBadgeVariant = (score: number) => {
    return score >= 50 ? "yellow" : "red";
  };

  return (
    <div className="space-y-8">
      {/* Header section with title and score badges */}
      <div className="flex items-center justify-between gap-4 w-full max-w-3xl mx-auto">
        <div>
          <h1
            className="text-[30px] font-bold leading-9 tracking-[-0.75px]"
            lang="en"
          >
            {title.en}
          </h1>
          <p className="text-[#999999]">
            <span lang="en">{dev.en}</span>
            <span> | 등록일: </span>
            <span>{formatShortDate(updatedDate)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={getBadgeVariant(overallScore)}
            size="xl"
            className="flex items-center gap-1"
          >
            {overallScore}
          </Badge>
          <Badge
            variant={getBadgeVariant(profitScore)}
            size="xl"
            className="flex items-center gap-1"
          >
            {profitScore}
          </Badge>
        </div>
      </div>

      {/* Image section */}
      <div className="aspect-video overflow-hidden rounded-lg border border-[#707070] w-full max-w-3xl mx-auto">
        <img
          src={slotMachine.imageUrl}
          alt={title.kr}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Basic info section - replaced with description only */}
      <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
        <p className="text-muted-foreground" lang="ko">
          {description.kr}
        </p>
      </div>

      {/* Overall Evaluation section with large score cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-3xl mx-auto">
        <LargeScoreCard title="종합 점수" score={overallScore} />
        <LargeScoreCard title="수익 점수" score={profitScore} />
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

      {/* Edit button moved to the very bottom */}
      <div className="w-full max-w-3xl mx-auto flex justify-end">
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-md bg-[#1f1f1f] border border-[#333333] px-3 h-9 text-sm font-medium leading-5 whitespace-nowrap transition-colors"
        >
          정보 수정
        </a>
      </div>
    </div>
  );
};
