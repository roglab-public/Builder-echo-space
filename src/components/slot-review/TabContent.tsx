import React from "react";
import { cn } from "@/lib/utils";

interface TabContentProps {
  id: string;
  activeTab: string;
  className?: string;
  children: React.ReactNode;
}

export const TabContent = ({
  id,
  activeTab,
  className,
  children,
}: TabContentProps) => {
  if (id !== activeTab) return null;

  return (
    <div
      role="tabpanel"
      id={`radix-content-${id}`}
      className={cn("mt-4", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
