
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestDashboard from "./pages/guest/GuestDashboard";
import Rooms from "./pages/Rooms";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Guest Routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="booking" element={<Booking />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Guest Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<GuestDashboard />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AppLayout showSidebar={true} />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
