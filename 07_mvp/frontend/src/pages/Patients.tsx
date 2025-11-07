/**
 * Patients Page
 * 
 * Página principal de gestión de pacientes con:
 * - Estadísticas generales
 * - Distribución por niveles
 * - Tabla completa con búsqueda y filtros
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PatientsTable } from '@/components/patients/PatientsTable';
import { allPatients, patientsOverview } from '@/mock-data/patients';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Award,
  UserPlus
} from 'lucide-react';

export function Patients() {
  const navigate = useNavigate();
  // const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  
  // Handlers
  const handleViewProfile = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };
  
  const handleSendMessage = (patientId: string) => {
    console.log('Enviar mensaje a:', patientId);
    // TODO: Implementar modal de mensajes
  };
  
  const handleScheduleConsultation = (patientId: string) => {
    console.log('Programar consulta para:', patientId);
    // TODO: Implementar modal de programación
  };
  
  const handleNewPatient = () => {
    // setShowNewPatientModal(true);
    // TODO: Implementar modal de nuevo paciente
    console.log('TODO: Modal nuevo paciente');
  };
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
          <p className="text-muted-foreground mt-1">
            Administra y monitorea el perfil completo de tus pacientes
          </p>
        </div>
        
        <Button onClick={handleNewPatient}>
          <UserPlus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>
      
      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Pacientes */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Pacientes
                </p>
                <p className="text-3xl font-bold mt-2">
                  {patientsOverview.total}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {patientsOverview.activeCount} activos
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Score Promedio */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Score Promedio
                </p>
                <p className="text-3xl font-bold mt-2">
                  {patientsOverview.avgScore}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  ↑ Nivel: Premium
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tasa de Asistencia */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Asistencia Promedio
                </p>
                <p className="text-3xl font-bold mt-2">
                  {patientsOverview.avgAttendanceRate}%
                </p>
                <p className="text-sm text-green-600 mt-1">
                  ↑ +12% vs objetivo
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pacientes en Riesgo */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  En Riesgo
                </p>
                <p className="text-3xl font-bold mt-2">
                  {patientsOverview.atRiskCount}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {((patientsOverview.atRiskCount / patientsOverview.total) * 100).toFixed(1)}% del total
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Distribución por niveles */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Distribución por Nivel de Reputación</h3>
          
          <div className="space-y-4">
            {patientsOverview.byLevel.map(({ level, count, percentage }) => (
              <div key={level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{level}</span>
                    <span className="text-sm text-muted-foreground">
                      ({count} pacientes)
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      level === 'Elite' ? 'bg-amber-500' :
                      level === 'Premium' ? 'bg-purple-500' :
                      level === 'Estándar' ? 'bg-blue-500' :
                      level === 'Nuevo' ? 'bg-gray-400' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Tabla de pacientes */}
      <Card>
        <CardContent className="p-6">
          <PatientsTable
            patients={allPatients}
            onViewProfile={handleViewProfile}
            onSendMessage={handleSendMessage}
            onScheduleConsultation={handleScheduleConsultation}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Patients;
