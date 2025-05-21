
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  showSidebar?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ showSidebar = false }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
      <Toaster />
      <Sonner />
    </div>
  );
};

export default AppLayout;
