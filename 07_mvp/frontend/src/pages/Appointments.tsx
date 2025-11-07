import { useState, useMemo } from 'react';
import { Calendar, List, Plus, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MOCK_APPOINTMENTS } from '@/mock-data/appointments';
import type { Appointment, AppointmentFilters, AppointmentStatus } from '@/types/appointment';
import { WeekCalendar, AppointmentFormDialog } from '@/components/appointments';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

type ViewMode = 'calendar' | 'list';
type CalendarView = 'day' | 'week' | 'month';

export function Appointments() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [calendarView, setCalendarView] = useState<CalendarView>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<AppointmentFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Filtrar citas
  const filteredAppointments = useMemo(() => {
    return MOCK_APPOINTMENTS.filter((apt) => {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (
          !apt.patientName.toLowerCase().includes(search) &&
          !apt.doctorName.toLowerCase().includes(search) &&
          !apt.specialty.toLowerCase().includes(search)
        ) {
          return false;
        }
      }
      if (filters.status?.length && !filters.status.includes(apt.status)) return false;
      if (filters.specialty?.length && !filters.specialty.includes(apt.specialty)) return false;
      if (filters.doctorId?.length && !filters.doctorId.includes(apt.doctorId)) return false;
      if (filters.dateFrom && apt.date < filters.dateFrom) return false;
      if (filters.dateTo && apt.date > filters.dateTo) return false;
      return true;
    });
  }, [filters]);

  // Estadísticas rápidas
  const stats = useMemo(() => {
    const total = filteredAppointments.length;
    const scheduled = filteredAppointments.filter(a => a.status === 'scheduled').length;
    const confirmed = filteredAppointments.filter(a => a.status === 'confirmed').length;
    const completed = filteredAppointments.filter(a => a.status === 'completed').length;
    const cancelled = filteredAppointments.filter(a => a.status === 'cancelled').length;
    const noShows = filteredAppointments.filter(a => a.status === 'no-show').length;

    return { total, scheduled, confirmed, completed, cancelled, noShows };
  }, [filteredAppointments]);

  const getStatusColor = (status: AppointmentStatus): string => {
    const colors: Record<AppointmentStatus, string> = {
      'scheduled': 'bg-blue-100 text-blue-700',
      'confirmed': 'bg-green-100 text-green-700',
      'in-progress': 'bg-purple-100 text-purple-700',
      'completed': 'bg-gray-100 text-gray-700',
      'cancelled': 'bg-red-100 text-red-700',
      'no-show': 'bg-orange-100 text-orange-700',
    };
    return colors[status];
  };

  const getStatusLabel = (status: AppointmentStatus): string => {
    const labels: Record<AppointmentStatus, string> = {
      'scheduled': 'Programada',
      'confirmed': 'Confirmada',
      'in-progress': 'En Curso',
      'completed': 'Completada',
      'cancelled': 'Cancelada',
      'no-show': 'Ausente',
    };
    return labels[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Consultas</h1>
          <p className="text-gray-600 mt-1">
            Administra el calendario y las citas de telemedicina
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            className="bg-primary-600 hover:bg-primary-700"
            onClick={() => {
              setSelectedAppointment(null);
              setShowAppointmentDialog(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Consulta
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Programadas</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{stats.scheduled}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Confirmadas</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{stats.confirmed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Completadas</div>
          <div className="text-2xl font-bold text-gray-600 mt-1">{stats.completed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Canceladas</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{stats.cancelled}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Ausentes</div>
          <div className="text-2xl font-bold text-orange-600 mt-1">{stats.noShows}</div>
        </Card>
      </div>

      {/* View Toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList>
              <TabsTrigger value="calendar">
                <Calendar className="w-4 h-4 mr-2" />
                Calendario
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="w-4 h-4 mr-2" />
                Lista
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === 'calendar' && (
            <Tabs value={calendarView} onValueChange={(v) => setCalendarView(v as CalendarView)}>
              <TabsList>
                <TabsTrigger value="day">Día</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </Card>

      {/* Main Content */}
      {viewMode === 'calendar' ? (
        <div>
          {calendarView === 'week' ? (
            <WeekCalendar
              appointments={filteredAppointments}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onAppointmentClick={(apt) => {
                setSelectedAppointment(apt);
                setShowAppointmentDialog(true);
              }}
            />
          ) : (
            <Card className="p-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vista de Calendario {calendarView === 'day' ? 'Diario' : 'Mensual'}
                </h3>
                <p className="text-sm text-gray-500">
                  🚧 Componente en desarrollo - Sprint 4
                </p>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.slice(0, 20).map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {format(appointment.date, "d 'de' MMMM, yyyy", { locale: es })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.startTime} - {appointment.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.patientPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.doctorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {appointment.specialty}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="ghost" size="sm">
                        Ver Detalle
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Appointment Form Dialog */}
      <AppointmentFormDialog
        isOpen={showAppointmentDialog}
        onClose={() => {
          setShowAppointmentDialog(false);
          setSelectedAppointment(null);
        }}
        onSave={(apt) => {
          console.log('Saving appointment:', apt);
          // TODO: Implement save logic
        }}
        appointment={selectedAppointment}
        initialDate={selectedDate}
      />
    </div>
  );
}
