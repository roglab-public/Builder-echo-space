import { SlotMachine, ScoreCategory } from "@/types";
import { ScoreCard } from "./ScoreCard";
import { LargeScoreCard } from "./LargeScoreCard";
import { getScoreCategories } from "@/data/slot-machines";
import { SlotTabs } from "./SlotTabs";
import { TabContent } from "./TabContent";
import { useState } from "react";
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
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

interface SlotMachineDetailsProps {
  slotMachine: SlotMachine;
}

export const SlotMachineDetails = ({
  slotMachine,
}: SlotMachineDetailsProps) => {
  const { title, dev, description, updatedDate, overallScore, profitScore } =
    slotMachine;
  const categories = getScoreCategories(slotMachine);

  // 헤더 표시용 날짜 포맷
  const formatShortDate = (dateString: string) => {
    return dateString.substring(0, 10);
  };

  // 모든 탭 옵션 정의
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

  // 기본 선택 탭 설정
  const [activeTab, setActiveTab] = useState<string>("overview");

  // 점수에 따른 배지 색상 결정
  const getBadgeVariant = (score: number) => {
    return score >= 50 ? "yellow" : "red";
  };

  // 탭 간 네비게이션 처리
  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    // 탭 콘텐츠 상단으로 스크롤
    window.scrollTo({
      top: document.getElementById("tab-content")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // 카테고리 탭 콘텐츠 가져오기
  const getCategoryContent = (tabId: string) => {
    // 탭 ID를 카테고리 인덱스에 매핑
    const tabToCategory: Record<string, number> = {
      volatility: 1, // 카테고리 배열의 변동성 인덱스
      hitRate: 2,
      profitHitRate: 3,
      maxMultiplier: 4,
      avgMultiplier: 5,
    };

    // 특별 탭의 경우 네비게이션 버튼이 있는 특정 컴포넌트 반환
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
      {/* 제목과 점수 배지가 있는 헤더 섹션 */}
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

      {/* CloudinaryImage 컴포넌트를 사용한 이미지 섹션 */}
      <div className="overflow-hidden rounded-lg border border-[#707070] w-full max-w-3xl mx-auto relative aspect-video">
        <CloudinaryImage
          src={slotMachine.imageUrl}
          alt={title.kr}
          fallbackSrc="/placeholder.svg"
        />
      </div>

      {/* 기본 정보 섹션 - 설명만 */}
      <div className="border border-[#707070] p-4 rounded-lg bg-card w-full max-w-3xl mx-auto">
        <p className="text-muted-foreground" lang="ko">
          {description.kr}
        </p>
      </div>

      {/* 점수 카드 섹션 */}
      <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-3xl mx-auto">
        <LargeScoreCard title="종합 점수" score={overallScore} />
        <LargeScoreCard title="수익 점수" score={profitScore} />
      </div>

      {/* 수평 스크롤이 있는 탭 섹션 */}
      <div className="w-full max-w-3xl mx-auto">
        <SlotTabs
          options={tabOptions}
          defaultTab="overview"
          onChange={setActiveTab}
          className="mb-4"
        />

        {/* 선택된 탭의 콘텐츠 */}
        <div id="tab-content">{getCategoryContent(activeTab)}</div>
      </div>

      {/* 하단 편집 버튼 */}
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
