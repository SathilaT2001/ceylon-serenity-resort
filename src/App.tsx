
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

// Admin routes
import AdminReservations from "./pages/admin/AdminReservations";
import AdminGuests from "./pages/admin/AdminGuests";
import AdminServices from "./pages/admin/AdminServices";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminReports from "./pages/admin/AdminReports";

// Employee routes
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import RoomInventory from "./pages/employee/RoomInventory";
import ServiceRequests from "./pages/employee/ServiceRequests";

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
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="guests" element={<AdminGuests />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="employees" element={<AdminEmployees />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={['employee']}>
                <AppLayout showSidebar={true} />
              </ProtectedRoute>
            }>
              <Route index element={<EmployeeDashboard />} />
              <Route path="room-inventory" element={<RoomInventory />} />
              <Route path="service-requests" element={<ServiceRequests />} />
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
