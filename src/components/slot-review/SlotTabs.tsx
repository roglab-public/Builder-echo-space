import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type TabOption = {
  id: string;
  label: string;
};

interface SlotTabsProps {
  options: TabOption[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

export const SlotTabs = ({
  options,
  defaultTab,
  className,
  onChange,
}: SlotTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || (options.length > 0 ? options[0].id : ""),
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }

    // Scroll the active tab into view
    const activeElement = document.getElementById(`tab-${tabId}`);
    if (activeElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft =
        activeElement.offsetLeft -
        container.offsetWidth / 2 +
        activeElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      role="tablist"
      aria-orientation="horizontal"
      tabIndex={0}
      className={cn(
        "inline-flex items-center bg-[#333333] rounded-md h-10 justify-start p-1 w-full overflow-x-auto scrollbar-hide",
        className,
      )}
    >
      {options.map((option) => (
        <button
          id={`tab-${option.id}`}
          key={option.id}
          type="button"
          role="tab"
          aria-selected={activeTab === option.id}
          aria-controls={`radix-content-${option.id}`}
          tabIndex={-1}
          className={cn(
            "flex items-center justify-center whitespace-nowrap text-sm font-medium leading-5 px-3 py-1.5 rounded transition-all duration-150 ease-in-out flex-shrink-0",
            activeTab === option.id
              ? "bg-[#1f1f1f] text-white shadow-sm"
              : "bg-transparent text-[#999999] hover:text-white",
          )}
          onClick={() => handleTabChange(option.id)}
        >
          <span lang="ko">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
