import { useMemo } from 'react';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Appointment } from '@/types/appointment';

interface WeekCalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onAppointmentClick?: (appointment: Appointment) => void;
}

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 AM to 8:00 PM
const DAYS_IN_WEEK = 7;

export function WeekCalendar({
  appointments,
  selectedDate,
  onDateChange,
  onAppointmentClick,
}: WeekCalendarProps) {
  // Calcular días de la semana
  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate, { locale: es });
    return Array.from({ length: DAYS_IN_WEEK }, (_, i) => addDays(start, i));
  }, [selectedDate]);

  // Agrupar citas por día y hora
  const appointmentsByDay = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    
    appointments.forEach((apt) => {
      const dayKey = format(apt.date, 'yyyy-MM-dd');
      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey)!.push(apt);
    });

    return map;
  }, [appointments]);

  const getAppointmentsForDayAndHour = (day: Date, hour: number): Appointment[] => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayAppointments = appointmentsByDay.get(dayKey) || [];
    
    return dayAppointments.filter((apt) => {
      const [startHour] = apt.startTime.split(':').map(Number);
      return startHour === hour;
    });
  };

  const handlePreviousWeek = () => {
    onDateChange(addDays(selectedDate, -7));
  };

  const handleNextWeek = () => {
    onDateChange(addDays(selectedDate, 7));
  };

  const getStatusColor = (status: Appointment['status']): string => {
    const colors = {
      'scheduled': 'bg-blue-500',
      'confirmed': 'bg-green-500',
      'in-progress': 'bg-purple-500',
      'completed': 'bg-gray-400',
      'cancelled': 'bg-red-500',
      'no-show': 'bg-orange-500',
    };
    return colors[status];
  };

  return (
    <div className="space-y-4">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(weekDays[0], 'MMMM yyyy', { locale: es })}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateChange(new Date())}
          >
            Hoy
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Grid del calendario */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header de días */}
            <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
              <div className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hora
              </div>
              {weekDays.map((day) => (
                <div
                  key={day.toISOString()}
                  className={`p-3 text-center ${
                    isToday(day) ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    {format(day, 'EEE', { locale: es })}
                  </div>
                  <div
                    className={`text-lg font-bold mt-1 ${
                      isToday(day) ? 'text-primary-600' : 'text-gray-900'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
              ))}
            </div>

            {/* Grid de horas */}
            <div className="divide-y divide-gray-200">
              {HOURS.map((hour) => (
                <div key={hour} className="grid grid-cols-8">
                  {/* Columna de hora */}
                  <div className="p-3 text-sm text-gray-500 font-medium border-r border-gray-200">
                    {hour.toString().padStart(2, '0')}:00
                  </div>

                  {/* Columnas de días */}
                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsForDayAndHour(day, hour);

                    return (
                      <div
                        key={`${day.toISOString()}-${hour}`}
                        className={`p-2 min-h-[80px] border-r border-gray-200 ${
                          isToday(day) ? 'bg-primary-50/30' : ''
                        }`}
                      >
                        <div className="space-y-1">
                          {dayAppointments.map((apt) => (
                            <button
                              key={apt.id}
                              onClick={() => onAppointmentClick?.(apt)}
                              className={`w-full text-left p-2 rounded text-xs ${getStatusColor(
                                apt.status
                              )} text-white hover:opacity-90 transition-opacity`}
                            >
                              <div className="font-medium truncate">
                                {apt.patientName}
                              </div>
                              <div className="text-xs opacity-90 truncate">
                                {apt.specialty}
                              </div>
                              <div className="text-xs opacity-75">
                                {apt.startTime}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-gray-600">Programada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-gray-600">Confirmada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span className="text-gray-600">En curso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-400" />
          <span className="text-gray-600">Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-gray-600">Cancelada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span className="text-gray-600">Ausente</span>
        </div>
      </div>
    </div>
  );
}
