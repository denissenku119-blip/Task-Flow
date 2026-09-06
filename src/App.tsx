import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import OpenSourceLicenses from "./pages/OpenSourceLicenses";
import NotFound from "./pages/NotFound";
import { useLanguage, changeLanguage, hasSelectedLanguage, setLanguageSelected } from "./hooks/use-language";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { t, i18n, currentLanguage } = useLanguage();
  const [hasCompletedFirstLaunch, setHasCompletedFirstLaunch] = useState(false);

  useEffect(() => {
    // Check if user has already selected a language
    const savedLang = localStorage.getItem('taskflow_language');
    if (savedLang) {
      // User has a saved language preference - open directly in that language
      changeLanguage(savedLang);
      setHasCompletedFirstLaunch(true);
    } else {
      // First time - show language selection
      // We'll handle this in the Index page
      setHasCompletedFirstLaunch(true);
    }
  }, [changeLanguage]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              {hasCompletedFirstLaunch ? (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/licenses" element={<OpenSourceLicenses />} />
                  <Route path="*" element={<NotFound />} />
                </>
              ) : (
                <Route path="/" element={<Index />} />
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;