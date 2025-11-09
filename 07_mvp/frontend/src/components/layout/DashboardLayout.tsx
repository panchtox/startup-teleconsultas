/**
 * DashboardLayout - Layout principal de la aplicación
 */

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, isMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div 
        className={cn(
          "transition-all duration-300",
          isOpen && !isMobile ? "lg:pl-64" : "lg:pl-0"
        )}
      >
        <Topbar />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
