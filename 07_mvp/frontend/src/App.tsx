import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'

// Placeholder components - we'll create these next
function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Bienvenido al sistema de gestión de teleconsultas con scoring de reputación
      </p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Pacientes Activos</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">487</p>
          <p className="mt-1 text-sm text-green-600">↑ 12% vs mes anterior</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Asistencia</p>
          <p className="mt-2 text-3xl font-bold text-primary-600">91%</p>
          <p className="mt-1 text-sm text-green-600">↑ 24% vs mes anterior</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Ahorro Mensual</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">$18,000</p>
          <p className="mt-1 text-sm text-gray-500">USD</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Próximas Consultas</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">120</p>
          <p className="mt-1 text-sm text-gray-500">Próximos 30 días</p>
        </div>
      </div>
    </div>
  )
}

// Placeholder para otras páginas
function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">Esta página se desarrollará en el próximo sprint</p>
    </div>
  )
}

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Placeholder title="Pacientes" />} />
        <Route path="/appointments" element={<Placeholder title="Consultas" />} />
        <Route path="/reputation" element={<Placeholder title="Sistema de Reputación" />} />
        <Route path="/messages" element={<Placeholder title="Mensajes" />} />
        <Route path="/reports" element={<Placeholder title="Reportes" />} />
        <Route path="/settings" element={<Placeholder title="Configuración" />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
