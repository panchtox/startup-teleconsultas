import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import DashboardPage from '@/pages/Dashboard'
import PatientsPage from '@/pages/Patients'
import PatientProfilePage from '@/pages/PatientProfile'
import { Appointments } from '@/pages/Appointments'
import { Reputation } from '@/pages/Reputation'
import Messages from '@/pages/Messages'
import Reports from '@/pages/Reports'

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
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/reputation" element={<Reputation />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Placeholder title="Configuración" />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
