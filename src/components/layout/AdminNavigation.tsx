import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationTab {
  name: string;
  path: string;
}

export const AdminNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs: NavigationTab[] = [
    { name: "대시보드", path: "/admin/dashboard" },
    { name: "슬롯 리뷰", path: "/" }, // Root for slot reviews list
    { name: "슬롯 등록", path: "/slot-machine/new" },
    { name: "어드민", path: "/admin/settings" },
  ];

  return (
    <div className="w-full bg-[#1f1f1f] border-b border-[#333333] mb-6">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link to="/" className="flex items-center py-4">
              <span className="text-2xl font-bold text-brand-yellow">
                SlotReview
              </span>
              <span className="ml-2 text-sm bg-[#333333] text-white px-2 py-0.5 rounded">
                ADMIN
              </span>
            </Link>
          </div>

          <nav className="flex">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "px-4 py-4 text-sm font-medium border-b-2 -mb-px transition-colors hover:text-brand-yellow",
                  currentPath === tab.path ||
                    (tab.path === "/" &&
                      (currentPath === "/" ||
                        currentPath.startsWith("/slot-machine/")))
                    ? "border-brand-yellow text-brand-yellow"
                    : "border-transparent text-gray-400",
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
