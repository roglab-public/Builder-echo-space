import { SlotMachine, ScoreCategory } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { LargeScoreCard } from "./LargeScoreCard";
import { getScoreCategories } from "@/data/slot-machines";
import { SlotTabs } from "./SlotTabs";
import { TabContent } from "./TabContent";
import { useState } from "react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { ScreenshotsContent } from "./ScreenshotsContent";
import { PatternAIContent } from "./PatternAIContent";
import { OverviewContent } from "./OverviewContent";
import { VolatilityContent } from "./VolatilityContent";
import { HitRateContent } from "./HitRateContent";
import { ProfitHitRateContent } from "./ProfitHitRateContent";
import { MaxMultiplierContent } from "./MaxMultiplierContent";
import { AvgMultiplierContent } from "./AvgMultiplierContent";
import { PlaySlotContent } from "./PlaySlotContent";
import { NavigationButtons } from "./NavigationButtons";

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
    updatedDate,
    overallScore,
    profitScore,
    imageUrl,
  } = slotMachine;
  const categories = getScoreCategories(slotMachine);

  // Format date for header display
  const formatShortDate = (dateString: string) => {
    return dateString.substring(0, 10);
  };

  // Define all tab options
  const tabOptions = [
    { id: "overview", label: "오버뷰" },
    { id: "volatility", label: "변동성" },
    { id: "hitRate", label: "히트율" },
    { id: "profitHitRate", label: "흑자 히트율" },
    { id: "maxMultiplier", label: "최고 배수" },
    { id: "avgMultiplier", label: "평균 배수" },
    { id: "playSlot", label: "실제로 해 보기" },
    { id: "patternAI", label: "PatternAI™" },
    { id: "screenshots", label: "스크린샷" },
  ];

  // Set default selected tab
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Determine badge color based on score
  const getBadgeVariant = (score: number) => {
    return score >= 50 ? "yellow" : "red";
  };

  // Handle navigation between tabs
  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to the top of the tab content
    window.scrollTo({
      top: document.getElementById("tab-content")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // Get the content for the category tabs
  const getCategoryContent = (tabId: string) => {
    // Map tab IDs to category indices
    const tabToCategory: Record<string, number> = {
      volatility: 1, // Index of volatility in categories array
      hitRate: 2,
      profitHitRate: 3,
      maxMultiplier: 4,
      avgMultiplier: 5,
    };

    // For special tabs, return specific components with navigation buttons
    if (tabId === "overview") {
      return (
        <>
          <OverviewContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "volatility") {
      return (
        <>
          <VolatilityContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "hitRate") {
      return (
        <>
          <HitRateContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "profitHitRate") {
      return (
        <>
          <ProfitHitRateContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "maxMultiplier") {
      return (
        <>
          <MaxMultiplierContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "avgMultiplier") {
      return (
        <>
          <AvgMultiplierContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "playSlot") {
      return (
        <>
          <PlaySlotContent />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "patternAI") {
      return (
        <>
          <PatternAIContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    } else if (tabId === "screenshots") {
      return (
        <>
          <ScreenshotsContent slotMachine={slotMachine} />
          <NavigationButtons
            currentTab={tabId}
            tabOptions={tabOptions}
            onNavigate={handleNavigate}
          />
        </>
      );
    }

    return null;
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

      {/* Image section with ImageWithFallback component */}
      <div className="aspect-video overflow-hidden rounded-lg border border-[#707070] w-full max-w-3xl mx-auto relative">
        <ImageWithFallback
          src={imageUrl}
          alt={title.kr}
          fallbackSrc="/placeholder.svg"
        />
      </div>

      {/* Basic info section - description only */}
      <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
        <p className="text-muted-foreground" lang="ko">
          {description.kr}
        </p>
      </div>

      {/* Score cards section */}
      <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-3xl mx-auto">
        <LargeScoreCard title="종합 점수" score={overallScore} />
        <LargeScoreCard title="수익 점수" score={profitScore} />
      </div>

      {/* Tabs section with horizontal scroll */}
      <div className="w-full max-w-3xl mx-auto">
        <SlotTabs
          options={tabOptions}
          defaultTab="overview"
          onChange={setActiveTab}
          className="mb-4"
        />

        {/* Content for the selected tab */}
        <div id="tab-content">{getCategoryContent(activeTab)}</div>
      </div>

      {/* Edit button at the bottom */}
      <div className="w-full max-w-3xl mx-auto flex justify-end">
        <a
          href={`/slot-machine/edit/${slotMachine.id}`}
          className="inline-flex items-center justify-center rounded-md bg-[#1f1f1f] border border-[#333333] px-3 h-9 text-sm font-medium leading-5 whitespace-nowrap transition-colors"
        >
          정보 수정
        </a>
      </div>
    </div>
  );
};
