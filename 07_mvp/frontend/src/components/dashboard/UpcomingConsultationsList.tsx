import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Stethoscope, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { UpcomingConsultation } from '@/types/dashboard';

interface UpcomingConsultationsListProps {
  consultations: UpcomingConsultation[];
}

const getLevelColor = (level: string): string => {
  switch (level) {
    case 'Elite':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Premium':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Estándar':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Nuevo':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'En Riesgo':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Confirmada':
      return 'bg-green-100 text-green-800';
    case 'Programada':
      return 'bg-blue-100 text-blue-800';
    case 'Pendiente Confirmación':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export function UpcomingConsultationsList({
  consultations,
}: UpcomingConsultationsListProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Próximas Consultas</span>
          <Badge variant="secondary" className="text-xs">
            {consultations.length} programadas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className={cn(
                'p-4 rounded-lg border transition-all hover:shadow-md',
                consultation.status === 'Pendiente Confirmación'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-white border-gray-200'
              )}
            >
              {/* Header con fecha y hora */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">
                    {format(consultation.date, 'EEEE d \'de\' MMMM', {
                      locale: es,
                    })}
                  </span>
                  <Clock className="h-4 w-4 text-gray-500 ml-2" />
                  <span className="text-gray-600">{consultation.time}hs</span>
                </div>
                <Badge className={getStatusColor(consultation.status)}>
                  {consultation.status}
                </Badge>
              </div>

              {/* Info del paciente */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold">
                    {getInitials(consultation.patientName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">
                      {consultation.patientName}
                    </p>
                    {consultation.isFirstTime && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                      >
                        Primera vez
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={getLevelColor(consultation.patientLevel)}
                    >
                      {consultation.patientLevel} · Score{' '}
                      {consultation.patientScore}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Info del médico y especialidad */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{consultation.doctorName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Stethoscope className="h-4 w-4" />
                  <span>{consultation.specialty}</span>
                </div>
              </div>

              {/* Alerta para pacientes en riesgo */}
              {consultation.patientLevel === 'En Riesgo' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    Paciente con alto riesgo de ausentismo. Seguimiento
                    especial recomendado.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {consultations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No hay consultas programadas</p>
            <p className="text-sm">
              Las próximas consultas aparecerán aquí
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
