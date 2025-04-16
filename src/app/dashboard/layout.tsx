'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Calendar, Users, Settings, CreditCard, BookOpen, LogOut, Menu, TrendingUp } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { signOut, useSession } from 'next-auth/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => setIsOpen(true),
    onSwipedLeft: () => setIsOpen(false),
    trackMouse: true,
  });

  useEffect(() => {
    const checkUserRole = async () => {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      setIsAdmin(data.role === 'ADMIN');
    };
    checkUserRole();
  }, []);

  const userMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Services', href: '/dashboard/services', icon: Settings },
    { name: 'Pricing', href: '/dashboard/pricing', icon: CreditCard },
    { name: 'Profile', href: '/dashboard/profile', icon: Users },
  ];

  const adminMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Bookings', href: '/dashboard/admin/bookings', icon: Calendar },
    { name: 'Leads', href: '/dashboard/admin/leads', icon: TrendingUp },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div 
      {...handlers} 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col
        transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0`}
    >
      <div className="flex-none p-4 border-b border-gray-200">
        <h2 className="text-2xl text-black font-bold">
          {isAdmin ? 'Admin Panel' : 'Dashboard'}
        </h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 ${
                pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="ml-3 truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-none p-4 border-t border-gray-200">
        <button
          onClick={() => {
            signOut({ 
              redirect: true,
              callbackUrl: `${window.location.origin}/login`
            });
          }}
          className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <main className="h-screen overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
