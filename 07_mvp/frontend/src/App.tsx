import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import DashboardPage from '@/pages/Dashboard'
import PatientsPage from '@/pages/Patients'
import PatientProfilePage from '@/pages/PatientProfile'
import { Appointments } from '@/pages/Appointments'
import { Reputation } from '@/pages/Reputation'
import Messages from '@/pages/Messages'
import Reports from '@/pages/Reports'
import { Landing } from '@/pages/Landing'
import Demo from '@/pages/Demo'

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
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      
      {/* Protected routes with DashboardLayout */}
      <Route path="/login" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/patients" element={<DashboardLayout><PatientsPage /></DashboardLayout>} />
      <Route path="/patients/:id" element={<DashboardLayout><PatientProfilePage /></DashboardLayout>} />
      <Route path="/appointments" element={<DashboardLayout><Appointments /></DashboardLayout>} />
      <Route path="/reputation" element={<DashboardLayout><Reputation /></DashboardLayout>} />
      <Route path="/messages" element={<DashboardLayout><Messages /></DashboardLayout>} />
      <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
      <Route path="/settings" element={<DashboardLayout><Placeholder title="Configuración" /></DashboardLayout>} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  )
}

export default App
