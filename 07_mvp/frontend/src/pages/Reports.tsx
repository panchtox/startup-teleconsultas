import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AbsentismChart, ROICalculator } from '@/components/reports';
import { specialtyMetrics, doctorMetrics, monthlyComparison, engagementMetrics } from '@/mock-data/reports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, Users, Award } from 'lucide-react';

export default function Reports() {
  const handleExportPDF = () => {
    alert('Exportación a PDF - Feature en desarrollo');
  };

  const handleExportExcel = () => {
    alert('Exportación a Excel - Feature en desarrollo');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Analytics</h1>
          <p className="text-gray-600">Análisis completo del impacto del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Métricas de engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Engagement de Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{engagementMetrics.activePatients}</div>
              <div className="text-sm text-gray-600">Pacientes Activos</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{engagementMetrics.patientsWithScore}</div>
              <div className="text-sm text-gray-600">Con Score Asignado</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold">{engagementMetrics.averageScore}</div>
              <div className="text-sm text-gray-600">Score Promedio</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{engagementMetrics.patientsImproved}</div>
              <div className="text-sm text-gray-600">Pacientes Mejorados</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{engagementMetrics.improvementRate}%</div>
              <div className="text-sm text-gray-600">Tasa de Mejora</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{engagementMetrics.badgesEarned}</div>
              <div className="text-sm text-gray-600">Badges Ganados</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de ausentismo */}
      <AbsentismChart />

      {/* ROI */}
      <ROICalculator />

      {/* Comparativa mensual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Evolución Mensual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attended" fill="#22c55e" name="Asistieron" />
                <Bar dataKey="absent" fill="#ef4444" name="Ausentes" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {monthlyComparison.map((month) => (
              <div key={month.month} className="text-center p-3 border rounded-lg">
                <div className="font-medium">{month.month}</div>
                <div className="text-2xl font-bold text-red-600">{month.rate}%</div>
                <div className="text-xs text-gray-500">Ausentismo</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas por especialidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance por Especialidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {specialtyMetrics.map((spec) => (
              <div key={spec.specialty} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{spec.specialty}</div>
                  <div className="text-sm text-gray-600">
                    {spec.attended} asistieron de {spec.totalConsultations} programadas
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{spec.absentismRate}%</div>
                    <div className="text-xs text-gray-500">Ausentismo</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    ↓ {spec.improvement}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top médicos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Médicos por Asistencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {doctorMetrics.map((doc, idx) => (
              <div key={doc.doctorName} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium">{doc.doctorName}</div>
                    <div className="text-sm text-gray-600">{doc.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-gray-600">{doc.attended}/{doc.totalConsultations}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${doc.absentismRate < 7 ? 'text-green-600' : 'text-orange-600'}`}>
                      {doc.absentismRate}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">💡 Insights Clave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="font-bold text-blue-900">•</span>
            <p>La <strong>reducción del 73%</strong> en ausentismo supera las expectativas iniciales del 60%.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-blue-900">•</span>
            <p><strong>Cardiología</strong> tiene la mejor tasa de asistencia con solo 6.3% de ausentismo.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-blue-900">•</span>
            <p>El ROI de <strong>3.7x</strong> en solo 3 meses indica un payback period menor a 4 meses.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-blue-900">•</span>
            <p><strong>156 horas</strong> médicas recuperadas equivalen a contratar 0.4 FTE adicional sin costo.</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-blue-900">•</span>
            <p>71% de pacientes mejoraron su comportamiento, demostrando efectividad del sistema de reputación.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
