import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import DashboardPage from '@/pages/Dashboard'
import PatientsPage from '@/pages/Patients'
import PatientProfilePage from '@/pages/PatientProfile'

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
        <Route path="/" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/:id" element={<PatientProfilePage />} />
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
