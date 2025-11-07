import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DashboardAlert } from '@/types/dashboard';

interface AlertsListProps {
  alerts: DashboardAlert[];
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return AlertCircle;
    case 'info':
      return Info;
    case 'success':
      return CheckCircle;
    case 'error':
      return XCircle;
    default:
      return Info;
  }
};

const getAlertColors = (type: string): string => {
  switch (type) {
    case 'warning':
      return 'bg-amber-50 border-amber-200 text-amber-900';
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-900';
    case 'success':
      return 'bg-green-50 border-green-200 text-green-900';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-900';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-900';
  }
};

const getIconColor = (type: string): string => {
  switch (type) {
    case 'warning':
      return 'text-amber-600';
    case 'info':
      return 'text-blue-600';
    case 'success':
      return 'text-green-600';
    case 'error':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Alertas y Notificaciones</span>
          {alerts.length > 0 && (
            <span className="text-sm font-normal text-gray-500">
              {alerts.length} activas
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border',
                  getAlertColors(alert.type)
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn('h-5 w-5 mt-0.5', getIconColor(alert.type))} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1">{alert.title}</p>
                    <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                    <p className="text-xs opacity-75">
                      {formatDistanceToNow(alert.timestamp, {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                    {alert.actionLabel && alert.actionUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 px-2 text-xs"
                      >
                        {alert.actionLabel}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Sin alertas</p>
            <p className="text-sm">
              Todo está funcionando correctamente
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
