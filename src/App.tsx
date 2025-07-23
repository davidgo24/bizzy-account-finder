import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import Home from "./pages/Home";
import StartProfile from "./pages/StartProfile";
import BankOrCU from "./pages/BankOrCU";
import SearchResults from "./pages/SearchResults";
import Research from "./pages/Research";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <UserProfileProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartProfile />} />
          <Route path="/bank-or-cu" element={<BankOrCU />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/research" element={<Research />} />
          <Route path="/summary" element={<Summary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </UserProfileProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
