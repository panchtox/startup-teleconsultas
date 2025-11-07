import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { absentismTrend } from '@/mock-data/reports';
import { TrendingDown } from 'lucide-react';

export function AbsentismChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Reducción de Ausentismo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Métricas destacadas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">33%</div>
              <div className="text-sm text-gray-600">Antes del sistema</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">9%</div>
              <div className="text-sm text-gray-600">Con el sistema</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">73%</div>
              <div className="text-sm text-gray-600">Mejora</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">87</div>
              <div className="text-sm text-gray-600">Consultas salvadas</div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={absentismTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  label={{ value: 'Tasa de Ausentismo (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 40]}
                />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  labelStyle={{ color: '#000' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Sin sistema"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="withSystem" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  name="Con sistema"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">📈 Tendencia</h4>
              <p className="text-sm text-gray-600">
                Reducción sostenida del ausentismo desde la implementación. 
                Mayor impacto en el segundo mes con 64% de mejora.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">🎯 Proyección</h4>
              <p className="text-sm text-gray-600">
                Si la tendencia continúa, se espera alcanzar un ausentismo 
                menor al 5% en el próximo trimestre.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
