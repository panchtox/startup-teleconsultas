import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, User } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: 'reminder' | 'confirmation' | 'followup' | 'cancellation';
  content: string;
  timing: string;
  variables: string[];
  usageCount: number;
}

const templates: Template[] = [
  {
    id: 't1',
    name: 'Recordatorio 24h antes',
    type: 'reminder',
    content: 'Hola {name}, te recordamos tu consulta de {specialty} el {date} a las {time}. ¿Confirmás tu asistencia?',
    timing: '24 horas antes',
    variables: ['name', 'specialty', 'date', 'time'],
    usageCount: 485
  },
  {
    id: 't2',
    name: 'Recordatorio 2h antes',
    type: 'reminder',
    content: '{name}, tu cita con Dr/a {doctor} está programada para hoy a las {time}. Respondé SÍ para confirmar.',
    timing: '2 horas antes',
    variables: ['name', 'doctor', 'time'],
    usageCount: 412
  },
  {
    id: 't3',
    name: 'Confirmación recibida',
    type: 'confirmation',
    content: '¡Perfecto {name}! Tu consulta del {date} a las {time} está confirmada. Te esperamos.',
    timing: 'Inmediato (respuesta)',
    variables: ['name', 'date', 'time'],
    usageCount: 387
  },
  {
    id: 't4',
    name: 'Seguimiento ausencia',
    type: 'followup',
    content: 'Hola {name}, notamos que no pudiste asistir a tu consulta del {date}. ¿Te gustaría reagendar?',
    timing: '1 día después',
    variables: ['name', 'date'],
    usageCount: 89
  },
  {
    id: 't5',
    name: 'Cancelación médico',
    type: 'cancellation',
    content: 'Hola {name}, lamentamos informarte que tu consulta del {date} fue cancelada por el Dr/a {doctor}. Contactanos para reagendar.',
    timing: 'Inmediato',
    variables: ['name', 'date', 'doctor'],
    usageCount: 23
  },
  {
    id: 't6',
    name: 'Recordatorio semanal',
    type: 'reminder',
    content: '{name}, recordá que tenés una consulta programada para el {date}. Confirmá tu asistencia para mantener tu puntaje.',
    timing: '7 días antes',
    variables: ['name', 'date'],
    usageCount: 298
  }
];

export function MessageTemplates() {
  const getTypeColor = (type: Template['type']) => {
    switch (type) {
      case 'reminder': return 'bg-blue-100 text-blue-700';
      case 'confirmation': return 'bg-green-100 text-green-700';
      case 'followup': return 'bg-orange-100 text-orange-700';
      case 'cancellation': return 'bg-red-100 text-red-700';
    }
  };

  const getTypeLabel = (type: Template['type']) => {
    switch (type) {
      case 'reminder': return 'Recordatorio';
      case 'confirmation': return 'Confirmación';
      case 'followup': return 'Seguimiento';
      case 'cancellation': return 'Cancelación';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Templates de Mensajes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{template.name}</h4>
                    <Badge className={getTypeColor(template.type)}>
                      {getTypeLabel(template.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{template.content}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {template.usageCount} usos
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {template.timing}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Variables: {template.variables.map(v => `{${v}}`).join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">💡 Mejores prácticas</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Personalizar con el nombre del paciente aumenta engagement 32%</li>
            <li>• Recordatorios 24h antes tienen 78% tasa de confirmación</li>
            <li>• Incluir detalles (especialidad, médico) reduce consultas 45%</li>
            <li>• Mensajes cortos (menos de 160 caracteres) tienen mejor tasa de respuesta</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
