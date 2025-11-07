/**
 * Topbar - Header superior con búsqueda y notificaciones
 */

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Topbar() {
  const pendingNotifications = 3;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar pacientes, consultas..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {pendingNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {pendingNotifications}
            </Badge>
          )}
        </Button>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
          <div className="text-sm">
            <p className="text-gray-500">Próximas hoy</p>
            <p className="font-semibold text-gray-900">8 consultas</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Asistencia</p>
            <p className="font-semibold text-primary-600">91%</p>
          </div>
        </div>
      </div>
    </header>
  );
}
