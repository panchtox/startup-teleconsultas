import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockMessages, type Message } from '@/mock-data/messages';
import { MessageSquare, CheckCheck, Eye, Reply, XCircle, Clock } from 'lucide-react';

export function MessageLog() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.patientName.toLowerCase().includes(search.toLowerCase()) ||
                          msg.content.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || msg.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent': return <Clock className="h-4 w-4" />;
      case 'delivered': return <CheckCheck className="h-4 w-4" />;
      case 'read': return <Eye className="h-4 w-4" />;
      case 'responded': return <Reply className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'sent': return 'bg-gray-100 text-gray-700';
      case 'delivered': return 'bg-blue-100 text-blue-700';
      case 'read': return 'bg-purple-100 text-purple-700';
      case 'responded': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
    }
  };

  const getTypeColor = (type: Message['type']) => {
    switch (type) {
      case 'reminder': return 'bg-blue-100 text-blue-700';
      case 'confirmation': return 'bg-green-100 text-green-700';
      case 'followup': return 'bg-orange-100 text-orange-700';
      case 'cancellation': return 'bg-red-100 text-red-700';
    }
  };

  const getTypeLabel = (type: Message['type']) => {
    switch (type) {
      case 'reminder': return 'Recordatorio';
      case 'confirmation': return 'Confirmación';
      case 'followup': return 'Seguimiento';
      case 'cancellation': return 'Cancelación';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar paciente o mensaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de mensaje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="reminder">Recordatorios</SelectItem>
                <SelectItem value="confirmation">Confirmaciones</SelectItem>
                <SelectItem value="followup">Seguimientos</SelectItem>
                <SelectItem value="cancellation">Cancelaciones</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="sent">Enviados</SelectItem>
                <SelectItem value="delivered">Entregados</SelectItem>
                <SelectItem value="read">Leídos</SelectItem>
                <SelectItem value="responded">Respondidos</SelectItem>
                <SelectItem value="failed">Fallidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Log de mensajes */}
      <Card>
        <CardHeader>
          <CardTitle>
            Log de Mensajes ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredMessages.slice(0, 50).map((msg) => (
              <div key={msg.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{msg.patientName}</span>
                      <Badge className={getTypeColor(msg.type)}>
                        {getTypeLabel(msg.type)}
                      </Badge>
                      <Badge className={getStatusColor(msg.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(msg.status)}
                          <span className="capitalize">{msg.status}</span>
                        </div>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{msg.content}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {msg.sentAt.toLocaleString('es-AR', { 
                      day: '2-digit', 
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 text-xs text-gray-500 pl-4">
                  {msg.deliveredAt && (
                    <div className="flex items-center gap-1">
                      <CheckCheck className="h-3 w-3" />
                      Entregado {msg.deliveredAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {msg.readAt && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Leído {msg.readAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                  {msg.respondedAt && (
                    <div className="flex items-center gap-1">
                      <Reply className="h-3 w-3" />
                      "{msg.response}" {msg.respondedAt.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredMessages.length > 50 && (
            <p className="text-sm text-gray-500 text-center mt-4">
              Mostrando 50 de {filteredMessages.length} mensajes
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
