import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplineRobot from "./components/SplineRobot";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MentorsManagement from "./pages/admin/MentorsManagement";
import SponsorsManagement from "./pages/admin/SponsorsManagement";
import EventImagesManagement from "./pages/admin/EventImagesManagement";
import WelcomeIntro from "./components/WelcomeIntro";

const queryClient = new QueryClient();

const INTRO_STORAGE_KEY = "promptthefuture_intro_seen";

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if intro has been seen before
    const introSeen = sessionStorage.getItem(INTRO_STORAGE_KEY);
    if (!introSeen) {
      setShowIntro(true);
    }
    setIsLoading(false);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    setShowIntro(false);
  };

  if (isLoading) {
    return null; // Prevent flash while checking storage
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}
            <Toaster />
            <Sonner />
            <SplineRobot />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/mentors" element={<MentorsManagement />} />
                <Route path="/admin/sponsors" element={<SponsorsManagement />} />
                <Route path="/admin/events" element={<EventImagesManagement />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
