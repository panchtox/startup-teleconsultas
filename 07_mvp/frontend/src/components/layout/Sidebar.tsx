/**
 * Sidebar - Navegación lateral principal
 */

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Award, 
  MessageCircle, 
  BarChart3,
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard
  },
  {
    label: 'Pacientes',
    href: '/patients',
    icon: Users
  },
  {
    label: 'Consultas',
    href: '/appointments',
    icon: Calendar
  },
  {
    label: 'Reputación',
    href: '/reputation',
    icon: Award
  },
  {
    label: 'Mensajes',
    href: '/messages',
    icon: MessageCircle
  },
  {
    label: 'Reportes',
    href: '/reports',
    icon: BarChart3
  },
  {
    label: 'Configuración',
    href: '/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">TeleConsultas</span>
            <span className="text-xs text-gray-500">Sistema de gestión</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@clinica.com.ar</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
