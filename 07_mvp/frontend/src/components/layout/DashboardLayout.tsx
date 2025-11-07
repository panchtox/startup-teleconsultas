/**
 * DashboardLayout - Layout principal de la aplicación
 */

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="pl-64">
        <Topbar />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
