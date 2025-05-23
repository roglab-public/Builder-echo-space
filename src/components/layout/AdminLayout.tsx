import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdminNavigation } from "./AdminNavigation";

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <main className="container mx-auto px-4 pb-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};
