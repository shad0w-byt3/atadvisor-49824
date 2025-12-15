
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Loading3D } from "@/components/Loading3D";
import { SEOHead } from "@/components/SEOHead";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Analytics } from "@/components/Analytics";
import { UserProfileSetup } from "@/components/UserProfileSetup";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Market from "./pages/Market";
import CameraAnalysis from "./pages/CameraAnalysis";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";

// New feature pages
import SmartInputPlanner from "./pages/SmartInputPlanner";
import FarmingGame from "./pages/FarmingGame";
import CropTracker from "./pages/CropTracker";
import FarmPodcast from "./pages/FarmPodcast";
import SmartMarketplace from "./pages/SmartMarketplace";
import FarmChallenges from "./pages/FarmChallenges";
import LearningPaths from "./pages/LearningPaths";
import Mentorship from "./pages/Mentorship";
import RiskDashboard from "./pages/RiskDashboard";
import CropDiversification from "./pages/CropDiversification";
import MicroInvestment from "./pages/MicroInvestment";
import PlotMapping from "./pages/PlotMapping";
import Mythbuster from "./pages/Mythbuster";
import CustomTips from "./pages/CustomTips";
import ExpertFinder from "./pages/ExpertFinder";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Show initial loading screen for app startup
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Loading3D message="Initializing AgriTech Advisor..." />;
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ScrollToTop />
            <SEOHead />
            <PerformanceMonitor />
            <OfflineIndicator />
            <Analytics />
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <LanguageProvider>
                <TooltipProvider>
                  <Toaster />
                  <UserProfileSetup />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/camera" element={<CameraAnalysis />} />
                    <Route path="/camera-analysis" element={<CameraAnalysis />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tools" element={<Tools />} />
                    
                    {/* New feature routes */}
                    <Route path="/smart-input-planner" element={<SmartInputPlanner />} />
                    <Route path="/farming-game" element={<FarmingGame />} />
                    <Route path="/crop-tracker" element={<CropTracker />} />
                    <Route path="/farm-podcast" element={<FarmPodcast />} />
                    <Route path="/smart-marketplace" element={<SmartMarketplace />} />
                    <Route path="/farm-challenges" element={<FarmChallenges />} />
                    <Route path="/learning-paths" element={<LearningPaths />} />
                    <Route path="/mentorship" element={<Mentorship />} />
                    <Route path="/risk-dashboard" element={<RiskDashboard />} />
                    <Route path="/crop-diversification" element={<CropDiversification />} />
                    <Route path="/micro-investment" element={<MicroInvestment />} />
                    <Route path="/plot-mapping" element={<PlotMapping />} />
                    <Route path="/mythbuster" element={<Mythbuster />} />
                    <Route path="/custom-tips" element={<CustomTips />} />
                    <Route path="/expert-finder" element={<ExpertFinder />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TooltipProvider>
              </LanguageProvider>
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
