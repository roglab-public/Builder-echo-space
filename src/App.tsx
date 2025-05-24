import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import SlotMachineDetail from "./pages/SlotMachineDetail";
import SlotMachineEdit from "./pages/SlotMachineEdit";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

// Lazy-loaded components
const CloudinarySettings = React.lazy(
  () => import("./pages/admin/CloudinarySettings"),
);
const CloudinaryHelp = React.lazy(() => import("./pages/admin/CloudinaryHelp"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
  </div>
);

// Simplify the App component to avoid potential hook-related issues
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all routes in AdminLayout for consistent navigation */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/slot-machine/:id" element={<SlotMachineDetail />} />
          <Route path="/slot-machine/edit/:id" element={<SlotMachineEdit />} />
          <Route path="/slot-machine/new" element={<SlotMachineEdit />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/settings" element={<Settings />} />
          {/* Wrap lazy-loaded routes with Suspense */}
          <Route
            path="/admin/cloudinary-settings"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CloudinarySettings />
              </Suspense>
            }
          />
          <Route
            path="/admin/cloudinary-help"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CloudinaryHelp />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
