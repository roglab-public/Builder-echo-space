import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import SlotMachineDetail from "./pages/SlotMachineDetail";
import SlotMachineEdit from "./pages/SlotMachineEdit";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

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
          <Route path="/admin/cloudinary-settings" element={<React.lazy(() => import("./pages/admin/CloudinarySettings"))} />
          <Route path="/admin/cloudinary-help" element={<React.lazy(() => import("./pages/admin/CloudinaryHelp"))} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;