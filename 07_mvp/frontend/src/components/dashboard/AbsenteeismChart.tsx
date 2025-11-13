import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AbsenteeismTrendData } from '@/types/dashboard';

interface AbsenteeismChartProps {
  data: AbsenteeismTrendData[];
}

export function AbsenteeismChart({ data }: AbsenteeismChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Evolución del Ausentismo</CardTitle>
        <CardDescription>
          Comparación del ausentismo antes y después de implementar TeleAssist
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis
              label={{
                value: 'Ausentismo (%)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#6b7280', fontSize: '12px' },
              }}
              className="text-xs"
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
            <Line
              type="monotone"
              dataKey="beforeSystem"
              stroke="#ef4444"
              strokeWidth={2}
              name="Sin TeleAssist"
              dot={{ fill: '#ef4444', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="withSystem"
              stroke="#16a34a"
              strokeWidth={2}
              name="Con TeleAssist"
              dot={{ fill: '#16a34a', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-sm font-medium text-red-900">
              Ausentismo Promedio Inicial
            </p>
            <p className="text-2xl font-bold text-red-600 mt-1">33%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm font-medium text-green-900">
              Ausentismo Actual
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {data[data.length - 1].withSystem.toFixed(1)}%
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-900">Reducción Total</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              -{(33 - data[data.length - 1].withSystem).toFixed(1)} pp
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
