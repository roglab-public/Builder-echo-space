import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdminNavigation } from "./AdminNavigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdminNavigation />
        <main className="container mx-auto px-4 pb-8">
          {children || <Outlet />}
        </main>
      </TooltipProvider>
    </div>
  );
};
