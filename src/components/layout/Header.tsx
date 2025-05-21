
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl text-primary font-bold">Ceylon Serenity</span>
            <span className="text-sm text-muted-foreground">Resort</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => navigate('/booking')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>Book Now</span>
              </Button>
            )}  

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={isAuthenticated ? "bg-primary text-white" : "bg-muted text-muted-foreground"}>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {isAdmin ? (
                      <DropdownMenuItem>
                        <Link to="/admin" className="w-full">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Link to="/dashboard" className="w-full">My Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onSelect={() => logout()}>
                      Log Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to="/auth" className="w-full">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/auth?mode=signup" className="w-full">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin" className="w-full">Admin</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <nav className="pt-4 pb-2 animate-fade-in">
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="block text-gray-700 hover:text-primary transition-colors py-1" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/booking" 
                  className="block text-primary font-medium py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
