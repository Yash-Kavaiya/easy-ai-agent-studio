
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Enterprise from "./pages/Enterprise";
import Pricing from "./pages/Pricing";
import Studio from "./pages/Studio";
import BookDemo from "./pages/BookDemo";
import TechnologyPartners from "./pages/TechnologyPartners";
import IntegrationPartners from "./pages/IntegrationPartners";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/partners/technology" element={<TechnologyPartners />} />
          <Route path="/partners/integration" element={<IntegrationPartners />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
