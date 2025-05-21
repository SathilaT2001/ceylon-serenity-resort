
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Users, Calendar, Home, Settings, CreditCard, 
  FileText, ChartBar, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const mainNavItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: Calendar, label: 'Reservations', href: '/admin/reservations' },
    { icon: Users, label: 'Guests', href: '/admin/guests' },
    { icon: Plus, label: 'Services', href: '/admin/services' },
  ];

  const managementNavItems = [
    { icon: Users, label: 'Employees', href: '/admin/employees' },
    { icon: Settings, label: 'Rooms', href: '/admin/rooms' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
  ];

  const reportsNavItems = [
    { icon: ChartBar, label: 'Analytics', href: '/admin/analytics' },
    { icon: FileText, label: 'Reports', href: '/admin/reports' },
  ];

  const NavItem = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
    const isActive = location.pathname === href;

    return (
      <NavLink to={href} className="w-full">
        <Button
          variant={isActive ? 'default' : 'ghost'}
          className={cn(
            'w-full justify-start',
            isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </NavLink>
    );
  };

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-card">
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin Portal
            </h2>
            <div className="space-y-1">
              {mainNavItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>
          <Separator />
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Management
            </h2>
            <div className="space-y-1">
              {managementNavItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>
          <Separator />
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Reports
            </h2>
            <div className="space-y-1">
              {reportsNavItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4">
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
