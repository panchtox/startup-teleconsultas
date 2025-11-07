import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number; // % cambio (positivo o negativo)
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  format?: 'number' | 'currency' | 'percentage';
  helpText?: string;
  inverseColors?: boolean; // Si true, negativo es bueno (ej: ausentismo)
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBgColor = 'bg-primary-50',
  format = 'number',
  helpText,
  inverseColors = false,
}: MetricCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('es-AR').format(val);
    }
  };

  const getChangeColor = (): string => {
    if (!change) return '';

    const isPositive = change > 0;
    const shouldBeGreen = inverseColors ? !isPositive : isPositive;

    return shouldBeGreen ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (): string => {
    if (!change) return '';
    return change > 0 ? '↑' : '↓';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn('p-2 rounded-lg', iconBgColor)}>
          <Icon className={cn('h-4 w-4', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </p>
            {change !== undefined && (
              <p className={cn('text-xs font-medium mt-1', getChangeColor())}>
                {getChangeIcon()} {Math.abs(change).toFixed(1)}%
                <span className="text-gray-500 ml-1">vs mes anterior</span>
              </p>
            )}
          </div>
        </div>
        {helpText && (
          <p className="text-xs text-gray-500 mt-2">{helpText}</p>
        )}
      </CardContent>
    </Card>
  );
}
