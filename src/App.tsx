import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import SlotMachineDetail from "./pages/SlotMachineDetail";
import SlotMachineEdit from "./pages/SlotMachineEdit";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Wrap all routes in AdminLayout for consistent navigation */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/slot-machine/:id" element={<SlotMachineDetail />} />
            <Route
              path="/slot-machine/edit/:id"
              element={<SlotMachineEdit />}
            />
            <Route path="/slot-machine/new" element={<SlotMachineEdit />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
