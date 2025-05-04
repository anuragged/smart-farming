
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Simulation from "./pages/Simulation";
import Navigation from "./components/Navigation";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// App component with React Query and routing
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="container mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <Index />
                </>
              }
            />
            <Route
              path="/simulation"
              element={
                <>
                  <Navigation />
                  <Simulation />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
