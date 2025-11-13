import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  TrendingDown,
  DollarSign,
  Clock,
} from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AbsenteeismChart } from '@/components/dashboard/AbsenteeismChart';
import { UpcomingConsultationsList } from '@/components/dashboard/UpcomingConsultationsList';
import { AlertsList } from '@/components/dashboard/AlertsList';
import {
  dashboardMetrics,
  absenteeismTrend,
  upcomingConsultations,
  dashboardAlerts,
} from '@/mock-data/dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Resumen general de tu sistema de teleconsultas
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Pacientes Registrados"
          value={dashboardMetrics.totalPatients}
          change={dashboardMetrics.totalPatientsChange}
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          format="number"
          helpText="Total de pacientes en el sistema"
        />

        <MetricCard
          title="Consultas Próximas"
          value={dashboardMetrics.upcomingConsultations}
          change={dashboardMetrics.upcomingConsultationsChange}
          icon={Calendar}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          format="number"
          helpText="Programadas para los próximos 30 días"
        />

        <MetricCard
          title="Ausentismo"
          value={dashboardMetrics.absenteeismRate}
          change={dashboardMetrics.absenteeismRateChange}
          icon={TrendingDown}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          format="percentage"
          helpText="Tasa actual de ausentismo"
          inverseColors={true}
        />

        <MetricCard
          title="Ahorro Total"
          value={dashboardMetrics.moneySaved}
          change={dashboardMetrics.moneySavedChange}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-50"
          format="currency"
          helpText="Ahorrado en el último trimestre"
        />

        <MetricCard
          title="Horas Recuperadas"
          value={dashboardMetrics.recoveredHours}
          change={dashboardMetrics.recoveredHoursChange}
          icon={Clock}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-50"
          format="number"
          helpText="Horas médicas recuperadas"
        />
      </div>

      {/* Gráfico de ausentismo */}
      <div className="grid grid-cols-1">
        <AbsenteeismChart data={absenteeismTrend} />
      </div>

      {/* Próximas consultas y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UpcomingConsultationsList
          consultations={upcomingConsultations.slice(0, 5)}
        />
        <AlertsList alerts={dashboardAlerts} />
      </div>

      {/* Call to action para features adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="font-bold text-lg mb-2">
            Sistema de Reputación
          </h3>
          <p className="text-blue-100 mb-4">
            Gestiona y visualiza el scoring de tus pacientes para reducir aún
            más el ausentismo
          </p>
          <Link to="/reputation">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Ver Detalles
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="font-bold text-lg mb-2">Reportes Avanzados</h3>
          <p className="text-green-100 mb-4">
            Accede a análisis detallados y exporta datos para tu equipo
          </p>
          <Link to="/reports">
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Generar Reporte
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
