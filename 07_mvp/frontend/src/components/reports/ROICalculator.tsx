import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { roiMetrics } from '@/mock-data/reports';
import { DollarSign, TrendingUp, Clock, Calendar } from 'lucide-react';

export function ROICalculator() {
  const costPerConsultation = 180; // USD
  const systemCostPerMonth = 1500; // USD (estimado)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          ROI del Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* ROI destacado */}
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {roiMetrics.roi.toFixed(1)}x
            </div>
            <div className="text-lg text-gray-700">
              Retorno de Inversión
            </div>
            <Badge className="mt-2 bg-green-600">
              +{((roiMetrics.roi - 1) * 100).toFixed(0)}% de ganancia
            </Badge>
          </div>

          {/* Métricas clave */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Consultas Salvadas</span>
              </div>
              <div className="text-2xl font-bold">{roiMetrics.consultationsSaved}</div>
              <div className="text-xs text-gray-500 mt-1">
                En {roiMetrics.monthsSinceStart} meses
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">Horas Recuperadas</span>
              </div>
              <div className="text-2xl font-bold">{roiMetrics.hoursRecovered}h</div>
              <div className="text-xs text-gray-500 mt-1">
                Tiempo médico disponible
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Ahorro Mensual</span>
              </div>
              <div className="text-2xl font-bold">
                ${roiMetrics.monthlySavings.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Promedio por mes
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-gray-600">Ahorro Total</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ${roiMetrics.totalSavings.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Acumulado {roiMetrics.monthsSinceStart} meses
              </div>
            </div>
          </div>

          {/* Desglose de costos */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">💰 Desglose Financiero</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Costo del sistema ({roiMetrics.monthsSinceStart} meses):</span>
                <span className="font-medium">-${(systemCostPerMonth * roiMetrics.monthsSinceStart).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ahorro por consultas salvadas:</span>
                <span className="font-medium text-green-600">
                  +${(roiMetrics.consultationsSaved * costPerConsultation).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between font-bold">
                <span>Beneficio neto:</span>
                <span className="text-green-600">
                  ${(roiMetrics.totalSavings - (systemCostPerMonth * roiMetrics.monthsSinceStart)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Proyección */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">📊 Proyección anual</h4>
            <p className="text-sm text-gray-600">
              Si la tendencia continúa, se proyecta un ahorro de{' '}
              <span className="font-bold text-blue-700">
                ${(roiMetrics.monthlySavings * 12).toLocaleString()}
              </span>{' '}
              en el primer año, con un ROI de{' '}
              <span className="font-bold text-blue-700">
                {((roiMetrics.monthlySavings * 12) / (systemCostPerMonth * 12)).toFixed(1)}x
              </span>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
