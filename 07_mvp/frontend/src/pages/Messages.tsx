import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageLog, MessageTemplates } from '@/components/messages';
import { getMessageStats, getMessagesByType } from '@/mock-data/messages';
import { MessageSquare, Send, CheckCheck, Eye, Reply } from 'lucide-react';

export default function Messages() {
  const stats = getMessageStats();
  const byType = getMessagesByType();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comunicaciones</h1>
        <p className="text-gray-600">Gestión de mensajes WhatsApp y notificaciones</p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enviados</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Últimos 30 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entregados</p>
                <p className="text-2xl font-bold">{stats.delivered}</p>
              </div>
              <CheckCheck className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2 font-medium">
              {stats.deliveryRate.toFixed(1)}% tasa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Leídos</p>
                <p className="text-2xl font-bold">{stats.read}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-600 mt-2 font-medium">
              {stats.readRate.toFixed(1)}% tasa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Respondidos</p>
                <p className="text-2xl font-bold">{stats.responded}</p>
              </div>
              <Reply className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              {stats.responseRate.toFixed(1)}% tasa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fallidos</p>
                <p className="text-2xl font-bold">{stats.failed}</p>
              </div>
              <Send className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-2 font-medium">
              {((stats.failed / stats.total) * 100).toFixed(1)}% tasa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Mensajes por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{byType.reminder}</div>
              <div className="text-sm text-gray-600">Recordatorios</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{byType.confirmation}</div>
              <div className="text-sm text-gray-600">Confirmaciones</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">{byType.followup}</div>
              <div className="text-sm text-gray-600">Seguimientos</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{byType.cancellation}</div>
              <div className="text-sm text-gray-600">Cancelaciones</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <MessageTemplates />

      {/* Log de mensajes */}
      <MessageLog />
    </div>
  );
}
