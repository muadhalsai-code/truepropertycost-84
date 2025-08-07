
import Navigation from "@/components/Navigation";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import CostCalculator from "./CostCalculator";
import PropertyAnalytics from "./PropertyAnalytics";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <div className="flex min-h-[calc(100vh-4rem)] w-full">
            <DashboardSidebar />
            
            <main className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard/calculator" replace />} />
                <Route path="/calculator" element={<CostCalculator />} />
                <Route path="/analytics" element={<PropertyAnalytics />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
