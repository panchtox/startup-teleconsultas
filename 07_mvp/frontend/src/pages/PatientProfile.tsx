import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScoreBadge } from '@/components/patients/ScoreBadge'
import { allPatients } from '@/mock-data/patients'
import { getLevelByScore, getLevelConfig } from '@/config/reputation'

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Buscar paciente por ID
  const patient = allPatients.find(p => p.id === id)

  // Loading state o paciente no encontrado
  if (!patient) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/patients')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
        <Card className="p-6">
          <p className="text-gray-600">Paciente no encontrado (ID: {id})</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/patients')}>
            Volver a la lista
          </Button>
        </Card>
      </div>
    )
  }

  // Asegurar que tenemos el nivel
  const level = patient.level || getLevelByScore(patient.score)
  const levelConfig = getLevelConfig(level)

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header con navegación */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={() => navigate('/patients')} className="w-fit">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Pacientes
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Phone className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Contactar</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-initial">
            <Calendar className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Programar Consulta</span>
          </Button>
        </div>
      </div>

      {/* Perfil Header */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary-100 flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary-600">
            {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
          </div>

          {/* Info Principal */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="text-gray-500 mt-1">
                  {patient.demographics.identificationType}: {patient.demographics.identificationNumber} • {patient.demographics.age} años
                </p>
              </div>
              <ScoreBadge score={patient.score} level={level} size="lg" showProgress />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{patient.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{patient.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{patient.contact.province}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nivel de Reputación */}
        <Separator className="my-4" />
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Nivel {level}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {levelConfig.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">
                {patient.score}
              </p>
              <p className="text-sm text-gray-500">puntos</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid de información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información Demográfica */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Información Personal
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Obra Social</p>
              <p className="font-medium text-gray-900">
                {patient.demographics.healthInsurance || 'No especificada'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Provincia</p>
              <p className="font-medium text-gray-900">{patient.contact.province}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ciudad</p>
              <p className="font-medium text-gray-900">{patient.contact.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="font-medium text-gray-900">{patient.contact.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900 text-sm break-all">
                {patient.contact.email}
              </p>
            </div>
          </div>
        </Card>

        {/* Estadísticas */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Estadísticas
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Total Consultas</span>
                <span className="font-semibold text-gray-900">
                  {patient.stats.totalConsultations}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Asistidas</span>
                <span className="font-semibold text-green-600">
                  {patient.stats.attendedConsultations}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Ausencias</span>
                <span className="font-semibold text-red-600">
                  {patient.stats.missedConsultations}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Canceladas</span>
                <span className="font-semibold text-orange-600">
                  {patient.stats.canceledConsultations}
                </span>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Tasa de Asistencia</span>
                <span className="font-semibold text-gray-900">
                  {patient.stats.attendanceRate}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges Obtenidos */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Logros Obtenidos
          </h3>
          <div className="space-y-2">
            {patient.badges.length > 0 ? (
              patient.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">{badge.name}</p>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Aún no ha obtenido logros
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Historial de Consultas */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Historial de Consultas
        </h3>
        <div className="space-y-3">
          {patient.consultationHistory
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
            .map((consultation, index) => {
              const statusColors = {
                'Completada': 'bg-green-100 text-green-800',
                'Ausente': 'bg-red-100 text-red-800',
                'Cancelada': 'bg-orange-100 text-orange-800',
                'Programada': 'bg-blue-100 text-blue-800',
                'Confirmada': 'bg-blue-100 text-blue-800',
                'Pendiente Confirmación': 'bg-yellow-100 text-yellow-800'
              }

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(consultation.date).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-500">
                          {consultation.specialty} • Dr/a. {consultation.doctorName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {consultation.scoreImpact !== 0 && (
                      <span className={`text-sm font-semibold ${
                        consultation.scoreImpact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {consultation.scoreImpact > 0 ? '+' : ''}{consultation.scoreImpact}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[consultation.status]
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
        {patient.consultationHistory.length > 10 && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              Ver todas las consultas ({patient.consultationHistory.length})
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
