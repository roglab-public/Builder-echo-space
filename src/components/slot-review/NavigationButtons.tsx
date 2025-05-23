import React from "react";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentTab: string;
  tabOptions: Array<{ id: string; label: string }>;
  onNavigate: (tabId: string) => void;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentTab,
  tabOptions,
  onNavigate,
  className,
}) => {
  // Find the current tab index
  const currentIndex = tabOptions.findIndex((tab) => tab.id === currentTab);

  // Determine if we have previous/next tabs
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < tabOptions.length - 1;

  // Get previous/next tab info
  const previousTab = hasPrevious ? tabOptions[currentIndex - 1] : null;
  const nextTab = hasNext ? tabOptions[currentIndex + 1] : null;

  return (
    <div className={cn("flex justify-between mt-6", className)}>
      {hasPrevious ? (
        <button
          onClick={() => onNavigate(previousTab!.id)}
          className="flex items-center gap-2 px-4 py-2 bg-[rgba(74,74,74,1)] text-white font-medium rounded-lg transition-colors hover:bg-opacity-90"
        >
          <span>◀</span>
          <span>{previousTab!.label}</span>
        </button>
      ) : (
        <div></div> // Empty div to maintain space for flexbox
      )}

      {hasNext && (
        <button
          onClick={() => onNavigate(nextTab!.id)}
          className="flex items-center gap-2 px-4 py-2 bg-[rgba(74,74,74,1)] text-white font-medium rounded-lg transition-colors hover:bg-opacity-90"
        >
          <span>{nextTab!.label}</span>
          <span>▶</span>
        </button>
      )}
    </div>
  );
};
